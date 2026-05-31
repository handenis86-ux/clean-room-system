import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone } from 'lucide-react';
import { categories } from '@/data/products';
import { siteConfig, phoneTel } from '@/config/site';
import { t } from '@/data/i18n/dictionary';
import { buildAlternates } from '@/lib/i18n';

const dict = t.uz;

export const metadata: Metadata = {
  title: dict.catalog.metaTitle,
  description: dict.catalog.metaDescription,
  openGraph: {
    title: dict.catalog.metaTitle,
    description: dict.catalog.metaDescription,
    locale: 'uz_UZ',
    images: ['/og-image.png'],
  },
  alternates: buildAlternates('uz', '/catalog'),
};

// Узбекские названия 3-х переведённых категорий.
// Для остальных используется оригинальный (русский) title из products.ts —
// каталог как навигатор работает, но детальная страница только русская.
const UZ_CATEGORY_TITLES: Record<string, string> = {
  'perchatki-zashchitnye': 'Toza xonalar uchun himoya qoʻlqoplari',
  garments: 'Toza xonalar uchun bir martalik kiyim',
  'disinfectants-and-detergents': 'Dezinfeksiyalovchi va yuvuvchi vositalar',
};

const UZ_TRANSLATED = new Set(Object.keys(UZ_CATEGORY_TITLES));

export default function UzCatalogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-light py-12 px-4 lg:px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-text mb-4">
          <Link href="/uz" className="hover:text-brand transition-colors">
            {dict.common.breadcrumbsHome}
          </Link>
          <span>/</span>
          <span>{dict.catalog.breadcrumbCurrent}</span>
        </nav>
        <h1 className="text-[28px] md:text-[42px] font-bold text-brand-dark leading-tight">
          {dict.catalog.pageTitle}
        </h1>
        <p className="text-[16px] text-brand max-w-[700px] mt-3">
          {dict.catalog.pageSubtitle}
        </p>
      </section>

      {/* Category grid */}
      <section className="py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const isTranslated = UZ_TRANSLATED.has(cat.slug);
              const title = UZ_CATEGORY_TITLES[cat.slug] ?? cat.title;
              const href = isTranslated
                ? `/uz/catalog/${cat.slug}`
                : `/catalog/${cat.slug}`;
              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className="group bg-white rounded-xl overflow-hidden border border-surface-border shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
                >
                  <div className="relative h-[200px] overflow-hidden bg-gray-50">
                    <Image
                      src={cat.image}
                      alt={title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2.5">
                    <h2 className="text-[17px] font-bold text-brand-dark line-clamp-2 min-h-[48px]">
                      {title}
                    </h2>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[13px] font-medium text-brand">
                        {cat.products.length} {dict.category.productsCountLabel}
                      </span>
                      <span className="text-[13px] font-semibold text-brand inline-flex items-center gap-1">
                        Batafsil <ArrowRight size={14} />
                      </span>
                    </div>
                    {!isTranslated && (
                      <p className="text-[11px] text-text-muted leading-snug">
                        Sahifa hozircha faqat rus tilida
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-4">
            {dict.catalog.notFoundTitle}
          </h2>
          <p className="text-[16px] text-brand-light mb-8">
            {dict.catalog.notFoundBody}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/uz/contacts"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              {dict.common.requestConsultation}
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
