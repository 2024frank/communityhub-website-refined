import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';
const source=ts.createSourceFile('pages_home6.ts',readFileSync('src/scripts/pages_home6.ts','utf8'),ts.ScriptTarget.Latest,true);
let method,layoutUnit;
function visit(node){if(ts.isFunctionDeclaration(node)&&node.name?.text==='splitAt')method=node.getText(source);if(ts.isFunctionDeclaration(node)&&node.name?.text==='layoutUnit')layoutUnit=node.getText(source);ts.forEachChild(node,visit)}
visit(source);assert.ok(method);
const js=ts.transpileModule(layoutUnit+'\n'+method,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}}).outputText;
function stops({bottom,ownerHeight=904,sticky=false,viewport=757,bottomInset=0,end=ownerHeight-viewport+bottomInset,closedBody=false}){
 const unit={top:bottom-24,offsetHeight:24,getClientRects:()=>[{}],matches:()=>true};
 const hidden=closedBody?{top:1000,offsetHeight:120,getClientRects:()=>[{}],matches:()=>true,parentElement:{closest:()=>({querySelector:()=>({contains:()=>false})})}}:null;
 const owner={top:0,offsetHeight:ownerHeight,querySelectorAll:()=>hidden?[unit,hidden]:[unit],querySelector:()=>sticky?{sticky:true}:null};
 const context={window:{innerHeight:viewport},NEAR:24,UNITS:'p',BLOCKS:'article',absTop:el=>el.top,getComputedStyle:el=>({position:el.sticky?'sticky':'static'})};
 runInNewContext(js+';this.splitAt=splitAt;',context);
 return Array.from(context.splitAt(owner,0,end,viewport-bottomInset-77,77));
}
test('a real final directory tail remains reachable even below quarter-screen threshold',()=>{
 assert.deepEqual(stops({bottom:885}),[147]);
});
test('extra bottom padding does not create a continuation when actual content already fits',()=>{
 assert.deepEqual(stops({bottom:740}),[]);
});
test('intentional sticky tracks retain their small-stop suppression',()=>{
 assert.deepEqual(stops({bottom:885,sticky:true}),[]);
});
test('phone navigation surface cannot swallow the final product links',()=>{
 const tail=stops({bottom:845,ownerHeight:900,viewport:844,bottomInset:76});
 assert.ok(tail.length,'A continuation is needed even though the links fit behind the bottom surface');
 for(const [top,bottom] of [[749,797],[797,845]]) {
  assert.ok([0,...tail].some(y=>top-y>=77&&bottom-y<=768),'Each complete link is visible above the navigation surface at a reading stop');
 }
});
test('a phone mail link and the full final explanatory paragraph remain reachable',()=>{
 for(const [top,bottom,ownerHeight] of [[813,837,880],[843,939,960]]) {
  const tail=stops({bottom,ownerHeight,viewport:844,bottomInset:76});
  assert.ok([0,...tail].some(y=>top-y>=77&&bottom-y<=768),'The complete tail belongs to a readable stop before navigation leaves its owner');
 }
});
test('phone safe-area reserve keeps tail content above the larger navigation surface',()=>{
 const tail=stops({bottom:837,ownerHeight:900,viewport:844,bottomInset:110});
 assert.ok(tail.length);
 assert.ok(837-tail.at(-1)<=734);
});
test('phone clearance is not discarded as eight pixels of tolerated overflow',()=>{
 const tail=stops({bottom:768,ownerHeight:804,viewport:844,bottomInset:84});
 assert.ok(tail.length);
 assert.ok(768-tail.at(-1)<=760);
});
test('closed disclosure body rectangles do not create false reading stops',()=>{
 assert.deepEqual(stops({bottom:700,ownerHeight:800,viewport:844,bottomInset:84,closedBody:true}),[]);
});
test('a genuine short phone tail must exceed the navigation proximity threshold',()=>{
 const tail=stops({bottom:781.58,ownerHeight:782,viewport:844,bottomInset:84});
 assert.ok(tail.length);
 assert.ok(tail[0]>24,'The forward gesture must be able to select the continuation');
 assert.ok(781.58-tail.at(-1)<=760,'The entire About listing is clear of the bottom surface');
});
test('other visible phone destination tails fit above the reserved surface',()=>{
 for(const [bottom,ownerHeight] of [[798.2,844],[826,844]]) {
  const tail=stops({bottom,ownerHeight,viewport:844,bottomInset:84});
  assert.ok(tail.some(y=>y>24&&bottom-y<=760),'Live-dashboard and gallery links must be reachable before leaving their owner');
 }
});
