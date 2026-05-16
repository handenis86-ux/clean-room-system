import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Layers,
  ClipboardList,
  FileCheck,
  BookOpenCheck,
  Download,
  type LucideIcon,
} from 'lucide-react';

type Card = {
  href: string;
  tag: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const complianceCards: Card[] = [
  {
    href: '/compliance/annex1',
    tag: 'Compliance',
    title: 'EU GMP Annex 1 (2022)',
    description:
      'Контаминационный контроль (CCS), классы A–D, требования к стерильному производству — что именно проверяет инспекция.',
    icon: ShieldCheck,
  },
  {
    href: '/compliance/standards',
    tag: 'Compliance',
    title: 'Матрица 8 стандартов',
    description:
      'GMP, ICH Q9/Q10, USP <1116>/<797>, ASTM, ISO 13485, ISO 14644 — как пересекаются и какие расходники под какой пункт.',
    icon: Layers,
  },
];

const resourceCards: Card[] = [
  {
    href: '/resources/gmp-audit-checklist',
    tag: 'Чек-лист',
    title: 'Чек-лист GMP-аудита 2027',
    description:
      '10 разделов, 50+ пунктов. Подготовка фарм-производства к дедлайну января 2027 г.',
    icon: ClipboardList,
  },
  {
    href: '/resources/iso-14644-classes-spec',
    tag: 'Справочник',
    title: 'Классы ISO 14644',
    description:
      'ISO 5 / 7 / 8, частиц/м³, ACH, ΔP — таблица соответствия GMP A–D и подбор расходников.',
    icon: BookOpenCheck,
  },
  {
    href: '/resources/disinfection-validation-protocol',
    tag: 'Протокол',
    title: 'Валидация дезинфекции',
    description:
      'Протокол validation disinfectant efficacy: ротация, контактное время, log-reduction, ATCC-штаммы.',
    icon: FileCheck,
  },
  {
    href: '/resources/gowning-room-design-guide',
    tag: 'Гайд',
    title: 'Дизайн gowning room',
    description:
      'Зонирование D→C→B→A, ΔP, ACH, lux, мебель по 4 зонам — для архитекторов и QA.',
    icon: Download,
  },
];

function CardItem({ card }: { card: Card }) {
  const Icon = card.icon;
  return (
    <Link
      href={card.href}
      className="group flex gap-4 bg-white border border-surface-border rounded-xl p-5 transition-all hover:border-brand hover:shadow-md"
    >
      <div className="shrink-0 w-11 h-11 rounded-lg bg-brand-light flex items-center justify-center">
        <Icon size={20} className="text-brand" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="inline-block text-[11px] font-bold text-brand uppercase tracking-wider mb-1.5">
          {card.tag}
        </span>
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-[16px] font-bold text-text-dark leading-snug group-hover:text-brand transition-colors">
            {card.title}
          </h4>
          <ArrowRight
            size={18}
            className="shrink-0 mt-0.5 text-text-muted group-hover:text-brand group-hover:translate-x-0.5 transition-all"
          />
        </div>
        <p className="text-[13px] text-text-muted leading-relaxed mt-1.5">
          {card.description}
        </p>
      </div>
    </Link>
  );
}

export default function ComplianceResourcesSection() {
  return (
    <section className="bg-surface py-20 border-y border-surface-border">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-xs font-bold text-brand uppercase tracking-[2px]">
            Для QA-специалистов
          </span>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark mt-3 mb-4">
            Соответствие стандартам и матрица расходников
          </h2>
          <p className="text-[16px] text-text leading-relaxed">
            С января 2027 года GMP-сертификация обязательна для всех
            фарм-производителей Узбекистана. Подготовили матрицу соответствия
            EU GMP Annex 1, ICH, USP, ISO 14644 — и готовые гайды, чек-листы
            и протоколы для прохождения инспекции.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left column — Compliance */}
          <div>
            <h3 className="text-[18px] font-bold text-text-dark mb-5 flex items-center gap-2">
              <ShieldCheck size={20} className="text-brand" />
              Соответствие стандартам
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {complianceCards.map((c) => (
                <CardItem key={c.href} card={c} />
              ))}
            </div>
          </div>

          {/* Right column — Resources */}
          <div>
            <h3 className="text-[18px] font-bold text-text-dark mb-5 flex items-center gap-2">
              <BookOpenCheck size={20} className="text-brand" />
              Гайды и чек-листы
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resourceCards.map((c) => (
                <CardItem key={c.href} card={c} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/compliance/standards"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white bg-brand-dark rounded-lg hover:bg-brand transition-colors"
          >
            Посмотреть матрицу 8 стандартов
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
