import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const code = ts.transpile(await readFile(new URL('../src/scripts/ui/scrollbar-geometry.ts', import.meta.url), 'utf8'), {target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022});
const {scrollbarGeometry,scrollOffsetAt} = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
test('scrollbar endpoints match the actual scroller rather than page scroll',()=>{
 const top=scrollbarGeometry(400,1600,392,0),bottom=scrollbarGeometry(400,1600,392,1200);
 assert.equal(top.position,0);assert.equal(bottom.position,bottom.travel);
 assert.equal(scrollOffsetAt(bottom.position,bottom.maximum,bottom.travel),1200);
});
test('thumb remains reachable with very long embedded content',()=>{
 const g=scrollbarGeometry(300,8000,292,3850);
 assert.equal(g.thumb,44);assert.equal(g.position,g.travel/2);
 assert.equal(scrollOffsetAt(g.position,g.maximum,g.travel),3850);
});
test('short content disables travel without division by zero',()=>{
 for(const content of [0,200,400]){
  const g=scrollbarGeometry(400,content,392,0);
  assert.equal(g.maximum,0);assert.equal(g.travel,0);assert.equal(g.position,0);
  assert.equal(scrollOffsetAt(70,g.maximum,g.travel),0);
 }
});
test('dragging beyond rail boundaries clamps to the dashboard endpoints',()=>{
 const g=scrollbarGeometry(400,1600,392,0);
 assert.equal(scrollOffsetAt(-100,g.maximum,g.travel),0);
 assert.equal(scrollOffsetAt(1000,g.maximum,g.travel),1200);
});
