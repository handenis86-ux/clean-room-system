import Link from 'next/link';
import { Clock, ArrowRight, ShieldCheck } from 'lucide-react';

/**
 * Hero-style promo block for the GMP consulting landing page.
 * Rendered on the home page near the top to capture high-intent
 * pharma-prep traffic before catalog browse.
 */
export default function GmpConsultingCTA() {
  return (
    <section className="bg-brand-light/40 border-y border-brand-light py-14 lg:py-16 px-4 lg:px-[80px]">
      <div className="container mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand text-white rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
              <Clock size={14} />
              До GMP-2027 — 7 месяцев
            </div>
            <h2 className="text-[26px] md:text-[34px] lg:text-[40px] font-extrabold text-brand-dark leading-[1.15]">
              Готовитесь к GMP-2027?
              <br />
              <span className="text-brand">Получите план за 30 минут</span>
            </h2>
            <p className="text-[15px] md:text-[16px] text-text mt-4 leading-relaxed max-w-[640px]">
              Поможем пройти инспекцию АРФО с первого раза. Обучение QA,
              подготовка SOP, mock inspection, supplier qualification — в одном
              окне с практикующими GMP-консультантами. Бесплатная диагностика
              готовности предприятия.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/gmp-podgotovka"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors"
              >
                Получить план подготовки
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/compliance/gmp-2027-uzbekistan"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark border border-brand-dark/30 rounded-lg hover:bg-white transition-colors"
              >
                Что требует АРФО
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-brand/20 p-6 lg:p-7">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-light text-brand mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-[18px] font-bold text-text-dark mb-3 leading-tight">
              Что включено
            </h3>
            <ul className="space-y-2.5 text-[14px] text-text">
              <li className="flex gap-2.5">
                <span className="text-brand font-bold shrink-0">›</span>
                <span>Gap-аудит против EU GMP Annex 1</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-brand font-bold shrink-0">›</span>
                <span>Обучение QA-персонала, SOP, CCS</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-brand font-bold shrink-0">›</span>
                <span>Mock inspection за 2-3 мес. до АРФО</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-brand font-bold shrink-0">›</span>
                <span>Сопровождение на инспекции АРФО</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-brand font-bold shrink-0">›</span>
                <span>Supplier qualification расходников</span>
              </li>
            </ul>
            <p className="text-[12px] text-text-muted mt-4 leading-relaxed">
              Партнёрство с практикующими GMP-консультантами, сертифицировавшими
              предприятия в Узбекистане.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
