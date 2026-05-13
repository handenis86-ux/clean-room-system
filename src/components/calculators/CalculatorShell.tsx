import Link from 'next/link';
import { ChevronRight, Phone, Mail } from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface CalculatorShellProps {
  title: string;
  subtitle: string;
  eyebrow: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
  footnote?: React.ReactNode;
}

export default function CalculatorShell({
  title,
  subtitle,
  eyebrow,
  breadcrumbs,
  children,
  footnote,
}: CalculatorShellProps) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${siteConfig.url}${item.href}` }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark via-brand to-brand-dark text-white">
        <div className="container max-w-page py-10 lg:py-14">
          <nav
            className="flex items-center gap-2 text-sm text-white/70 mb-5 flex-wrap"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight size={14} className="text-white/40" />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold uppercase tracking-wider">
              {eyebrow}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-100 text-xs font-semibold">
              Live-расчёт
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight max-w-4xl">
            {title}
          </h1>
          <p className="mt-4 text-base lg:text-lg text-white/85 max-w-3xl">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-surface py-10 lg:py-14">
        <div className="container max-w-page">{children}</div>
      </section>

      {/* Footnote / contact */}
      <section className="bg-white border-t border-surface-border py-10">
        <div className="container max-w-page">
          {footnote && (
            <div className="text-[13px] text-text-muted leading-relaxed max-w-3xl mb-8">
              {footnote}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl">
            <a
              href={`tel:${phoneTel}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-surface-border hover:border-brand hover:bg-brand-light/30 transition-colors group"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-light text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                <Phone size={18} />
              </span>
              <span>
                <span className="block text-[12px] text-text-muted">
                  Позвонить
                </span>
                <span className="block text-[15px] font-semibold text-text-dark">
                  {siteConfig.phone}
                </span>
              </span>
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 p-4 rounded-xl border border-surface-border hover:border-brand hover:bg-brand-light/30 transition-colors group"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-brand-light text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                <Mail size={18} />
              </span>
              <span>
                <span className="block text-[12px] text-text-muted">
                  Написать
                </span>
                <span className="block text-[15px] font-semibold text-text-dark">
                  {siteConfig.email}
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
