import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const files = ['kp.csv', ...readdirSync('.').filter((f) => f.startsWith('kp_') && f.endsWith('.csv'))];

const all = new Map(); // dedup by keyword

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  const lines = raw.split(/\r?\n/);
  const dataRows = lines.slice(3).filter((r) => r.trim());

  for (const row of dataRows) {
    const c = row.split('\t');
    const kw = c[0]?.trim();
    if (!kw) continue;
    const parseNum = (s) => {
      if (!s) return null;
      const cleaned = s.replace(/[",\s]/g, '').replace(',', '.');
      const n = parseFloat(cleaned);
      return Number.isFinite(n) ? n : null;
    };
    const rec = {
      keyword: kw,
      searches: parseNum(c[2]),
      competition: c[5] || '',
      cpcLow: parseNum(c[7]),
      cpcHigh: parseNum(c[8]),
      source: file,
    };
    // если уже видели — берём максимум объёма / лучшие данные
    if (all.has(kw.toLowerCase())) {
      const existing = all.get(kw.toLowerCase());
      if ((rec.searches || 0) > (existing.searches || 0)) {
        all.set(kw.toLowerCase(), { ...existing, ...rec });
      }
    } else {
      all.set(kw.toLowerCase(), rec);
    }
  }
}

const records = Array.from(all.values());
console.log(`Объединено: ${records.length} уникальных ключей`);

// ─── B2C / отраслевой шум ──────────────────────────────────────────
const B2C_NOISE = [
  'для готовки', 'для уборки', 'для дома', 'хозяйственные', 'детские',
  'для красоты', 'для маникюра', 'тату', 'для салона', 'для машины',
  'paclan', 'vileda', 'benovy', 'бенови', 'медиок', 'nitrimax',
  'кевларовые', 'строительные', 'рабочие', 'нейлоновые', 'муфта',
  'футбольные', 'вратарские', 'теннис', 'зимние', 'лыжные', 'велосипедные',
  'варежки', 'митенки',
];
const isB2CNoise = (kw) => {
  const k = kw.toLowerCase();
  return B2C_NOISE.some((w) => k.includes(w));
};

// ─── Категоризация ─────────────────────────────────────────────────
const categorize = (kw) => {
  const k = kw.toLowerCase();
  if (/комбинезон|coverall|halat|халат|спецодежд|gowning|tyvek|isofield|alsico|lakeland/.test(k))
    return 'garments';
  if (/бахил|шапочк|маск(а|и|у|ой|ам)/.test(k)) return 'garments';
  if (/нитрил|перчат|glove|латексн|виниловые/.test(k)) return 'gloves';
  if (/дезинф|антисепт|спирт|ипа|biocide|спорицид|перекис|sterillium/.test(k))
    return 'disinfectants';
  if (/салфетк|wipes|безворс|prosat|satwipes|kimtech|texwipe/.test(k)) return 'wipes';
  if (/индикатор|стерилизац|автоклав|bowie|биоиндикатор|terragene|bt60|интегратор|sterility/.test(k))
    return 'indicators';
  if (/моп ?\b|мопы|тележк|уборочн|hydroflex|purmop/.test(k)) return 'cleaning';
  if (/очки|goggles|isoclave/.test(k)) return 'goggles';
  if (/обувь|сабо|footwear|toffeln/.test(k)) return 'footwear';
  if (/стул|chair|bimos/.test(k)) return 'chairs';
  if (/липк|sticky.*mat|коврик/.test(k)) return 'sticky-mats';
  if (/(контаминац|gmp|iso 14644|annex 1|валидац|env.*monitor|апs|aps|ccs|smf|vmp|валидаци|серти(фикат|фикац))/.test(k))
    return 'info';
  if (/(ташкент|узбекистан|pharma park|uzbekistan|tashkent|самарканд|андижан)/.test(k))
    return 'geo';
  if (/(оптом|поставщик|купить.*расходн|оснащ.*чист|distributor|wholesale)/.test(k))
    return 'b2b-general';
  return 'other';
};

// ─── Intent ────────────────────────────────────────────────────────
const intent = (kw) => {
  const k = kw.toLowerCase();
  if (/(куплю|купить|оптом|заказ|цена|стоимость|поставщик|wholesale|buy|price)/.test(k))
    return 'transactional';
  if (/(contec|terragene|bimos|hydroflex|alsico|isofield|tyvek|lakeland|npro|ansell|kimtech|texwipe|kimberly|tomson|sterillium)/.test(k))
    return 'brand';
  if (/(что|как|разница|отличие|how|what|difference|why|почему|зачем)/.test(k))
    return 'info';
  if (/(ташкент|узбекистан|tashkent|uzbekistan|pharma park|самарканд|андижан)/.test(k))
    return 'geo';
  return 'general';
};

const cleaned = [];
const noise = [];

for (const r of records) {
  if (isB2CNoise(r.keyword)) {
    noise.push(r);
    continue;
  }
  cleaned.push({
    ...r,
    category: categorize(r.keyword),
    intent: intent(r.keyword),
  });
}

console.log(`B2C-шум: ${noise.length}`);
console.log(`Чистое ядро: ${cleaned.length}\n`);

// === Свод по категориям ===
const byCat = {};
for (const r of cleaned) {
  byCat[r.category] = byCat[r.category] || { count: 0, vol: 0 };
  byCat[r.category].count++;
  byCat[r.category].vol += r.searches || 0;
}
console.log('=== По категориям ===');
const sortedCats = Object.entries(byCat).sort((a, b) => b[1].vol - a[1].vol);
for (const [c, b] of sortedCats) {
  console.log(`  ${c.padEnd(15)} ${String(b.count).padStart(3)} ключ. | ${String(b.vol).padStart(5)} запр./мес`);
}

// === Свод по intent ===
const byIntent = {};
for (const r of cleaned) {
  byIntent[r.intent] = byIntent[r.intent] || { count: 0, vol: 0 };
  byIntent[r.intent].count++;
  byIntent[r.intent].vol += r.searches || 0;
}
console.log('\n=== По intent ===');
for (const [i, b] of Object.entries(byIntent).sort((a, b) => b[1].vol - a[1].vol)) {
  console.log(`  ${i.padEnd(15)} ${String(b.count).padStart(3)} ключ. | ${String(b.vol).padStart(5)} запр./мес`);
}

// === Топ-50 по volume в B2B-категориях ===
const b2bCats = ['gloves', 'garments', 'disinfectants', 'wipes', 'indicators', 'cleaning', 'goggles', 'chairs', 'footwear', 'sticky-mats', 'info', 'geo', 'b2b-general'];
const top = cleaned
  .filter((r) => b2bCats.includes(r.category) && r.searches)
  .sort((a, b) => b.searches - a.searches)
  .slice(0, 60);
console.log('\n=== Топ-60 B2B-ключей ===');
for (const r of top) {
  const cpc = r.cpcLow ? `$${r.cpcLow.toFixed(2)}-${(r.cpcHigh || 0).toFixed(2)}` : '—';
  console.log(
    `  ${String(r.searches).padStart(4)} | ${(r.category || 'other').padEnd(13)} | ${(r.competition || '?').padEnd(10)} | ${cpc.padEnd(13)} | ${r.keyword}`
  );
}

// === Экспорт ===
const out = [
  ['keyword', 'category', 'intent', 'avg_searches', 'competition', 'cpc_low_usd', 'cpc_high_usd'].join(','),
];
for (const r of cleaned.sort((a, b) => (b.searches || 0) - (a.searches || 0))) {
  out.push(
    [
      `"${r.keyword.replace(/"/g, '""')}"`,
      r.category,
      r.intent,
      r.searches ?? '',
      r.competition ?? '',
      r.cpcLow ?? '',
      r.cpcHigh ?? '',
    ].join(',')
  );
}
writeFileSync('marketing/demand-research/keyword-core-merged.csv', out.join('\n'));
console.log(`\nЗаписано: marketing/demand-research/keyword-core-merged.csv (${cleaned.length} строк)`);

const totalVol = cleaned.reduce((s, r) => s + (r.searches || 0), 0);
console.log(`\n*** ИТОГО: ${cleaned.length} чистых ключей, ${totalVol.toLocaleString()} запросов/мес в Узбекистане ***`);
