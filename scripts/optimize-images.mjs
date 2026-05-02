import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const QUALITY = 78;
const MIN_BYTES = 30 * 1024;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const isRaster = (name) => /\.(png|jpe?g)$/i.test(name);

const results = [];
let totalBefore = 0;
let totalAfter = 0;

for await (const path of walk(ROOT)) {
  if (!isRaster(path)) continue;
  const s = await stat(path);
  if (s.size < MIN_BYTES) continue;

  const out = parse(path);
  const webpPath = join(out.dir, `${out.name}.webp`);

  await mkdir(out.dir, { recursive: true });

  const img = sharp(path);
  const meta = await img.metadata();

  await img
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(webpPath);

  const newSize = (await stat(webpPath)).size;
  totalBefore += s.size;
  totalAfter += newSize;

  results.push({
    file: path.replace(/\\/g, '/'),
    before: s.size,
    after: newSize,
    saved: ((s.size - newSize) / s.size * 100).toFixed(1),
    dim: `${meta.width}x${meta.height}`,
  });
}

results.sort((a, b) => b.before - a.before);
const fmt = (n) => `${(n / 1024).toFixed(0)} KB`;

console.log('\n=== Image optimization results ===\n');
for (const r of results) {
  console.log(`${r.file.padEnd(48)} ${r.dim.padEnd(12)} ${fmt(r.before).padStart(8)} → ${fmt(r.after).padStart(8)}  -${r.saved}%`);
}
console.log('\n=== TOTAL ===');
console.log(`Before: ${fmt(totalBefore)} (${(totalBefore / 1024 / 1024).toFixed(2)} MB)`);
console.log(`After:  ${fmt(totalAfter)} (${(totalAfter / 1024 / 1024).toFixed(2)} MB)`);
console.log(`Saved:  ${fmt(totalBefore - totalAfter)} (${((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)}%)`);
console.log(`\nGenerated ${results.length} .webp files`);
