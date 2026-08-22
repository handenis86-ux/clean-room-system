'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, X, Package, ArrowRight } from 'lucide-react';
import { useCompare } from './CompareContext';
import {
  ProductCategory,
  Product,
  productSlug,
} from '@/data/products';
import { getProductImage } from '@/data/product-images';

interface Props {
  category: ProductCategory;
}

export default function CompareTable({ category }: Props) {
  const { items, remove, clear, hydrated, maxItems } = useCompare();

  if (!hydrated) {
    return (
      <div className="py-16 text-center text-text-muted text-[14px]">
        Загрузка сравнения…
      </div>
    );
  }

  // Filter selected items down to those that actually exist in this category
  const skuToProduct = new Map<string, Product>(
    category.products.map((p) => [p.sku, p])
  );
  const selectedProducts: Product[] = items
    .filter((i) => i.categorySlug === category.slug && skuToProduct.has(i.sku))
    .map((i) => skuToProduct.get(i.sku)!) as Product[];

  if (selectedProducts.length === 0) {
    return (
      <div className="py-16 text-center max-w-xl mx-auto">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-light text-brand mb-4">
          <Package size={28} />
        </div>
        <h2 className="text-[20px] md:text-[24px] font-bold text-brand-dark mb-3">
          Список сравнения пуст
        </h2>
        <p className="text-[15px] text-text mb-6">
          Откройте каталог категории «{category.title}» и добавьте до{' '}
          {maxItems} товаров с помощью отметки «Сравнить» на карточках.
        </p>
        <Link
          href={`/catalog/${category.slug}`}
          className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-dark transition-colors"
        >
          Перейти в каталог
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  // Collect unique spec labels in the order they first appear
  const labelOrder: string[] = [];
  const seen = new Set<string>();
  for (const p of selectedProducts) {
    if (!p.specs) continue;
    for (const s of p.specs) {
      if (!seen.has(s.label)) {
        seen.add(s.label);
        labelOrder.push(s.label);
      }
    }
  }

  function getValue(product: Product, label: string): string {
    const found = product.specs?.find((s) => s.label === label);
    return found?.value ?? '—';
  }

  const canAddMore = selectedProducts.length < maxItems;

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-[14px] text-text">
          В сравнении{' '}
          <strong className="text-text-dark">{selectedProducts.length}</strong>{' '}
          из {maxItems} товаров
          {canAddMore && (
            <>
              {' · '}
              <Link
                href={`/catalog/${category.slug}`}
                className="text-brand hover:text-brand-dark font-semibold underline-offset-2 hover:underline"
              >
                добавить ещё
              </Link>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-2 self-start sm:self-auto rounded-lg border border-surface-stroke bg-white px-4 py-2 text-[13px] font-semibold text-text hover:border-red-300 hover:text-red-600 transition-colors"
        >
          <Trash2 size={14} />
          Очистить всё
        </button>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-[640px] px-4 sm:px-0">
          <table className="w-full border-separate border-spacing-0 bg-white rounded-xl border border-surface-stroke overflow-hidden">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-surface text-left text-[12px] font-semibold uppercase tracking-wider text-text-muted px-4 py-3 w-[180px] border-b border-surface-stroke"
                >
                  Характеристика
                </th>
                {selectedProducts.map((p) => {
                  const img = getProductImage(p.sku);
                  return (
                    <th
                      key={p.sku}
                      scope="col"
                      className="text-left align-top px-4 py-4 border-b border-l border-surface-stroke bg-white min-w-[220px]"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
                            Арт: {p.sku}
                          </span>
                          <button
                            type="button"
                            onClick={() => remove(p.sku)}
                            aria-label={`Убрать ${p.name} из сравнения`}
                            title="Убрать из сравнения"
                            className="flex h-6 w-6 items-center justify-center rounded-md text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="relative w-full aspect-square bg-white border border-surface-stroke rounded-lg overflow-hidden flex items-center justify-center">
                          {img ? (
                            <Image
                              src={img}
                              alt={p.name}
                              fill
                              className="object-contain p-3"
                              sizes="220px"
                              unoptimized
                            />
                          ) : (
                            <Package size={32} className="text-text-muted" />
                          )}
                        </div>
                        <h3 className="text-[14px] font-bold text-brand-dark leading-snug">
                          {p.name}
                        </h3>
                        <Link
                          href={`/catalog/${category.slug}/${productSlug(p.sku)}`}
                          className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand hover:text-brand-dark transition-colors"
                        >
                          На страницу товара
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-surface text-left text-[13px] font-semibold text-text-dark px-4 py-3 border-b border-surface-stroke align-top"
                >
                  Описание
                </th>
                {selectedProducts.map((p) => (
                  <td
                    key={p.sku}
                    className="px-4 py-3 border-b border-l border-surface-stroke text-[13px] text-text leading-relaxed align-top"
                  >
                    {p.description || '—'}
                  </td>
                ))}
              </tr>

              {labelOrder.length === 0 && (
                <tr>
                  <td
                    colSpan={1 + selectedProducts.length}
                    className="px-4 py-6 text-center text-[14px] text-text-muted"
                  >
                    У выбранных товаров нет указанных характеристик для
                    сравнения.
                  </td>
                </tr>
              )}

              {labelOrder.map((label, idx) => {
                /**
                 * Решение принимается по строкам, где значения расходятся.
                 * При четырёх товарах и пятнадцати характеристиках совпадающих
                 * ячеек большинство, и без выделения глаз ищет отличия вручную —
                 * ради этого таблицу и открывают. Совпадающие строки приглушаем,
                 * различающиеся оставляем контрастными.
                 */
                const values = selectedProducts.map((p) => getValue(p, label));
                const differs = new Set(values).size > 1;
                return (
                  <tr
                    key={label}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-surface/50'}
                  >
                    <th
                      scope="row"
                      className={[
                        'sticky left-0 z-10 bg-surface text-left text-[13px] px-4 py-3 border-b border-surface-stroke align-top',
                        differs
                          ? 'font-semibold text-text-dark'
                          : 'font-medium text-text-muted',
                      ].join(' ')}
                    >
                      {label}
                      {differs && (
                        <span
                          aria-label="значения различаются"
                          title="Значения различаются"
                          className="ml-1.5 inline-block align-middle h-1.5 w-1.5 rounded-full bg-brand"
                        />
                      )}
                    </th>
                    {selectedProducts.map((p, i) => {
                      const value = values[i];
                      const empty = value === '—';
                      return (
                        <td
                          key={p.sku}
                          className={[
                            'px-4 py-3 border-b border-l border-surface-stroke text-[13px] leading-relaxed align-top',
                            empty
                              ? 'text-text-muted'
                              : differs
                              ? 'text-text-dark font-medium'
                              : 'text-text-muted',
                          ].join(' ')}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Standards row if any product has standards */}
              {selectedProducts.some((p) => p.standards && p.standards.length > 0) && (
                <tr>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-surface text-left text-[13px] font-semibold text-text-dark px-4 py-3 border-b border-surface-stroke align-top"
                  >
                    Стандарты
                  </th>
                  {selectedProducts.map((p) => (
                    <td
                      key={p.sku}
                      className="px-4 py-3 border-b border-l border-surface-stroke text-[13px] text-text leading-relaxed align-top"
                    >
                      {p.standards && p.standards.length > 0
                        ? p.standards.join(', ')
                        : '—'}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
