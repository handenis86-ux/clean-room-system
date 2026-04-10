import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/hero-bg.png"
        alt="Чистое помещение — профессиональное оснащение"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Dark teal overlay */}
      <div className="absolute inset-0 bg-brand-900/80" />

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 flex flex-col items-start justify-center min-h-[600px] lg:min-h-[700px]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight tracking-tight mb-6 max-w-3xl">
          Комплексное оснащение чистых помещений под ключ
        </h1>

        <p className="text-lg md:text-xl text-brand-200 max-w-2xl mb-10 leading-relaxed">
          Профессиональные решения для фармацевтики, электроники и медицины.
          Сертифицированная продукция, поставка и сервисное сопровождение.
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-brand-900 bg-white rounded-lg hover:bg-brand-50 transition-colors"
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
