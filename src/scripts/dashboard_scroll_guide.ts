import { scrollbarGeometry, scrollOffsetAt } from './ui/scrollbar-geometry';
import flashScrollGuide from '../components/flash-scroll-guide.svg?raw';

// The parent remains the real scroll owner. The rail only provides a persistent,
// reachable alternative to OS scrollbars that disappear until scrolling starts.
export function initializeScrollGuide(root: HTMLElement, viewport: HTMLElement, label = 'dashboard'): () => void {
 const canvas = root.querySelector<HTMLElement>('.native-scroll-canvas') || viewport;
 const horizontal = root.dataset.scrollAxis === 'horizontal';
 const offset = () => horizontal ? viewport.scrollLeft : viewport.scrollTop;
 const setOffset = (value: number) => { if (horizontal) viewport.scrollLeft = value; else viewport.scrollTop = value; };
 const extent = () => horizontal ? viewport.clientWidth : viewport.clientHeight;
 const events = new AbortController();
 const signal = events.signal;
 const bar = root.querySelector<HTMLButtonElement>('.native-scrollbar')!;
 const track = root.querySelector<HTMLElement>('.native-scroll-track')!;
 const thumb = root.querySelector<HTMLElement>('.native-scroll-thumb')!;
 const coach = root.querySelector<HTMLElement>('.native-scroll-coach')!;
 const svg = coach.querySelector<SVGSVGElement>('svg')!;
 const arm = svg.querySelector<SVGGElement>('[data-flash-arm]')!;
 const reduce = matchMedia('(prefers-reduced-motion: reduce)');
 let completed = false, entered = false, introduced = false, active = false, animation = 0, frame = 0, focusFrame = 0;
 let lastScroll = offset();
 let drag: { pointer: number; grab: number } | null = null;
 bar.hidden = coach.hidden = false;
 root.classList.add('has-scroll-guide');

 const geometry = () => scrollbarGeometry(extent(), horizontal ? viewport.scrollWidth : viewport.scrollHeight, horizontal ? track.clientWidth : track.clientHeight, offset());
 function hide() {
  cancelAnimationFrame(animation); animation = 0;
  root.classList.remove('is-scroll-hint');
 }
 function aim() {
  const matrix = svg.getScreenCTM();
  if (!matrix) return 0;
  const target = thumb.getBoundingClientRect();
  const point = svg.createSVGPoint();
  point.x = target.x + target.width / 2; point.y = target.y + target.height / 2;
  const local = point.matrixTransform(matrix.inverse());
  // Original Flash pose's shoulder and presenting-arm direction.
  const angle = Math.atan2(local.y - 520, local.x - 232) * 180 / Math.PI + 129.5;
  arm.setAttribute('transform', `rotate(${angle} 232 520)`);
  return angle;
 }
 function ownsScene() {
  if (viewport.closest('[hidden],[inert],[aria-hidden="true"]')) return false;
  const story = window.chStory;
  if (story) {
   const current = story.current();
   return !!current && current.els.some(owner => owner.contains(root))
    && (!current.scene || current.scene.contains(root) || root.contains(current.scene));
  }
  const rect = viewport.getBoundingClientRect();
  return getComputedStyle(viewport).visibility !== 'hidden'
   && rect.top < innerHeight - 80 && rect.bottom > 100 && rect.left < innerWidth && rect.right > 0;
 }
 function show() {
  if (!active || geometry().maximum < 1) return;
  hide();
  root.classList.add('is-scroll-hint');
  const angle = aim();
  if (!introduced && !reduce.matches) {
   const start = performance.now();
   const gesture = (now: number) => {
    const progress = Math.min(1, (now - start) / 700);
    arm.setAttribute('transform', `rotate(${angle + Math.sin(progress * Math.PI) * 7} 232 520)`);
    if (progress < 1) animation = requestAnimationFrame(gesture);
   };
   animation = requestAnimationFrame(gesture);
  }
  introduced = true;
 }
 function update() {
  frame = 0;
  const g = geometry();
  thumb.style[horizontal ? 'width' : 'height'] = `${g.thumb}px`;
  thumb.style.transform = `${horizontal ? 'translateX' : 'translateY'}(${g.position}px)`;
  bar.setAttribute('aria-valuenow', String(Math.round(g.maximum ? offset() / g.maximum * 100 : 0)));
  bar.setAttribute('aria-valuetext', g.maximum ? `${Math.round(offset() / g.maximum * 100)}% through ${label}` : `All ${label} content is visible`);
  bar.disabled = g.maximum < 1;
  // Scene ownership changes on navigation, not when an iframe is fitted or
  // the browser tab is hidden. Each genuine entry gets one pointing gesture.
  if (!ownsScene()) {
   entered = introduced = completed = active = false;
   lastScroll = offset();
   hide();
   return;
  }
  if (!entered) {
   entered = true;
   lastScroll = offset();
  }
  const rect = viewport.getBoundingClientRect();
  active = !document.hidden && getComputedStyle(viewport).visibility !== 'hidden'
   && rect.width > 0 && rect.height > 0 && track.clientHeight > 0
   && rect.top < innerHeight - 80 && rect.bottom > 100 && rect.left < innerWidth && rect.right > 0;
  if (!active || !g.maximum) hide();
  // The static cue stays until the dashboard is actually scrolled. Temporary
  // layout/visibility interruptions neither consume it nor replay its gesture.
  else if (!completed && !root.classList.contains('is-scroll-hint')) show();
  else if (root.classList.contains('is-scroll-hint')) aim();
 }
 function schedule() { if (!frame) frame = requestAnimationFrame(update); }
 bar.addEventListener('focus', () => {
  const rect = bar.getBoundingClientRect();
  const header = document.getElementById('hdr')?.getBoundingClientRect().bottom || 0;
  // An already visible scrollbar must not center itself with native smooth
  // focus scrolling and move the application out from under its heading.
  if (rect.top < header || rect.bottom > innerHeight - 80) return;
  const top = window.scrollY;
  cancelAnimationFrame(focusFrame);
  focusFrame = requestAnimationFrame(() => { focusFrame = 0; window.scrollTo({top, behavior:'instant'}); });
 }, {signal});
 viewport.addEventListener('scroll', () => {
  const position = offset(), moved = Math.abs(position - lastScroll) > 2;
  lastScroll = position;
  if (moved && active && !document.hidden && ownsScene()) { completed = true; hide(); }
  schedule();
 }, {passive:true, signal});
 bar.addEventListener('pointerdown', event => {
  if (event.button !== 0 || bar.disabled) return;
  event.preventDefault(); bar.focus({preventScroll:true});
  const g = geometry(), rect = track.getBoundingClientRect();
  const y = horizontal ? event.clientX - rect.left : event.clientY - rect.top;
  const grab = y >= g.position && y <= g.position + g.thumb ? y - g.position : g.thumb / 2;
  drag = { pointer:event.pointerId, grab };
  bar.setPointerCapture(event.pointerId);
  setOffset(scrollOffsetAt(y - grab, g.maximum, g.travel));
 }, {signal});
 bar.addEventListener('pointermove', event => {
  if (drag?.pointer !== event.pointerId) return;
  const g = geometry();
  const rect = track.getBoundingClientRect();
  setOffset(scrollOffsetAt((horizontal ? event.clientX - rect.left : event.clientY - rect.top) - drag.grab, g.maximum, g.travel));
 }, {signal});
 const endDrag = () => { drag = null; };
 bar.addEventListener('pointerup', endDrag, {signal});
 bar.addEventListener('pointercancel', endDrag, {signal});
 bar.addEventListener('lostpointercapture', endDrag, {signal});
 bar.addEventListener('keydown', event => {
  const g = geometry();
  const offsets: Record<string,number> = {PageDown:extent() * .85,PageUp:-extent() * .85,' ':extent() * (event.shiftKey ? -.85 : .85),Home:-g.maximum,End:g.maximum};
  offsets[horizontal ? 'ArrowRight' : 'ArrowDown'] = 40;
  offsets[horizontal ? 'ArrowLeft' : 'ArrowUp'] = -40;
  if (!(event.key in offsets)) return;
  event.preventDefault(); event.stopPropagation();
  setOffset(offset() + offsets[event.key]);
 }, {signal});
 const sizing = new ResizeObserver(schedule);
 sizing.observe(viewport); sizing.observe(canvas);
 const intersection = new IntersectionObserver(schedule,{threshold:[0,.2,.6]});
 intersection.observe(viewport);
 const contents = new MutationObserver(schedule);
 contents.observe(viewport,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden','class']});
 const visibility = new MutationObserver(schedule);
 for (let owner: HTMLElement | null = root.parentElement; owner && owner !== document.body; owner = owner.parentElement) {
  visibility.observe(owner,{attributes:true,attributeFilter:['hidden','inert','aria-hidden','class']});
 }
 window.addEventListener('ch:storychange', schedule, {signal});
 document.addEventListener('visibilitychange', schedule, {signal});
 reduce.addEventListener('change', () => { cancelAnimationFrame(animation); if (active) aim(); }, {signal});
 window.addEventListener('pagehide', hide, {signal});
 window.addEventListener('pageshow', schedule, {signal});
 update();
 return () => { events.abort(); sizing.disconnect(); intersection.disconnect(); contents.disconnect(); visibility.disconnect(); cancelAnimationFrame(frame); cancelAnimationFrame(focusFrame); hide(); };
}

let guideId = 0;
/** Add the same actual scrollbar and authentic guide to an existing scroll owner. */
export function attachScrollGuide(viewport: HTMLElement, label: string, prompt: string, axis: 'vertical' | 'horizontal' = 'vertical'): () => void {
 const root = document.createElement('div');
 root.className = 'native-scroll-feature context-scroll-guide';
 root.setAttribute('data-scroll-guide', ''); root.dataset.scrollAxis = axis;
 const shell = document.createElement('div'); shell.className = 'native-scroll-shell';
 const bar = document.createElement('button'); bar.type = 'button';
 bar.className = 'native-scrollbar'; bar.setAttribute(axis === 'horizontal' ? 'data-horizontal-scrollbar' : 'data-dashboard-scrollbar', '');
 bar.setAttribute('role', 'scrollbar'); bar.setAttribute('aria-orientation', axis);
 bar.setAttribute('aria-valuemin', '0'); bar.setAttribute('aria-valuemax', '100');
 bar.setAttribute('aria-valuenow', '0'); bar.setAttribute('aria-label', `Scroll through ${label}`);
 if (!viewport.id) viewport.id = `context-scroll-${++guideId}`;
 bar.setAttribute('aria-controls', viewport.id);
 bar.innerHTML = '<span class="native-scroll-track" aria-hidden="true"><span class="native-scroll-thumb"></span></span>';
 const coach = document.createElement('div'); coach.className = 'native-scroll-coach';
 coach.innerHTML = `<div class="native-scroll-prompt" aria-hidden="true"><span></span>${flashScrollGuide}</div>`;
 coach.querySelector('span')!.textContent = prompt;
 viewport.before(root); root.append(shell); shell.append(coach, viewport, bar);
 viewport.classList.add('guided-scroll-viewport');
 const cleanup = initializeScrollGuide(root, viewport, label);
 return () => { cleanup(); root.replaceWith(viewport); viewport.classList.remove('guided-scroll-viewport'); };
}

document.querySelectorAll<HTMLElement>('[data-scroll-guide]').forEach(root => {
 const viewport = root.querySelector<HTMLElement>('.native-scroll');
 if (viewport) initializeScrollGuide(root, viewport);
});
const lessons = document.querySelector<HTMLElement>('#main[data-page="education"] .rs-lessons');
if (lessons) attachScrollGuide(lessons, 'matching lessons', 'Scroll here for more lessons');
