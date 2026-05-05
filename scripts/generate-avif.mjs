import { readdir, stat, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/images';
const QUALITY = 60; // AVIF compresses better — lower quality is acceptable
const EFFORT = 6;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

let count = 0;
let skipped = 0;
let totalBefore = 0;
let totalAfter = 0;
const results = [];

for await (const path of walk(ROOT)) {
  if (!/\.webp$/i.test(path)) continue;
  const out = parse(path);
  const avifPath = join(out.dir, `${out.name}.avif`);

  const beforeSize = (await stat(path)).size;

  if (await exists(avifPath)) {
    const afterSize = (await stat(avifPath)).size;
    totalBefore += beforeSize;
    totalAfter += afterSize;
    skipped++;
    results.push({ path, beforeSize, afterSize, skipped: true });
    continue;
  }

  await sharp(path).avif({ quality: QUALITY, effort: EFFORT }).toFile(avifPath);
  const afterSize = (await stat(avifPath)).size;

  totalBefore += beforeSize;
  totalAfter += afterSize;
  count++;
  results.push({ path, beforeSize, afterSize, skipped: false });
}

results.sort((a, b) => b.beforeSize - a.beforeSize);
const fmt = (n) => `${(n / 1024).toFixed(0)} KB`;

console.log(`\nGenerated ${count} AVIF files (skipped ${skipped} already existing)`);
console.log(`WebP total: ${fmt(totalBefore)} (${(totalBefore / 1024 / 1024).toFixed(2)} MB)`);
console.log(`AVIF total: ${fmt(totalAfter)} (${(totalAfter / 1024 / 1024).toFixed(2)} MB)`);
console.log(
  `Savings:    ${fmt(totalBefore - totalAfter)} (${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`,
);
