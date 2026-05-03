import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/config/site';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  GoogleTagManagerHead,
  GoogleTagManagerNoScript,
} from '@/components/analytics/GoogleTagManager';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { YandexMetrika } from '@/components/analytics/YandexMetrika';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — поставщик расходников для чистых помещений в Узбекистане`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'B2B поставщик расходных материалов и одежды для чистых помещений в Узбекистане: GMP, ISO 14644. Решения для фармацевтики, пищёвки, косметики и микроэлектроники в Ташкенте.',
  keywords: [
    'чистые помещения', 'cleanroom', 'GMP', 'ISO 14644',
    'одежда для чистых помещений', 'перчатки', 'дезинфектанты',
    'Узбекистан', 'Ташкент', 'Pharma Park', 'поставщик',
    'расходные материалы', 'фармацевтика',
  ],
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'ru-RU': siteConfig.url,
      'x-default': siteConfig.url,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#00608A' }],
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — поставщик расходников для чистых помещений в Узбекистане`,
    description:
      'B2B поставщик расходных материалов и одежды для чистых помещений в Узбекистане: GMP, ISO 14644. Решения для фармацевтики, пищёвки, косметики и микроэлектроники в Ташкенте.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description:
      'B2B поставщик расходных материалов и одежды для чистых помещений в Узбекистане: GMP, ISO 14644. Решения для фармы, пищёвки, косметики и электроники в Ташкенте.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <head>
        <GoogleTagManagerHead />
        <GoogleAnalytics />
        <YandexMetrika />
      </head>
      <body className="min-h-screen flex flex-col">
        <GoogleTagManagerNoScript />
        <Header />
        <main className="flex-grow pt-[73px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
