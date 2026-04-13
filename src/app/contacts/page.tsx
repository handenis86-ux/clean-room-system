import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import ContactPageForm from '@/components/forms/ContactPageForm';

export const metadata: Metadata = {
  title: 'Контакты | Clean Room System',
  description:
    'Свяжитесь с Clean Room Systems для консультации по расходным материалам для чистых помещений. Телефон, email, адрес офиса в Ташкенте.',
  alternates: {
    canonical: 'https://clean-room-systems.uz/contacts',
  },
};

export default function ContactsPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Нукус, 85/1',
      addressLocality: 'Ташкент',
      addressCountry: 'UZ',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-dark h-[300px] flex items-center">
        <div className="w-full px-4 lg:px-[80px]">
          <nav className="flex items-center gap-1.5 text-[13px] text-[#88C5D9] mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Главная
            </Link>
            <span>/</span>
            <span>Контакты</span>
          </nav>
          <h1 className="text-[32px] md:text-[56px] font-extrabold text-white leading-tight">
            Контакты
          </h1>
          <p className="text-[18px] text-brand-muted mt-3">
            Свяжитесь с нами любым удобным способом — мы готовы ответить на ваши
            вопросы.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-[60px] px-4 lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-[60px]">
          {/* LEFT column: Contact info */}
          <div className="flex-1">
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-6">
              + КОНТАКТНАЯ ИНФОРМАЦИЯ
            </p>

            {/* Phone */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-[48px] h-[48px] rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-brand" />
              </div>
              <div>
                <p className="text-[13px] text-text-muted mb-0.5">Телефон</p>
                <a
                  href="tel:+998998211222"
                  className="text-[16px] font-semibold text-text-dark hover:text-brand transition-colors"
                >
                  +998 99 821-12-22
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
                  href="mailto:info@clean-room-systems.uz"
                  className="text-[16px] font-semibold text-text-dark hover:text-brand transition-colors"
                >
                  info@clean-room-systems.uz
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4 mb-10">
              <div className="w-[48px] h-[48px] rounded-full bg-brand-light flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-brand" />
              </div>
              <div>
                <p className="text-[13px] text-text-muted mb-0.5">Адрес</p>
                <p className="text-[16px] font-semibold text-text-dark">
                  г. Ташкент, ул. Нукус, 85/1
                </p>
              </div>
            </div>

            {/* Schedule */}
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-4">
              + ГРАФИК РАБОТЫ
            </p>
            <p className="text-[15px] text-text-dark mb-1">
              Пн — Пт: 09:00 — 18:00
            </p>
            <p className="text-[15px] text-text-muted">Сб — Вс: Выходной</p>
          </div>

          {/* RIGHT column: Contact form */}
          <div className="flex-1">
            <div className="rounded-2xl bg-surface p-8">
              <h2 className="text-[24px] font-extrabold text-text-dark mb-2">
                Оставить заявку
              </h2>
              <p className="text-[14px] text-text mb-6">
                Заполните форму, и мы свяжемся с вами в ближайшее время.
              </p>
              <ContactPageForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative h-[350px] w-full bg-gray-200">
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=69.251543%2C41.310247&z=16&pt=69.251543%2C41.310247%2Cpm2rdm"
          width="100%"
          height="100%"
          className="w-full h-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Clean Room Systems на карте"
        />
        {/* Overlay card */}
        <div className="absolute bottom-6 left-4 lg:left-[80px] bg-white rounded-xl shadow-lg p-5 max-w-[320px]">
          <p className="text-[16px] font-bold text-text-dark mb-1">
            Clean Room System
          </p>
          <p className="text-[13px] text-text">
            г. Ташкент, ул. Нукус, 85/1
          </p>
        </div>
      </section>
    </>
  );
}
