import { readFileSync, writeFileSync } from 'node:fs';

const sources = [
  { size: 16, file: 'public/favicon-16x16.png' },
  { size: 32, file: 'public/favicon-32x32.png' },
];

const images = sources.map(({ size, file }) => ({ size, data: readFileSync(file) }));

const HEADER = 6;
const ENTRY = 16;
const dirSize = HEADER + ENTRY * images.length;

const header = Buffer.alloc(HEADER);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);

let offset = dirSize;
const entries = [];
for (const img of images) {
  const e = Buffer.alloc(ENTRY);
  e.writeUInt8(img.size === 256 ? 0 : img.size, 0);
  e.writeUInt8(img.size === 256 ? 0 : img.size, 1);
  e.writeUInt8(0, 2);
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(img.data.length, 8);
  e.writeUInt32LE(offset, 12);
  entries.push(e);
  offset += img.data.length;
}

const out = Buffer.concat([header, ...entries, ...images.map(i => i.data)]);
writeFileSync('public/favicon.ico', out);
console.log(`favicon.ico written, ${out.length} bytes (sizes: ${sources.map(s => s.size).join(', ')})`);
