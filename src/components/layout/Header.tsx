'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Logo from '@/components/ui/Logo';

const navLinks = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'О компании', href: '/company/about' },
  { label: 'База знаний', href: '/blog' },
  { label: 'Контакты', href: '/contacts' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-all duration-300 ${
        isScrolled ? 'border-b border-[#EEF0F2]' : ''
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-[80px]">
        <div className="flex items-center justify-between h-[72px]">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Nav links */}
          <nav className="hidden lg:flex items-center gap-7 ml-10">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-[#00608A] font-semibold'
                    : 'text-[#333333] hover:text-[#00608A]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Phone + CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-[#333333] hover:text-[#00608A] transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>

            <Link
              href="/contacts"
              className="hidden lg:inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-[#00608A] rounded-lg hover:bg-[#005070] transition-colors"
            >
              Запросить КП
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#00608A] hover:text-[#005070] rounded-md transition-colors"
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] z-40 transition-all duration-200 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Slide-out panel from right */}
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transition-transform duration-200 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="px-6 py-6 h-full overflow-y-auto">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3.5 text-base font-medium border-b border-gray-100 last:border-0 ${
                  isActive(item.href)
                    ? 'text-[#00608A] font-semibold'
                    : 'text-[#333333]'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile contact info */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm font-medium text-[#00608A]"
              >
                <Phone size={16} />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-sm text-gray-500 hover:text-[#00608A] transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>

            <Link
              href="/contacts"
              className="block w-full text-center mt-6 px-6 py-3 text-sm font-semibold text-white bg-[#00608A] rounded-lg hover:bg-[#005070] transition-colors"
            >
              Запросить КП
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
