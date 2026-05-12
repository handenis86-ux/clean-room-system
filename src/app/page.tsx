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
  title: `Расходники и мебель для чистых помещений Узбекистан — TINMAN, Contec, Terragene`,
  description:
    'Поставщик расходников cleanroom в Узбекистане: перчатки, дезинфектанты, биоиндикаторы, мебель TINMAN. Для GMP, ISO 14644, Pharma Park. Доставка из Ташкента, КП за 24 ч.',
  openGraph: {
    title: `Расходники cleanroom в Узбекистане — TINMAN, Contec, Terragene, BIMOS | ${siteConfig.name}`,
    description:
      'B2B-поставщик расходных материалов и мебели для чистых помещений для фарм-, биотех- и медицинских производств Узбекистана. GMP / ISO 14644 / EU GMP Annex 1 (2022).',
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
