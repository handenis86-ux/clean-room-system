import Image from 'next/image';
import { CheckCircle2, FileText, Clock } from 'lucide-react';
import LeadMagnetForm from '@/components/forms/LeadMagnetForm';

const bullets = [
  'Каскад чистоты D → C → B → A с диаграммой зонирования',
  'Размеры, м², ΔP, ACH, lux — рабочие нормативы по зонам',
  'Чек-лист мебели TINMAN и расходников по 4 зонам',
  'HVAC: HEPA H14, interlock, схемы потоков воздуха',
  '10 типичных ошибок проектирования — major findings на инспекциях',
];

export default function GowningGuideCTA() {
  return (
    <section className="bg-gradient-to-br from-surface to-white py-20 border-y border-surface-input">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left — visual + intro */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-light text-brand-dark rounded-full text-[12px] font-bold uppercase tracking-wider">
              <FileText size={14} />
              Бесплатный гайд
            </div>

            <h2 className="text-[28px] md:text-[36px] lg:text-[40px] font-extrabold text-text-dark leading-tight">
              Гид по проектированию gowning room
            </h2>

            <p className="text-[16px] md:text-[17px] text-text leading-relaxed">
              Полное руководство для архитекторов, инженеров HVAC и
              QA-специалистов фарм-проектов Узбекистана. 10 разделов,
              рабочие чертежи, чек-листы оборудования по 4 зонам, привязка
              к мебели TINMAN и расходникам со склада в Ташкенте.
            </p>

            <div className="rounded-2xl overflow-hidden border border-surface-input shadow-sm bg-white">
              <div className="aspect-[16/10] relative">
                <Image
                  src="/images/blog/cleanroom-iso.webp"
                  alt="Гид по проектированию gowning room — для архитекторов и QA фарм-проектов Узбекистана"
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
                Обновлено: май 2026. Источники: EU GMP Annex 1 (2022),
                ISO 14644-4/5, USP &lt;1116&gt;, WHO TRS 961 Annex 4.
              </span>
            </div>
          </div>

          {/* Right — capture form card */}
          <div className="bg-white rounded-2xl border border-surface-input shadow-lg p-6 md:p-8 lg:sticky lg:top-24">
            <div className="mb-6">
              <h3 className="text-[22px] md:text-[24px] font-extrabold text-text-dark mb-2 leading-tight">
                Получить гид
              </h3>
              <p className="text-[14px] text-text leading-relaxed">
                Оставьте контакты — откроем доступ сразу после отправки
                формы. Без спама, только профильные материалы по
                cleanroom-индустрии.
              </p>
            </div>

            <LeadMagnetForm
              redirectTo="/resources/gowning-room-design-guide"
              resourceId="gowning_room_design_2026"
              submitLabel="Получить гид бесплатно"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
