import {before,test} from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'vite';
let pages;
before(async()=>{const r=await build({configFile:false,logLevel:'silent',build:{write:false,minify:false,lib:{entry:'src/content/site.ts',formats:['es']}}});const code=(Array.isArray(r)?r[0]:r).output[0].code;pages=await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);});
test('Products how shows the original Story of Dashboard rather than the reconstructed diagram',()=>{
 const html=pages.getPage('products').body;
 assert.match(html,/<section[^>]+id="how"[^>]+data-original-story/);
 assert.match(html,/Story of Dashboard/);
 assert.doesNotMatch(html,/data-hub-flow/);
});
test('all original-presentation locations use the actual published deck from its first slide',()=>{
 for(const slug of ['products','the-hub','story-of-dashboard']) {
  const html=pages.getPage(slug).body;
  assert.match(html,/data-original-presentation data-defer-src="https:\/\/docs.google.com\/presentation\/d\/e\/2PACX-1vQfRVKa9JNw8GIXMMFZYf0XpjAwswzrJftYMBl7cBu-cJpzIgNcjBZo1X1jjMBrgofuabYMISCxdDLs\/embed\?start=true&amp;loop=false&amp;delayms=9000"/);
  assert.doesNotMatch(html,/data-sb-original|data-sb-img|Open original slide/);
  assert.match(html,/title="Original Story of Dashboard presentation"[^>]*allow="autoplay; fullscreen"[^>]*allowfullscreen/);
 }
});
test('both platform explanation locations use the authentic diagram and preserve resource viewer',()=>{
 assert.match(pages.getPage('the-hub').body,/id="manager-platform"[^>]*data-original-story/);
 assert.doesNotMatch(pages.getPage('the-hub').body,/data-hub-flow|Slide 10 platform/);
 assert.match(pages.getPage('story-of-dashboard').body,/id="storyboard"/);
});
test('Story of Dashboard has one native presentation and no duplicate custom storyboard',()=>{
 const html=pages.getPage('story-of-dashboard').body;
 assert.equal((html.match(/data-original-presentation/g)||[]).length,1);
 assert.doesNotMatch(html,/data-sb-data|data-sb-go|id="slideshow"/);
 assert.match(html,/<h1[^>]*>Story of Dashboard<\/h1>/);
});
