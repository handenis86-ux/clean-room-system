import { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContactPageForm from '@/components/forms/ContactPageForm';

export const metadata: Metadata = {
  title: 'Контакты',
  description:
    'Свяжитесь с Clean Room Systems для консультации по оборудованию для чистых помещений. Телефон, email, адрес офиса в Ташкенте.',
  alternates: {
    canonical: 'https://clean-room-systems.uz/contacts',
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: 'Телефон',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
  },
  {
    icon: Mail,
    title: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    title: 'Адрес',
    value: siteConfig.address,
    href: null,
  },
  {
    icon: Clock,
    title: 'Режим работы',
    value: 'Пн-Пт 9:00-18:00',
    href: null,
  },
];

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
      <section className="bg-brand-800 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: 'Главная', href: '/' },
                { label: 'Контакты' },
              ]}
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mt-4">
              Контакты
            </h1>
            <p className="text-lg text-brand-200 mt-4 max-w-2xl">
              Свяжитесь с нами любым удобным способом — мы готовы ответить на
              ваши вопросы и помочь с подбором оборудования.
            </p>
          </div>
        </div>
      </section>

      {/* Main content: 2 columns */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column: contact info + form */}
            <div>
              {/* Contact info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl"
                  >
                    <div className="w-11 h-11 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-brand-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-0.5">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-900 font-semibold hover:text-brand-700 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-900 font-semibold">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">
                  Отправьте заявку
                </h2>
                <p className="text-gray-500 mb-8">
                  Заполните форму, и мы свяжемся с вами в ближайшее время.
                </p>
                <ContactPageForm />
              </div>
            </div>

            {/* Right column: map + photo */}
            <div className="flex flex-col gap-8">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 flex-1 min-h-[320px]">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=69.251543%2C41.310247&z=16&pt=69.251543%2C41.310247%2Cpm2rdm"
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[320px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Clean Room Systems на карте"
                />
              </div>

              {/* Office photo placeholder */}
              <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 flex items-center justify-center">
                    <MapPin size={28} className="text-brand-600" />
                  </div>
                  <p className="text-gray-900 font-heading font-bold text-lg mb-1">
                    Наш офис
                  </p>
                  <p className="text-gray-500 text-sm">
                    {siteConfig.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
