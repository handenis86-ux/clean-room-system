import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: '15+', label: 'лет на рынке' },
  { value: '500+', label: 'клиентов' },
  { value: '8', label: 'категорий продукции' },
  { value: 'ISO', label: '9001:2015' },
];

export default function AboutPreviewSection() {
  return (
    <>
      {/* Stats bar */}
      <section className="bg-brand-light py-[60px]">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex flex-wrap justify-around gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[32px] sm:text-[48px] font-black text-brand leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[14px] text-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About text + photo */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center">
            {/* Text */}
            <div>
              <span className="text-xs font-bold text-brand uppercase tracking-[2px]">
                + О КОМПАНИИ
              </span>
              <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark mt-3 mb-6 leading-tight">
                Надёжный партнёр в оснащении чистых помещений
              </h2>
              <p className="text-[15px] text-text leading-relaxed mb-4">
                Clean Room System — официальный дистрибьютор ведущих мировых производителей
                одежды и расходных материалов для чистых помещений. Мы обеспечиваем
                фармацевтические и биотехнологические предприятия полным спектром продукции:
                от защитной одежды и перчаток до дезинфицирующих средств и индикаторов стерилизации.
              </p>
              <p className="text-[15px] text-text leading-relaxed mb-8">
                Наша миссия — обеспечить безупречную чистоту и безопасность производственных
                процессов наших клиентов, предоставляя только сертифицированную продукцию и
                экспертную поддержку.
              </p>
              <Link
                href="/company/about"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:text-brand-dark transition-colors"
              >
                Подробнее о компании
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Photo */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/about/team-1.png"
                  alt="Специалисты в чистом помещении"
                  fill
                  className="object-cover"
                  sizes="500px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
