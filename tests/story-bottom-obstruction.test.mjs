import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import ts from 'typescript';

const source=ts.createSourceFile('pages_home6.ts',readFileSync('src/scripts/pages_home6.ts','utf8'),ts.ScriptTarget.Latest,true);
const methods=new Map();let focusHandler;
(function visit(node){
 if(ts.isFunctionDeclaration(node)&&['readingBottom','frameForElement'].includes(node.name?.text)) methods.set(node.name.text,node.getText(source));
 if(ts.isCallExpression(node)&&node.expression.getText(source)==='document.addEventListener'&&
    ts.isStringLiteral(node.arguments[0])&&node.arguments[0].text==='focusin'&&node.arguments[1].getText(source).includes('frameForElement')) focusHandler=node.arguments[1].getText(source);
 ts.forEachChild(node,visit);
})(source);
assert.equal(methods.size,2);assert.ok(focusHandler);
const js=ts.transpileModule([...methods.values(),`this.focusHandler=${focusHandler};`].join('\n'),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText;

function fixture({width=390,height=844,safeArea=0,positions=[0,100],controlTop=797,controlHeight=48,footer=false,nav=true}={}) {
 const window={innerWidth:width,innerHeight:height,scrollY:0};
 class Element {
  constructor(top=0,height=0){this.top=top;this.offsetHeight=height;}
  getBoundingClientRect(){return {top:this.top-window.scrollY,bottom:this.top+this.offsetHeight-window.scrollY,height:this.offsetHeight};}
 }
 const control=new Element(controlTop,controlHeight);
 const owner={contains:element=>element===control};
 const main={contains:element=>!footer&&element===control};
 const foot={contains:element=>footer&&element===control};
 const next={};const cuts=[];
 const frames=positions.map(y=>({y,els:[owner]}));
 const context={window,HTMLElement:Element,main,foot,headerHeight:77,
  document:{querySelector:()=>nav?next:null},getComputedStyle:()=>({height:'52px',bottom:`${12+safeArea}px`}),
  absTop:element=>element.top,frames:()=>frames,
  cutTo:y=>{window.scrollY=y;cuts.push(y);}};
 runInNewContext(js,context);
 return {context,control,cuts,frames,owner,window,focus:()=>context.focusHandler({target:control})};
}

test('phone usable bottom includes the navigation button and resolved safe area',()=>{
 assert.equal(fixture().context.readingBottom(),760);
 assert.equal(fixture({safeArea:34}).context.readingBottom(),726);
});
test('desktop and a page without the global navigation surface retain full viewport height',()=>{
 assert.equal(fixture({width:700}).context.readingBottom(),844);
 assert.equal(fixture({width:1280}).context.readingBottom(),844);
 assert.equal(fixture({nav:false}).context.readingBottom(),844);
});
test('Tab reveals the whole masked phone product link at a same-owner reading stop',()=>{
 const f=fixture();f.focus();
 assert.deepEqual(f.cuts,[100]);
 assert.equal(f.control.getBoundingClientRect().bottom,745);
 assert.equal(f.frames[1].anchor,f.control);
 assert.equal(f.frames[1].els[0],f.owner);
});
test('a partially masked phone link is also fully revealed',()=>{
 const f=fixture({controlTop:749,controlHeight:48,positions:[0,80]});f.focus();
 assert.deepEqual(f.cuts,[80]);
});
test('keyboard reveal covers footer mail links as well as main content',()=>{
 const f=fixture({footer:true,controlTop:813,controlHeight:24,positions:[0,84]});f.focus();
 assert.deepEqual(f.cuts,[84]);
 assert.ok(f.control.getBoundingClientRect().bottom<=f.context.readingBottom());
});
test('visible controls do not scroll and desktop focus remains unchanged',()=>{
 const phone=fixture({controlTop:130});phone.focus();assert.deepEqual(phone.cuts,[]);
 const desktop=fixture({width:1280,height:900});desktop.focus();assert.deepEqual(desktop.cuts,[]);
});
test('focus reveal stays within the matching authored scene',()=>{
 const f=fixture({positions:[0,100,150]});
 const correct={contains:element=>element===f.control};
 const other={contains:()=>false};
 f.frames[0].scene=correct;f.frames[1].scene=correct;f.frames[2].scene=other;
 f.focus();assert.deepEqual(f.cuts,[100]);
});
