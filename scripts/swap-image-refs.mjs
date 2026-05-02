import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

const PUB_ROOT = 'public/images';
const SRC_ROOTS = ['src'];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const webpPaths = new Set();
for await (const p of walk(PUB_ROOT)) {
  if (p.endsWith('.webp')) {
    webpPaths.add(p.replace(/\\/g, '/').replace(/^public/, ''));
  }
}

const swaps = [];
for (const webpUrl of webpPaths) {
  const { dir, name } = parse(webpUrl);
  const pngUrl = `${dir}/${name}.png`;
  const jpgUrl = `${dir}/${name}.jpg`;
  const jpegUrl = `${dir}/${name}.jpeg`;
  swaps.push([pngUrl, webpUrl]);
  swaps.push([jpgUrl, webpUrl]);
  swaps.push([jpegUrl, webpUrl]);
}

let totalReplacements = 0;
const filesTouched = new Set();

for (const root of SRC_ROOTS) {
  for await (const path of walk(root)) {
    if (!/\.(ts|tsx|js|jsx)$/.test(path)) continue;
    let content = await readFile(path, 'utf8');
    let changed = false;
    for (const [from, to] of swaps) {
      if (content.includes(from)) {
        const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        const matches = content.match(re);
        if (matches) {
          content = content.replace(re, to);
          totalReplacements += matches.length;
          changed = true;
        }
      }
    }
    if (changed) {
      await writeFile(path, content);
      filesTouched.add(path);
    }
  }
}

console.log(`\n${totalReplacements} image references updated across ${filesTouched.size} files:\n`);
for (const f of filesTouched) console.log(`  ${f.replace(/\\/g, '/')}`);
