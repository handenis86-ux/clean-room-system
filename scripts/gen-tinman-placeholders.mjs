import { writeFileSync, mkdirSync } from 'node:fs';
import sharp from 'sharp';

mkdirSync('public/images/categories', { recursive: true });

const BRAND = '#103976';
const BRAND_LIGHT = '#E6EFF8';
const TEXT = '#1D2939';
const MUTED = '#667085';

// Каждая категория — свой SVG-иллюстрационный плейсхолдер (минимализм,
// геометрия, brand цвета). Размер 800x500 ≈ 16:10, под аспект карточек.
const W = 800;
const H = 500;

function frame(inner) {
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F8FAFC"/>
        <stop offset="100%" stop-color="#E6EFF8"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <text x="${W - 24}" y="40" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="14" font-weight="700" fill="${BRAND}" text-anchor="end" letter-spacing="2">TINMAN</text>
    ${inner}
  </svg>`;
}

const ICONS = {
  // Скамейка с обувницей: горизонтальная плоскость + перфорация + ножки + полка снизу
  benches: () =>
    frame(`
      <g transform="translate(${W / 2 - 200}, ${H / 2 - 80})">
        <!-- Bench top -->
        <rect x="0" y="20" width="400" height="22" rx="3" fill="${BRAND}"/>
        <!-- Perforation -->
        ${Array.from({ length: 16 })
          .map((_, i) => `<circle cx="${20 + i * 24}" cy="31" r="2" fill="${BRAND_LIGHT}"/>`)
          .join('')}
        <!-- Legs -->
        <rect x="20" y="42" width="10" height="120" fill="${BRAND}"/>
        <rect x="370" y="42" width="10" height="120" fill="${BRAND}"/>
        <!-- Bottom shelf -->
        <rect x="0" y="120" width="400" height="14" rx="2" fill="${BRAND}" opacity="0.55"/>
        <!-- Bootie covers stylized -->
        <rect x="60" y="100" width="60" height="20" rx="6" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="2"/>
        <rect x="280" y="100" width="60" height="20" rx="6" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="2"/>
        <!-- Floor line -->
        <line x1="-30" y1="166" x2="430" y2="166" stroke="${MUTED}" stroke-width="1" opacity="0.3"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Скамейки для гоунинга</text>
    `),

  // Шкафы — двустворчатый шкаф с ручкой и полками внутри
  cabinets: () =>
    frame(`
      <g transform="translate(${W / 2 - 130}, ${H / 2 - 130})">
        <rect x="0" y="0" width="260" height="240" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="3" rx="3"/>
        <line x1="130" y1="0" x2="130" y2="240" stroke="${BRAND}" stroke-width="2"/>
        <!-- Inner shelves -->
        <line x1="20" y1="60" x2="240" y2="60" stroke="${BRAND}" stroke-width="1.5" opacity="0.5"/>
        <line x1="20" y1="120" x2="240" y2="120" stroke="${BRAND}" stroke-width="1.5" opacity="0.5"/>
        <line x1="20" y1="180" x2="240" y2="180" stroke="${BRAND}" stroke-width="1.5" opacity="0.5"/>
        <!-- Handles -->
        <rect x="115" y="115" width="6" height="20" fill="${BRAND}"/>
        <rect x="139" y="115" width="6" height="20" fill="${BRAND}"/>
        <!-- Legs -->
        <rect x="10" y="240" width="10" height="20" fill="${BRAND}"/>
        <rect x="240" y="240" width="10" height="20" fill="${BRAND}"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Шкафы</text>
    `),

  // Столы — прямоугольная столешница на 4-х ножках
  tables: () =>
    frame(`
      <g transform="translate(${W / 2 - 200}, ${H / 2 - 80})">
        <rect x="0" y="40" width="400" height="22" rx="3" fill="${BRAND}"/>
        <rect x="20" y="62" width="10" height="100" fill="${BRAND}"/>
        <rect x="370" y="62" width="10" height="100" fill="${BRAND}"/>
        <rect x="195" y="62" width="10" height="100" fill="${BRAND}" opacity="0.6"/>
        <line x1="-30" y1="166" x2="430" y2="166" stroke="${MUTED}" stroke-width="1" opacity="0.3"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Столы рабочие</text>
    `),

  // Тележки — стол на колёсах с двумя полками
  carts: () =>
    frame(`
      <g transform="translate(${W / 2 - 160}, ${H / 2 - 100})">
        <rect x="0" y="0" width="320" height="14" rx="2" fill="${BRAND}"/>
        <rect x="0" y="80" width="320" height="14" rx="2" fill="${BRAND}" opacity="0.7"/>
        <rect x="10" y="14" width="6" height="80" fill="${BRAND}"/>
        <rect x="304" y="14" width="6" height="80" fill="${BRAND}"/>
        <!-- Handle -->
        <rect x="-30" y="0" width="40" height="6" rx="3" fill="${BRAND}"/>
        <rect x="-30" y="0" width="6" height="50" fill="${BRAND}"/>
        <!-- Wheels -->
        <circle cx="30" cy="110" r="14" fill="${BRAND}"/>
        <circle cx="30" cy="110" r="6" fill="${BRAND_LIGHT}"/>
        <circle cx="290" cy="110" r="14" fill="${BRAND}"/>
        <circle cx="290" cy="110" r="6" fill="${BRAND_LIGHT}"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Тележки и кейсы</text>
    `),

  // Диспенсеры — настенный 3-секционный диспенсер
  dispensers: () =>
    frame(`
      <g transform="translate(${W / 2 - 130}, ${H / 2 - 110})">
        <rect x="0" y="0" width="260" height="220" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="3" rx="3"/>
        <!-- 3 slots -->
        ${[0, 1, 2]
          .map(
            (i) =>
              `<rect x="${20 + i * 80}" y="40" width="60" height="100" fill="white" stroke="${BRAND}" stroke-width="2"/>
               <rect x="${30 + i * 80}" y="120" width="40" height="6" fill="${BRAND}"/>`
          )
          .join('')}
        <!-- Label area -->
        <rect x="20" y="170" width="220" height="20" fill="${BRAND}" opacity="0.6"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Диспенсеры</text>
    `),

  // Стеллажи — 4 яруса полок
  shelves: () =>
    frame(`
      <g transform="translate(${W / 2 - 150}, ${H / 2 - 130})">
        ${[0, 1, 2, 3]
          .map(
            (i) =>
              `<rect x="0" y="${i * 65}" width="300" height="14" rx="2" fill="${BRAND}" opacity="${0.55 + i * 0.1}"/>`
          )
          .join('')}
        <rect x="10" y="0" width="6" height="245" fill="${BRAND}"/>
        <rect x="284" y="0" width="6" height="245" fill="${BRAND}"/>
        <line x1="-30" y1="252" x2="330" y2="252" stroke="${MUTED}" stroke-width="1" opacity="0.3"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Стеллажи</text>
    `),

  // Ящики — выдвижные секции с ручками
  drawers: () =>
    frame(`
      <g transform="translate(${W / 2 - 130}, ${H / 2 - 130})">
        <rect x="0" y="0" width="260" height="240" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="3" rx="3"/>
        ${[0, 1, 2, 3]
          .map(
            (i) =>
              `<line x1="0" y1="${(i + 1) * 60}" x2="260" y2="${(i + 1) * 60}" stroke="${BRAND}" stroke-width="2"/>
               <rect x="115" y="${i * 60 + 25}" width="30" height="10" rx="2" fill="${BRAND}"/>`
          )
          .join('')}
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Ящики и системы хранения</text>
    `),

  // Стойки для одежды — вешалка с одеждой
  'garment-racks': () =>
    frame(`
      <g transform="translate(${W / 2 - 160}, ${H / 2 - 140})">
        <!-- Top bar -->
        <rect x="0" y="0" width="320" height="8" rx="3" fill="${BRAND}"/>
        <!-- Vertical posts -->
        <rect x="10" y="8" width="6" height="240" fill="${BRAND}"/>
        <rect x="304" y="8" width="6" height="240" fill="${BRAND}"/>
        <!-- Hangers -->
        ${[0, 1, 2, 3, 4]
          .map((i) => {
            const x = 50 + i * 50;
            return `<path d="M${x},20 L${x - 12},45 L${x + 12},45 Z" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="1.5"/>
                    <rect x="${x - 18}" y="45" width="36" height="80" rx="3" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="1.5"/>`;
          })
          .join('')}
        <line x1="-30" y1="252" x2="350" y2="252" stroke="${MUTED}" stroke-width="1" opacity="0.3"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Стойки для одежды</text>
    `),

  // Зеркала — рамка с зеркальной поверхностью
  mirrors: () =>
    frame(`
      <g transform="translate(${W / 2 - 100}, ${H / 2 - 130})">
        <rect x="0" y="0" width="200" height="240" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="6" rx="6"/>
        <!-- Reflection lines -->
        <line x1="20" y1="40" x2="80" y2="40" stroke="white" stroke-width="3" opacity="0.8"/>
        <line x1="20" y1="60" x2="50" y2="60" stroke="white" stroke-width="2" opacity="0.6"/>
        <line x1="120" y1="180" x2="180" y2="180" stroke="white" stroke-width="3" opacity="0.8"/>
        <line x1="140" y1="200" x2="180" y2="200" stroke="white" stroke-width="2" opacity="0.6"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Зеркала</text>
    `),

  // Pass-through — двустороннее окно с двумя дверцами
  'pass-through': () =>
    frame(`
      <g transform="translate(${W / 2 - 160}, ${H / 2 - 110})">
        <rect x="0" y="0" width="320" height="220" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="3" rx="4"/>
        <rect x="10" y="20" width="140" height="180" fill="white" stroke="${BRAND}" stroke-width="2"/>
        <rect x="170" y="20" width="140" height="180" fill="white" stroke="${BRAND}" stroke-width="2"/>
        <!-- Glass cross -->
        <line x1="10" y1="110" x2="150" y2="110" stroke="${BRAND}" stroke-width="1" opacity="0.5"/>
        <line x1="80" y1="20" x2="80" y2="200" stroke="${BRAND}" stroke-width="1" opacity="0.5"/>
        <line x1="170" y1="110" x2="310" y2="110" stroke="${BRAND}" stroke-width="1" opacity="0.5"/>
        <line x1="240" y1="20" x2="240" y2="200" stroke="${BRAND}" stroke-width="1" opacity="0.5"/>
        <!-- Handles -->
        <circle cx="135" cy="110" r="6" fill="${BRAND}"/>
        <circle cx="185" cy="110" r="6" fill="${BRAND}"/>
        <!-- Side pillars (wall) -->
        <rect x="-20" y="-10" width="20" height="240" fill="${MUTED}" opacity="0.25"/>
        <rect x="320" y="-10" width="20" height="240" fill="${MUTED}" opacity="0.25"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Передаточные шлюзы</text>
    `),

  // Раковины — мойка с краном
  sinks: () =>
    frame(`
      <g transform="translate(${W / 2 - 160}, ${H / 2 - 80})">
        <!-- Counter -->
        <rect x="0" y="40" width="320" height="20" rx="3" fill="${BRAND}"/>
        <!-- Sink bowl -->
        <rect x="80" y="40" width="160" height="60" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="3" rx="6"/>
        <!-- Faucet -->
        <rect x="155" y="0" width="10" height="40" fill="${BRAND}"/>
        <path d="M155,8 L130,8 L130,30" stroke="${BRAND}" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- Water drop -->
        <ellipse cx="130" cy="50" rx="4" ry="6" fill="#3FA9D6"/>
        <!-- Legs -->
        <rect x="20" y="100" width="10" height="60" fill="${BRAND}"/>
        <rect x="290" y="100" width="10" height="60" fill="${BRAND}"/>
        <line x1="-30" y1="166" x2="350" y2="166" stroke="${MUTED}" stroke-width="1" opacity="0.3"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Раковины</text>
    `),

  // Стремянки — 3-ступенчатая стремянка
  'step-stools': () =>
    frame(`
      <g transform="translate(${W / 2 - 100}, ${H / 2 - 130})">
        <!-- 3 steps -->
        <rect x="0" y="200" width="180" height="14" fill="${BRAND}"/>
        <rect x="20" y="140" width="140" height="14" fill="${BRAND}" opacity="0.85"/>
        <rect x="40" y="80" width="100" height="14" fill="${BRAND}" opacity="0.7"/>
        <!-- Vertical supports -->
        <line x1="0" y1="80" x2="0" y2="220" stroke="${BRAND}" stroke-width="6"/>
        <line x1="180" y1="80" x2="180" y2="220" stroke="${BRAND}" stroke-width="6"/>
        <line x1="40" y1="80" x2="40" y2="155" stroke="${BRAND}" stroke-width="3"/>
        <line x1="140" y1="80" x2="140" y2="155" stroke="${BRAND}" stroke-width="3"/>
        <line x1="-30" y1="225" x2="220" y2="225" stroke="${MUTED}" stroke-width="1" opacity="0.3"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Стремянки</text>
    `),

  // Платформы — большая прямоугольная платформа со ступенями сбоку
  platforms: () =>
    frame(`
      <g transform="translate(${W / 2 - 160}, ${H / 2 - 100})">
        <!-- Platform top -->
        <rect x="60" y="0" width="240" height="20" fill="${BRAND}"/>
        <!-- Steps -->
        <rect x="0" y="60" width="60" height="14" fill="${BRAND}" opacity="0.8"/>
        <rect x="0" y="100" width="60" height="14" fill="${BRAND}" opacity="0.6"/>
        <rect x="0" y="140" width="60" height="14" fill="${BRAND}" opacity="0.4"/>
        <!-- Vertical supports -->
        <rect x="60" y="20" width="6" height="160" fill="${BRAND}"/>
        <rect x="294" y="20" width="6" height="160" fill="${BRAND}"/>
        <!-- Railing -->
        <rect x="60" y="-20" width="240" height="4" fill="${BRAND}"/>
        <rect x="60" y="-20" width="6" height="20" fill="${BRAND}"/>
        <rect x="294" y="-20" width="6" height="20" fill="${BRAND}"/>
        <line x1="-30" y1="186" x2="330" y2="186" stroke="${MUTED}" stroke-width="1" opacity="0.3"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Платформы</text>
    `),

  // Урны — мусорка с педалью
  'waste-bins': () =>
    frame(`
      <g transform="translate(${W / 2 - 70}, ${H / 2 - 110})">
        <!-- Lid -->
        <rect x="-10" y="0" width="160" height="14" rx="3" fill="${BRAND}"/>
        <!-- Body -->
        <path d="M0,14 L140,14 L130,200 L10,200 Z" fill="${BRAND_LIGHT}" stroke="${BRAND}" stroke-width="3"/>
        <!-- Pedal arm -->
        <rect x="-30" y="220" width="40" height="4" fill="${BRAND}"/>
        <rect x="-30" y="220" width="4" height="20" fill="${BRAND}"/>
        <!-- Body lines -->
        <line x1="20" y1="60" x2="120" y2="60" stroke="${BRAND}" stroke-width="1" opacity="0.4"/>
        <line x1="22" y1="120" x2="118" y2="120" stroke="${BRAND}" stroke-width="1" opacity="0.4"/>
        <line x1="-30" y1="244" x2="180" y2="244" stroke="${MUTED}" stroke-width="1" opacity="0.3"/>
      </g>
      <text x="${W / 2}" y="${H - 30}" font-family="system-ui" font-size="22" font-weight="700" fill="${TEXT}" text-anchor="middle">Урны</text>
    `),
};

const KEYS = Object.keys(ICONS);
console.log(`Generating ${KEYS.length} placeholders...\n`);

for (const key of KEYS) {
  const svg = ICONS[key]();
  const webp = `public/images/categories/tinman-${key}.webp`;
  const avif = `public/images/categories/tinman-${key}.avif`;
  await sharp(Buffer.from(svg)).resize(W, H).webp({ quality: 90 }).toFile(webp);
  await sharp(Buffer.from(svg)).resize(W, H).avif({ quality: 70, effort: 6 }).toFile(avif);
  console.log(`  ✓ ${key}`);
}

console.log(`\nDone — ${KEYS.length} category placeholders created.`);
