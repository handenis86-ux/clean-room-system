import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';
import ContactPageForm from '@/components/forms/ContactPageForm';
import MapEmbed from '@/components/ui/MapEmbed';
import { localBusinessJsonLd } from '@/data/local-business-schema';
import { buildAlternates } from '@/lib/i18n';
import { t } from '@/data/i18n/dictionary';

const dict = t.uz;

export const metadata: Metadata = {
  title: dict.contacts.metaTitle,
  description: dict.contacts.metaDescription,
  openGraph: {
    title: dict.contacts.metaTitle,
    description: dict.contacts.metaDescription,
    locale: 'uz_UZ',
    images: ['/og-image.png'],
  },
  alternates: buildAlternates('uz', '/contacts'),
};

export default function UzContactsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-dark h-[300px] flex items-center">
        <div className="w-full px-4 lg:px-[80px]">
          <nav className="flex items-center gap-1.5 text-[13px] text-[#88C5D9] mb-4">
            <Link href="/uz" className="hover:text-white transition-colors">
              {dict.common.breadcrumbsHome}
            </Link>
            <span>/</span>
            <span>{dict.contacts.pageTitle}</span>
          </nav>
          <h1 className="text-[32px] md:text-[56px] font-extrabold text-white leading-tight">
            {dict.contacts.pageTitle}
          </h1>
          <p className="text-[18px] text-brand-muted mt-3">
            {dict.contacts.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-[60px] px-4 lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-[60px]">
          {/* LEFT column: Contact info */}
          <div className="flex-1">
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-6">
              + {dict.common.contactInfo}
            </p>

            {/* Phone */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-[48px] h-[48px] rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-brand" />
              </div>
              <div>
                <p className="text-[13px] text-text-muted mb-0.5">{dict.common.phone}</p>
                <a
                  href={`tel:${phoneTel}`}
                  className="text-[16px] font-semibold text-text-dark hover:text-brand transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-[48px] h-[48px] rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-brand" />
              </div>
              <div>
                <p className="text-[13px] text-text-muted mb-0.5">Email</p>
                <a
                  href="mailto:info@cleanroom.uz"
                  className="text-[16px] font-semibold text-text-dark hover:text-brand transition-colors"
                >
                  info@cleanroom.uz
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 mb-10">
              <div className="w-[48px] h-[48px] rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-brand" />
              </div>
              <div>
                <p className="text-[13px] text-text-muted mb-0.5">{dict.common.address}</p>
                <p className="text-[16px] font-semibold text-text-dark">
                  Toshkent sh., Nukus koʻchasi, 85/1
                </p>
              </div>
            </div>

            {/* Schedule */}
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-4">
              + {dict.common.scheduleTitle}
            </p>
            <p className="text-[15px] text-text-dark mb-1">
              {dict.common.scheduleWeekdays}
            </p>
            <p className="text-[15px] text-text-muted">{dict.common.scheduleWeekend}</p>
          </div>

          {/* RIGHT column: Contact form */}
          <div className="flex-1">
            <div className="rounded-2xl bg-surface p-8">
              <h2 className="text-[24px] font-extrabold text-text-dark mb-2">
                {dict.contacts.formTitle}
              </h2>
              <p className="text-[14px] text-text mb-6">
                {dict.contacts.formSubtitle}
              </p>
              <ContactPageForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative h-[350px] w-full bg-gray-200">
        <MapEmbed
          src="https://yandex.ru/map-widget/v1/?ll=69.251543%2C41.310247&z=16&pt=69.251543%2C41.310247%2Cpm2rdm"
          title="Clean Room Systems xaritada"
        />
        <div className="pointer-events-none absolute bottom-6 left-4 lg:left-[80px] bg-white rounded-xl shadow-lg p-5 max-w-[320px]">
          <p className="text-[16px] font-bold text-text-dark mb-1">Clean Room Systems</p>
          <p className="text-[13px] text-text">Toshkent sh., Nukus koʻchasi, 85/1</p>
        </div>
      </section>
    </>
  );
}
