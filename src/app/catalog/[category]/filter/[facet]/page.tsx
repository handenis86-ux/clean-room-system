import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Package, Phone, ShieldCheck } from 'lucide-react';
import {
  getCategoryBySlug,
  productSlug,
  type Product,
} from '@/data/products';
import { getProductImage } from '@/data/product-images';
import {
  allFacets,
  getFacet,
  type CategoryFacet,
} from '@/data/category-facets';
import { extractProductFilters } from '@/data/product-filters';
import { siteConfig, phoneTel } from '@/config/site';

interface Props {
  params: { category: string; facet: string };
}

export function generateStaticParams() {
  return allFacets.map((f) => ({
    category: f.parentCategory,
    facet: f.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const facet = getFacet(params.category, params.facet);
  if (!facet) return { title: 'Фильтр не найден' };
  const url = `${siteConfig.url}/catalog/${params.category}/filter/${params.facet}`;
  return {
    title: facet.metaTitle,
    description: facet.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: facet.metaTitle,
      description: facet.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

// Apply the facet filter to category products.
function filterProducts(products: Product[], facet: CategoryFacet): Product[] {
  const f = facet.filter;
  return products.filter((p) => {
    const pf = extractProductFilters(p);
    if (typeof f.sterile === 'boolean' && pf.isSterile !== f.sterile) return false;
    if (f.gmpClasses && f.gmpClasses.length > 0) {
      if (!f.gmpClasses.some((g) => pf.gmpClasses.includes(g))) return false;
    }
    if (f.isoClasses && f.isoClasses.length > 0) {
      if (!f.isoClasses.some((i) => pf.isoClasses.includes(i))) return false;
    }
    if (f.brand && pf.brand?.toLowerCase() !== f.brand.toLowerCase()) return false;
    return true;
  });
}

export default function FacetPage({ params }: Props) {
  const category = getCategoryBySlug(params.category);
  const facet = getFacet(params.category, params.facet);
  if (!category || !facet) notFound();

  const filtered = filterProducts(category.products, facet);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Каталог', item: `${siteConfig.url}/catalog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.title,
        item: `${siteConfig.url}/catalog/${category.slug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: facet.h1,
        item: `${siteConfig.url}/catalog/${category.slug}/filter/${facet.slug}`,
      },
    ],
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: facet.h1,
    description: facet.metaDescription,
    numberOfItems: filtered.length,
    itemListElement: filtered.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${siteConfig.url}/catalog/${category.slug}/${productSlug(p.sku)}`,
    })),
  };

  const faqJsonLd =
    facet.faq && facet.faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: facet.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero */}
      <section className="bg-brand-light py-12 px-4 lg:px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-text mb-4 flex-wrap">
          <Link href="/" className="hover:text-brand transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-brand transition-colors">Каталог</Link>
          <span>/</span>
          <Link
            href={`/catalog/${category.slug}`}
            className="hover:text-brand transition-colors"
          >
            {category.title}
          </Link>
          <span>/</span>
          <span>{facet.h1}</span>
        </nav>
        <h1 className="text-[28px] md:text-[42px] font-bold text-brand-dark leading-tight">
          {facet.h1}
        </h1>
        <p className="text-[16px] text-brand max-w-[760px] mt-3 leading-relaxed">
          {facet.intro}
        </p>
        <div className="mt-6 flex items-center gap-3 text-[13px] text-text-muted">
          <ShieldCheck size={16} className="text-brand" />
          <span>
            Найдено <strong className="text-text-dark">{filtered.length}</strong>{' '}
            {filtered.length === 1 ? 'товар' : 'товаров'} в категории{' '}
            <Link
              href={`/catalog/${category.slug}`}
              className="underline hover:text-brand"
            >
              {category.title}
            </Link>
          </span>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-12 px-4 lg:px-[80px]">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[16px] text-text-muted mb-4">
              По этому фильтру товаров пока нет.
            </p>
            <Link
              href={`/catalog/${category.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-dark transition-colors"
            >
              Перейти в полный каталог {category.title}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filtered.map((product) => {
              const pImage = getProductImage(product.sku);
              const slug = productSlug(product.sku);
              return (
                <Link
                  key={product.sku}
                  href={`/catalog/${category.slug}/${slug}`}
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
                      <div className="relative z-10 w-16 h-16 rounded-full bg-brand-light flex items-center justify-center">
                        <Package size={28} className="text-brand" />
                      </div>
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
        )}
      </section>

      {/* Optional sections */}
      {facet.sections && facet.sections.length > 0 && (
        <section className="bg-white py-12 px-4 lg:px-[80px] border-t border-surface-border">
          <div className="max-w-[860px] mx-auto">
            {facet.sections.map((s, i) => (
              <div key={i} className="mb-8">
                <h2 className="text-[22px] md:text-[26px] font-bold text-text-dark mb-3 mt-8">
                  {s.heading}
                </h2>
                <div
                  className="
                    text-[15px] leading-relaxed text-text
                    [&_p]:mb-3
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:space-y-1
                    [&_a]:text-brand [&_a]:underline hover:[&_a]:text-brand-dark
                    [&_strong]:font-semibold [&_strong]:text-text-dark
                  "
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {facet.faq && facet.faq.length > 0 && (
        <section className="bg-surface py-12 px-4 lg:px-[80px]">
          <div className="max-w-[860px] mx-auto">
            <h2 className="text-[22px] md:text-[26px] font-bold text-text-dark mb-6">
              Часто задаваемые вопросы
            </h2>
            <div className="space-y-4">
              {facet.faq.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-surface-border bg-white px-5 py-4 open:border-brand/30"
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
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-dark py-16">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-4">
            Запросить КП на товары
          </h2>
          <p className="text-[16px] text-brand-light mb-8">
            Специалисты CRS подготовят коммерческое предложение за 24 часа.
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
