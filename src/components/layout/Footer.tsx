import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig, footerNavigation } from '@/config/site';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-brand-200">
      {/* Main footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company info */}
          <div>
            <Logo variant="white" />
            <p className="text-sm text-brand-200 mt-5 leading-relaxed max-w-xs">
              Профессиональное оборудование и расходные материалы для чистых
              помещений. Комплексные решения для фармацевтики, электроники и
              медицины.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2.5 text-brand-100 hover:text-white transition-colors"
              >
                <Phone size={14} className="flex-shrink-0 text-brand-300" />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-brand-100 hover:text-white transition-colors"
              >
                <Mail size={14} className="flex-shrink-0 text-brand-300" />
                {siteConfig.email}
              </a>
              <div className="flex items-start gap-2.5 text-brand-100">
                <MapPin size={14} className="flex-shrink-0 text-brand-300 mt-0.5" />
                {siteConfig.address}
              </div>
            </div>
          </div>

          {/* Каталог */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-5">Каталог</h3>
            <ul className="space-y-3">
              {footerNavigation.catalog.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-brand-200 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-5">Компания</h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-brand-200 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-5">Поддержка</h3>
            <ul className="space-y-3">
              {footerNavigation.support.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-brand-200 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-700">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-brand-300">
              &copy; {currentYear} {siteConfig.name}. Все права защищены.
            </p>
            <div className="flex items-center gap-5 text-xs text-brand-300">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Конфиденциальность
              </Link>
              <Link
                href="/sitemap.xml"
                className="hover:text-white transition-colors"
              >
                Карта сайта
              </Link>
            </div>
            <Logo variant="white" className="hidden md:block" />
          </div>
        </div>
      </div>
    </footer>
  );
}
