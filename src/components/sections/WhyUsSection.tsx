import { ShieldCheck, Package, Headphones, Zap } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Сертифицированная продукция',
    description:
      'Все товары имеют сертификаты соответствия и полностью отвечают требованиям GMP и ISO.',
  },
  {
    icon: Package,
    title: 'Комплексные поставки',
    description:
      'Полный спектр расходных материалов и оборудования от ведущих мировых производителей.',
  },
  {
    icon: Headphones,
    title: 'Техническая поддержка',
    description:
      'Экспертные консультации и сервисное сопровождение на всех этапах сотрудничества.',
  },
  {
    icon: Zap,
    title: 'Быстрая доставка',
    description:
      'Оперативная доставка по Ташкенту и всему Узбекистану. Склад с постоянным наличием.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-brand uppercase tracking-[2px]">
            + ПРЕИМУЩЕСТВА
          </span>
          <h2 className="text-[36px] font-extrabold text-text-dark mt-3">
            Почему выбирают нас
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-surface border border-surface-border p-8 text-center flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-brand-light flex items-center justify-center">
                <feature.icon size={20} className="text-brand" />
              </div>
              <h3 className="text-[16px] font-bold text-text-dark">
                {feature.title}
              </h3>
              <p className="text-[14px] text-text leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
