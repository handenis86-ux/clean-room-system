import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import AboutPreviewSection from '@/components/sections/AboutPreviewSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import PartnersSection from '@/components/sections/PartnersSection';
import ClientsSection from '@/components/sections/ClientsSection';
import CTASection from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Поставщик расходников для чистых помещений в Узбекистане | ${siteConfig.name}`,
  description:
    'B2B поставщик расходных материалов для чистых помещений в Ташкенте: GMP, ISO 14644. Одежда, перчатки, дезинфектанты, индикаторы, салфетки для фармы, пищёвки и электроники.',
  openGraph: {
    title: `Поставщик расходников для чистых помещений в Узбекистане | ${siteConfig.name}`,
    description:
      'Профессиональное оснащение чистых помещений по GMP и ISO 14644 для фармацевтики, пищевой, косметической промышленности и микроэлектроники в Узбекистане.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://cleanroom.uz',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  image: `${siteConfig.url}/og-image.png`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  priceRange: '$$',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: siteConfig.phone,
    email: siteConfig.email,
    contactType: 'sales',
    areaServed: 'UZ',
    availableLanguage: ['Russian', 'Uzbek'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Нукус, 85/1',
    addressLocality: 'Ташкент',
    addressCountry: 'UZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.2995,
    longitude: 69.2401,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [
    siteConfig.social.telegram,
    siteConfig.social.youtube,
  ].filter(Boolean),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />
      <AboutPreviewSection />
      <ServicesSection />
      <CategoriesSection />
      <WhyUsSection />
      <PartnersSection />
      <ClientsSection />
      <CTASection />
    </>
  );
}
