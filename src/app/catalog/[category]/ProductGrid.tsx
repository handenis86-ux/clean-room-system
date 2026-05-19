'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Package, Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Product, productSlug } from '@/data/products';
import { getProductImage } from '@/data/product-images';
import CompareCheckbox from '@/components/compare/CompareCheckbox';
import {
  ALL_GMP_CLASSES,
  ALL_ISO_CLASSES,
  GmpClass,
  IsoClass,
  ActiveFilters,
  emptyActiveFilters,
  extractProductFilters,
  getCategoryAvailableFilters,
  isAnyFilterActive,
  productMatchesFilters,
} from '@/data/product-filters';

interface ProductGridProps {
  products: Product[];
  categorySlug: string;
  categoryImage: string;
}

/** Минимум продуктов, при котором имеет смысл показывать фильтр-панель. */
const MIN_PRODUCTS_FOR_FILTERS = 4;

export default function ProductGrid({
  products,
  categorySlug,
  categoryImage,
}: ProductGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Pre-compute filters per product (memoized).
  const productFilters = useMemo(
    () => products.map((p) => ({ product: p, filters: extractProductFilters(p) })),
    [products]
  );

  // 2. Available filter values for this category.
  const available = useMemo(
    () => getCategoryAvailableFilters(products),
    [products]
  );

  // 3. Should we render the filter panel at all?
  const showFilters =
    products.length >= MIN_PRODUCTS_FOR_FILTERS &&
    (available.gmpClasses.length > 0 ||
      available.isoClasses.length > 0 ||
      available.brands.length > 0 ||
      available.hasSterile);

  // 4. Active filters parsed from URL.
  const active: ActiveFilters = useMemo(() => {
    const a = emptyActiveFilters();
    const gmpParam = searchParams.get('gmp');
    if (gmpParam) {
      gmpParam
        .split(',')
        .map((s) => s.trim().toUpperCase())
        .filter((s): s is GmpClass =>
          (ALL_GMP_CLASSES as readonly string[]).includes(s)
        )
        .forEach((c) => a.gmp.add(c));
    }
    const isoParam = searchParams.get('iso');
    if (isoParam) {
      isoParam
        .split(',')
        .map((s) => s.trim())
        .filter((s): s is IsoClass =>
          (ALL_ISO_CLASSES as readonly string[]).includes(s)
        )
        .forEach((c) => a.iso.add(c));
    }
    const brandParam = searchParams.get('brand');
    if (brandParam) {
      brandParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((b) => a.brands.add(b));
    }
    const sterileParam = searchParams.get('sterile');
    if (sterileParam === 'yes' || sterileParam === 'no') {
      a.sterile = sterileParam;
    }
    return a;
  }, [searchParams]);

  // 5. Sync filters to URL.
  const updateUrl = useCallback(
    (next: ActiveFilters, nextSearch?: string) => {
      const params = new URLSearchParams();
      if (next.gmp.size > 0) {
        params.set('gmp', ALL_GMP_CLASSES.filter((c) => next.gmp.has(c)).join(','));
      }
      if (next.iso.size > 0) {
        params.set('iso', ALL_ISO_CLASSES.filter((c) => next.iso.has(c)).join(','));
      }
      if (next.brands.size > 0) {
        params.set('brand', Array.from(next.brands).join(','));
      }
      if (next.sterile) {
        params.set('sterile', next.sterile);
      }
      const q = nextSearch !== undefined ? nextSearch : searchParams.get('q');
      if (q) params.set('q', q);
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : '?', { scroll: false });
    },
    [router, searchParams]
  );

  const toggleGmp = (c: GmpClass) => {
    const next: ActiveFilters = {
      gmp: new Set(active.gmp),
      iso: new Set(active.iso),
      brands: new Set(active.brands),
      sterile: active.sterile,
    };
    if (next.gmp.has(c)) next.gmp.delete(c);
    else next.gmp.add(c);
    updateUrl(next);
  };

  const toggleIso = (c: IsoClass) => {
    const next: ActiveFilters = {
      gmp: new Set(active.gmp),
      iso: new Set(active.iso),
      brands: new Set(active.brands),
      sterile: active.sterile,
    };
    if (next.iso.has(c)) next.iso.delete(c);
    else next.iso.add(c);
    updateUrl(next);
  };

  const toggleBrand = (b: string) => {
    const next: ActiveFilters = {
      gmp: new Set(active.gmp),
      iso: new Set(active.iso),
      brands: new Set(active.brands),
      sterile: active.sterile,
    };
    if (next.brands.has(b)) next.brands.delete(b);
    else next.brands.add(b);
    updateUrl(next);
  };

  const setSterile = (s: 'yes' | 'no' | null) => {
    const next: ActiveFilters = {
      gmp: new Set(active.gmp),
      iso: new Set(active.iso),
      brands: new Set(active.brands),
      sterile: s,
    };
    updateUrl(next);
  };

  const resetAll = () => {
    updateUrl(emptyActiveFilters(), '');
    setSearch('');
  };

  // 6. Text search state — kept in URL too so refresh preserves it.
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '');

  // Push search to URL with debounce.
  useEffect(() => {
    const t = setTimeout(() => {
      const current = searchParams.get('q') ?? '';
      if (current !== search) {
        updateUrl(active, search);
      }
    }, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // 7. Actual filtering.
  const filteredProducts = useMemo(() => {
    const anyFilter = isAnyFilterActive(active);
    const q = search.trim().toLowerCase();
    return productFilters
      .filter(({ product, filters }) => {
        if (anyFilter && !productMatchesFilters(filters, active)) return false;
        if (q) {
          if (
            !product.name.toLowerCase().includes(q) &&
            !product.sku.toLowerCase().includes(q)
          ) {
            return false;
          }
        }
        return true;
      })
      .map(({ product }) => product);
  }, [productFilters, active, search]);

  const activeChipCount =
    active.gmp.size +
    active.iso.size +
    active.brands.size +
    (active.sterile ? 1 : 0);

  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  // 8. Filter panel JSX.
  const filterPanel = showFilters ? (
    <FilterPanel
      available={available}
      active={active}
      onToggleGmp={toggleGmp}
      onToggleIso={toggleIso}
      onToggleBrand={toggleBrand}
      onSetSterile={setSterile}
      onReset={resetAll}
    />
  ) : null;

  return (
    <div className={showFilters ? 'lg:grid lg:grid-cols-[240px_1fr] lg:gap-8' : ''}>
      {/* Filter sidebar (desktop) */}
      {filterPanel && (
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filterPanel}</div>
        </aside>
      )}

      <div>
        {/* Search + count + mobile filter toggle */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-[400px]">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию или артикулу..."
              className="w-full h-[44px] pl-10 pr-4 text-[14px] rounded-lg border border-surface-input bg-white text-text-dark placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
            />
          </div>

          {showFilters && (
            <button
              type="button"
              onClick={() => setMobilePanelOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center gap-2 h-[44px] px-4 rounded-lg border border-surface-input bg-white text-[14px] font-semibold text-text-dark hover:border-brand transition-colors"
            >
              <SlidersHorizontal size={16} />
              Фильтры
              {activeChipCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-brand text-white text-[11px] font-bold">
                  {activeChipCount}
                </span>
              )}
              <ChevronDown
                size={14}
                className={`transition-transform ${mobilePanelOpen ? 'rotate-180' : ''}`}
              />
            </button>
          )}

          <p className="text-[14px] text-text">
            {isAnyFilterActive(active) || search ? (
              <>
                Показано{' '}
                <span className="font-semibold text-text-dark">
                  {filteredProducts.length}
                </span>{' '}
                из {products.length}{' '}
                {pluralize(products.length, ['товара', 'товаров', 'товаров'])}
              </>
            ) : (
              <>
                Найдено{' '}
                <span className="font-semibold text-text-dark">
                  {filteredProducts.length}
                </span>{' '}
                {pluralize(filteredProducts.length, ['товар', 'товара', 'товаров'])}
              </>
            )}
          </p>
        </div>

        {/* Active filter chips */}
        {showFilters && activeChipCount > 0 && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {ALL_GMP_CLASSES.filter((c) => active.gmp.has(c)).map((c) => (
              <Chip key={`gmp-${c}`} label={`GMP ${c}`} onRemove={() => toggleGmp(c)} />
            ))}
            {ALL_ISO_CLASSES.filter((c) => active.iso.has(c)).map((c) => (
              <Chip key={`iso-${c}`} label={`ISO ${c}`} onRemove={() => toggleIso(c)} />
            ))}
            {Array.from(active.brands).map((b) => (
              <Chip key={`brand-${b}`} label={b} onRemove={() => toggleBrand(b)} />
            ))}
            {active.sterile && (
              <Chip
                label={active.sterile === 'yes' ? 'Стерильные' : 'Нестерильные'}
                onRemove={() => setSterile(null)}
              />
            )}
            <button
              type="button"
              onClick={resetAll}
              className="text-[13px] font-semibold text-brand hover:text-brand-dark underline underline-offset-2"
            >
              Сбросить всё
            </button>
          </div>
        )}

        {/* Mobile filter panel (collapsible) */}
        {filterPanel && mobilePanelOpen && (
          <div className="lg:hidden mb-6">{filterPanel}</div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const pImage = getProductImage(product.sku);
            const slug = productSlug(product.sku);
            return (
              <Link
                key={product.sku}
                href={`/catalog/${categorySlug}/${slug}`}
                className="group rounded-xl bg-white border border-surface-stroke shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-white flex items-center justify-center p-6">
                  <div className="absolute top-2 right-2 z-20">
                    <CompareCheckbox
                      sku={product.sku}
                      name={product.name}
                      categorySlug={categorySlug}
                    />
                  </div>
                  {pImage ? (
                    <Image
                      src={pImage}
                      alt={product.name}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized
                    />
                  ) : (
                    <>
                      <Image
                        src={categoryImage}
                        alt={product.name}
                        fill
                        className="object-cover opacity-30"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="relative z-10 w-16 h-16 rounded-full bg-brand-light flex items-center justify-center">
                        <Package size={28} className="text-brand" />
                      </div>
                    </>
                  )}
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
                    Арт: {product.sku}
                  </p>
                  <h3 className="text-[15px] font-bold text-brand-dark leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-[13px] text-text leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <span className="mt-auto pt-3 text-[13px] font-semibold text-brand group-hover:text-brand-dark transition-colors flex items-center gap-1">
                    Подробнее &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[16px] text-text-muted mb-4">
              Товары не найдены. Попробуйте изменить фильтры или поисковый запрос.
            </p>
            {(isAnyFilterActive(active) || search) && (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center px-5 py-2.5 text-[14px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-dark transition-colors"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Filter panel ---------------- */

interface FilterPanelProps {
  available: ReturnType<typeof getCategoryAvailableFilters>;
  active: ActiveFilters;
  onToggleGmp: (c: GmpClass) => void;
  onToggleIso: (c: IsoClass) => void;
  onToggleBrand: (b: string) => void;
  onSetSterile: (s: 'yes' | 'no' | null) => void;
  onReset: () => void;
}

function FilterPanel({
  available,
  active,
  onToggleGmp,
  onToggleIso,
  onToggleBrand,
  onSetSterile,
  onReset,
}: FilterPanelProps) {
  const anyActive = isAnyFilterActive(active);

  return (
    <div className="rounded-xl border border-surface-border bg-white p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-bold text-text-dark uppercase tracking-wider">
          Фильтры
        </h3>
        {anyActive && (
          <button
            type="button"
            onClick={onReset}
            className="text-[12px] font-semibold text-brand hover:text-brand-dark underline underline-offset-2"
          >
            Сбросить
          </button>
        )}
      </div>

      {available.gmpClasses.length > 0 && (
        <FilterGroup title="Класс GMP">
          <div className="flex flex-wrap gap-2">
            {available.gmpClasses.map((c) => (
              <CheckboxPill
                key={c}
                label={`Класс ${c}`}
                checked={active.gmp.has(c)}
                onChange={() => onToggleGmp(c)}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {available.isoClasses.length > 0 && (
        <FilterGroup title="ISO 14644-1">
          <div className="flex flex-wrap gap-2">
            {available.isoClasses.map((c) => (
              <CheckboxPill
                key={c}
                label={`ISO ${c}`}
                checked={active.iso.has(c)}
                onChange={() => onToggleIso(c)}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      {available.brands.length > 0 && (
        <FilterGroup title="Бренд">
          <ul className="space-y-1.5">
            {available.brands.map((b) => (
              <li key={b}>
                <label className="flex items-center gap-2 cursor-pointer text-[13px] text-text-dark hover:text-brand transition-colors">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-surface-input text-brand focus:ring-brand"
                    checked={active.brands.has(b)}
                    onChange={() => onToggleBrand(b)}
                  />
                  <span>{b}</span>
                </label>
              </li>
            ))}
          </ul>
        </FilterGroup>
      )}

      {available.hasSterile && (
        <FilterGroup title="Стерильность">
          <div className="space-y-1.5">
            <RadioOption
              name="sterile"
              label="Все"
              checked={active.sterile === null}
              onChange={() => onSetSterile(null)}
            />
            <RadioOption
              name="sterile"
              label="Стерильные"
              checked={active.sterile === 'yes'}
              onChange={() => onSetSterile('yes')}
            />
            <RadioOption
              name="sterile"
              label="Нестерильные"
              checked={active.sterile === 'no'}
              onChange={() => onSetSterile('no')}
            />
          </div>
        </FilterGroup>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[12px] font-semibold text-text-muted uppercase tracking-wider mb-2.5">
        {title}
      </h4>
      {children}
    </div>
  );
}

function CheckboxPill({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={checked}
      className={`inline-flex items-center px-3 py-1.5 rounded-md text-[13px] font-semibold border transition-colors ${
        checked
          ? 'bg-brand text-white border-brand'
          : 'bg-white text-text-dark border-surface-input hover:border-brand hover:text-brand'
      }`}
    >
      {label}
    </button>
  );
}

function RadioOption({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-[13px] text-text-dark hover:text-brand transition-colors">
      <input
        type="radio"
        name={name}
        className="h-4 w-4 border-surface-input text-brand focus:ring-brand"
        checked={checked}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-light text-brand-dark text-[12px] font-semibold border border-brand/20">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Убрать фильтр ${label}`}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-brand hover:text-white transition-colors"
      >
        <X size={12} />
      </button>
    </span>
  );
}

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return forms[1];
  return forms[2];
}
