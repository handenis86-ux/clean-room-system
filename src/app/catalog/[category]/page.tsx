import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, Package } from 'lucide-react';
import { categories, getCategoryBySlug, getAllCategorySlugs } from '@/data/products';

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
    title: category.title,
    description: category.description,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  return (
    <>
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
        <h1 className="text-[42px] font-bold text-brand-dark leading-tight">
          {category.title}
        </h1>
        <p className="text-[16px] text-brand max-w-[700px] mt-3">
          {category.description}
        </p>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-4 lg:px-[80px]">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[14px] text-text">
            Найдено{' '}
            <span className="font-semibold text-text-dark">
              {category.products.length}
            </span>{' '}
            {pluralize(category.products.length, ['товар', 'товара', 'товаров'])}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <article
              key={product.sku}
              className="group rounded-xl bg-white border border-surface-stroke shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-surface flex items-center justify-center">
                <Image
                  src={category.image}
                  alt={product.name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                    <Package size={24} className="text-brand" />
                  </div>
                </div>
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
                <Link
                  href="/contacts"
                  className="mt-auto pt-3 text-[13px] font-semibold text-brand hover:text-brand-dark transition-colors flex items-center gap-1"
                >
                  Запросить цену &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
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
          <h2 className="text-[32px] font-bold text-white mb-4">
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

function pluralize(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
