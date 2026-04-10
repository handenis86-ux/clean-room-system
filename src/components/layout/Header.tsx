'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { siteConfig, mainNavigation } from '@/config/site';
import Logo from '@/components/ui/Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo — left */}
          <Logo />

          {/* Desktop navigation — center */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainNavigation.map((item) => (
              <div
                key={item.href}
                className="relative group"
                onMouseEnter={() => item.children && setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-lg transition-colors ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'text-brand-800'
                      : 'text-gray-600 hover:text-brand-800'
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        openDropdown === item.href ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <div
                    className={`absolute top-full left-0 w-64 bg-white rounded-xl shadow-lg shadow-black/8 border border-gray-100 py-2 transition-all duration-200 ${
                      openDropdown === item.href
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-5 py-2.5 text-sm transition-colors ${
                          pathname === child.href
                            ? 'text-brand-800 bg-brand-50'
                            : 'text-gray-600 hover:text-brand-800 hover:bg-gray-50'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side — phone + CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-brand-800 hover:text-brand-700 transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>

            <Link
              href="/contacts"
              className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-brand-800 rounded-lg hover:bg-brand-700 transition-colors"
            >
              Оставить заявку
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-brand-800 hover:text-brand-700 rounded-md transition-colors"
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

        {/* Slide-out panel */}
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl transition-transform duration-200 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="px-6 py-6 h-full overflow-y-auto">
            {mainNavigation.map((item) => (
              <div key={item.href} className="border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`flex-1 py-3.5 text-base font-medium ${
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'text-brand-800'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.href ? null : item.href)
                      }
                      className="p-2 text-gray-400"
                      aria-label="Развернуть"
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-150 ${
                          openDropdown === item.href ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {item.children && (
                  <div
                    className={`overflow-hidden transition-all duration-150 ${
                      openDropdown === item.href ? 'max-h-[500px] pb-2' : 'max-h-0'
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block py-2 pl-4 text-sm ${
                          pathname === child.href
                            ? 'text-brand-800'
                            : 'text-gray-500 hover:text-brand-800'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile contact info */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-sm font-medium text-brand-800"
              >
                <Phone size={16} />
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-sm text-gray-500 hover:text-brand-800 transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>

            <Link
              href="/contacts"
              className="block w-full text-center mt-6 px-6 py-3 text-sm font-medium text-white bg-brand-800 rounded-lg hover:bg-brand-700 transition-colors"
            >
              Оставить заявку
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
