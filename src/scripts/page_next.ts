// One explicit page-navigation control. The existing story controller remains
// the sole owner of hero, product, reading-scene and footer progression.
(function () {
 if (!document.getElementById('main') || document.querySelector('body > .global-page-next')) return;
 const button = document.createElement('button');
 button.type = 'button';
 button.className = 'global-page-next';
 button.setAttribute('aria-label', 'Next section');
 button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg>';
 button.hidden = true;
 document.body.appendChild(button);
 let pending = 0;

 function blocked() {
  const menu = document.getElementById('mnav');
  return !!((menu && !menu.hidden) || document.body.style.overflow === 'hidden'
   || document.querySelector('[data-page-contents][open], .dd .nav-btn[aria-expanded="true"], dialog[open], [aria-modal="true"]'));
 }
 function hasNext() {
  const story = window.chStory;
  if (story) {
   const frames = story.frames();
   const current = story.current();
   // The first hero action reveals its people composition at the same position.
   if (current?.els.some(owner => owner.matches('.hv') && !owner.classList.contains('intro-peek'))) return true;
   return frames.some(frame => frame.y > window.scrollY + 24);
  }
  return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
   > window.scrollY + window.innerHeight + 2;
 }
 function update() {
  pending = 0;
  const hidden = blocked() || !hasNext();
  if (button.hidden !== hidden) button.hidden = hidden;
 }
 function schedule() { if (!pending) pending = requestAnimationFrame(update); }
 button.addEventListener('click', () => {
  if (blocked() || button.hidden) return;
  if (window.chStory) window.chStory.go(1, true);
  else {
   const header = document.getElementById('hdr');
   const step = Math.max(1, window.innerHeight - (header?.offsetHeight || 0));
   window.scrollTo({top: window.scrollY + step, behavior: 'instant'});
  }
  schedule();
 });
 window.addEventListener('ch:storychange', schedule);
 window.addEventListener('ch:fit', schedule);
 window.addEventListener('scroll', schedule, {passive: true});
 window.addEventListener('resize', schedule);
 window.addEventListener('pageshow', schedule);
 document.addEventListener('visibilitychange', schedule);
 // Menus and dialogs may open without any scrolling or story-state change.
 new MutationObserver(records => {
  if (records.some(record => record.target !== button && !button.contains(record.target))) schedule();
 }).observe(document.body, {subtree:true,childList:true,attributes:true,attributeFilter:['hidden','open','aria-expanded','aria-modal','style']});
 if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.getElementById('main')!);
 schedule();
})();
