import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

let goSource, wheelSource;
before(() => {
  // Parse the actual controller and compile its two decision boundaries in
  // memory. No browser, production build or generated runtime is needed.
  const source = ts.createSourceFile('pages_home6.ts', readFileSync('src/scripts/pages_home6.ts', 'utf8'), ts.ScriptTarget.Latest, true);
  let go, wheel;
  function visit(node) {
    if (ts.isFunctionDeclaration(node) && node.name?.text === 'go') go = node.getText(source);
    if (ts.isCallExpression(node) && node.expression.getText(source) === 'window.addEventListener' &&
        ts.isStringLiteral(node.arguments[0]) && node.arguments[0].text === 'wheel') wheel = node.arguments[1].getText(source);
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.ok(go && wheel, 'The production navigation and wheel handlers must exist');
  const compile = text => ts.transpileModule(text, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
  goSource = compile(go);
  wheelSource = compile(`const handleWheel = ${wheel};`);
});

function controller() {
  let now = 1000;
  let stops = [0, 720, 1440, 2160].map((y, index) => ({ y, els: [{ id: `scene-${index}` }] }));
  let pendingMeasure = null;
  const cuts = [];
  const window = { scrollY: 0, innerHeight: 800, dispatchEvent() {} };
  const context = {
    window, performance: { now: () => now },
    home: null, NEAR: 24, publicRequest: null, initialHashPending: false,
    blocked: () => false,
    current: () => stops.reduce((best, frame) => Math.abs(frame.y - window.scrollY) < Math.abs(best.y - window.scrollY) ? frame : best),
    frames: () => { if (pendingMeasure) { const measure = pendingMeasure; pendingMeasure = null; measure(); } return stops; },
    // cutTo's side effect is the browser's instant position change. Decision
    // logic, coalescing and wheel ownership are the production functions above.
    cutTo: y => { window.scrollY = y; cuts.push(y); context.publicRequest = null; },
    cancel: () => { context.publicRequest = null; },
    resetGesture: () => {
      context.lastWheel = -Infinity; context.wheelDirection = 0; context.intent = 0;
      context.consumed = false; context.nestedWheel = false;
    },
    eventElement: event => event.target,
    innerScroller: target => !!target?.canScroll,
    headerHeight: 80, WHEEL_QUIET: 260, WHEEL_HOLD: 450,
    lastWheel: -Infinity, wheelDirection: 0, intent: 0,
    consumed: false, triggeredAt: 0, nestedWheel: false,
  };
  runInNewContext(`${goSource}\n${wheelSource}\nthis.go = go; this.wheel = handleWheel;`, context);
  return {
    window, context, cuts,
    go: (...args) => context.go(...args),
    advance: ms => { now += ms; },
    pendingLayout: (positions, relocatedY) => {
      pendingMeasure = () => {
        stops = positions.map((y, index) => ({ ...stops[index], y }));
        window.scrollY = relocatedY;
      };
    },
    wheel: ({ delay = 0, deltaY = 90, target = null, ...options } = {}) => {
      now += delay;
      const event = { timeStamp: now, deltaY, deltaX: 0, deltaMode: 0, target,
        defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...options };
      context.wheel(event);
      return event;
    },
  };
}

test('downward navigation uses the relocated scene position after pending layout', () => {
  const c = controller(); c.window.scrollY = 720;
  c.pendingLayout([0, 900, 1620, 2340], 900);
  c.go(1, true);
  assert.deepEqual(c.cuts, [1620], 'The gesture must leave the remeasured current scene, not land on it again');
});

test('upward navigation uses the relocated scene position after pending layout', () => {
  const c = controller(); c.window.scrollY = 1440;
  c.pendingLayout([0, 540, 1260, 1980], 1260);
  c.go(-1, true);
  assert.deepEqual(c.cuts, [540], 'A shorter earlier scene must not turn Back into a dead gesture');
});

test('a consumed wheel tail cannot begin scrolling a newly revealed nested control', () => {
  const c = controller();
  assert.equal(c.wheel().defaultPrevented, true);
  assert.equal(c.window.scrollY, 720);
  const tail = c.wheel({ delay: 40, deltaY: 50, target: { canScroll: true } });
  assert.equal(tail.defaultPrevented, true, 'The remainder of the page gesture still belongs to that page gesture');
  assert.deepEqual(c.cuts, [720]);
});

test('fresh input over a nested control remains native after the page latch expires', () => {
  const c = controller(); c.wheel();
  const fresh = c.wheel({ delay: 600, target: { canScroll: true } });
  assert.equal(fresh.defaultPrevented, false);
  assert.deepEqual(c.cuts, [720]);
});

test('a nested gesture retains its tail at the boundary then hands a fresh gesture to the page', () => {
  const c = controller();
  assert.equal(c.wheel({ target: { canScroll: true } }).defaultPrevented, false);
  assert.equal(c.wheel({ delay: 40, target: { canScroll: false } }).defaultPrevented, true);
  assert.deepEqual(c.cuts, []);
  assert.equal(c.wheel({ delay: 600, target: { canScroll: false } }).defaultPrevented, true);
  assert.deepEqual(c.cuts, [720]);
});

test('long inertia, renewed impulses and reversals still yield one cut per gesture', () => {
  const c = controller();
  for (const [delay, deltaY] of [[0, 90], [80, 60], [160, 40], [120, 10], [180, -60], [100, 90]]) {
    assert.equal(c.wheel({ delay, deltaY }).defaultPrevented, true);
  }
  assert.deepEqual(c.cuts, [720]);
  c.wheel({ delay: 600, deltaY: -90 });
  assert.deepEqual(c.cuts, [720, 0]);
});

test('zoom, horizontal wheel and already handled input keep their native ownership', () => {
  const c = controller();
  for (const options of [{ ctrlKey: true }, { deltaX: 120 }, { shiftKey: true }]) {
    assert.equal(c.wheel(options).defaultPrevented, false);
  }
  c.wheel({ defaultPrevented: true });
  assert.deepEqual(c.cuts, []);
});

test('public duplicate requests coalesce while intentional later gestures can continue', () => {
  const c = controller();
  c.go(1); c.advance(100); c.go(1);
  assert.deepEqual(c.cuts, [720]);
  c.go(1, true);
  assert.deepEqual(c.cuts, [720, 1440]);
});

test('a public scene advance releases any older pending startup hash', () => {
  const c = controller(); c.context.initialHashPending = true;
  c.go(1);
  assert.equal(c.context.initialHashPending, false);
  assert.deepEqual(c.cuts, [720]);
});

test('a blocked navigation request does not consume startup ownership', () => {
  const c = controller(); c.context.initialHashPending = true; c.context.blocked = () => true;
  assert.equal(c.go(1), false);
  assert.equal(c.context.initialHashPending, true);
  assert.deepEqual(c.cuts, []);
});
