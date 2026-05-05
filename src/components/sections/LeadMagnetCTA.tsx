import Image from 'next/image';
import { CheckCircle2, FileText, Clock } from 'lucide-react';
import LeadMagnetForm from '@/components/forms/LeadMagnetForm';

const bullets = [
  'Стратегия контроля контаминации (CCS) по Annex 1 (2022)',
  'EM-программа: точки, частоты, action / alert limits',
  'Валидация дезинфектантов и ротация спорицида',
  'Топ-10 типичных нарушений на UZ-аудитах',
  'Документация: VMP, SMF, SOP — что готовить заранее',
];

export default function LeadMagnetCTA() {
  return (
    <section className="bg-gradient-to-br from-surface to-white py-20 border-y border-surface-input">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — visual + intro */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-light text-brand-dark rounded-full text-[12px] font-bold uppercase tracking-wider">
              <FileText size={14} />
              Бесплатный материал
            </div>

            <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-extrabold text-text-dark leading-tight">
              Чек-лист GMP-аудита 2027
            </h2>

            <p className="text-[16px] md:text-[17px] text-text leading-relaxed">
              10 разделов, 50+ практических пунктов проверки. Подготовка
              фарм-производства Узбекистана к обязательной GMP-сертификации
              по дедлайну января 2027 г.
            </p>

            <div className="rounded-2xl overflow-hidden border border-surface-input shadow-sm bg-white">
              <div className="aspect-[16/10] relative">
                <Image
                  src="/images/blog/gmp-standards.webp"
                  alt="Чек-лист GMP-аудита 2027 для фарм-предприятий Узбекистана"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 border-t border-surface-input">
                <p className="eyebrow mb-2">Что внутри документа</p>
                <ul className="space-y-2">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[14px] text-text leading-snug"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-brand shrink-0 mt-0.5"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[13px] text-text-muted">
              <Clock size={14} />
              <span>
                Обновлено: май 2026. Источники: EU GMP Annex 1 (2022), ICH Q9,
                USP &lt;1116&gt;, практика UZ-инспекций.
              </span>
            </div>
          </div>

          {/* Right — capture form card */}
          <div className="bg-white rounded-2xl border border-surface-input shadow-lg p-6 md:p-8 lg:sticky lg:top-24">
            <div className="mb-6">
              <h3 className="text-[22px] md:text-[24px] font-extrabold text-text-dark mb-2 leading-tight">
                Получить чек-лист
              </h3>
              <p className="text-[14px] text-text leading-relaxed">
                Оставьте контакты — откроем доступ сразу после отправки формы.
                Никакого спама, только профильные материалы.
              </p>
            </div>

            <LeadMagnetForm />
          </div>
        </div>
      </div>
    </section>
  );
}
