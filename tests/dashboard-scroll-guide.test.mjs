import {before, test} from 'node:test';
import assert from 'node:assert/strict';
import {runInNewContext} from 'node:vm';
import {build} from 'vite';

let script;
before(async()=>{
 const result=await build({configFile:false,logLevel:'silent',build:{write:false,minify:false,lib:{entry:'src/scripts/dashboard_scroll_guide.ts',formats:['iife'],name:'DashboardScrollGuide'}}});
 script=(Array.isArray(result)?result[0]:result).output[0].code;
});

// Exercise the production controller with browser primitives and a deterministic
// clock. Scene ownership, geometry and input are controlled independently.
function guide({initiallyOwned=false,reduced=false,dynamic=false,horizontal=false}={}) {
 class Element {
  events=new Map(); attributes=new Map(); children=[]; parentElement=null;
  style={}; dataset={}; hidden=false; scrollTop=0; scrollLeft=0; clientHeight=360; scrollHeight=1500; clientWidth=340; scrollWidth=800;
  classList={values:new Set(),add(name){this.values.add(name);},remove(name){this.values.delete(name);},contains(name){return this.values.has(name);}};
  addEventListener(type,callback,options={}){const list=this.events.get(type)||[];list.push(callback);this.events.set(type,list);options.signal?.addEventListener('abort',()=>this.events.set(type,(this.events.get(type)||[]).filter(fn=>fn!==callback)),{once:true});}
  emit(type,event={}){for(const callback of this.events.get(type)||[])callback(event);}
  querySelector(selector){return this.queries?.[selector]||null;}
  setAttribute(name,value){this.attributes.set(name,value);}
  contains(element){return element===this||this.children.some(child=>child.contains(element));}
  getBoundingClientRect(){return {x:100,y:200,left:100,right:600,top:200,bottom:200+this.clientHeight,width:500,height:this.clientHeight};}
  closest(){return hiddenAncestor?section:null;}
  focus(){}
  setPointerCapture(){}
 }
 const body=new Element(),section=new Element(),otherSection=new Element(),root=new Element();
 const viewport=new Element(),canvas=new Element(),bar=new Element(),track=new Element(),thumb=new Element(),coach=new Element(),svg=new Element(),arm=new Element();
 root.dataset.scrollAxis=horizontal?'horizontal':'vertical';
 section.children=[root];section.parentElement=body;root.parentElement=section;root.children=[viewport,coach];
 root.queries={'.native-scroll':viewport,'.native-scroll-canvas':canvas,'.native-scrollbar':bar,'.native-scroll-track':track,'.native-scroll-thumb':thumb,'.native-scroll-coach':coach};
 coach.queries={svg};svg.queries={'[data-flash-arm]':arm};
 svg.getScreenCTM=()=>({inverse:()=>({})});svg.createSVGPoint=()=>({x:0,y:0,matrixTransform(){return {x:this.x,y:this.y};}});
 const transforms=[];
 arm.setAttribute=(name,value)=>{arm.attributes.set(name,value);if(name==='transform')transforms.push(value);};
 const document=new Element();document.body=body;document.hidden=false;document.querySelectorAll=()=>dynamic?[]:[root];document.getElementById=()=>null;
 const media=new Element();media.matches=reduced;
 let owned=initiallyOwned,hiddenAncestor=false,visibility='visible',scene=null,now=0,id=0;
 const jobs=new Map(),observers=[];
 const requestAnimationFrame=callback=>{const next=++id;jobs.set(next,{at:now+16,callback});return next;};
 const cancelAnimationFrame=key=>jobs.delete(key);
 const setTimeout=(callback,delay)=>{const next=++id;jobs.set(next,{at:now+delay,callback});return next;};
 const window=new Element();window.setTimeout=setTimeout;window.scrollY=200;window.scrollTo=({top})=>{window.scrollY=top;};
 window.chStory={current:()=>({els:[owned?section:otherSection],scene})};
 class Observer {constructor(callback){this.callback=callback;observers.push(callback);}observe(){}disconnect(){const i=observers.indexOf(this.callback);if(i>=0)observers.splice(i,1);}}
 const context={AbortController,document,window,innerHeight:800,innerWidth:1200,matchMedia:()=>media,performance:{now:()=>now},getComputedStyle:()=>({visibility}),requestAnimationFrame,cancelAnimationFrame,clearTimeout:cancelAnimationFrame,ResizeObserver:Observer,IntersectionObserver:Observer,MutationObserver:Observer};
 runInNewContext(script,context);
 let cleanup=dynamic?context.DashboardScrollGuide.initializeScrollGuide(root,viewport,'voices and categories'):null;
 function advance(ms){const end=now+ms;while(true){const entry=[...jobs].sort((a,b)=>a[1].at-b[1].at)[0];if(!entry||entry[1].at>end)break;now=entry[1].at;jobs.delete(entry[0]);entry[1].callback(now);}now=end;}
 const settle=()=>advance(16);
 const schedule=()=>{observers.forEach(callback=>callback([]));settle();};
 function enter(value){owned=value;window.emit('ch:storychange');settle();}
 function scroll(offset){viewport.scrollTop=offset;viewport.emit('scroll');settle();}
 function tabHidden(value){document.hidden=value;document.emit('visibilitychange');settle();}
 function fit(height){viewport.clientHeight=height;track.clientHeight=height;schedule();}
 return {root,viewport,bar,window,transforms,advance,enter,scroll,tabHidden,fit,schedule,
  cleanup:()=>cleanup?.(),
  pending:()=>jobs.size,
  observers:()=>observers.length,
  storyListeners:()=>window.events.get('ch:storychange')?.length||0,
  replace(){cleanup?.();viewport.scrollTop=0;cleanup=context.DashboardScrollGuide.initializeScrollGuide(root,viewport,'voices and categories');},
  hint:()=>root.classList.contains('is-scroll-hint'),
  hiddenOwner(value){hiddenAncestor=value;schedule();},
  mediaScene(value){scene=value?root:otherSection;window.emit('ch:storychange');settle();},
  inactiveScroll(offset){owned=false;viewport.scrollTop=offset;viewport.emit('scroll');settle();},
 };
}

test('hidden startup does not consume the cue before the first dashboard entry',()=>{
 const g=guide();g.advance(30000);assert.equal(g.hint(),false);
 g.enter(true);assert.equal(g.hint(),true);
 g.advance(30000);assert.equal(g.hint(),true);
});

test('actual inner scrolling dismisses the cue until a genuine leave and reentry',()=>{
 const g=guide({initiallyOwned:true});assert.equal(g.hint(),true);
 g.advance(800);g.scroll(100);assert.equal(g.hint(),false);
 g.schedule();g.advance(30000);assert.equal(g.hint(),false);
 g.enter(false);g.enter(true);assert.equal(g.hint(),true);
 g.scroll(40);assert.equal(g.hint(),false);
});

test('scrolling while the dashboard is inactive does not consume its next introduction',()=>{
 const g=guide({initiallyOwned:true});g.inactiveScroll(120);assert.equal(g.hint(),false);
 g.enter(true);assert.equal(g.hint(),true);g.advance(10000);assert.equal(g.hint(),true);
});

test('hidden tabs and temporary fitting suspend the cue without replaying its gesture',()=>{
 const g=guide({initiallyOwned:true});g.advance(800);
 assert.ok(new Set(g.transforms).size>1,'the first entry should make one pointing gesture');
 g.transforms.length=0;g.tabHidden(true);assert.equal(g.hint(),false);
 g.advance(30000);g.tabHidden(false);assert.equal(g.hint(),true);g.advance(800);
 assert.equal(new Set(g.transforms).size,1,'returning to the tab should restore the static pose');
 g.transforms.length=0;g.fit(0);assert.equal(g.hint(),false);
 g.fit(360);assert.equal(g.hint(),true);g.advance(800);
 assert.equal(new Set(g.transforms).size,1,'fitting should not replay the gesture');
 g.scroll(100);g.tabHidden(true);g.tabHidden(false);g.fit(380);assert.equal(g.hint(),false);
});

test('the phone description scene cannot consume the later dashboard media cue',()=>{
 const g=guide();g.mediaScene(false);g.enter(true);g.advance(10000);assert.equal(g.hint(),false);
 g.mediaScene(true);assert.equal(g.hint(),true);
});

test('hidden product owners and reduced motion preserve an accessible static cue',()=>{
 const g=guide({initiallyOwned:true,reduced:true});g.hiddenOwner(true);g.advance(10000);assert.equal(g.hint(),false);
 g.transforms.length=0;g.hiddenOwner(false);assert.equal(g.hint(),true);g.advance(10000);
 assert.equal(new Set(g.transforms).size,1);assert.equal(g.hint(),true);
});

test('dynamic guide teardown removes all observers, listeners and scheduled animation',()=>{
 const g=guide({initiallyOwned:true,dynamic:true});assert.equal(g.hint(),true);
 assert.ok(g.observers()>0);assert.equal(g.storyListeners(),1);
 g.cleanup();assert.equal(g.hint(),false);assert.equal(g.observers(),0);assert.equal(g.storyListeners(),0);assert.equal(g.pending(),0);
 g.enter(false);g.enter(true);g.scroll(100);g.advance(1000);assert.equal(g.hint(),false);
});

test('replacing a community gives the new source one guide without retaining old handlers',()=>{
 const g=guide({initiallyOwned:true,dynamic:true});g.scroll(100);assert.equal(g.hint(),false);
 g.replace();assert.equal(g.hint(),true);assert.equal(g.storyListeners(),1);
 assert.match(g.bar.attributes.get('aria-valuetext'),/voices and categories/);
 g.scroll(50);assert.equal(g.hint(),false);g.replace();assert.equal(g.hint(),true);assert.equal(g.storyListeners(),1);g.cleanup();
});

test('horizontal guide moves the actual horizontal owner and dismisses on pan',()=>{
 const g=guide({initiallyOwned:true,dynamic:true,horizontal:true});
 assert.equal(g.hint(),true);
 g.bar.emit('keydown',{key:'ArrowRight',preventDefault(){},stopPropagation(){}});
 assert.equal(g.viewport.scrollLeft,40);assert.equal(g.viewport.scrollTop,0);
 g.viewport.emit('scroll');g.advance(16);assert.equal(g.hint(),false);
 g.bar.emit('pointerdown',{button:0,pointerId:1,clientX:310,preventDefault(){}});
 assert.ok(g.viewport.scrollLeft>40);assert.equal(g.viewport.scrollTop,0);g.cleanup();
});

test('focusing a visible rail cancels only unwanted outer focus scrolling',()=>{
 const g=guide({initiallyOwned:true,dynamic:true});
 g.bar.emit('focus');g.window.scrollY=310;g.advance(16);assert.equal(g.window.scrollY,200);
 g.bar.getBoundingClientRect=()=>({top:760,bottom:804});
 g.bar.emit('focus');g.window.scrollY=450;g.advance(16);assert.equal(g.window.scrollY,450);g.cleanup();
});

test('teardown cancels pending visible-rail focus restoration',()=>{
 const g=guide({initiallyOwned:true,dynamic:true});
 g.bar.emit('focus');g.cleanup();g.window.scrollY=350;g.advance(32);assert.equal(g.window.scrollY,350);assert.equal(g.pending(),0);
});
