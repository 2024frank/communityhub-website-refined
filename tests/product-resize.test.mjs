import {before,test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';
let source;
before(()=>{
 const ast=ts.createSourceFile('pages_home6.ts',readFileSync('src/scripts/pages_home6.ts','utf8'),ts.ScriptTarget.Latest,true);
 let found;function visit(n){if(ts.isFunctionDeclaration(n)&&n.name?.text==='relocated')found=n.getText(ast);ts.forEachChild(n,visit);}visit(ast);assert.ok(found);
 source=ts.transpileModule(found,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.None}}).outputText;
});
test('resize restores the selected product rather than its old narrow reading-part index',()=>{
 const panels=[0,1,2].map(()=>({closest(){return this;},contains(){return false;}}));
 const owner={querySelector:()=>({}),querySelectorAll:()=>panels,contains:()=>false};
 const frames=panels.map((_,i)=>({y:i*600,els:[owner],part:i}));
 const context={list:frames,document:{activeElement:null},HTMLElement:class{},getComputedStyle:()=>({position:'sticky'})};
 runInNewContext(`${source}\nthis.relocate=relocated;`,context);
 const restored=context.relocate({y:800,els:[owner],part:0,anchor:panels[2]});
 assert.equal(restored,frames[2]);
 assert.equal(restored.anchor,panels[2]);
});

test('a focused product tab cannot replace the selected product resize anchor',()=>{
 class Element {}
 const focused=new Element();focused.closest=()=>null;
 const panels=[0,1,2].map(()=>({closest(){return this;},contains(){return false;}}));
 const owner={querySelector:()=>({}),querySelectorAll:()=>panels,contains:()=>true};
 const frames=panels.map((_,i)=>({y:i*600,els:[owner],part:i}));
 const context={list:frames,document:{activeElement:focused},HTMLElement:Element,getComputedStyle:()=>({position:'sticky'})};
 runInNewContext(`${source}\nthis.relocate=relocated;`,context);
 const restored=context.relocate({y:800,els:[owner],part:0,anchor:panels[2]});
 assert.equal(restored,frames[2]);
});
