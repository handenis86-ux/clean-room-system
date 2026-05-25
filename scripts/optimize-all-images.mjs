import { readdir, stat, writeFile, readFile, unlink } from 'node:fs/promises';
import { join, parse, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const WEBP_QUALITY = 78;
const EFFORT = 5;

const MAX_WIDTH = {
  hero: 1920,
  blog: 1200,
  categories: 800,
  products: 800,
  about: 800,
  contacts: 1200,
  services: 800,
};
const DEFAULT_MAX_WIDTH = 1200;
const RECOMPRESS_THRESHOLD = 80 * 1024; // re-optimize WebP files > 80KB

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

function getMaxWidth(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  for (const [folder, width] of Object.entries(MAX_WIDTH)) {
    if (normalized.includes(`/${folder}/`)) return width;
  }
  return DEFAULT_MAX_WIDTH;
}

const isRaster = (name) => /\.(png|jpe?g)$/i.test(name);
const isWebP = (name) => /\.webp$/i.test(name);
const isImage = (name) => isRaster(name) || isWebP(name);
const isFavicon = (name) => /favicon|icon-|apple-touch|safari-pinned/i.test(name);

const results = [];
let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let recompressed = 0;
let resized = 0;
let skipped = 0;

for await (const filePath of walk(ROOT)) {
  if (!isImage(filePath) || isFavicon(filePath)) continue;

  const s = await stat(filePath);
  const ext = extname(filePath).toLowerCase();
  const maxW = getMaxWidth(filePath);

  if (isRaster(filePath)) {
    const out = parse(filePath);
    const webpPath = join(out.dir, `${out.name}.webp`);

    const inputBuf = await readFile(filePath);
    const meta = await sharp(inputBuf).metadata();
    let pipeline = sharp(inputBuf);
    if (meta.width > maxW) {
      pipeline = pipeline.resize(maxW, null, { withoutEnlargement: true });
      resized++;
    }

    const outBuf = await pipeline.webp({ quality: WEBP_QUALITY, effort: EFFORT }).toBuffer();
    await writeFile(webpPath, outBuf);
    const newSize = outBuf.length;

    totalBefore += s.size;
    totalAfter += newSize;
    converted++;

    results.push({
      file: filePath.replace(/\\/g, '/'),
      action: 'jpg→webp',
      before: s.size,
      after: newSize,
      saved: (((s.size - newSize) / s.size) * 100).toFixed(1),
    });

    try { await unlink(filePath); } catch {}
    continue;
  }

  if (isWebP(filePath) && s.size > RECOMPRESS_THRESHOLD) {
    const inputBuf = await readFile(filePath);
    const meta = await sharp(inputBuf).metadata();

    let pipeline = sharp(inputBuf);
    let didResize = false;
    if (meta.width > maxW) {
      pipeline = pipeline.resize(maxW, null, { withoutEnlargement: true });
      didResize = true;
    }

    const outBuf = await pipeline.webp({ quality: WEBP_QUALITY, effort: EFFORT }).toBuffer();
    const newSize = outBuf.length;

    if (newSize < s.size * 0.95) {
      await writeFile(filePath, outBuf);
      recompressed++;
      if (didResize) resized++;

      totalBefore += s.size;
      totalAfter += newSize;

      results.push({
        file: filePath.replace(/\\/g, '/'),
        action: didResize ? 'resize+recompress' : 'recompress',
        before: s.size,
        after: newSize,
        saved: (((s.size - newSize) / s.size) * 100).toFixed(1),
      });
    } else {
      skipped++;
    }
  }
}

results.sort((a, b) => b.before - a.before);
const fmt = (n) => `${(n / 1024).toFixed(1)} KB`;

if (results.length === 0) {
  console.log('\n✓ All images are already optimized.\n');
  process.exit(0);
}

console.log('\n=== Image optimization results ===\n');
for (const r of results) {
  console.log(
    `${r.action.padEnd(18)} ${r.file.padEnd(52)} ${fmt(r.before).padStart(10)} → ${fmt(r.after).padStart(10)}  -${r.saved}%`
  );
}
console.log('\n=== Summary ===');
console.log(`Converted JPG/PNG → WebP: ${converted}`);
console.log(`Recompressed WebP:        ${recompressed}`);
console.log(`Resized (too wide):       ${resized}`);
console.log(`Skipped (already good):   ${skipped}`);
console.log(`Total before: ${fmt(totalBefore)}`);
console.log(`Total after:  ${fmt(totalAfter)}`);
if (totalBefore > 0) {
  console.log(`Saved:        ${fmt(totalBefore - totalAfter)} (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`);
}
