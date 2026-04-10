import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Shield, Lightbulb, Users, Handshake, CheckCircle } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `О компании — ${siteConfig.name}`,
  description:
    'Clean Room System — ведущий поставщик оборудования и расходных материалов для чистых помещений в Узбекистане. Комплексные решения для фармацевтики, электроники и медицины.',
  alternates: {
    canonical: `${siteConfig.url}/company/about`,
  },
};

const stats = [
  { value: '10+', label: 'лет на рынке' },
  { value: '300+', label: 'довольных клиентов' },
  { value: '5 000+', label: 'позиций в каталоге' },
  { value: '500+', label: 'реализованных проектов' },
];

const values = [
  {
    icon: Shield,
    title: 'Надёжность и качество',
    description:
      'Работаем только с сертифицированными производителями. Каждая партия продукции проходит строгий контроль качества перед поставкой клиенту.',
  },
  {
    icon: Lightbulb,
    title: 'Экспертный подход',
    description:
      'Наши специалисты глубоко разбираются в стандартах GMP, ISO и отраслевых требованиях. Мы подбираем решения, которые точно соответствуют вашим задачам.',
  },
  {
    icon: Handshake,
    title: 'Партнёрство',
    description:
      'Мы выстраиваем долгосрочные отношения с клиентами, обеспечивая стабильные поставки и сервисную поддержку на каждом этапе сотрудничества.',
  },
  {
    icon: Users,
    title: 'Клиентоориентированность',
    description:
      'Индивидуальный подход к каждому проекту. От первой консультации до послепродажного обслуживания — мы всегда рядом.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-800 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: 'Главная', href: '/' },
                { label: 'О компании' },
              ]}
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-6">
              О компании
            </h1>
            <p className="text-lg text-brand-200 max-w-2xl leading-relaxed">
              Комплексное оснащение чистых помещений для фармацевтической,
              электронной и медицинской промышленности в Узбекистане.
            </p>
          </div>
        </div>
      </section>

      {/* Company description */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-sm font-semibold text-brand-800 uppercase tracking-wider mb-3">
                Кто мы
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 leading-tight mb-6">
                Профессионалы в области чистых помещений
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong className="text-gray-900">{siteConfig.name}</strong> —
                это специализированная компания в Ташкенте, которая обеспечивает
                предприятия всем необходимым для создания и эксплуатации чистых
                производственных сред. Мы поставляем одежду, перчатки,
                дезинфектанты, салфетки, уборочный инвентарь и другие расходные
                материалы от ведущих мировых производителей.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Наша миссия — помогать предприятиям Узбекистана соответствовать
                международным стандартам чистоты и безопасности. Мы понимаем, что
                качество продукции для чистых помещений напрямую влияет на
                качество конечной продукции наших клиентов.
              </p>
              <p className="text-gray-600 leading-relaxed">
                От небольших лабораторий до крупных фармацевтических производств —
                мы подбираем оптимальные решения для каждого проекта, учитывая
                класс чистоты, отраслевые стандарты и бюджет.
              </p>
            </div>
            <div className="space-y-5">
              {[
                'Полный ассортимент продукции для чистых помещений',
                'Сертифицированная продукция международного качества',
                'Прямые контракты с производителями',
                'Техническое консультирование и подбор решений',
                'Оперативная доставка по всему Узбекистану',
                'Гибкие условия сотрудничества',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-brand-800 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-50 py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl md:text-5xl font-heading font-bold text-brand-800 mb-2">
                  {s.value}
                </p>
                <p className="text-sm text-gray-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-brand-800 uppercase tracking-wider mb-3">
              Наши ценности
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
              Принципы нашей работы
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-800 flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-800 py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
            Готовы обсудить ваш проект?
          </h2>
          <p className="text-brand-200 max-w-xl mx-auto mb-8 leading-relaxed">
            Свяжитесь с нами для бесплатной консультации по оснащению чистых
            помещений. Поможем подобрать оптимальное решение под ваши задачи.
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-8 py-4 text-[15px] font-semibold text-brand-800 bg-white rounded-lg hover:bg-brand-50 transition-colors"
          >
            Связаться с нами
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
