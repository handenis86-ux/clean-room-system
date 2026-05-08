import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import sharp from 'sharp';

mkdirSync('public/images/products', { recursive: true });

const CATEGORIES = [
  'https://tinmanclean.com/product-category/benches/',
  'https://tinmanclean.com/product-category/storage-cabinets/',
  'https://tinmanclean.com/product-category/tables-and-workstations/',
  'https://tinmanclean.com/product-category/dispensers/',
  'https://tinmanclean.com/product-category/shelves/',
  'https://tinmanclean.com/product-category/garment-racks/',
  'https://tinmanclean.com/product-category/mirrors/',
  'https://tinmanclean.com/product-category/pass-through-cabinets/',
  'https://tinmanclean.com/product-category/cleanroom-sinks-and-workstation-sinks/',
  'https://tinmanclean.com/product-category/platforms-and-step-stools/',
  'https://tinmanclean.com/product-category/laminar-flow-hoods-zones-and-cabinets/',
  'https://tinmanclean.com/product-category/cr-bumpers/',
];

// SKU → TINMAN image base name mapping
// Our SKU is TINMAN-XXX, image base on tinmanclean.com is XXX-01.jpg or similar
const SKU_TO_BASE = {
  'TINMAN-B1DFM': 'B1DFM',
  'TINMAN-B1DG': 'B1DG',
  'TINMAN-B3DFM': 'B3DFM',
  'TINMAN-B3DG': 'B3DG',
  'TINMAN-DFMB': 'DFMB',
  'TINMAN-FTDM': 'FTDM',
  'TINMAN-GDM': 'GDM',
  'TINMAN-LBS': 'LBS',
  'TINMAN-STDM': 'STDM',
  'TINMAN-WDM': 'WDM',
  'TINMAN-CRGC': 'CRGC',
  'TINMAN-CRM': 'CRM',
  'TINMAN-CRSU': 'CRSU',
  'TINMAN-CRG': 'CRG',
  'TINMAN-CRG-D': 'CRG-D',
  'TINMAN-CRG-IW': 'CRG-iW',
  'TINMAN-CRG-H8-S50': 'CRS-h8-s50',
  'TINMAN-CRSHM': 'CRSHM',
  'TINMAN-MICRO-CRS': 'Micro-CRS',
  'TINMAN-PHARMA-CRS': 'Pharma-CRS',
  'TINMAN-MICRO-CRS-R': 'Micro-CRS-R',
  'TINMAN-PHARMA-CRS-R': 'Pharma-CRS-R',
  'TINMAN-MICRO-CRB': 'Micro-CRB',
  'TINMAN-MICRO-CRB-B': 'Micro-CRB-B',
  'TINMAN-PHARMA-CRB': 'Pharma-CRB',
  'TINMAN-PHARMA-CRB-B': 'Pharma-CRB-B',
  'TINMAN-PHARMA-CRB-S': 'Pharma-CRB-S',
  'TINMAN-MICRO-CRT': 'Micro-CRT',
  'TINMAN-PHARMA-CRT': 'Pharma-CRT',
  'TINMAN-CRT-T': 'CRT-T',
  'TINMAN-CRT-D': 'CRT-D',
  'TINMAN-MICRO-CRC': 'Micro-CRC',
  'TINMAN-PHARMA-CRC': 'Pharma-CRC',
  'TINMAN-EVOK-LAM-CART': 'EVOK-LAM',
  'TINMAN-PASS-THROUGH-CRGC': 'Pass-Through',
  'TINMAN-CRST-T-STOOL': 'CRST-m',
  'TINMAN-CRST-T-PLATFORM': 'CRST-m',
  'TINMAN-CRW-BH': 'CRW-BH',
};

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  return await res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// Collect ALL unique image bases from all category pages
const availableBases = new Set();
const variants = new Map(); // base → suffix variants like "01", "02"

for (const url of CATEGORIES) {
  try {
    const html = await fetchHtml(url);
    const matches = [
      ...html.matchAll(
        /\/wp-content\/uploads\/\d+\/\d+\/([A-Za-z0-9-]+?)-(\d{2})(?:-\d+x\d+)?\.(?:jpg|jpeg|png)/g
      ),
    ];
    for (const m of matches) {
      const base = m[1];
      availableBases.add(base);
      if (!variants.has(base)) variants.set(base, new Set());
      variants.get(base).add(m[2]);
    }
  } catch (err) {
    console.log(`  ! ${url}: ${err.message}`);
  }
}

console.log(`Найдено ${availableBases.size} уникальных продуктов на TINMAN site\n`);

// Try every variant to find matching photo
const downloaded = {};

for (const [sku, base] of Object.entries(SKU_TO_BASE)) {
  // Find best match for base in availableBases (case-insensitive partial match)
  const baseLower = base.toLowerCase();
  let chosen = null;
  for (const b of availableBases) {
    if (b.toLowerCase() === baseLower) {
      chosen = b;
      break;
    }
  }
  if (!chosen) {
    // Try partial match
    for (const b of availableBases) {
      if (b.toLowerCase().includes(baseLower) || baseLower.includes(b.toLowerCase())) {
        chosen = b;
        break;
      }
    }
  }
  if (!chosen) {
    console.log(`  ✗ ${sku} (base=${base}): no photo on tinman site`);
    continue;
  }

  const localFile = `public/images/products/tinman-${sku.replace('TINMAN-', '').toLowerCase()}.webp`;

  // Try several common upload paths
  const candidates = [
    `https://tinmanclean.com/wp-content/uploads/2017/12/${chosen}-01.jpg`,
    `https://tinmanclean.com/wp-content/uploads/2018/01/${chosen}-01.jpg`,
    `https://tinmanclean.com/wp-content/uploads/2017/12/${chosen}-1.jpg`,
  ];

  let buffer = null;
  let usedUrl = null;
  for (const u of candidates) {
    try {
      buffer = await fetchBuffer(u);
      usedUrl = u;
      break;
    } catch {}
  }

  if (!buffer) {
    // Fallback: just use 416x416 thumb
    try {
      buffer = await fetchBuffer(`https://tinmanclean.com/wp-content/uploads/2017/12/${chosen}-01-416x416.jpg`);
      usedUrl = `${chosen}-01-416x416.jpg`;
    } catch {
      console.log(`  ✗ ${sku}: failed to fetch any variant for ${chosen}`);
      continue;
    }
  }

  await sharp(buffer)
    .resize(800, 800, { fit: 'inside', withoutEnlargement: false, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .webp({ quality: 88 })
    .toFile(localFile);

  // Also AVIF
  await sharp(buffer)
    .resize(800, 800, { fit: 'inside', withoutEnlargement: false, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .avif({ quality: 65, effort: 6 })
    .toFile(localFile.replace('.webp', '.avif'));

  downloaded[sku] = localFile.replace('public', '');
  console.log(`  ✓ ${sku} ← ${chosen}`);
}

console.log(`\n=== СВОДКА ===`);
console.log(`Скачано: ${Object.keys(downloaded).length} / ${Object.keys(SKU_TO_BASE).length} TINMAN SKU\n`);

// Generate code snippet for product-images.ts
console.log('=== Добавь в src/data/product-images.ts (после индикаторов) ===\n');
console.log('  // TINMAN — нержавеющая мебель cleanroom (фото с tinmanclean.com)');
for (const [sku, path] of Object.entries(downloaded)) {
  console.log(`  '${sku}': '${path}',`);
}
