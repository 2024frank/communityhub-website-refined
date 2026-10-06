/** Give a live application's own scroll region the remaining visible scene space. */
export function availableToolRoom(height: number, top: number, reserve: number, minimum = 80): number {
  return Math.max(minimum, Math.min(680, Math.floor(height - top - reserve)));
}
export function phoneToolReserve(captionHeight: number, captionMargins: number, safeArea = 0): number {
  return 80 + Math.max(0, safeArea) + captionHeight + captionMargins + 8;
}
/** Keep the whole landscape story and its actual category controls together. */
export function availableVoicesStage(room: number, categories: number): number {
  return Math.max(240, Math.floor(room - categories - 10));
}
export function fitViewportTools(): void {
  const main = document.getElementById('main');
  if (!main) return;
  let queued = 0;
  const selector = '.native-voices-content, #main[data-page="see-it-live"] .lf-body, #main[data-page="education"] #lessons';
  const fit = () => {
    queued = 0;
    main.querySelectorAll<HTMLElement>(selector).forEach(target => {
      if (target.closest('[inert]') || getComputedStyle(target).visibility === 'hidden') return;
      const top = target.getBoundingClientRect().top;
      if (top < 0 || top >= innerHeight) return;
      let reserve = target.classList.contains('native-voices-content') ? 92 : 108;
      const phone = innerWidth < 700;
      const next = document.querySelector<HTMLElement>('body > .global-page-next');
      const safeArea = phone && next ? Math.max(0, (parseFloat(getComputedStyle(next).bottom) || 12) - 12) : 0;
      if (phone && target.classList.contains('native-voices-content')) {
        const caption = target.closest('[data-native-contexts]')?.querySelector<HTMLElement>('.native-caption');
        const style = caption ? getComputedStyle(caption) : null;
        reserve = phoneToolReserve(caption?.getBoundingClientRect().height || 0,
          style ? (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0) : 0, safeArea);
      }
      if (target.id === 'lessons') {
        // Keep the external search destination above the global next action.
        // The lesson list already owns native scrolling; only its window shrinks.
        const after = target.closest('.library-tools')?.lastElementChild;
        reserve = 80 + safeArea + (after ? after.getBoundingClientRect().height + (parseFloat(getComputedStyle(after).marginTop) || 0) : 0) + 8;
      }
      // A short initial viewport becomes a later reading stop; it must not
      // squeeze a searchable lesson list down to one clipped result.
      const value = `${availableToolRoom(innerHeight, top, reserve, phone && target.id === 'lessons' ? 220 : 80)}px`;
      if (target.style.getPropertyValue('--viewport-tool-room') !== value)
        target.style.setProperty('--viewport-tool-room', value);
      if (target.classList.contains('native-voices-content') && innerWidth >= 700) {
        const categories = target.querySelector<HTMLElement>('.native-categories');
        if (categories) {
          const stageRoom = `${availableVoicesStage(parseFloat(value), categories.getBoundingClientRect().height)}px`;
          if (target.style.getPropertyValue('--voices-stage-room') !== stageRoom)
            target.style.setProperty('--voices-stage-room', stageRoom);
        }
      }
    });
  };
  const schedule = () => { if (!queued) queued = requestAnimationFrame(fit); };
  window.addEventListener('ch:storychange', schedule);
  window.addEventListener('resize', schedule);
  main.addEventListener('load', schedule, true);
  new MutationObserver(schedule).observe(main, {childList:true,subtree:true});
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(main);
  document.fonts?.ready.then(schedule);
  schedule();
}
