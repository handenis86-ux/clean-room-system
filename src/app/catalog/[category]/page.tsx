import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Phone, ShieldCheck, Calculator, ArrowRight } from 'lucide-react';
import {
  categories,
  getCategoryBySlug,
  getAllCategorySlugs,
  productSlug,
} from '@/data/products';
import {
  STANDARDS,
  getStandardsForCategory,
} from '@/data/standards-mapping';
import { getCategorySeoContent } from '@/data/category-seo';
import { siteConfig, phoneTel } from '@/config/site';
import ProductGrid from './ProductGrid';

interface Props {
  params: { category: string };
}

interface CalculatorCTA {
  href: string;
  title: string;
  description: string;
  cta: string;
}

const CATEGORY_TO_CALCULATOR: Record<string, CalculatorCTA> = {
  'perchatki-zashchitnye': {
    href: '/tools/gloves-calculator',
    title: 'Сколько нужно перчаток на год?',
    description:
      'Рассчитайте годовой расход стерильных и нестерильных нитриловых перчаток по операторам, сменам и классу GMP. Менеджер пришлёт КП на расчётный объём за 24 часа.',
    cta: 'Открыть калькулятор перчаток',
  },
  'disinfectants-and-detergents': {
    href: '/tools/disinfectant-calculator',
    title: 'Сколько дезинфектанта закупить на квартал?',
    description:
      'Рассчитайте расход спиртовых и спороцидных средств по площади чистых зон, частоте обработки и ротации действующих веществ согласно требованиям GMP Annex 1.',
    cta: 'Открыть калькулятор дезинфектантов',
  },
  garments: {
    href: '/tools/gloves-calculator',
    title: 'Считаете годовую потребность по СИЗ?',
    description:
      'Калькулятор перчаток поможет точно оценить расход СИЗ-расходников на оператора в год. Для одноразовых костюмов норма обычно равна расходу перчаток на смену.',
    cta: 'Открыть калькулятор перчаток',
  },
  'cleanroom-wipes': {
    href: '/tools/disinfectant-calculator',
    title: 'Расход салфеток связан с расходом дезинфектанта',
    description:
      'Чтобы посчитать норму салфеток на квартал, начните с расчёта дезинфектанта по площади и частоте обработки — обычно на 1 л раствора уходит 8–12 салфеток 23×23 см.',
    cta: 'Рассчитать расход дезинфектанта',
  },
};

const TINMAN_CALCULATOR: CalculatorCTA = {
  href: '/tools/gowning-room-budget',
  title: 'Сколько стоит оборудовать гаунинг-комнату?',
  description:
    'Рассчитайте бюджет на скамьи, шкафы, зеркала, степ-овер и аксессуары TINMAN под площадь и пропускную способность вашей зоны переодевания. Растаможка и логистика по UZ — уже в цене.',
  cta: 'Открыть калькулятор бюджета',
};

function getCalculatorForCategory(slug: string): CalculatorCTA | null {
  if (CATEGORY_TO_CALCULATOR[slug]) return CATEGORY_TO_CALCULATOR[slug];
  if (slug.startsWith('tinman-')) return TINMAN_CALCULATOR;
  return null;
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((category) => ({ category }));
}

const UZ_TRANSLATED_CATEGORIES = new Set([
  'perchatki-zashchitnye',
  'garments',
  'disinfectants-and-detergents',
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  if (!category) return { title: 'Категория не найдена' };
  const productCount = category.products.length;
  const seoTitle = category.seoH1 || category.title;
  const hasUz = UZ_TRANSLATED_CATEGORIES.has(category.slug);
  return {
    title: category.metaTitle || `${seoTitle} — купить в Узбекистане`,
    description: `${category.description} ${productCount} ${productCount === 1 ? 'SKU' : 'SKU'} в наличии. Поставка из Ташкента, КП за 24 часа. Для фарм-, биотех- и медицинских производств Узбекистана.`.slice(
      0,
      200
    ),
    alternates: {
      canonical: `${siteConfig.url}/catalog/${category.slug}`,
      languages: {
        ru: `${siteConfig.url}/catalog/${category.slug}`,
        uz: hasUz
          ? `${siteConfig.url}/uz/catalog/${category.slug}`
          : `${siteConfig.url}/uz`,
        'x-default': `${siteConfig.url}/catalog/${category.slug}`,
      },
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  const stdsForCategory = getStandardsForCategory(category.slug);
  const stdLabels = stdsForCategory
    .map((id) => STANDARDS[id].shortName)
    .join(' · ');

  const calculatorCTA = getCalculatorForCategory(category.slug);
  const seoContent = getCategorySeoContent(category.slug);

  const faqJsonLd = seoContent && seoContent.faq.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: seoContent.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      }
    : null;

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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: `${siteConfig.url}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Каталог',
        item: `${siteConfig.url}/catalog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.title,
        item: `${siteConfig.url}/catalog/${category.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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
          {category.seoH1 || category.title}
        </h1>
        <p className="text-[16px] text-brand max-w-[700px] mt-3">
          {category.description}
        </p>
        {stdsForCategory.length > 0 && (
          <div className="mt-6 inline-flex items-start gap-2 px-4 py-2.5 bg-brand-light/40 rounded-lg text-[13px] text-brand-dark">
            <ShieldCheck size={16} className="shrink-0 mt-0.5" />
            <span>
              Категория покрывает стандарты:{' '}
              <strong>{stdLabels}</strong>
            </span>
          </div>
        )}
      </section>

      {/* Calculator CTA (contextual) */}
      {calculatorCTA && (
        <section className="px-4 lg:px-[80px] pt-10">
          <Link
            href={calculatorCTA.href}
            className="group flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6 rounded-xl border border-brand/20 bg-gradient-to-br from-brand-dark to-brand p-6 md:p-7 hover:shadow-lg hover:border-brand transition-all"
          >
            <div className="flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <Calculator size={28} className="text-white" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <h2 className="text-[18px] md:text-[20px] font-bold text-white leading-snug mb-1.5">
                {calculatorCTA.title}
              </h2>
              <p className="text-[14px] md:text-[15px] text-brand-light leading-relaxed max-w-[680px]">
                {calculatorCTA.description}
              </p>
            </div>
            <span className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-semibold text-brand-dark bg-white rounded-lg group-hover:bg-brand-light transition-colors shrink-0 tabular-nums">
              {calculatorCTA.cta}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </span>
          </Link>
        </section>
      )}

      {/* Product Grid with Search */}
      <section className="py-12 px-4 lg:px-[80px]">
        <Suspense fallback={null}>
          <ProductGrid
            products={category.products}
            categorySlug={category.slug}
            categoryImage={category.image}
          />
        </Suspense>
      </section>

      {/* SEO content: intro + sections + FAQ + internal links */}
      {seoContent && (
        <section className="bg-white py-12 px-4 lg:px-[80px] border-t border-surface-border">
          <div className="max-w-[860px] mx-auto">
            <div className="prose prose-slate max-w-none">
              <p className="text-[15px] leading-relaxed text-text mb-6">
                {seoContent.intro}
              </p>

              {seoContent.sections.map((s, i) => (
                <div key={i} className="mb-8">
                  <h2 className="text-[22px] md:text-[26px] font-bold text-text-dark mb-3 mt-8">
                    {s.heading}
                  </h2>
                  <div
                    className="
                      text-[15px] leading-relaxed text-text
                      [&_p]:mb-3
                      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:space-y-1
                      [&_li]:leading-snug
                      [&_a]:text-brand [&_a]:underline hover:[&_a]:text-brand-dark
                      [&_strong]:font-semibold [&_strong]:text-text-dark
                    "
                    dangerouslySetInnerHTML={{ __html: s.body }}
                  />
                </div>
              ))}
            </div>

            {seoContent.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-surface-border">
                <h2 className="text-[22px] md:text-[26px] font-bold text-text-dark mb-6">
                  Часто задаваемые вопросы
                </h2>
                <div className="space-y-4">
                  {seoContent.faq.map((f, i) => (
                    <details
                      key={i}
                      className="group rounded-lg border border-surface-border bg-surface px-5 py-4 open:bg-white open:border-brand/30"
                    >
                      <summary className="text-[15px] font-semibold text-text-dark cursor-pointer list-none flex items-start justify-between gap-3">
                        <span>{f.q}</span>
                        <span className="text-brand text-xl shrink-0 transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="text-[14px] leading-relaxed text-text mt-3">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {seoContent.internalLinks.length > 0 && (
              <div className="mt-12 pt-8 border-t border-surface-border">
                <h3 className="text-[16px] font-semibold text-text-dark mb-4 uppercase tracking-wider">
                  По теме
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {seoContent.internalLinks.map((l, i) => (
                    <li key={i}>
                      <Link
                        href={l.href}
                        className="group flex items-center gap-2 text-[14px] text-brand hover:text-brand-dark transition-colors"
                      >
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                        <span className="underline">{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

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
