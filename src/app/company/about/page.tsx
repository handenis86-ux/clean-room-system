import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `О компании — ${siteConfig.name}`,
  description:
    'Clean Room System — ведущий поставщик одежды и расходных материалов для чистых помещений в Узбекистане. Комплексные решения для фармацевтики, электроники и медицины.',
  alternates: {
    canonical: `${siteConfig.url}/company/about`,
  },
};

const stats = [
  { value: '15+', label: 'лет на рынке' },
  { value: '500+', label: 'довольных клиентов' },
  { value: '8', label: 'категорий продукции' },
  { value: 'ISO', label: '9001:2015' },
];

const certifications = [
  'ISO 9001:2015 — система менеджмента качества',
  'ISO 14644 — чистые помещения и связанные контролируемые среды',
  'GMP — надлежащая производственная практика',
  'CE — подтверждение соответствия стандартам ЕС',
  'ГОСТ Р — соответствие национальным стандартам',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark h-[400px] flex items-center">
        <div className="w-full px-4 lg:px-[80px]">
          <nav className="flex items-center gap-1.5 text-[13px] text-[#88C5D9] mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Главная
            </Link>
            <span>/</span>
            <Link
              href="/company/about"
              className="hover:text-white transition-colors"
            >
              О компании
            </Link>
          </nav>
          <h1 className="text-[32px] md:text-[56px] font-extrabold text-white leading-tight">
            О компании
          </h1>
          <p className="text-[18px] text-brand-muted max-w-[700px] mt-4 leading-relaxed">
            Комплексное оснащение чистых помещений для фармацевтической,
            электронной и медицинской промышленности в Узбекистане.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-4 lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-[60px] items-start">
          {/* Left */}
          <div className="flex-1">
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
              + КТО МЫ
            </p>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight mb-6">
              Профессионалы в области чистых помещений
            </h2>
            <p className="text-[15px] text-text leading-relaxed mb-4">
              <strong className="text-text-dark">{siteConfig.name}</strong> —
              это специализированная компания в Ташкенте, которая обеспечивает
              предприятия всем необходимым для создания и эксплуатации чистых
              производственных сред. Мы поставляем одежду, перчатки,
              дезинфектанты, салфетки, уборочный инвентарь и другие расходные
              материалы от ведущих мировых производителей.
            </p>
            <p className="text-[15px] text-text leading-relaxed mb-4">
              Наша миссия — помогать предприятиям Узбекистана соответствовать
              международным стандартам чистоты и безопасности. Мы понимаем, что
              качество продукции для чистых помещений напрямую влияет на качество
              конечной продукции наших клиентов.
            </p>
            <p className="text-[15px] text-text leading-relaxed">
              От небольших лабораторий до крупных фармацевтических производств —
              мы подбираем оптимальные решения для каждого проекта, учитывая класс
              чистоты, отраслевые стандарты и бюджет.
            </p>
          </div>

          {/* Right */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <Image
              src="/images/about/team-2.png"
              alt="Команда Clean Room System"
              width={500}
              height={450}
              className="w-full lg:w-[500px] h-auto lg:h-[450px] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-light py-[60px] px-4 lg:px-[80px]">
        <div className="flex items-center justify-around flex-wrap gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[32px] sm:text-[48px] font-black text-brand leading-none mb-2">
                {s.value}
              </p>
              <p className="text-[14px] text-text">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 px-4 lg:px-[80px]">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
            + ПАРТНЁРЫ
          </p>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark">
            Наши партнёры
          </h2>
          <p className="text-[15px] text-text mt-3 max-w-[600px] mx-auto">
            Мы сотрудничаем с ведущими мировыми производителями одежды и
            расходных материалов для чистых помещений.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[80px] bg-surface rounded-xl border border-surface-border flex items-center justify-center"
            >
              <span className="text-[13px] text-text-muted">
                Partner {i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Certification */}
      <section className="bg-surface py-20 px-4 lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-[60px] items-start">
          {/* Left: Certificate image */}
          <div className="flex-shrink-0 w-full lg:w-auto">
            <Image
              src="/images/about/certificate.png"
              alt="Сертификаты Clean Room System"
              width={400}
              height={350}
              className="w-full lg:w-[400px] h-auto lg:h-[350px] object-cover rounded-2xl"
            />
          </div>

          {/* Right */}
          <div className="flex-1">
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
              + СЕРТИФИКАЦИЯ
            </p>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight mb-4">
              Сертифицированное качество
            </h2>
            <p className="text-[15px] text-text leading-relaxed mb-6">
              Вся поставляемая продукция имеет необходимые сертификаты
              соответствия и проходит строгий контроль качества. Мы работаем
              только с проверенными производителями.
            </p>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-1.5" />
                  <span className="text-[15px] text-text">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 px-4 lg:px-[80px]">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
            + КЛИЕНТЫ
          </p>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark">
            Нам доверяют
          </h2>
          <p className="text-[15px] text-text mt-3 max-w-[600px] mx-auto">
            Фармацевтические компании, лаборатории и производственные предприятия
            Узбекистана выбирают Clean Room System.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[80px] bg-surface rounded-xl border border-surface-border flex items-center justify-center"
            >
              <span className="text-[13px] text-text-muted">
                Client {i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-20">
        <div className="text-center max-w-3xl mx-auto px-6">
          <h2 className="text-[28px] md:text-[36px] font-bold text-white mb-4">
            Готовы обсудить ваш проект?
          </h2>
          <p className="text-brand-light text-[16px] max-w-xl mx-auto mb-8 leading-relaxed">
            Свяжитесь с нами для бесплатной консультации по оснащению чистых
            помещений. Поможем подобрать оптимальное решение под ваши задачи.
          </p>
          <Link
            href="/contacts"
            className="inline-flex items-center gap-2 px-8 py-4 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
          >
            Связаться с нами
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
