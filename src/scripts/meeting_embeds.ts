import type { Context } from '../content/meeting-embeds';

// Only the selected context is mounted. Paired native story frames share a private web session.
document.querySelectorAll<HTMLElement>('[data-native-contexts]').forEach(root => {
  const config = JSON.parse(root.querySelector('[data-native-config]')!.textContent!) as Context[];
  const mount = root.querySelector<HTMLElement>('[data-native-mount]')!;
  const heading = root.querySelector<HTMLElement>('[data-native-heading]')!;
  const open = root.querySelector<HTMLAnchorElement>('[data-native-open]')!;
  const status = root.querySelector<HTMLElement>('[data-native-status]')!;
  let active = 0, mounted = false;
  let releaseResize: (() => void) | undefined;
  function frame(url:string,title:string,klass:string):HTMLIFrameElement {
    const f=document.createElement('iframe'); f.src=url; f.title=title; f.className=klass;
    f.setAttribute('data-native-direct',''); f.loading='lazy'; return f;
  }
  function show(index:number) {
    releaseResize?.(); releaseResize=undefined;
    active=index; mounted=true;
    const c=config[index]; mount.replaceChildren(); heading.replaceChildren();
    if(c.logo) {const logo=document.createElement('img');logo.src=c.logo;logo.alt='';heading.append(logo);}
    const name=document.createElement('span');name.textContent=c.name;heading.append(name);
    open.href=c.url;
    root.querySelectorAll<HTMLElement>('[data-native-choice]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
    status.textContent='';
    if(c.categories) {
      const f=frame(c.url,c.name+' Community Voices','native-voices-screen');
      f.tabIndex=-1;
      const stage=document.createElement('div');stage.className='native-voices-stage';stage.append(f);
      const content=document.createElement('div');content.className='native-voices-content';content.setAttribute('data-scroll-owner','');content.tabIndex=0;content.setAttribute('role','region');content.setAttribute('aria-label',c.name+' voices and categories');
      const hint=document.createElement('p');hint.className='native-voices-hint';hint.textContent='Scroll to browse the community’s categories.';
      const fit=()=>{
        const phone=matchMedia('(max-width:699px)').matches;
        const url=new URL(f.src);const portrait=url.searchParams.has('portrait-mode');
        if(phone!==portrait){if(phone)url.searchParams.set('portrait-mode','1');else url.searchParams.delete('portrait-mode');f.src=url.href;}
        f.style.width=phone?'100%':'1100px';f.style.height=phone?'500px':'619px';f.style.transform=phone?'none':`scale(${stage.clientWidth/1100})`;
      };
      const categories=document.createElement('div');categories.className='native-categories';categories.setAttribute('role','group');categories.setAttribute('aria-label',c.name+' voice categories');
      const choices=[{id:0,name:'All voices',icon:''},...c.categories];
      choices.forEach(cat=>{
        const button=document.createElement('button');button.type='button';button.setAttribute('aria-pressed',String(cat.id===0));
        if(cat.icon){const image=document.createElement('img');image.src=cat.icon;image.alt='';image.loading='lazy';button.append(image);}
        const label=document.createElement('span');label.textContent=cat.name;button.append(label);
        button.addEventListener('click',()=>{
          const url=new URL(f.src);if(cat.id)url.searchParams.set('categories',String(cat.id));else url.searchParams.delete('categories');
          f.src=url.href;open.href=url.href;
          categories.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
          status.textContent=cat.name+' · '+c.name;
        });categories.append(button);
      });content.append(stage,categories);mount.append(hint,content);const resize=new ResizeObserver(fit);resize.observe(stage);releaseResize=()=>resize.disconnect();fit();
    } else if(c.display && c.remote && c.community) {
      const session=crypto.randomUUID();
      const display=new URL('https://config.communityhub.cloud/digital-signage/web-view/web-session');
      Object.entries({slideShow:'true',communitySubdomain:c.community,displayId:String(c.display),webEmbbed:'true',webSesssionId:session,activePage:'1'}).forEach(([k,v])=>display.searchParams.set(k,v));
      const pair=document.createElement('div');pair.className='native-story-pair';
      const tv=document.createElement('div');tv.className='native-tv-device';
      const tvScreen=document.createElement('div');tvScreen.className='native-tv-screen';
      const tvFrame=frame(display.href,c.name+' story display','native-story-screen');tvScreen.append(tvFrame);tv.append(tvScreen);
      const phone=document.createElement('div');phone.className='native-phone-device';
      const phoneScreen=document.createElement('div');phoneScreen.className='native-phone-screen';
      const phoneFrame=frame(`https://${c.community}.communityhub.cloud/digital-signage/remote/${c.remote}?webSesssionId=${session}&standalone`,c.name+' story controller','native-story-controller');phoneScreen.append(phoneFrame);phone.append(phoneScreen);
      pair.append(tv,phone);mount.append(pair);
      const fitDevices=()=>{tvFrame.style.width='1280px';tvFrame.style.height='720px';tvFrame.style.transform=`scale(${tvScreen.clientWidth/1280})`;phoneFrame.style.width='100%';phoneFrame.style.height='100%';phoneFrame.style.transform='none';};
      const deviceResize=new ResizeObserver(fitDevices);deviceResize.observe(tvScreen);deviceResize.observe(phoneScreen);releaseResize=()=>deviceResize.disconnect();fitDevices();
    } else {
      const viewport=document.createElement('div');viewport.className='native-application-viewport';viewport.setAttribute('data-scroll-owner','');
      const f=frame(c.embedUrl || c.url,c.name+' '+root.dataset.kind,'native-application');viewport.append(f);mount.append(viewport);
      if(root.dataset.kind==='voices') {
        f.dataset.contentHeight='850';
        const fit=()=>{const scale=Math.min(1,viewport.clientWidth/1100); f.style.width='1100px';f.style.height=f.dataset.contentHeight+'px';f.style.transform=`scale(${scale})`;viewport.style.height=Math.min(500,Number(f.dataset.contentHeight)*scale)+'px';};
        const resize=new ResizeObserver(fit);resize.observe(viewport);releaseResize=()=>resize.disconnect();fit();
      }
    }
  }
  root.querySelectorAll<HTMLElement>('[data-native-choice]').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.nativeChoice))));
  const maybeMount=()=>{
    if(mounted || root.closest('[inert]') || getComputedStyle(root).visibility==='hidden')return;
    const bounds=root.getBoundingClientRect();
    if(bounds.bottom>=0 && bounds.top<=innerHeight+100)show(active);
  };
  new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))maybeMount();},{rootMargin:'100px'}).observe(root);
  window.addEventListener('ch:storychange',maybeMount);
  const panel=root.closest('[data-eng-panel]');
  if(panel)new MutationObserver(maybeMount).observe(panel,{attributes:true,attributeFilter:['inert']});
  // Resize messages are accepted only from the active source frame and its origin.
  window.addEventListener('message',event=>{
    const f=mount.querySelector<HTMLIFrameElement>('.native-application');
    if(!f||event.source!==f.contentWindow||event.origin!==new URL(f.src).origin) return;
    const d=event.data;
    if(d?.messageType==='content-resize' && Number.isFinite(Number(d.height))) {
      const height=Math.min(4000,Math.max(380,Number(d.height)));
      f.dataset.contentHeight=String(height);f.style.height=height+'px';
      const viewport=f.parentElement!;
      if(root.dataset.kind==='voices') viewport.style.height=Math.min(500,height*Math.min(1,viewport.clientWidth/1100))+'px';
      else { f.style.height='480px'; }

    }
  });
});

document.querySelectorAll<HTMLElement>('[data-phone-demo]').forEach(root=>{
  const screen=root.querySelector<HTMLImageElement>('[data-phone-screen]')!;
  const preview=root.querySelector<HTMLImageElement>('[data-phone-preview]')!;
  const status=root.querySelector<HTMLElement>('[data-phone-status]')!;
  const scan=root.querySelector<HTMLButtonElement>('[data-phone-scan]')!;
  const menu=root.querySelector<HTMLElement>('[data-phone-menu]')!;
  const channels=root.querySelector<HTMLElement>('[data-phone-channels]')!;
  const caption=root.querySelector<HTMLElement>('[data-phone-caption]')!;
  const selection=root.querySelector<HTMLElement>('[data-phone-selection]')!;
  const hint=root.querySelector<HTMLElement>('[data-phone-hint]')!;
  const choices=[...root.querySelectorAll<HTMLButtonElement>('[data-phone-channel]')];
  const content={
    heating:{image:'assets/art-geothermal-band.jpg',title:'Heating & Cooling',alt:'Source illustration of Oberlin’s geothermal heating and cooling system',caption:'Heating & Cooling: Oberlin’s campus geothermal system.'},
    ajlc:{image:'assets/phone-workflow/ajlc-electricity-recorded.png',title:'AJLC electricity',alt:'Recorded Adam Joseph Lewis Center electricity display, not current readings',caption:'Recorded AJLC electricity display. Its “LIVE” label belongs to the capture, not current readings.'},
  } as const;
  function show(key:keyof typeof content){
    const item=content[key];screen.src=item.image;screen.alt=item.alt;preview.src=item.image;caption.textContent=item.caption;
  }
  scan.addEventListener('click',()=>{
    menu.hidden=true;channels.hidden=false;root.dataset.phase='choose';
    status.textContent='Choose Heating & Cooling or AJLC to change this example display.';
    hint.textContent='Choose what appears on the screen';
    choices[0]?.focus({preventScroll:true});
  });
  choices.forEach(button=>button.addEventListener('click',()=>{
    const key=button.dataset.phoneChannel;
    if(key!=='heating'&&key!=='ajlc')return;
    show(key);root.dataset.phase='selected';
    selection.textContent=content[key].title+' selected';
    status.textContent=content[key].title+' is now showing on this example display.';
    hint.textContent='Choose another example to change the screen';
    choices.forEach(choice=>choice.setAttribute('aria-pressed',String(choice===button)));
  }));
  root.querySelector('[data-phone-reset]')!.addEventListener('click',()=>{
    menu.hidden=false;channels.hidden=true;root.dataset.phase='menu';show('ajlc');
    selection.textContent='Your choice appears on the display.';
    choices.forEach(choice=>choice.setAttribute('aria-pressed','false'));
    status.textContent='At a sign, scan its QR code. Here, tap Screen Controller.';
    hint.textContent='Tap Screen Controller';scan.focus({preventScroll:true});
  });
});

// The source's desktop layout keeps its building photo and gauges side by side.
// A scaled canvas lives inside a real parent scroller, so wheel/touch can hand off at its edges.
document.querySelectorAll<HTMLIFrameElement>('[data-native-scroll-frame]').forEach(f=>{
 const canvas=f.parentElement!, viewport=canvas.parentElement!;
 let sourceHeight=Number(f.height)||1500;
 function fit(){const scale=Math.min(1,viewport.clientWidth/1100);canvas.style.height=(sourceHeight*scale)+'px';f.style.width='1100px';f.style.height=sourceHeight+'px';f.style.transform=`scale(${scale})`;}
 new ResizeObserver(fit).observe(viewport);fit();
 window.addEventListener('message',event=>{
  const url=f.src||f.dataset.deferSrc;
  if(!url||event.source!==f.contentWindow||event.origin!==new URL(url).origin)return;
  if(event.data?.messageType==='content-resize' && Number.isFinite(Number(event.data.height))){sourceHeight=Math.min(8000,Math.max(600,Number(event.data.height)));fit();}
 });
});
