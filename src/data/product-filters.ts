import type { Product } from './products';

export type GmpClass = 'A' | 'B' | 'C' | 'D';
export type IsoClass = '3' | '4' | '5' | '6' | '7' | '8';

export const ALL_GMP_CLASSES: GmpClass[] = ['A', 'B', 'C', 'D'];
export const ALL_ISO_CLASSES: IsoClass[] = ['3', '4', '5', '6', '7', '8'];

export interface ProductFilters {
  /** Empty array = GMP-класс не указан в карточке (т.е. фильтр по GMP не применим). */
  gmpClasses: GmpClass[];
  /** Empty array = ISO-класс не указан. */
  isoClasses: IsoClass[];
  /** Нормализованное имя бренда. null = не определён. */
  brand: string | null;
  /** Стерильность: true / false / null (не указано). */
  isSterile: boolean | null;
}

const GMP_LABELS = new Set([
  'Класс чистоты EU GMP',
  'Класс чистоты GMP',
  'EU GMP',
  'GMP класс',
]);

const ISO_LABELS = new Set([
  'Класс чистоты ISO 14644-1',
  'Класс чистоты ISO 14644',
  'ISO 14644-1',
  'ISO 14644',
]);

const BRAND_LABELS = new Set(['Производитель', 'Торговая марка', 'Бренд']);
const STERILE_LABELS = new Set(['Стерильно', 'Стерильность']);

/**
 * Известные бренды для fallback-распознавания по первому слову `name`.
 * Порядок важен: первый match выигрывает (длинные строки идут раньше).
 */
const KNOWN_BRAND_PREFIXES: ReadonlyArray<{ pattern: RegExp; brand: string }> = [
  { pattern: /^IBC\s+Nanotex\b/i, brand: 'IBC Nanotex' },
  { pattern: /^Bionova\s+Terragene\b/i, brand: 'Terragene' },
  { pattern: /^Bionova\b/i, brand: 'Bionova' },
  { pattern: /^Terragene\b/i, brand: 'Terragene' },
  { pattern: /^Contec\b/i, brand: 'Contec' },
  { pattern: /^Isofield\b/i, brand: 'Isofield' },
  { pattern: /^Diversey\b/i, brand: 'Diversey' },
  { pattern: /^TINMAN\b/i, brand: 'TINMAN' },
  { pattern: /^Shield\b/i, brand: 'Shield' },
  { pattern: /^Hydroflex\b/i, brand: 'Hydroflex' },
  { pattern: /^SAFEGARD\b/i, brand: 'SAFEGARD' },
  { pattern: /^Neokhim\b/i, brand: 'Neokhim' },
  { pattern: /^Cleavers\b/i, brand: 'Cleavers' },
  { pattern: /^Alsico\b/i, brand: 'Alsico' },
  { pattern: /^BIMOS\b/i, brand: 'BIMOS' },
  { pattern: /^WearerTech\b/i, brand: 'WearerTech' },
  { pattern: /^Toffeln\b/i, brand: 'WearerTech' },
];

/**
 * Нормализует значение `Производитель` к канон-имени бренда:
 *   'Hydroflex (Германия)' → 'Hydroflex'
 *   'BIMOS (Германия)' → 'BIMOS'
 *   'Alsico (Бельгия)' → 'Alsico'
 *   'WearerTech (Toffeln), Великобритания' → 'WearerTech'
 *   'Bionova Terragene (Аргентина)' → 'Terragene'
 */
function normalizeBrandValue(raw: string): string {
  const trimmed = raw.trim();
  // Отрезаем всё в скобках и после запятой.
  const stripped = trimmed.replace(/\s*\(.*$/, '').replace(/,.*$/, '').trim();

  // Маппинги для частных случаев.
  if (/^Bionova\s+Terragene/i.test(stripped)) return 'Terragene';

  // Поищем match по известным брендам — это сохраняет канон-написание.
  for (const { pattern, brand } of KNOWN_BRAND_PREFIXES) {
    if (pattern.test(stripped)) return brand;
  }
  return stripped;
}

function parseGmpClasses(value: string): GmpClass[] {
  // 'Класс A, B, C, D' / 'Класс A' / 'Все классы' / 'Класс A, B, D'
  if (/все\s+класс/i.test(value)) return [...ALL_GMP_CLASSES];
  const found = new Set<GmpClass>();
  const re = /\b([ABCD])\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    found.add(m[1] as GmpClass);
  }
  return ALL_GMP_CLASSES.filter((c) => found.has(c));
}

function parseIsoClasses(value: string): IsoClass[] {
  // 'ISO 4' / 'ISO 4, 5, 6' / 'ISO 4, ISO 5' / 'ISO 3, ISO 4, ISO 5, ISO 6, ISO 8'
  const found = new Set<IsoClass>();
  const re = /(\d)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(value)) !== null) {
    const d = m[1];
    if ((ALL_ISO_CLASSES as readonly string[]).includes(d)) {
      found.add(d as IsoClass);
    }
  }
  return ALL_ISO_CLASSES.filter((c) => found.has(c));
}

function parseSterile(value: string, fallbackText: string | undefined): boolean | null {
  const v = value.trim().toLowerCase();
  if (v.startsWith('да')) return true;
  if (v.startsWith('нет')) return false;
  if (fallbackText && /стерильн[аы][ея]?|sterile/i.test(fallbackText)) return true;
  return null;
}

/** Парсит фильтрационные поля из продукта. */
export function extractProductFilters(product: Product): ProductFilters {
  let gmpClasses: GmpClass[] = [];
  let isoClasses: IsoClass[] = [];
  let brand: string | null = null;
  let isSterile: boolean | null = null;

  for (const spec of product.specs ?? []) {
    if (GMP_LABELS.has(spec.label)) {
      gmpClasses = parseGmpClasses(spec.value);
    } else if (ISO_LABELS.has(spec.label)) {
      isoClasses = parseIsoClasses(spec.value);
    } else if (BRAND_LABELS.has(spec.label)) {
      brand = normalizeBrandValue(spec.value);
    } else if (STERILE_LABELS.has(spec.label)) {
      isSterile = parseSterile(spec.value, product.description);
    }
  }

  // Fallback бренда: по началу имени продукта.
  if (!brand) {
    for (const { pattern, brand: b } of KNOWN_BRAND_PREFIXES) {
      if (pattern.test(product.name)) {
        brand = b;
        break;
      }
    }
  }

  // Fallback стерильности: по описанию или имени, если spec не было.
  if (isSterile === null) {
    const text = `${product.name} ${product.description ?? ''}`;
    if (/нестерильн/i.test(text)) {
      isSterile = false;
    } else if (/стерильн/i.test(text)) {
      isSterile = true;
    }
  }

  return { gmpClasses, isoClasses, brand, isSterile };
}

/**
 * Короткие метки методов стерилизации для индикаторов.
 *
 * Индикаторы — самая большая категория каталога (38 SKU), и ни один из четырёх
 * общих признаков (GMP-класс, ISO, стерильность, бренд) к ним не применим: их
 * выбирают по методу стерилизации, под который индикатор рассчитан. Значение в
 * спецификации развёрнутое («Автоклавирование (пар) 121–135 °C»), для списка
 * нужна короткая метка. Одно значение может дать несколько меток
 * («Газовая (EtO) или сухой жар» → EtO + Сухой жар).
 */
const STERILIZATION_METHOD_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /автоклав|паров|\bпар\b|steam/i, label: 'Пар' },
  { pattern: /окис[ьи]\s*этилена|\bEtO\b|\bЭО\b|этиленоксид/i, label: 'EtO' },
  { pattern: /перекис|VH2O2|H2O2/i, label: 'VH2O2' },
  { pattern: /LTSF|формальдегид/i, label: 'LTSF' },
  { pattern: /сух(ой|им)\s*жар/i, label: 'Сухой жар' },
];

export function extractSterilizationMethods(product: Product): string[] {
  const raw = (product.specs ?? [])
    .filter((s) => /метод[ыа]?\s+стерилизаци/i.test(s.label))
    .map((s) => s.value)
    .join(' | ');
  if (!raw) return [];
  const out: string[] = [];
  for (const { pattern, label } of STERILIZATION_METHOD_PATTERNS) {
    if (pattern.test(raw) && !out.includes(label)) out.push(label);
  }
  return out;
}

/** Какие из 4 размерностей реально применимы к этой категории. */
export interface CategoryAvailableFilters {
  gmpClasses: GmpClass[];
  isoClasses: IsoClass[];
  brands: string[];
  hasSterile: boolean;
}

export function getCategoryAvailableFilters(
  products: Product[]
): CategoryAvailableFilters {
  const gmp = new Set<GmpClass>();
  const iso = new Set<IsoClass>();
  const brands = new Set<string>();
  let hasSterileTrue = false;
  let hasSterileFalse = false;

  for (const p of products) {
    const f = extractProductFilters(p);
    f.gmpClasses.forEach((c) => gmp.add(c));
    f.isoClasses.forEach((c) => iso.add(c));
    if (f.brand) brands.add(f.brand);
    if (f.isSterile === true) hasSterileTrue = true;
    if (f.isSterile === false) hasSterileFalse = true;
  }

  return {
    gmpClasses: ALL_GMP_CLASSES.filter((c) => gmp.has(c)),
    isoClasses: ALL_ISO_CLASSES.filter((c) => iso.has(c)),
    brands: Array.from(brands).sort((a, b) => a.localeCompare(b, 'ru')),
    // Показываем фильтр стерильности, только если есть оба варианта (иначе бессмысленен).
    hasSterile: hasSterileTrue && hasSterileFalse,
  };
}

/** Селекция активных фильтров пользователя. */
export interface ActiveFilters {
  gmp: Set<GmpClass>;
  iso: Set<IsoClass>;
  brands: Set<string>;
  /** 'yes' / 'no' / null (показывать всё). */
  sterile: 'yes' | 'no' | null;
}

export function emptyActiveFilters(): ActiveFilters {
  return { gmp: new Set(), iso: new Set(), brands: new Set(), sterile: null };
}

export function isAnyFilterActive(a: ActiveFilters): boolean {
  return a.gmp.size > 0 || a.iso.size > 0 || a.brands.size > 0 || a.sterile !== null;
}

/** Проходит ли продукт через активные фильтры. */
export function productMatchesFilters(
  productFilters: ProductFilters,
  active: ActiveFilters
): boolean {
  if (active.gmp.size > 0) {
    if (productFilters.gmpClasses.length === 0) return false;
    const hit = productFilters.gmpClasses.some((c) => active.gmp.has(c));
    if (!hit) return false;
  }
  if (active.iso.size > 0) {
    if (productFilters.isoClasses.length === 0) return false;
    const hit = productFilters.isoClasses.some((c) => active.iso.has(c));
    if (!hit) return false;
  }
  if (active.brands.size > 0) {
    if (!productFilters.brand || !active.brands.has(productFilters.brand)) {
      return false;
    }
  }
  if (active.sterile !== null) {
    if (productFilters.isSterile === null) return false;
    if (active.sterile === 'yes' && productFilters.isSterile !== true) return false;
    if (active.sterile === 'no' && productFilters.isSterile !== false) return false;
  }
  return true;
}
