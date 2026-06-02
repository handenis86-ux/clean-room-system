import { readFileSync } from 'node:fs';

const raw = readFileSync('./kp.csv', 'utf8');
const lines = raw.split(/\r?\n/);
// Skip first 2 metadata rows + header row → data starts at index 3
const headerRow = lines[2].split('\t');
const dataRows = lines.slice(3).filter((r) => r.trim());

const COLS = {
  keyword: 0,
  currency: 1,
  searches: 2,
  qoq: 3,
  yoy: 4,
  competition: 5,
  competitionIdx: 6,
  cpcLow: 7,
  cpcHigh: 8,
};

const records = dataRows.map((row) => {
  const c = row.split('\t');
  const parseNum = (s) => {
    if (!s) return null;
    const cleaned = s.replace(/[",\s]/g, '').replace(',', '.');
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : null;
  };
  return {
    keyword: c[COLS.keyword],
    searches: parseNum(c[COLS.searches]),
    competition: c[COLS.competition],
    cpcLow: parseNum(c[COLS.cpcLow]),
    cpcHigh: parseNum(c[COLS.cpcHigh]),
  };
});

console.log(`Total keywords: ${records.length}`);
console.log(`With searches data: ${records.filter((r) => r.searches !== null).length}`);

// Volume distribution
const buckets = { '0': 0, '1-9': 0, '10-99': 0, '100-999': 0, '1000-9999': 0, '10000+': 0 };
for (const r of records) {
  const s = r.searches ?? 0;
  if (s === 0) buckets['0']++;
  else if (s < 10) buckets['1-9']++;
  else if (s < 100) buckets['10-99']++;
  else if (s < 1000) buckets['100-999']++;
  else if (s < 10000) buckets['1000-9999']++;
  else buckets['10000+']++;
}
console.log('\n=== Volume distribution ===');
for (const [b, n] of Object.entries(buckets)) console.log(`  ${b.padEnd(12)} ${n}`);

// Competition distribution
const compDist = {};
for (const r of records) {
  const c = r.competition || 'Не указано';
  compDist[c] = (compDist[c] || 0) + 1;
}
console.log('\n=== Competition distribution ===');
for (const [c, n] of Object.entries(compDist)) console.log(`  ${c.padEnd(15)} ${n}`);

// Top 50 by volume
console.log('\n=== Top 50 by Avg monthly searches ===');
const sorted = records.filter((r) => r.searches).sort((a, b) => b.searches - a.searches).slice(0, 50);
for (const r of sorted) {
  console.log(
    `  ${String(r.searches).padStart(6)} | ${(r.competition || '?').padEnd(10)} | $${(r.cpcLow ?? 0).toFixed(2)}-${(r.cpcHigh ?? 0).toFixed(2)} | ${r.keyword}`
  );
}

// Categorize by intent (simple heuristic)
const transWords = ['купить', 'оптом', 'заказать', 'цена', 'стоимость', 'дёшево', 'дешево', 'недорого', 'продажа', 'поставщик', 'sell', 'buy', 'price', 'wholesale', 'order'];
const infoWords = ['что', 'как', 'почему', 'разница', 'отличие', 'что это', 'инструкция', 'how', 'what', 'why', 'difference', 'guide', 'standard', 'requirements', 'требования'];
const brandWords = ['contec', 'terragene', 'bimos', 'hydroflex', 'alsico', 'isofield', 'lakeland', 'npro', 'tyvek', 'kimberly', 'ansell', 'texwipe'];
const geoWords = ['ташкент', 'узбекистан', 'pharma park', 'tashkent', 'uzbekistan', 'самарканд', 'андижан'];

const categorize = (kw) => {
  const k = kw.toLowerCase();
  if (brandWords.some((w) => k.includes(w))) return 'brand';
  if (geoWords.some((w) => k.includes(w))) return 'geo';
  if (transWords.some((w) => k.includes(w))) return 'transactional';
  if (infoWords.some((w) => k.includes(w))) return 'info';
  return 'general';
};

const intentBuckets = {};
for (const r of records.filter((x) => x.searches)) {
  const i = categorize(r.keyword);
  if (!intentBuckets[i]) intentBuckets[i] = { count: 0, totalVolume: 0 };
  intentBuckets[i].count++;
  intentBuckets[i].totalVolume += r.searches;
}
console.log('\n=== Intent distribution (with non-zero volume) ===');
for (const [i, b] of Object.entries(intentBuckets)) {
  console.log(`  ${i.padEnd(15)} count=${b.count}, total volume=${b.totalVolume}`);
}

// Total searched volume
const totalVolume = records.reduce((s, r) => s + (r.searches || 0), 0);
console.log(`\n=== TOTAL volume across all 349 keywords: ${totalVolume.toLocaleString()} searches/month ===`);
