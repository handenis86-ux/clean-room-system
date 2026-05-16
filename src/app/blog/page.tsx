import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Mail } from 'lucide-react';
import { articles } from '@/data/articles';
import BlogList from './BlogList';

export const metadata: Metadata = {
  title: 'База знаний: чистые помещения, GMP, ISO 14644',
  description:
    'Экспертные статьи о чистых помещениях для предприятий Узбекистана: классы ISO 14644, требования GMP, выбор расходных материалов, мониторинг, валидация и обслуживание.',
  alternates: {
    canonical: 'https://cleanroom.uz/blog',
  },
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark w-full py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              База знаний Clean Room Systems
            </h1>
            <p className="text-base text-white/80 mb-8">
              Делимся экспертными знаниями о чистых помещениях: стандарты,
              продукция, технологии проектирования и обслуживания.
            </p>
            <div className="relative max-w-[480px] mx-auto">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Поиск по статьям..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-full text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
          </div>
        </div>
      </section>

      <BlogList articles={articles} />

      {/* Newsletter */}
      <section className="bg-brand-light py-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-text-dark mb-3">
              Подпишитесь на рассылку
            </h2>
            <p className="text-sm text-text mb-6">
              Получайте полезные статьи о чистых помещениях, обзоры продукции
              и новости отрасли прямо на вашу почту. Не чаще двух раз в месяц.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-surface-stroke rounded-lg text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors whitespace-nowrap"
              >
                Подписаться
              </button>
            </form>
            <p className="text-xs text-text-muted mt-4">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <Link
                href="/privacy"
                className="underline hover:text-text"
              >
                политикой конфиденциальности
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
