import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/hero-bg.png"
        alt="Чистое помещение — профессиональное оснащение"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-dark/80" />

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-20 flex flex-col items-start justify-center min-h-[500px]">
        <h1 className="text-[28px] sm:text-[36px] lg:text-[48px] font-extrabold text-white leading-tight tracking-tight mb-6 max-w-3xl">
          Комплексное оснащение чистых помещений под ключ
        </h1>

        <p className="text-[16px] font-normal text-brand-muted max-w-2xl mb-10 leading-relaxed">
          Профессиональные решения для фармацевтики, электроники и медицины.
          Сертифицированная продукция, поставка и сервисное сопровождение.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-gray-100 transition-colors"
          >
            Каталог продукции
          </Link>
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
          >
            Оставить заявку
          </Link>
        </div>
      </div>
    </section>
  );
}
