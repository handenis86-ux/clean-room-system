import Link from 'next/link';
import Image from 'next/image';
import { Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import {
  categories,
  getCategoryBySlug,
  productSlug,
} from '@/data/products';
import {
  STANDARDS,
  getStandardsForCategory,
} from '@/data/standards-mapping';
import { siteConfig, phoneTel } from '@/config/site';
import { t } from '@/data/i18n/dictionary';

/**
 * Узбекская версия страницы категории. Используется тремя файлами:
 * /uz/catalog/perchatki-zashchitnye, /uz/catalog/garments,
 * /uz/catalog/disinfectants-and-detergents.
 *
 * Списки продуктов берутся из общего `categories` (русские названия SKU,
 * технические термины, бренды). Локализуются только UI-обвязка
 * (breadcrumbs, CTA, заголовки разделов) и H1/описание категории через
 * `uzTitle` / `uzDescription`, передаваемые из конкретной страницы.
 */
export interface UzCategoryViewProps {
  slug: string;
  uzTitle: string;
  uzDescription: string;
  /** Необязательный список FAQ Q&A на узбекском. */
  uzFaq?: { q: string; a: string }[];
}

const dict = t.uz;

export default function UzCategoryView({
  slug,
  uzTitle,
  uzDescription,
  uzFaq,
}: UzCategoryViewProps) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const stdsForCategory = getStandardsForCategory(slug);
  const stdLabels = stdsForCategory.map((id) => STANDARDS[id].shortName).join(' · ');

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-light py-12 px-4 lg:px-[80px]">
        <nav className="flex items-center gap-1.5 text-[13px] text-text mb-4">
          <Link href="/uz" className="hover:text-brand transition-colors">
            {dict.common.breadcrumbsHome}
          </Link>
          <span>/</span>
          <Link href="/uz/catalog" className="hover:text-brand transition-colors">
            {dict.category.breadcrumbCatalog}
          </Link>
          <span>/</span>
          <span>{uzTitle}</span>
        </nav>
        <h1 className="text-[28px] md:text-[42px] font-bold text-brand-dark leading-tight">
          {uzTitle}
        </h1>
        <p className="text-[16px] text-brand max-w-[700px] mt-3">
          {uzDescription}
        </p>
        {stdsForCategory.length > 0 && (
          <div className="mt-6 inline-flex items-start gap-2 px-4 py-2.5 bg-brand-light/40 rounded-lg text-[13px] text-brand-dark">
            <ShieldCheck size={16} className="shrink-0 mt-0.5" />
            <span>
              {dict.category.coveredStandards}: <strong>{stdLabels}</strong>
            </span>
          </div>
        )}
      </section>

      {/* Products */}
      <section className="py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {category.products.map((p) => (
              <Link
                key={p.sku}
                href={`/catalog/${category.slug}/${productSlug(p.sku)}`}
                className="group bg-white rounded-xl border border-surface-border overflow-hidden hover:border-brand transition-colors"
              >
                {p.image && (
                  <div className="relative h-[180px] bg-gray-50 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-[14px] font-semibold text-brand-dark leading-snug line-clamp-3 min-h-[60px]">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-text-muted mt-1.5">SKU: {p.sku}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-[12px] text-text-muted mt-6 text-center">
            Mahsulot tafsilotlari sahifalari hozircha faqat rus tilida mavjud.
            Texnik xususiyatlar, brendlar va SKU nomlari sanoat amaliyotiga koʻra
            inglizcha / lotin yozuvida saqlanadi.
          </p>
        </div>
      </section>

      {/* FAQ (optional) */}
      {uzFaq && uzFaq.length > 0 && (
        <section className="bg-white py-12 px-4 lg:px-[80px] border-t border-surface-border">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-[22px] md:text-[26px] font-bold text-text-dark mb-6">
              {dict.category.faqTitle}
            </h2>
            <div className="space-y-4">
              {uzFaq.map((f, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-surface-border bg-surface px-5 py-4 open:bg-white open:border-brand/30"
                >
                  <summary className="text-[15px] font-semibold text-text-dark cursor-pointer list-none flex items-start justify-between gap-3">
                    <span>{f.q}</span>
                    <span className="text-brand text-xl shrink-0 transition-transform group-open:rotate-45">+</span>
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

      {/* Related categories */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <h2 className="text-[24px] font-bold text-text-dark mb-6 max-w-[1200px] mx-auto">
          {dict.category.otherCategoriesTitle}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-[1200px] mx-auto">
          {categories
            .filter((c) => c.slug !== category.slug)
            .slice(0, 6)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/uz/catalog`}
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
            {dict.category.ctaTitle}
          </h2>
          <p className="text-[16px] text-brand-light mb-8">
            {dict.category.ctaBody}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/uz/contacts"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              {dict.common.leaveRequest}
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
