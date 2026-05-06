import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import AboutPreviewSection from '@/components/sections/AboutPreviewSection';
import ServicesSection from '@/components/sections/ServicesSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import SeoContentSection from '@/components/sections/SeoContentSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import LeadMagnetCTA from '@/components/sections/LeadMagnetCTA';
import PartnersSection from '@/components/sections/PartnersSection';
import ClientsSection from '@/components/sections/ClientsSection';
import CTASection from '@/components/sections/CTASection';
import { siteConfig } from '@/config/site';
import { localBusinessJsonLd } from '@/data/local-business-schema';

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

const jsonLd = localBusinessJsonLd;

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
      <SeoContentSection />
      <WhyUsSection />
      <LeadMagnetCTA />
      <PartnersSection />
      <ClientsSection />
      <CTASection />
    </>
  );
}
