import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const features = [
  {
    title: 'Сертифицированная продукция',
    description:
      'Все товары имеют сертификаты соответствия и полностью отвечают требованиям GMP и ISO.',
  },
  {
    title: 'Широкий ассортимент',
    description:
      'Более 500 наименований расходных материалов и оборудования для чистых помещений.',
  },
  {
    title: 'Быстрая доставка',
    description:
      'Оперативная доставка по Ташкенту и всему Узбекистану. Склад с постоянным наличием.',
  },
  {
    title: 'Экспертные консультации',
    description:
      'Наши специалисты помогут подобрать оптимальное решение под ваши задачи и бюджет.',
  },
  {
    title: 'Конкурентные цены',
    description:
      'Прямые контракты с производителями позволяют предлагать лучшие цены на рынке.',
  },
  {
    title: 'Гарантия качества',
    description:
      'Гарантия на всю поставляемую продукцию и полное сервисное сопровождение.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side — image */}
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/categories/masks.png"
                alt="Защитные очки и средства индивидуальной защиты"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Right side — heading + features */}
          <div className="w-full lg:flex-1">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-8">
              Почему выбирают нас?
            </h2>

            <div className="flex flex-col gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <CheckCircle
                    size={24}
                    className="text-brand-600 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
