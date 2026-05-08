import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

mkdirSync('public/images/categories', { recursive: true });

const CATEGORIES = [
  { slug: 'benches',                       url: 'https://tinmanclean.com/product-category/benches/' },
  { slug: 'storage-cabinets',              url: 'https://tinmanclean.com/product-category/storage-cabinets/' },
  { slug: 'tables-and-workstations',       url: 'https://tinmanclean.com/product-category/tables-and-workstations/' },
  { slug: 'dispensers',                    url: 'https://tinmanclean.com/product-category/dispensers/' },
  { slug: 'shelves',                       url: 'https://tinmanclean.com/product-category/shelves/' },
  { slug: 'garment-racks',                 url: 'https://tinmanclean.com/product-category/garment-racks/' },
  { slug: 'mirrors',                       url: 'https://tinmanclean.com/product-category/mirrors/' },
  { slug: 'pass-through-cabinets',         url: 'https://tinmanclean.com/product-category/pass-through-cabinets/' },
  { slug: 'cleanroom-sinks',               url: 'https://tinmanclean.com/product-category/cleanroom-sinks-and-workstation-sinks/' },
  { slug: 'platforms-and-step-stools',     url: 'https://tinmanclean.com/product-category/platforms-and-step-stools/' },
  { slug: 'laminar-flow-hoods',            url: 'https://tinmanclean.com/product-category/laminar-flow-hoods-zones-and-cabinets/' },
  { slug: 'cr-bumpers',                    url: 'https://tinmanclean.com/product-category/cr-bumpers/' },
];

// Map TINMAN category slug → our local file name
const NAME_MAP = {
  'benches': 'benches',
  'storage-cabinets': 'cabinets',
  'tables-and-workstations': 'tables',
  'dispensers': 'dispensers',
  'shelves': 'shelves',
  'garment-racks': 'garment-racks',
  'mirrors': 'mirrors',
  'pass-through-cabinets': 'pass-through',
  'cleanroom-sinks': 'sinks',
  'platforms-and-step-stools': 'platforms-stools',
};

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });
  return await res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

const W = 800;
const H = 500;

for (const { slug, url } of CATEGORIES) {
  const localName = NAME_MAP[slug];
  if (!localName) {
    console.log(`SKIP — нет в маппинге: ${slug}`);
    continue;
  }

  try {
    const html = await fetchHtml(url);
    // Find all 324x324 thumbnails
    const matches = html.match(/\/\/tinmanclean\.com\/wp-content\/uploads\/[^"\s]+-324x324\.(?:jpg|jpeg|png|webp)/g);
    if (!matches || matches.length === 0) {
      console.log(`✗ ${slug}: no images found`);
      continue;
    }
    // Take the FIRST product image and try to get the original (no size suffix)
    const thumb = matches[0];
    const original = thumb.replace(/-324x324(\.[a-z]+)$/, '$1');
    const url1 = 'https:' + original;
    const url2 = 'https:' + thumb;

    let buffer;
    try {
      buffer = await fetchBuffer(url1);
      console.log(`  ${slug}: original ${original.split('/').pop()}`);
    } catch {
      buffer = await fetchBuffer(url2);
      console.log(`  ${slug}: thumb ${thumb.split('/').pop()}`);
    }

    // Pad/fit into 800x500 with white background and brand frame
    const sized = await sharp(buffer)
      .resize(W - 60, H - 100, { fit: 'inside', withoutEnlargement: false })
      .toBuffer();

    // Compose final placeholder: white bg + product image + TINMAN label
    const composed = await sharp({
      create: {
        width: W,
        height: H,
        channels: 4,
        background: { r: 248, g: 250, b: 252, alpha: 1 },
      },
    })
      .composite([
        { input: sized, gravity: 'center' },
        {
          input: Buffer.from(
            `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
              <text x="${W - 24}" y="40" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#103976" text-anchor="end" letter-spacing="2">TINMAN</text>
            </svg>`
          ),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();

    await sharp(composed).webp({ quality: 88 }).toFile(`public/images/categories/tinman-${localName}.webp`);
    await sharp(composed).avif({ quality: 65, effort: 6 }).toFile(`public/images/categories/tinman-${localName}.avif`);
    console.log(`  ✓ saved tinman-${localName}.{webp,avif}`);
  } catch (err) {
    console.log(`✗ ${slug}: ${err.message}`);
  }
}

console.log('\nDone.');
