/* Shared page navigation lives in page_next.ts. This module sizes event lists. */
/* Event lists on the home page end on a whole row: the box is trimmed to the rows that fit above the caption, so no row is cut off at the bottom of the screen (the rest scroll, rows snap into place). */
(function () {
  const main = document.querySelector<HTMLElement>('#main[data-page="index"]');
  if (!main) return;
  // Keep complete rows above the shared 52px next button and its clear space.
  const RESERVE = 80;
  function fit(box: HTMLElement) {
    const rows = [...box.querySelectorAll<HTMLElement>("li")].filter(li => li.offsetHeight > 0);
    if (!rows.length) return;
    const keep = box.scrollTop;
    box.style.removeProperty("max-height");
    const own = parseFloat(getComputedStyle(box).maxHeight);
    const top = box.getBoundingClientRect().top;
    const after = box.nextElementSibling instanceof HTMLElement ? box.nextElementSibling.offsetHeight + 12 : 0;
    const room = innerHeight - RESERVE - after - top;
    const cap = Math.min(isFinite(own) ? own : Infinity, room);
    const origin = top - box.scrollTop + box.clientTop;
    let best = 0;
    for (const li of rows) {
      const end = li.getBoundingClientRect().bottom - origin;
      if (end <= cap + 0.5) best = end; else break;
    }
    if (best > 0 && best < box.scrollHeight - 1) box.style.maxHeight = Math.ceil(best) + "px";
    box.scrollTop = keep;
  }
  const seen = new WeakMap<HTMLElement, string>();
  function sweep() {
    main!.querySelectorAll<HTMLElement>(".ev-mini").forEach(function (box) {
      const r = box.getBoundingClientRect();
      if (r.width === 0 || r.bottom < 0 || r.top > innerHeight) return;
      const key = [Math.round(r.top), innerHeight, box.scrollHeight, box.querySelectorAll("li").length].join();
      if (seen.get(box) === key) return;
      fit(box);
      seen.set(box, [Math.round(box.getBoundingClientRect().top), innerHeight, box.scrollHeight, box.querySelectorAll("li").length].join());
    });
  }
  let pending = 0;
  const schedule = () => {
    if (document.hidden || pending) return;
    pending = requestAnimationFrame(() => { pending = 0; sweep(); });
  };
  addEventListener("resize", schedule);
  addEventListener("ch:storychange", schedule);
  addEventListener("scroll", schedule, {passive:true});
  document.addEventListener("visibilitychange", schedule);
  new MutationObserver(schedule).observe(main, {childList:true,subtree:true});
  if (window.ResizeObserver) new ResizeObserver(schedule).observe(main);
  schedule();
})();
