import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, ShieldCheck, Award, Building2 } from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';
import { localBusinessJsonLd } from '@/data/local-business-schema';
import { t } from '@/data/i18n/dictionary';
import { buildAlternates } from '@/lib/i18n';

const dict = t.uz;

export const metadata: Metadata = {
  title: dict.home.metaTitle,
  description: dict.home.metaDescription,
  openGraph: {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    locale: 'uz_UZ',
    images: ['/og-image.png'],
  },
  alternates: buildAlternates('uz', '/'),
};

const featuredCategories = [
  {
    slug: 'perchatki-zashchitnye',
    title: 'Toza xonalar uchun himoya qoʻlqoplari',
    image: '/images/categories/gloves.webp',
  },
  {
    slug: 'garments',
    title: 'Toza xonalar uchun bir martalik kiyim',
    image: '/images/categories/clothing.webp',
  },
  {
    slug: 'disinfectants-and-detergents',
    title: 'Dezinfeksiyalovchi va yuvuvchi vositalar',
    image: '/images/categories/disinfectants.webp',
  },
];

const jsonLd = localBusinessJsonLd;

export default function UzHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-brand-dark py-16 lg:py-24 px-4 lg:px-[80px] overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider mb-4">
            {dict.home.heroEyebrow}
          </div>
          <h1 className="text-[28px] sm:text-[36px] lg:text-[48px] font-extrabold text-white leading-tight tracking-tight mb-6 max-w-3xl">
            {dict.home.heroTitle}
          </h1>
          <p className="text-[16px] lg:text-[18px] font-normal text-brand-muted max-w-2xl mb-10 leading-relaxed">
            {dict.home.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/uz/contacts"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-gray-100 transition-colors"
            >
              {dict.home.heroCta}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/uz/catalog"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              {dict.home.heroSecondaryCta}
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[900px]">
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <Building2 size={22} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">
                  13 GMP-zavod
                </p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  amaldagi sertifikatlangan korxonalarni taʼminlaymiz
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <ShieldCheck size={22} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">
                  GMP / ISO 14644
                </p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  EU GMP Annex 1 (2022) standartlariga muvofiqlik
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <Award size={22} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">
                  Pharma Park
                </p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  rezidentlari uchun yetkazib beruvchi
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <ArrowRight size={22} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">
                  KP — 24 soat
                </p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  tijorat taklifini tezda olasiz
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-white py-16 lg:py-20 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark leading-tight mb-5">
            {dict.home.aboutSectionTitle}
          </h2>
          <p className="text-[16px] text-text leading-relaxed">
            {dict.home.aboutSectionBody}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface py-16 lg:py-20 px-4 lg:px-[80px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-3">
              {dict.home.categoriesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/uz/catalog/${cat.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-surface-stroke shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow"
              >
                <div className="relative h-[220px] overflow-hidden bg-gray-50">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2.5">
                  <h3 className="text-[18px] font-bold text-brand-dark line-clamp-2 min-h-[52px]">
                    {cat.title}
                  </h3>
                  <span className="text-[13px] font-semibold text-brand inline-flex items-center gap-1">
                    Batafsil <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/uz/catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white bg-brand-dark rounded-lg hover:bg-brand transition-colors"
            >
              Toʻliq katalogni koʻrish
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16 px-4 lg:px-[80px]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-white mb-5 leading-tight">
            {dict.home.ctaTitle}
          </h2>
          <p className="text-[16px] text-brand-muted mb-8 leading-relaxed">
            {dict.home.ctaSubtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/uz/contacts"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              {dict.home.heroCta}
              <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
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
