/* John (30 Sep): a subtle down arrow on each homepage section advances to the next section. */
(function () {
  const main = document.querySelector<HTMLElement>('#main[data-page="index"]');
  if (!main) return;
  const arrow = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  for (const id of ["people", "problem", "engage", "products", "motivate"]) {
    const section = document.getElementById(id);
    if (!section) continue;
    const host = section.querySelector<HTMLElement>(".eng-stage") || section;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sec-next";
    btn.setAttribute("aria-label", "Next section");
    btn.innerHTML = arrow;
    btn.addEventListener("click", () => {
      const story = window.chStory;
      if (!story) return;
      const from = story.current();
      // Panels inside Engage, Educate and Motivate are stops of their own; this control skips to the next section.
      for (let i = 0; i < 12; i++) {
        if (!story.go(1, true)) return;
        const now = story.current();
        if (!now || !from || now.els[0] !== from.els[0]) return;
      }
    });
    host.appendChild(btn);
  }
})();
/* The same arrow on every inner page that scrolls: it moves to the next screen and leaves at the end. */
(function () {
  const main = document.querySelector<HTMLElement>("#main");
  if (!main || main.dataset.page === "index") return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sec-next page-next";
  btn.setAttribute("aria-label", "Next section");
  btn.setAttribute("aria-hidden", "true");
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  document.body.appendChild(btn);
  const foot = document.querySelector<HTMLElement>(".foot");
  const hdr = document.getElementById("hdr");
  function ahead() {
    const story = window.chStory;
    if (story) return story.frames().some(f => f.y > scrollY + 3 && !(foot && f.els[0] === foot));
    const end = foot ? foot.getBoundingClientRect().top + scrollY : document.documentElement.scrollHeight;
    return scrollY + innerHeight < end - 4;
  }
  const READ = "a, button, p, h1, h2, h3, h4, li, label, input, select, textarea, figcaption, small, b, strong, span, iframe, svg";
  /* What sits under a spot of the arrow, with the arrow itself out of the way. */
  function under(x: number, y: number) {
    btn.style.visibility = "hidden";
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    btn.style.visibility = "";
    return el;
  }
  /* The arrow never covers words or controls: centre first, then the right corner. */
  function free(cx: number) {
    const top = innerHeight - 54, bottom = innerHeight - 10;
    return [[cx - 18, top + 4], [cx + 18, top + 4], [cx, top + 22], [cx - 18, bottom - 4], [cx + 18, bottom - 4]]
      .every(([x, y]) => { const el = under(x, y); return !el || !el.closest(READ) || !!el.closest(".foot"); });
  }
  /* White over dark photos and bands, charcoal over light ones. */
  function dark() {
    let el = under(btn.getBoundingClientRect().left + 22, innerHeight - 32);
    for (; el; el = el.parentElement) {
      if (el.tagName === "IMG" || el.tagName === "VIDEO") return true;
      const c = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
      if (c && (c.length < 4 || +c[3] > 0.5)) return 0.299 * +c[0] + 0.587 * +c[1] + 0.114 * +c[2] < 140;
    }
    return false;
  }
  let frame = 0;
  function sync() {
    frame = 0;
    let on = ahead();
    btn.classList.remove("at-side", "on-card");
    /* With no clear spot it steps aside, and with none at all it stays hidden:
       swipe, keys and the scene itself still lead on, and nothing is covered. */
    if (on && !free(innerWidth / 2)) {
      if (free(innerWidth - 38)) btn.classList.add("at-side");
      else on = false;
    }
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-hidden", String(!on));
    btn.tabIndex = on ? 0 : -1;
    if (on) btn.classList.toggle("on-dark", !btn.classList.contains("on-card") && dark());
  }
  let settle = 0;
  /* Sections animate in after a move, so the spot is checked again once they settle. */
  function later() {
    if (!frame) frame = requestAnimationFrame(sync);
    clearTimeout(settle);
    settle = window.setTimeout(function () { sync(); settle = window.setTimeout(sync, 700); }, 450);
  }
  btn.addEventListener("click", function () {
    const story = window.chStory;
    if (story && story.go(1, true)) return;
    window.scrollBy({ top: innerHeight - (hdr ? hdr.offsetHeight : 0), behavior: "smooth" });
  });
  addEventListener("scroll", later, { passive: true });
  addEventListener("resize", later);
  addEventListener("ch:storychange", later);
  addEventListener("load", later);
  later();
})();
/* Home arrows never cover words or controls. Where the middle of the bottom edge is taken, the arrow moves to a free corner; with no free spot it stays hidden (swipe, keys and the scene itself still lead on). */
(function () {
  const main = document.querySelector<HTMLElement>('#main[data-page="index"]');
  if (!main) return;
  const SIZE = 44, PAD = 6;
  const CONTROL = "a, button, input, select, textarea, summary, iframe, [role='tab'], [role='button']";
  function shown(el: Element) {
    return (el as HTMLElement).checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
  }
  /* The part of a rectangle that is not clipped away by a scrolling or hidden-overflow ancestor (null when none of it shows). */
  function shownPart(el: Element, q: DOMRect, scope: HTMLElement) {
    let l = q.left, t = q.top, r = q.right, b = q.bottom;
    for (let a = el.parentElement; a && a !== scope; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.overflowX === "visible" && cs.overflowY === "visible") continue;
      const c = a.getBoundingClientRect();
      if (cs.overflowX !== "visible") { l = Math.max(l, c.left); r = Math.min(r, c.right); }
      if (cs.overflowY !== "visible") { t = Math.max(t, c.top); b = Math.min(b, c.bottom); }
      if (r <= l || b <= t) return null;
    }
    return { left: l, top: t, right: r, bottom: b };
  }
  /* True when any words or control of the section show inside the box (viewport coordinates). */
  function taken(scope: HTMLElement, btn: HTMLElement, l: number, t: number) {
    const r = l + SIZE + PAD, b = t + SIZE + PAD, x = l - PAD, y = t - PAD;
    const hit = (el: Element, q: DOMRect) => {
      if (q.width <= 0 || q.height <= 0 || q.right <= x || q.left >= r || q.bottom <= y || q.top >= b) return false;
      const v = shownPart(el, q, scope);
      return !!v && v.right > x && v.left < r && v.bottom > y && v.top < b;
    };
    for (const el of scope.querySelectorAll<HTMLElement>(CONTROL)) {
      if (el === btn || btn.contains(el) || !shown(el)) continue;
      if ([...el.getClientRects()].some(q => hit(el, q))) return true;
    }
    const walk = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      const p = n.parentElement;
      if (!p || !n.nodeValue || !n.nodeValue.trim() || btn.contains(p) || p.closest("script,style,noscript")) continue;
      range.selectNodeContents(n);
      if ([...range.getClientRects()].some(q => hit(p, q)) && shown(p)) return true;
    }
    return false;
  }
  function place(btn: HTMLElement) {
    const scope = btn.closest<HTMLElement>("section");
    if (!scope) return;
    const r = btn.getBoundingClientRect();
    if (getComputedStyle(btn).display === "none" || r.width === 0 || r.bottom <= 0 || r.top >= innerHeight) return;
    const cx = r.left + SIZE / 2 - (parseFloat(btn.style.getPropertyValue("--sn-x")) || 0);
    const vw = document.documentElement.clientWidth;
    /* centre first, then the right corner, then the left corner */
    let spot: number | null = null;
    for (const target of [cx, vw - 16 - SIZE / 2, 16 + SIZE / 2]) {
      if (!taken(scope, btn, target - SIZE / 2, r.top)) { spot = target; break; }
    }
    const x = spot === null || spot === cx ? "" : Math.round(spot - cx) + "px";
    if (btn.style.getPropertyValue("--sn-x") !== x) btn.style.setProperty("--sn-x", x);
    btn.classList.toggle("sn-off", spot === null);
    btn.tabIndex = spot === null ? -1 : 0;
  }
  let frame = 0, settle = 0;
  function sync() {
    frame = 0;
    main!.querySelectorAll<HTMLElement>(".sec-next:not([data-hv-skip])").forEach(place);
  }
  function later() {
    if (!frame) frame = requestAnimationFrame(sync);
    clearTimeout(settle);
    settle = window.setTimeout(function () { sync(); settle = window.setTimeout(sync, 700); }, 450);
  }
  /* Scenes and their panels move without a scroll event, so an arrow on screen is judged again at once when it moves, and every half second otherwise. */
  const lastTop = new WeakMap<HTMLElement, number>();
  let tick = 0;
  window.setInterval(function () {
    if (document.hidden) return;
    tick++;
    main!.querySelectorAll<HTMLElement>(".sec-next:not([data-hv-skip])").forEach(function (btn) {
      const r = btn.getBoundingClientRect();
      const top = Math.round(r.top);
      const moved = lastTop.get(btn) !== top;
      lastTop.set(btn, top);
      if (r.bottom > 0 && r.top < innerHeight && (moved || tick % 4 === 0)) place(btn);
    });
  }, 120);
  addEventListener("scroll", later, { passive: true });
  addEventListener("resize", later);
  addEventListener("load", later);
  addEventListener("ch:storychange", later);
  main.addEventListener("click", later);
  main.addEventListener("keyup", later);
  main.addEventListener("change", later);
  /* Panels slide and fade in after a move; the spot is judged again when they stop. */
  main.addEventListener("transitionend", later, true);
  main.addEventListener("animationend", later, true);
  later();
})();
/* Event lists on the home page end on a whole row: the box is trimmed to the rows that fit above the arrow and caption, so no row is cut off at the bottom of the screen (the rest scroll, rows snap into place). */
(function () {
  const main = document.querySelector<HTMLElement>('#main[data-page="index"]');
  if (!main) return;
  const RESERVE = 56;
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
  window.setInterval(function () { if (!document.hidden) sweep(); }, 300);
  addEventListener("resize", function () { setTimeout(sweep, 60); });
  sweep();
})();
