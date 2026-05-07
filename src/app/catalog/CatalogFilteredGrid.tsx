'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
import { gmpAnnex1Mapping } from '@/data/gmp-annex1-mapping';

interface CategoryShape {
  slug: string;
  title: string;
  description: string;
  image: string;
  products: { sku: string }[];
  group?: 'consumables' | 'furniture';
}

interface CatalogFilteredGridProps {
  categories: CategoryShape[];
}

const ANNEX_SECTIONS: { id: string; label: string; title: string }[] = [
  { id: '3', label: '§3', title: 'PQS / CCS' },
  { id: '4', label: '§4', title: 'Personnel' },
  { id: '5', label: '§5', title: 'Premises' },
  { id: '6', label: '§6', title: 'Equipment' },
  { id: '7', label: '§7', title: 'Utilities' },
  { id: '8', label: '§8', title: 'Production' },
  { id: '9', label: '§9', title: 'Monitoring' },
  { id: '10', label: '§10', title: 'QC' },
  { id: '11', label: '§11', title: 'Disinfection' },
];

function matchesSection(categorySlug: string, sectionId: string): boolean {
  const refs = gmpAnnex1Mapping[categorySlug] || [];
  const re = new RegExp(`§${sectionId}(\\.|$|-|\\s)`);
  return refs.some((r) => re.test(r.section));
}

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return forms[1];
  return forms[2];
}

export default function CatalogFilteredGrid({
  categories,
}: CatalogFilteredGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = searchParams.get('annex');

  const sectionsWithCounts = useMemo(
    () =>
      ANNEX_SECTIONS.map((s) => ({
        ...s,
        count: categories.filter((c) => matchesSection(c.slug, s.id)).length,
      })).filter((s) => s.count > 0),
    [categories]
  );

  const filteredCategories = useMemo(() => {
    if (!active) return categories;
    return categories.filter((c) => matchesSection(c.slug, active));
  }, [categories, active]);

  const setFilter = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set('annex', id);
    else params.delete('annex');
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const activeMeta = active
    ? ANNEX_SECTIONS.find((s) => s.id === active)
    : null;

  return (
    <>
      {/* Filter pills */}
      <div className="mb-8">
        <p className="text-[12px] font-semibold text-text-dark uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldCheck size={14} className="text-brand" />
          Фильтр по разделам EU GMP Annex 1 (2022)
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
              !active
                ? 'bg-brand text-white border-brand'
                : 'bg-white text-text-dark border-surface-input hover:border-brand'
            }`}
          >
            Все категории
            <span className="ml-1.5 opacity-70">{categories.length}</span>
          </button>
          {sectionsWithCounts.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setFilter(s.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
                active === s.id
                  ? 'bg-brand text-white border-brand'
                  : 'bg-white text-text-dark border-surface-input hover:border-brand'
              }`}
              title={s.title}
            >
              {s.label} {s.title}
              <span className="ml-1.5 opacity-70">{s.count}</span>
            </button>
          ))}
        </div>

        {activeMeta && (
          <p className="mt-4 text-[14px] text-text">
            Показаны категории, относящиеся к разделу{' '}
            <strong>
              {activeMeta.label} {activeMeta.title}
            </strong>{' '}
            EU GMP Annex 1 (2022). Полная карта соответствия —{' '}
            <Link
              href="/compliance/annex1"
              className="text-brand underline hover:text-brand-dark"
            >
              Compliance Matrix
            </Link>
            .
          </p>
        )}
      </div>

      {/* Grid — grouped by category.group */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-xl">
          <p className="text-[16px] text-text-muted">
            Нет категорий по этому фильтру.
          </p>
          <button
            type="button"
            onClick={() => setFilter(null)}
            className="mt-3 text-[14px] font-semibold text-brand hover:underline"
          >
            Показать все категории
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {(['consumables', 'furniture'] as const).map((groupId) => {
            const groupCats = filteredCategories.filter(
              (c) => (c.group ?? 'consumables') === groupId
            );
            if (groupCats.length === 0) return null;
            const heading =
              groupId === 'consumables'
                ? 'Расходные материалы'
                : 'Мебель и оборудование cleanroom';
            const subheading =
              groupId === 'consumables'
                ? 'Перчатки, одежда, дезинфектанты, салфетки, индикаторы и расходники.'
                : 'Нержавеющая мебель TINMAN: скамейки, шкафы, столы, тележки, диспенсеры, шлюзы, раковины.';
            return (
              <div key={groupId}>
                <div className="mb-5">
                  <h2 className="text-[22px] md:text-[26px] font-extrabold text-text-dark">
                    {heading}
                  </h2>
                  <p className="text-[14px] text-text-muted mt-1">
                    {subheading}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupCats.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/catalog/${category.slug}`}
                      className="group rounded-xl bg-white border border-surface-stroke shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-[220px] w-full overflow-hidden bg-gray-50">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-5 flex flex-col gap-2.5">
                        <h3 className="text-[18px] font-bold text-brand-dark line-clamp-1">
                          {category.title}
                        </h3>
                        <p className="text-[14px] text-text leading-relaxed line-clamp-2">
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[13px] font-medium text-brand">
                            {category.products.length}{' '}
                            {pluralize(category.products.length, [
                              'товар',
                              'товара',
                              'товаров',
                            ])}
                          </span>
                          <span className="text-[13px] font-semibold text-brand group-hover:translate-x-1 transition-transform">
                            Смотреть &rarr;
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
