import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react';
import { categories } from '@/data/products';
import { siteConfig, phoneTel } from '@/config/site';

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
      </section>

      {/* Product Grid */}
      <section className="py-12 px-4 lg:px-[80px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
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
                    {pluralize(category.products.length, ['товар', 'товара', 'товаров'])}
                  </span>
                  <span className="text-[13px] font-semibold text-brand group-hover:translate-x-1 transition-transform">
                    Смотреть &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
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

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
