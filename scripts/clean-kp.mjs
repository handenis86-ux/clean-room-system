import { readFileSync, writeFileSync } from 'node:fs';

const raw = readFileSync('./kp.csv', 'utf8');
const lines = raw.split(/\r?\n/);
const dataRows = lines.slice(3).filter((r) => r.trim());

const records = dataRows.map((row) => {
  const c = row.split('\t');
  const parseNum = (s) => {
    if (!s) return null;
    const cleaned = s.replace(/[",\s]/g, '').replace(',', '.');
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : null;
  };
  return {
    keyword: c[0],
    searches: parseNum(c[2]),
    competition: c[5],
    cpcLow: parseNum(c[7]),
    cpcHigh: parseNum(c[8]),
  };
});

// ─── B2C / отраслевой шум — отбраковка ──────────────────────────────
const B2C_NOISE = [
  // Бытовое/B2C
  'для готовки', 'для уборки', 'для дома', 'хозяйственные', 'детские',
  'розовые', 'белые', 'зелёные', 'зеленые', 'голубые', 'фиолетовые',
  'для красоты', 'для маникюра', 'тату', 'для салона',
  // Бренды B2C-перчаток (не наши)
  'paclan', 'vileda', 'benovy', 'бенови', 'медиок', 'nitrimax',
  // Генерические
  'gloves перчатки нитриловые', 'gloves',
  // Строительные / другие отрасли
  'кевларовые', 'строительные', 'рабочие', 'нейлоновые',
  // Спорт / зима
  'футбольные', 'вратарские', 'теннис', 'зимние', 'лыжные',
];

// ─── Релевантные B2B-маркеры ────────────────────────────────────────
const B2B_MARKERS = [
  'стерильн', 'cleanroom', 'чистых помещен', 'gmp', 'iso', 'фарм',
  'лаборатор', 'медицин', 'оптом', 'купить', 'нитриловые', 'нитрил',
  'комбинезон', 'халат', 'дезинфект', 'спирт', 'салфетк', 'безворс',
  'индикатор', 'биоиндикатор', 'стерилизац', 'автоклав',
  'моп ', 'мопы', 'тележк', 'очки защитные', 'обувь',
  'contec', 'terragene', 'hydroflex', 'bimos', 'isofield', 'alsico', 'npro',
];

const isB2CNoise = (kw) => {
  const k = kw.toLowerCase();
  return B2C_NOISE.some((w) => k.includes(w));
};
const isB2BRelevant = (kw) => {
  const k = kw.toLowerCase();
  return B2B_MARKERS.some((w) => k.includes(w));
};

// Категоризация
const categorize = (kw) => {
  const k = kw.toLowerCase();
  if (/^(нитрил|перчатки нитрил|перчатки.*стерил|стерильн.*перчат|купить нитрил|перчатки.*оптом|перчатки.*купить|перчатки.*медицин|перчатки.*цена|перчатки.*без пудры|перчатки.*неопудрен|перчатки 300|перчатки.*класс)/.test(k))
    return 'gloves';
  if (/комбинезон|халат|спецодежда|бахил|шапочк|gowning/.test(k)) return 'garments';
  if (/дезинф|антисепт|спирт|ипа|biocide|спорицид|перекис/.test(k)) return 'disinfectants';
  if (/салфетк|wipes|безворс/.test(k)) return 'wipes';
  if (/индикатор|стерилизац|автоклав|bowie|bioиндикатор|биоиндикатор/.test(k)) return 'indicators';
  if (/моп|тележк|уборочн/.test(k)) return 'cleaning';
  if (/очки|goggles/.test(k)) return 'goggles';
  if (/обувь|сабо|footwear/.test(k)) return 'footwear';
  if (/стул|chair/.test(k)) return 'chairs';
  if (/(контаминац|gmp|iso 14644|annex 1|валидац|gowning|env.*monitor|апs|ccs)/.test(k))
    return 'info';
  if (/(ташкент|узбекистан|pharma park|uzbekistan|tashkent)/.test(k)) return 'geo';
  return 'other';
};

const cleaned = [];
const noise = [];

for (const r of records) {
  if (!r.keyword) continue;
  if (isB2CNoise(r.keyword)) {
    noise.push(r);
    continue;
  }
  if (!isB2BRelevant(r.keyword)) {
    // Не явно B2C, но и нет B2B-маркеров — отдельная категория «возможно B2B»
    cleaned.push({ ...r, category: categorize(r.keyword), b2b: 'maybe' });
    continue;
  }
  cleaned.push({ ...r, category: categorize(r.keyword), b2b: 'yes' });
}

console.log(`\nИсходно: ${records.length}`);
console.log(`B2C-шум (отбраковано): ${noise.length}`);
console.log(`Чистое ядро: ${cleaned.length}`);
console.log(`  - Уверенно B2B: ${cleaned.filter((r) => r.b2b === 'yes').length}`);
console.log(`  - Возможно B2B: ${cleaned.filter((r) => r.b2b === 'maybe').length}`);

// Группа по категории
const byCat = {};
for (const r of cleaned) {
  byCat[r.category] = byCat[r.category] || [];
  byCat[r.category].push(r);
}
console.log('\n=== По категориям ===');
for (const [c, items] of Object.entries(byCat).sort((a, b) => b[1].length - a[1].length)) {
  const totalVol = items.reduce((s, r) => s + (r.searches || 0), 0);
  console.log(`  ${c.padEnd(15)} ${String(items.length).padStart(3)} ключ. | ${totalVol} запр./мес`);
}

// Чистый CSV
const out = [
  ['keyword', 'category', 'b2b_signal', 'avg_searches', 'competition', 'cpc_low_usd', 'cpc_high_usd'].join(','),
];
for (const r of cleaned.sort((a, b) => (b.searches || 0) - (a.searches || 0))) {
  out.push(
    [
      `"${r.keyword.replace(/"/g, '""')}"`,
      r.category,
      r.b2b,
      r.searches ?? '',
      r.competition ?? '',
      r.cpcLow ?? '',
      r.cpcHigh ?? '',
    ].join(',')
  );
}
writeFileSync('marketing/demand-research/keyword-core-cleaned.csv', out.join('\n'));
console.log(`\nЧистое ядро записано: marketing/demand-research/keyword-core-cleaned.csv (${cleaned.length} строк)`);

// Топ-30 B2B-уверенных
console.log('\n=== Топ-30 B2B-ключей (по объёму) ===');
const top30 = cleaned
  .filter((r) => r.b2b === 'yes' && r.searches)
  .sort((a, b) => b.searches - a.searches)
  .slice(0, 30);
for (const r of top30) {
  console.log(
    `  ${String(r.searches).padStart(4)} | ${r.category.padEnd(13)} | ${(r.competition || '?').padEnd(10)} | ${r.keyword}`
  );
}
