import Link from 'next/link';
import { Send, Youtube, MessageCircle } from 'lucide-react';
import { siteConfig, footerNavigation, phoneTel } from '@/config/site';
import Logo from '@/components/ui/Logo';

const socialLinks = [
  {
    href: siteConfig.social.telegramChannel,
    label: 'Telegram канал Clean Room Systems',
    Icon: Send,
    color: '#229ED9',
  },
  {
    href: siteConfig.social.whatsapp,
    label: 'WhatsApp',
    Icon: MessageCircle,
    color: '#25D366',
  },
  {
    href: siteConfig.social.youtube,
    label: 'YouTube канал',
    Icon: Youtube,
    color: '#FF0000',
  },
].filter((s): s is { href: string; label: string; Icon: typeof Send; color: string } => !!s.href);

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A]">
      <div className="w-full max-w-[1440px] mx-auto py-[60px] px-4 lg:px-[80px]">
        {/* Top section — 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div>
            <Logo variant="footer" />
            <p className="mt-4 text-[14px] font-normal text-[#888888] leading-[1.5] max-w-xs">
              Одежда и расходные материалы для чистых
              помещений. Решения для фармацевтики, пищевой,
              косметической промышленности и микроэлектроники.
            </p>

            {/* Social icons row */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ href, label, Icon, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:bg-[#222] transition-colors"
                  style={{ '--brand-color': color } as React.CSSProperties}
                >
                  <Icon
                    size={18}
                    className="text-[#888888] group-hover:text-[var(--brand-color)] transition-colors"
                    strokeWidth={2}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Каталог */}
          <div>
            <h3 className="text-[14px] font-bold text-white mb-4">Каталог</h3>
            <ul className="flex flex-col gap-[12px]">
              {footerNavigation.catalog.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 text-sm font-normal text-[#888888] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Компания */}
          <div>
            <h3 className="text-[14px] font-bold text-white mb-4">Компания</h3>
            <ul className="flex flex-col gap-[12px]">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-1.5 text-sm font-normal text-[#888888] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Контакты */}
          <div>
            <h3 className="text-[14px] font-bold text-white mb-4">Контакты</h3>
            <ul className="flex flex-col gap-[12px]">
              <li>
                <a
                  href={`tel:${phoneTel}`}
                  className="inline-block py-1.5 text-sm font-normal text-[#888888] hover:text-white transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-block py-1.5 text-sm font-normal text-[#888888] hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="text-sm font-normal text-[#888888]">
                  {siteConfig.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — 60px gap from top section */}
        <div className="mt-[60px] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm font-normal text-[#888888]">
            &copy; 2026 {siteConfig.name}. Все права защищены.
          </p>
          <Link
            href="/privacy"
            className="text-sm font-normal text-[#888888] hover:text-white transition-colors"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
