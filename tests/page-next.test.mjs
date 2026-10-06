import {before,test} from 'node:test';
import assert from 'node:assert/strict';
import {runInNewContext} from 'node:vm';
import {build} from 'vite';

let script;
before(async()=>{
 const result=await build({configFile:false,logLevel:'silent',build:{write:false,minify:false,lib:{entry:'src/scripts/page_next.ts',formats:['iife'],name:'PageNext'}}});
 script=(Array.isArray(result)?result[0]:result).output[0].code;
});

function page({story=true,hero=false,height=3000,stops=[0,800,1600]}={}) {
 class Element {
  attributes=new Map();events=new Map();children=[];style={};hidden=false;scrollHeight=height;offsetHeight=80;className='';
  classList={values:new Set(),contains(name){return this.values.has(name);},add(name){this.values.add(name);}};
  setAttribute(name,value){this.attributes.set(name,value);}
  getAttribute(name){return this.attributes.get(name);}
  addEventListener(type,callback){const list=this.events.get(type)||[];list.push(callback);this.events.set(type,list);}
  emit(type,event={}){for(const callback of this.events.get(type)||[])callback(event);}
  appendChild(child){this.children.push(child);}
  contains(child){return this.children.includes(child);}
  matches(selector){return selector==='.hv'&&this.className==='hv';}
 }
 const document=new Element(),body=new Element(),main=new Element(),menu=new Element(),header=new Element(),section=new Element(),footer=new Element();
 section.className=hero?'hv':'';menu.hidden=true;document.body=body;document.documentElement=new Element();
 let overlay=null,current=0,queue=[],observers=[];
 document.getElementById=id=>({main,mnav:menu,hdr:header}[id]||null);
 document.createElement=()=>new Element();
 document.querySelector=selector=>selector==='body > .global-page-next'?body.children.find(el=>el.className==='global-page-next')||null:overlay;
 const calls=[],scrolls=[];
 const window=new Element();window.scrollY=0;window.innerHeight=800;
 const frames=stops.map((y,index)=>({y,els:[index===stops.length-1?footer:section],part:index}));
 if(story) window.chStory={
  frames:()=>frames,
  current:()=>frames[current],
  go(direction,advance){
   calls.push([direction,advance]);
   if(hero&&!section.classList.contains('intro-peek')){section.classList.add('intro-peek');return true;}
   if(current>=frames.length-1)return false;
   current++;window.scrollY=frames[current].y;window.emit('ch:storychange');return true;
  },
 };
 window.scrollTo=options=>{scrolls.push(options);window.scrollY=Math.min(options.top,height-window.innerHeight);window.emit('scroll');};
 class Observer {constructor(callback){observers.push(callback);}observe(){}}
 const context={document,window,requestAnimationFrame:callback=>{queue.push(callback);return queue.length;},MutationObserver:Observer,ResizeObserver:Observer};
 function run(){runInNewContext(script,context);flush();}
 function flush(){const work=queue;queue=[];work.forEach(callback=>callback());}
 function mutation(target=body){observers.forEach(callback=>callback([{target}]));flush();}
 run();
 const button=body.children[0];
 return {button,body,menu,header,document,window,frames,calls,scrolls,run,flush,mutation,
  click(){button.emit('click');flush();},
  overlay(value){overlay=value?new Element():null;mutation();},
  position(index){current=index;window.scrollY=frames[index].y;window.emit('ch:storychange');flush();},
 };
}

test('creates one native labelled button and retains it across repeated initialization',()=>{
 const p=page();assert.equal(p.button.type,'button');assert.equal(p.button.getAttribute('aria-label'),'Next section');
 assert.match(p.button.innerHTML,/aria-hidden="true"/);assert.equal(p.button.hidden,false);
 p.run();assert.equal(p.body.children.length,1);
});

test('each immediate activation delegates one deliberate action to the story controller',()=>{
 const p=page();p.click();p.click();assert.deepEqual(p.calls,[[1,true],[1,true]]);
 assert.equal(p.scrolls.length,0);assert.equal(p.window.scrollY,1600);
});

test('the first hero activation can reveal people without hiding the next action',()=>{
 const p=page({hero:true});p.click();assert.equal(p.window.scrollY,0);assert.equal(p.button.hidden,false);
 p.click();assert.equal(p.window.scrollY,800);assert.deepEqual(p.calls,[[1,true],[1,true]]);
});

test('hides only at the final destination and returns when an earlier scene is active',()=>{
 const p=page();p.position(1);assert.equal(p.button.hidden,false);p.position(2);assert.equal(p.button.hidden,true);
 p.click();assert.equal(p.calls.length,0);p.position(0);assert.equal(p.button.hidden,false);
});

test('menus and modals hide the control and block clicks before a queued update',()=>{
 const p=page();p.menu.hidden=false;p.button.emit('click');assert.equal(p.calls.length,0);
 p.mutation(p.menu);assert.equal(p.button.hidden,true);
 p.menu.hidden=true;p.mutation(p.menu);assert.equal(p.button.hidden,false);
 p.overlay(true);assert.equal(p.button.hidden,true);p.click();assert.equal(p.calls.length,0);
 p.overlay(false);assert.equal(p.button.hidden,false);
 p.body.style.overflow='hidden';p.mutation();assert.equal(p.button.hidden,true);
 p.body.style.overflow='';p.mutation();assert.equal(p.button.hidden,false);
});

test('ordinary pages use an immediate viewport step and hide at the actual bottom',()=>{
 const p=page({story:false,height:1800});p.click();assert.equal(p.scrolls[0].top,720);assert.equal(p.scrolls[0].behavior,'instant');
 p.click();assert.equal(p.window.scrollY,1000);assert.equal(p.button.hidden,true);
});

test('a story refusal never falls through to unrelated document scrolling',()=>{
 const p=page();p.window.chStory.go=()=>false;p.click();assert.equal(p.scrolls.length,0);
});

test('content fitting refreshes destination availability without creating another control',()=>{
 const p=page();p.position(2);assert.equal(p.button.hidden,true);
 p.frames.push({y:2400,els:[],part:3});p.window.emit('ch:fit');p.flush();
 assert.equal(p.button.hidden,false);assert.equal(p.body.children.length,1);
});
