import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
const text=await readFile('src/scripts/ui/viewport-tool.ts','utf8');
const js=ts.transpileModule(text,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const {availableToolRoom,availableVoicesStage,phoneToolReserve}=await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
test('live view reserves its recovery and navigation space',()=>assert.equal(availableToolRoom(757,340,108),309));
test('community category region stays inside a narrow scene',()=>assert.equal(availableToolRoom(606,325,92),189));
test('bounds stay useful on tall and extremely short windows',()=>{assert.equal(availableToolRoom(1600,200,92),680);assert.equal(availableToolRoom(300,250,92),80)});

test('landscape voices reserve their complete category row before fitting the display',()=>{
 assert.equal(availableVoicesStage(399,90),299);
 assert.equal(availableVoicesStage(560,90),460);
});
test('extremely short windows keep a readable display with explicit internal scrolling',()=>{
 assert.equal(availableVoicesStage(200,90),240);
});
test('phone lessons retain multiple readable results when the initial remaining room is only98px',()=>{
 assert.equal(availableToolRoom(844,590,156,220),220);
 assert.equal(availableToolRoom(740,650,156,220),220);
 assert.equal(availableToolRoom(844,350,156,220),338);
});
test('phone Voices reserves the whole recovery button and safe-area navigation surface',()=>{
 const reserve=phoneToolReserve(44,20,0);
 const room=availableToolRoom(844,387,reserve);
 assert.equal(room,305);
 assert.ok(387+room+44+20<=844-80-8);
 const safeReserve=phoneToolReserve(66,20,34);
 assert.equal(availableToolRoom(844,387,safeReserve),249);
});
