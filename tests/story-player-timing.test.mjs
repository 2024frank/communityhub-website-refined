import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { build } from 'vite';

let script;
before(async () => {
  // Bundle the real shared controller in memory; do not write a site build.
  const result = await build({ configFile: false, logLevel: 'silent', build: { write: false, minify: false, lib: { entry: 'src/scripts/base.ts', formats: ['iife'], name: 'StoryPlayer' } } });
  script = (Array.isArray(result) ? result[0] : result).output[0].code;
});

// Browser primitives and a deterministic clock only: all timing decisions and
// event handlers are supplied by the production [data-story] controller.
function gallery({ reduced = false, observer = true, initiallyVisible = true } = {}) {
  class Element {
    children = []; attrs = new Map(); events = new Map(); hidden = false; content = '';
    classList = { values: new Set(), add(...names) { names.forEach(n => this.values.add(n)); }, remove(...names) { names.forEach(n => this.values.delete(n)); }, contains(name) { return this.values.has(name); }, toggle(name, on) { if (on) this.values.add(name); else this.values.delete(name); } };
    addEventListener(type, callback) { const list = this.events.get(type) || []; list.push(callback); this.events.set(type, list); }
    emit(type, event = {}) { for (const callback of this.events.get(type) || []) callback(event); }
    setAttribute(name, value) { this.attrs.set(name, value); }
    getAttribute(name) { return this.attrs.get(name) ?? null; }
    contains(element) { return element === this || this.children.some(child => child.contains(element)); }
    querySelector(selector) { return this.queries?.[selector] || null; }
    querySelectorAll(selector) { return this.lists?.[selector] || []; }
    get textContent() { return this.content.replace(/<[^>]*>/g, ''); }
    set textContent(value) { this.content = value; }
    get innerHTML() { return this.content; }
    set innerHTML(value) { this.content = value; }
  }
  const box = new Element(), play = new Element(), previous = new Element(), next = new Element(), count = new Element();
  const slides = [new Element(), new Element(), new Element()];
  const dots = slides.map(() => new Element());
  box.children = [...slides, ...dots, play, previous, next, count];
  box.queries = { '[data-sp-pause]': play, '[data-sp-prev]': previous, '[data-sp-next]': next, '[data-sp-count]': count };
  box.lists = { '.sp-slide': slides, '.sp-dots button': dots };
  play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
  const document = new Element(); document.hidden = false; document.activeElement = null; document.documentElement = new Element(); document.lists = { '[data-story]': [box] };
  const media = new Element(); media.matches = reduced;
  let now = 0, id = 0;
  const jobs = new Map(), observers = new Map();
  const setTimeout = (callback, delay) => { const key = ++id; jobs.set(key, { at: now + delay, callback }); return key; };
  const setInterval = (callback, delay) => { const key = ++id; jobs.set(key, { at: now + delay, callback, interval: delay }); return key; };
  const clearTimer = key => jobs.delete(key);
  class IntersectionObserver { constructor(callback) { this.callback = callback; } observe(element) { observers.set(element, this.callback); } }
  const window = { matchMedia: () => media, setTimeout, setInterval, clearTimeout: clearTimer, clearInterval: clearTimer };
  if (observer) window.IntersectionObserver = IntersectionObserver;
  runInNewContext(script, { document, HTMLElement: Element, Element, Node: Element, matchMedia: () => media, performance: { now: () => now }, clearTimeout: clearTimer, clearInterval: clearTimer, IntersectionObserver, window, console: { warn(...args) { assert.fail(`Controller warning: ${args.join(' ')}`); } } });
  function advance(ms) {
    const end = now + ms;
    while (true) {
      const entry = [...jobs].sort((a, b) => a[1].at - b[1].at)[0];
      if (!entry || entry[1].at > end) break;
      now = entry[1].at;
      if (entry[1].interval) entry[1].at += entry[1].interval;
      else jobs.delete(entry[0]);
      entry[1].callback();
    }
    now = end;
  }
  function visible(on, ratio = on ? 1 : 0) { observers.get(box)?.([{ isIntersecting: on, intersectionRatio: ratio }]); }
  function focus(on, target = play) { document.activeElement = on ? target : null; box.emit(on ? 'focusin' : 'focusout', { relatedTarget: document.activeElement }); }
  function hidden(on) { document.hidden = on; document.emit('visibilitychange'); }
  function reducedMotion(on) { media.matches = on; media.emit('change'); }
  const current = () => slides.findIndex(s => !s.hidden);
  if (initiallyVisible) visible(true);
  return { box, play, previous, next, dots, count, document, advance, visible, focus, hidden, reducedMotion, current };
}

test('gallery explicit pause preserves the picture and remaining interval', () => {
  const c = gallery(); c.advance(1700); c.play.emit('click'); c.advance(20000);
  assert.equal(c.current(), 0);
  c.play.emit('click'); c.advance(2499); assert.equal(c.current(), 0);
  c.advance(1); assert.equal(c.current(), 1);
});

test('gallery pointer pause resumes at the exact remaining millisecond', () => {
  const c = gallery(); c.advance(1200); c.box.emit('pointerenter'); c.advance(9500);
  assert.equal(c.current(), 0);
  c.box.emit('pointerleave'); c.advance(2999); assert.equal(c.current(), 0);
  c.advance(1); assert.equal(c.current(), 1);
});

test('gallery focus pause resumes at the exact remaining millisecond', () => {
  const c = gallery(); c.advance(1200); c.focus(true); c.advance(9500);
  assert.equal(c.current(), 0);
  c.focus(false); c.advance(2999); assert.equal(c.current(), 0);
  c.advance(1); assert.equal(c.current(), 1);
});

for (const releaseFirst of ['pointer', 'focus']) {
  test(`gallery overlapping pointer and focus pauses remain held after releasing ${releaseFirst}`, () => {
    const c = gallery(); c.advance(1500); c.box.emit('pointerenter'); c.focus(true); c.advance(8500);
    if (releaseFirst === 'pointer') c.box.emit('pointerleave'); else c.focus(false);
    c.advance(8500); assert.equal(c.current(), 0);
    if (releaseFirst === 'pointer') c.focus(false); else c.box.emit('pointerleave');
    c.advance(2699); assert.equal(c.current(), 0); c.advance(1); assert.equal(c.current(), 1);
  });
}

test('gallery focus moving between controls never releases the hold', () => {
  const c = gallery(); c.advance(1000); c.focus(true);
  c.box.emit('focusout', { relatedTarget: c.next }); c.focus(true, c.next);
  c.advance(10000); assert.equal(c.current(), 0);
  c.focus(false); c.advance(3199); assert.equal(c.current(), 0); c.advance(1); assert.equal(c.current(), 1);
});

test('gallery offscreen and hidden-tab pauses preserve accumulated elapsed time', () => {
  const c = gallery(); c.advance(1200); c.visible(false); c.advance(10000); c.visible(true);
  c.advance(500); c.hidden(true); c.advance(10000); c.hidden(false);
  c.advance(2499); assert.equal(c.current(), 0); c.advance(1); assert.equal(c.current(), 1);
});

test('gallery explicit pause remains set when all automatic holds clear', () => {
  const c = gallery(); c.advance(1000); c.play.emit('click');
  c.box.emit('pointerenter'); c.focus(true); c.visible(false); c.hidden(true); c.advance(10000);
  c.box.emit('pointerleave'); c.focus(false); c.visible(true); c.hidden(false); c.advance(10000);
  assert.equal(c.current(), 0);
  c.play.emit('click'); c.advance(3199); assert.equal(c.current(), 0); c.advance(1); assert.equal(c.current(), 1);
});

test('gallery manual next, previous and dot selections reset the selected picture duration', () => {
  const c = gallery(); c.advance(1700); c.next.emit('click'); assert.equal(c.current(), 1);
  c.advance(4199); assert.equal(c.current(), 1); c.advance(1); assert.equal(c.current(), 2);
  c.play.emit('click'); c.previous.emit('click'); assert.equal(c.current(), 1);
  c.advance(10000); assert.equal(c.current(), 1); c.play.emit('click');
  c.advance(4199); assert.equal(c.current(), 1); c.advance(1); assert.equal(c.current(), 2);
  c.advance(1000); c.dots[0].emit('click'); assert.equal(c.current(), 0);
  assert.equal(c.count.textContent, '1 / 3'); assert.equal(c.dots[0].getAttribute('aria-current'), 'true');
  c.advance(4199); assert.equal(c.current(), 0); c.advance(1); assert.equal(c.current(), 1);
});

test('gallery waits for visibility and starts each automatic picture with a full duration', () => {
  const c = gallery({ initiallyVisible: false }); c.advance(10000); assert.equal(c.current(), 0);
  c.visible(true); c.advance(4199); assert.equal(c.current(), 0); c.advance(1); assert.equal(c.current(), 1);
  c.advance(4199); assert.equal(c.current(), 1); c.advance(1); assert.equal(c.current(), 2);
});

test('gallery reduced motion disables automatic advance but preserves manual navigation', () => {
  const c = gallery({ reduced: true }); c.advance(20000); assert.equal(c.current(), 0);
  c.next.emit('click'); c.advance(20000); assert.equal(c.current(), 1);
});

test('gallery motion-preference changes immediately hold the current picture', () => {
  const c = gallery(); c.advance(1200); c.reducedMotion(true); c.advance(10000);
  assert.equal(c.current(), 0);
});

test('gallery can auto-advance when IntersectionObserver is unavailable', () => {
  const c = gallery({ observer: false }); c.advance(4199); assert.equal(c.current(), 0);
  c.advance(1); assert.equal(c.current(), 1);
});

test('gallery pause control stays icon-only with an accessible state and action', () => {
  const c = gallery(); c.play.emit('click');
  assert.equal(c.play.getAttribute('aria-pressed'), 'true'); assert.equal(c.play.getAttribute('aria-label'), 'Play slides');
  assert.match(c.play.innerHTML, /<svg[^>]*aria-hidden="true"/); assert.equal(c.play.textContent, '');
  c.play.emit('click');
  assert.equal(c.play.getAttribute('aria-pressed'), 'false'); assert.equal(c.play.getAttribute('aria-label'), 'Pause slides');
  assert.match(c.play.innerHTML, /<svg[^>]*aria-hidden="true"/); assert.equal(c.play.textContent, '');
});

test('gallery remains held while less than half of the picture is visible', () => {
  const c = gallery(); c.advance(1200); c.visible(true, 0.3); c.advance(10000);
  assert.equal(c.current(), 0);
  c.visible(true); c.advance(2999); assert.equal(c.current(), 0); c.advance(1); assert.equal(c.current(), 1);
});

test('gallery clearing reduced motion resumes its preserved remaining interval', () => {
  const c = gallery(); c.advance(1200); c.reducedMotion(true); c.advance(10000); c.reducedMotion(false);
  assert.equal(c.current(), 0); c.advance(2999); assert.equal(c.current(), 0); c.advance(1); assert.equal(c.current(), 1);
});
