import { readdir, readFile, stat, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';

const PUB_ROOT = 'public/images';
const SCAN_ROOTS = ['src', 'prisma', 'public/robots.txt'];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function readAllSources() {
  const sources = [];
  for (const root of SCAN_ROOTS) {
    try {
      const s = await stat(root);
      if (s.isFile()) {
        sources.push(await readFile(root, 'utf8'));
      } else {
        for await (const path of walk(root)) {
          if (/\.(ts|tsx|js|jsx|md|mdx|json|txt|html)$/.test(path)) {
            sources.push(await readFile(path, 'utf8'));
          }
        }
      }
    } catch {}
  }
  return sources.join('\n');
}

const haystack = await readAllSources();

const candidates = [];
for await (const path of walk(PUB_ROOT)) {
  if (!/\.(png|jpe?g)$/i.test(path)) continue;
  const norm = path.replace(/\\/g, '/');
  const filename = parse(norm).base;
  const urlPath = '/' + norm.replace(/^public\//, '');
  // Match either the full URL path or just the filename (catch any weird refs)
  const referenced =
    haystack.includes(urlPath) ||
    haystack.includes(filename);
  candidates.push({ path: norm, filename, urlPath, referenced, size: (await stat(path)).size });
}

const unused = candidates.filter(c => !c.referenced);
const used = candidates.filter(c => c.referenced);

console.log(`\nScanned ${candidates.length} raster files in ${PUB_ROOT}`);
console.log(`  Referenced: ${used.length}`);
console.log(`  Unused:     ${unused.length}\n`);

console.log('=== KEEP (referenced) ===');
for (const c of used) console.log(`  ${c.path}  (${(c.size / 1024).toFixed(0)} KB)`);

const totalUnused = unused.reduce((a, c) => a + c.size, 0);
console.log(`\n=== DELETE (unused, total ${(totalUnused / 1024 / 1024).toFixed(2)} MB) ===`);
for (const c of unused) console.log(`  ${c.path}  (${(c.size / 1024).toFixed(0)} KB)`);

const apply = process.argv.includes('--apply');
if (!apply) {
  console.log('\n(dry run; pass --apply to delete)');
} else {
  for (const c of unused) await unlink(c.path);
  console.log(`\nDeleted ${unused.length} files (${(totalUnused / 1024 / 1024).toFixed(2)} MB freed).`);
}
