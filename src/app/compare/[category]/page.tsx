import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCategoryBySlug,
  getAllCategorySlugs,
} from '@/data/products';
import { siteConfig } from '@/config/site';
import CompareTable from '@/components/compare/CompareTable';

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
    title: `Сравнение товаров: ${category.title}`,
    description: `Сравните технические характеристики товаров в категории «${category.title}» — ${siteConfig.name}.`,
    alternates: {
      canonical: `${siteConfig.url}/compare/${category.slug}`,
    },
    robots: { index: false, follow: true },
  };
}

export default function ComparePage({ params }: Props) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-light py-12 px-4 lg:px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-text mb-4 flex-wrap">
          <Link href="/" className="hover:text-brand transition-colors">
            Главная
          </Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-brand transition-colors">
            Каталог
          </Link>
          <span>/</span>
          <Link
            href={`/catalog/${category.slug}`}
            className="hover:text-brand transition-colors"
          >
            {category.title}
          </Link>
          <span>/</span>
          <span>Сравнение</span>
        </nav>
        <h1 className="text-[28px] md:text-[42px] font-bold text-brand-dark leading-tight">
          Сравнение товаров: {category.title}
        </h1>
        <p className="text-[16px] text-brand max-w-[720px] mt-3">
          Сравните выбранные товары по техническим характеристикам бок о бок,
          чтобы подобрать оптимальное решение для вашего производства.
        </p>
      </section>

      {/* Comparison table (client) */}
      <section className="py-12 px-4 lg:px-[80px]">
        <CompareTable category={category} />
      </section>
    </>
  );
}
