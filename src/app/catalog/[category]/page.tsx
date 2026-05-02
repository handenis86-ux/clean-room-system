import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone } from 'lucide-react';
import {
  categories,
  getCategoryBySlug,
  getAllCategorySlugs,
  productSlug,
} from '@/data/products';
import { siteConfig } from '@/config/site';
import ProductGrid from './ProductGrid';

interface Props {
  params: { category: string };
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  if (!category) return { title: 'Категория не найдена' };
  return {
    title: `${category.title} для чистых помещений | ${siteConfig.name}`,
    description: `${category.description} Поставка в Ташкенте и по Узбекистану — для GMP-производств, лабораторий и чистых помещений ISO 14644.`,
    alternates: {
      canonical: `${siteConfig.url}/catalog/${category.slug}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.title,
    description: category.description,
    numberOfItems: category.products.length,
    itemListElement: category.products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${siteConfig.url}/catalog/${category.slug}/${productSlug(p.sku)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-light py-12 px-4 lg:px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-text mb-4">
          <Link href="/" className="hover:text-brand transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-brand transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <span>{category.title}</span>
        </nav>
        <h1 className="text-[28px] md:text-[42px] font-bold text-brand-dark leading-tight">
          {category.title}
        </h1>
        <p className="text-[16px] text-brand max-w-[700px] mt-3">
          {category.description}
        </p>
      </section>

      {/* Product Grid with Search */}
      <section className="py-12 px-4 lg:px-[80px]">
        <ProductGrid
          products={category.products}
          categorySlug={category.slug}
          categoryImage={category.image}
        />
      </section>

      {/* Related categories */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <h2 className="text-[24px] font-bold text-text-dark mb-6">
          Другие категории
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories
            .filter((c) => c.slug !== category.slug)
            .slice(0, 6)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/catalog/${c.slug}`}
                className="group rounded-xl bg-white border border-surface-border p-4 hover:border-brand transition-colors"
              >
                <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-lg">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 16vw"
                  />
                </div>
                <h3 className="text-[13px] font-semibold text-brand-dark leading-snug line-clamp-2">
                  {c.title}
                </h3>
              </Link>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-4">
            Нужна консультация по товару?
          </h2>
          <p className="text-[16px] text-brand-light mb-8">
            Наши специалисты помогут подобрать оптимальное решение и
            подготовят коммерческое предложение.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              Оставить заявку
            </Link>
            <a
              href="tel:+998998211222"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              +998 99 821-12-22
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
