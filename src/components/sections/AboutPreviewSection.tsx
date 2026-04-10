import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '15+', label: 'лет опыта' },
  { value: '500+', label: 'клиентов' },
  { value: 'ISO 9001', label: 'сертификация' },
  { value: '8', label: 'категорий продукции' },
];

export default function AboutPreviewSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-16 border-b border-gray-200">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-3xl md:text-4xl font-heading font-bold text-brand-800 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wider">
              О компании
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mt-3 mb-6 leading-tight">
              Надёжный партнёр в оснащении чистых помещений
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Clean Room System — официальный дистрибьютор ведущих мировых производителей
              оборудования и расходных материалов для чистых помещений. Мы обеспечиваем
              фармацевтические и биотехнологические предприятия полным спектром продукции:
              от защитной одежды и перчаток до дезинфицирующих средств и индикаторов стерилизации.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Наша миссия — обеспечить безупречную чистоту и безопасность производственных
              процессов наших клиентов, предоставляя только сертифицированную продукцию и
              экспертную поддержку.
            </p>
            <Link
              href="/company/about"
              className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:text-brand-600 transition-colors"
            >
              Подробнее о компании
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Photos */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/about/team-1.png"
                alt="Специалисты в чистом помещении"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8">
              <Image
                src="/images/about/team-2.png"
                alt="Работа в чистом помещении"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
