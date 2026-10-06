import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { build } from 'vite';

const originals = JSON.parse(readFileSync('src/content/original-images.json', 'utf8'));
let images;
before(async () => {
  const result = await build({configFile:false, logLevel:'silent', build:{write:false, minify:false, lib:{entry:'src/lib/site.ts', formats:['es']}}});
  const code = (Array.isArray(result) ? result[0] : result).output[0].code;
  images = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
});

test('restored source images match their recorded original bytes', () => {
  for (const original of Object.values(originals)) {
    const data = readFileSync(`public/${original.file}`);
    assert.equal(createHash('sha256').update(data).digest('hex'), original.sha256, original.file);
    assert.equal(data.length, original.bytes);
  }
});

test('all matching photo and figure usages resolve to the original without losing their description', () => {
  for (const [old, original] of Object.entries(originals)) {
    const html = images.addResponsiveImages(`<img src="${old}" alt="Original context" loading="lazy" width="960" height="540">`, 'index');
    assert.ok(html.includes(`src="${original.file}"`), old);
    assert.ok(html.includes('alt="Original context" loading="lazy"'));
    assert.ok(html.includes(`width="${original.dimensions[0]}" height="${original.dimensions[1]}"`));
    assert.ok(html.includes(`${original.file} ${original.dimensions[0]}w`));
  }
});

test('source photograph is available above small derivatives on high-density screens', () => {
  const html = images.addResponsiveImages('<img src="assets/live-home-story-02.jpeg" alt="Children at the dashboard">', 'index');
  assert.ok(html.includes('assets/originals/live-home-story-02.jpeg 2352w'));
  assert.ok(html.includes('assets/live-home-story-02-800.jpeg 800w'));
});

test('historical charts preserve native self-contained vector content', () => {
  for (const old of ['assets/evidence/prospect-competition-heatmap.jpg', 'assets/evidence/oberlin-dorm-competition-2006-2009.jpg']) {
    const svg = readFileSync(`public/${originals[old].file}`, 'utf8');
    assert.match(svg, /<path\b/);
    assert.doesNotMatch(svg, /(?:href|src)="https?:|<script\b|onload=/);
    assert.equal(originals[old].source_title, '260128 Hamilton College Overview of Dashboard Presentation');
  }
});
