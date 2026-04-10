import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function CTASection() {
  return (
    <section className="bg-brand-dark py-20">
      <div className="container mx-auto px-4 lg:px-20 text-center">
        <h2 className="text-[36px] font-extrabold text-white leading-tight mb-4">
          Нужна консультация?
        </h2>
        <p className="text-[16px] text-brand-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Свяжитесь с нами для бесплатной консультации. Мы подберём
          оптимальные решения под ваши задачи и бюджет.
        </p>

        <div className="flex items-center justify-center gap-8 mb-10">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-brand-muted transition-colors"
          >
            <Phone size={16} />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-white hover:text-brand-muted transition-colors"
          >
            <Mail size={16} />
            {siteConfig.email}
          </a>
        </div>

        <Link
          href="/contacts"
          className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-gray-100 transition-colors"
        >
          Запросить прайс-лист
        </Link>
      </div>
    </section>
  );
}
