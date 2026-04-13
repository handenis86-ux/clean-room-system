'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Search } from 'lucide-react';
import { Product, productSlug } from '@/data/products';
import { getProductImage } from '@/data/product-images';

interface ProductGridProps {
  products: Product[];
  categorySlug: string;
  categoryImage: string;
}

export default function ProductGrid({
  products,
  categorySlug,
  categoryImage,
}: ProductGridProps) {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((product) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.sku.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Search bar */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
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
        <p className="text-[14px] text-text">
          Найдено{' '}
          <span className="font-semibold text-text-dark">
            {filteredProducts.length}
          </span>{' '}
          {pluralize(filteredProducts.length, ['товар', 'товара', 'товаров'])}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <p className="text-[16px] text-text-muted">
            Товары не найдены. Попробуйте изменить запрос.
          </p>
        </div>
      )}
    </>
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
