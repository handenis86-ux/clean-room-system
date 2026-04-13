import { Droplets, Truck, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: Droplets,
    title: 'Поставка расходных материалов',
    description:
      'Регулярные поставки одежды, перчаток, дезинфектантов, салфеток и уборочного инвентаря.',
  },
  {
    icon: Truck,
    title: 'Логистика и доставка',
    description:
      'Оперативная доставка по всему Узбекистану с соблюдением условий хранения.',
  },
  {
    icon: GraduationCap,
    title: 'Обучение по стандартам GMP',
    description:
      'Проведение обучения персонала по работе в чистых помещениях в соответствии со стандартами GMP.',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="text-center mb-14">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark mb-4">
            Направления деятельности нашей компании
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl bg-surface border border-surface-border p-8 flex flex-col gap-4"
            >
              <div className="w-14 h-14 rounded-full bg-brand-light flex items-center justify-center">
                <service.icon size={20} className="text-brand" />
              </div>
              <h3 className="text-[16px] font-bold text-text-dark">
                {service.title}
              </h3>
              <p className="text-[14px] text-text leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
