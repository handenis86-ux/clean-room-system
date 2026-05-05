import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Phone } from 'lucide-react';
import { categories } from '@/data/products';
import { siteConfig, phoneTel } from '@/config/site';
import CatalogFilteredGrid from './CatalogFilteredGrid';
import CatalogSearch from './CatalogSearch';

export const metadata: Metadata = {
  title: 'Каталог расходных материалов для чистых помещений | Узбекистан',
  description:
    'Каталог расходников для чистых помещений GMP / ISO 14644 в Узбекистане: индикаторы стерилизации, дезинфектанты, одежда, перчатки, салфетки, тележки. Купить в Ташкенте.',
  alternates: {
    canonical: `${siteConfig.url}/catalog`,
  },
};

export default function CatalogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-light py-12 px-4 lg:px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-text mb-4">
          <Link href="/" className="hover:text-brand transition-colors">
            Главная
          </Link>
          <span>/</span>
          <span>Каталог</span>
        </nav>
        <h1 className="text-[28px] md:text-[42px] font-bold text-brand-dark leading-tight">
          Каталог продукции
        </h1>
        <p className="text-[16px] text-brand max-w-[600px] mt-3">
          Одежда и расходные материалы для чистых помещений от ведущих
          мировых производителей: Contec, Alsico, Terragene, Hydroflex, NPro,
          Isofield, BIMOS и других.
        </p>

        {/* Catalog search */}
        <div className="mt-6">
          <Suspense fallback={<div className="h-[44px] w-full max-w-[600px] bg-white rounded-lg" />}>
            <CatalogSearch />
          </Suspense>
        </div>
      </section>

      {/* Product Grid with filter */}
      <section className="py-12 px-4 lg:px-[80px]">
        <Suspense fallback={null}>
          <CatalogFilteredGrid categories={categories} />
        </Suspense>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-4">
            Не нашли нужный товар?
          </h2>
          <p className="text-[16px] text-brand-light mb-8">
            Мы работаем с широким каталогом поставщиков и можем найти любую
            продукцию для чистых помещений. Оставьте заявку, и мы подберём
            решение.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              Запросить консультацию
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

