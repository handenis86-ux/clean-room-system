import Link from 'next/link';
import { siteConfig, footerNavigation } from '@/config/site';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A]">
      <div className="w-full max-w-[1440px] mx-auto py-[60px] px-4 lg:px-[80px]">
        {/* Top section — 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <Logo variant="footer" />
            <p className="mt-4 text-[13px] font-normal text-[#888888] leading-[1.5] max-w-xs">
              Одежда и расходные материалы для чистых
              помещений. Комплексные решения для фармацевтики, электроники и
              медицины.
            </p>
          </div>

          {/* Column 2: Каталог */}
          <div>
            <h3 className="text-[13px] font-bold text-white mb-4">Каталог</h3>
            <ul className="flex flex-col gap-[12px]">
              {footerNavigation.catalog.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] font-normal text-[#888888] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Компания */}
          <div>
            <h3 className="text-[13px] font-bold text-white mb-4">Компания</h3>
            <ul className="flex flex-col gap-[12px]">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] font-normal text-[#888888] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Контакты */}
          <div>
            <h3 className="text-[13px] font-bold text-white mb-4">Контакты</h3>
            <ul className="flex flex-col gap-[12px]">
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-[13px] font-normal text-[#888888] hover:text-white transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[13px] font-normal text-[#888888] hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="text-[13px] font-normal text-[#888888]">
                  {siteConfig.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — 60px gap from top section */}
        <div className="mt-[60px] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[13px] font-normal text-[#888888]">
            &copy; 2026 {siteConfig.name}. Все права защищены.
          </p>
          <Link
            href="/privacy"
            className="text-[13px] font-normal text-[#888888] hover:text-white transition-colors"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
