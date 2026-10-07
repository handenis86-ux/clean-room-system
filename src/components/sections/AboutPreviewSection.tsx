import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPreviewSection() {
  return (
    <>
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
                Clean Room Systems — поставщик одежды и расходных материалов для чистых
                помещений от ведущих мировых производителей. Мы обеспечиваем
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
                  src="/images/about/team-1.webp"
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
