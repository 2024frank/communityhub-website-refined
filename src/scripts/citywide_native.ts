import { attachScrollGuide } from './dashboard_scroll_guide';

document.querySelectorAll<HTMLElement>('[data-citywide-pan]').forEach(viewport => {
 const demo = viewport.closest<HTMLElement>('.citywide-native-demo')!;
 const frame = viewport.querySelector<HTMLIFrameElement>('iframe')!;
 const caption = demo.querySelector<HTMLElement>('.citywide-open')!;
 const phone = matchMedia('(max-width:699px)');
 let releaseGuide: (() => void) | undefined;
 let queued = 0;
 const ratio = 1584 / 893;
 function fit() {
  queued = 0;
  if (phone.matches && !releaseGuide) {
   releaseGuide = attachScrollGuide(viewport, 'Citywide Dashboard', 'Swipe this bar to explore', 'horizontal');
  } else if (!phone.matches && releaseGuide) {
   releaseGuide(); releaseGuide = undefined;
  }
  const available = demo.clientWidth;
  if (!available) return;
  let width = 800;
  if (phone.matches) viewport.style.width = '100%';
  else {
   const captionStyle = getComputedStyle(caption);
   const trailing = caption.getBoundingClientRect().height + (parseFloat(captionStyle.marginTop) || 0) + 92;
   const room = Math.max(180, innerHeight - viewport.getBoundingClientRect().top - trailing);
   width = Math.min(Math.max(1, available - 2), Math.max(1, room - 2) * ratio);
   viewport.style.width = `${width + 2}px`;
  }
  frame.style.width = `${width}px`;
  frame.style.height = `${width / ratio}px`;
  viewport.style.height = `${width / ratio + 2}px`;
 }
 const schedule = () => { if (!queued) queued = requestAnimationFrame(fit); };
 new ResizeObserver(schedule).observe(demo);
 phone.addEventListener('change', schedule);
 window.addEventListener('resize', schedule);
 window.addEventListener('ch:storychange', schedule);
 frame.addEventListener('load', schedule);
 fit();
});
