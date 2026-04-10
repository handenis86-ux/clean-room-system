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
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Направления деятельности нашей компании
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Мы предоставляем полный спектр услуг — от проектирования до сервисного
            сопровождения чистых помещений.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                <service.icon size={24} className="text-brand-600" />
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
