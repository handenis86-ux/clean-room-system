import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-brand-800 py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight mb-6 max-w-3xl mx-auto">
          Нужна помощь в оснащении чистого помещения?
        </h2>
        <p className="text-brand-200 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
          Свяжитесь с нами для бесплатной консультации. Мы подберём
          оптимальные решения под ваши задачи и бюджет.
        </p>
        <Link
          href="/contacts"
          className="inline-flex items-center justify-center px-8 py-4 text-[15px] font-semibold text-brand-900 bg-white rounded-lg hover:bg-brand-50 transition-colors"
        >
          Связаться с нами
        </Link>
      </div>
    </section>
  );
}
