'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
import InputGroup, {
  NumberInput,
  RadioGroup,
  Slider,
} from '@/components/calculators/InputGroup';
import ResultCard from '@/components/calculators/ResultCard';
import QuoteRequestForm from '@/components/calculators/QuoteRequestForm';
import { useCalcGtm } from '@/components/calculators/useCalcGtm';

type ZoneClass = 'AB' | 'C' | 'D';
type GloveType = 'sterile' | 'non_sterile';

/**
 * SKU → glove type prefill map. Used when product page links here with
 * ?sku=20830 — we preselect the right glove type so the calc lands on the
 * SKU the user came from.
 */
const SKU_GLOVE_TYPE: Record<string, GloveType> = {
  // Sterile nitriles (Isofield Gecko)
  '20830': 'sterile',
  '20831': 'sterile',
  // Non-sterile nitriles (Shield White, ClearKlens, etc.)
  '69845': 'non_sterile',
};

const ZONE_LABELS: Record<ZoneClass, string> = {
  AB: 'GMP A/B (стерильный розлив, изолятор)',
  C: 'GMP C (вторичная упаковка, подготовка)',
  D: 'GMP D (склад API, вспомогательные зоны)',
};

const CHANGES_PER_SHIFT: Record<ZoneClass, number> = {
  AB: 6,
  C: 4,
  D: 3,
};

const formatNumber = (n: number) =>
  n.toLocaleString('ru-RU', { maximumFractionDigits: 0 });

export default function GlovesCalculator() {
  const searchParams = useSearchParams();
  const [operators, setOperators] = useState(10);
  const [shifts, setShifts] = useState<1 | 2 | 3>(2);
  const [zone, setZone] = useState<ZoneClass>('C');
  const [gloveType, setGloveType] = useState<GloveType>('non_sterile');
  const [workDays, setWorkDays] = useState(250);
  const [waste, setWaste] = useState(10);

  // Prefill from ?sku=… — product pages link in with the SKU they want quoted.
  useEffect(() => {
    const sku = searchParams.get('sku');
    if (!sku) return;
    const mapped = SKU_GLOVE_TYPE[sku.trim()];
    if (mapped) {
      setGloveType(mapped);
      // Sterile gloves imply A/B class as the most common use-case.
      if (mapped === 'sterile') setZone('AB');
    }
  }, [searchParams]);

  useCalcGtm('gloves', [
    operators,
    shifts,
    zone,
    gloveType,
    workDays,
    waste,
  ]);

  const calc = useMemo(() => {
    const ops = Math.max(1, operators);
    const days = Math.max(1, workDays);
    const changesPerShift = CHANGES_PER_SHIFT[zone];
    // Каждый «оператор × смена × замен» = одна пара (2 перчатки).
    // Формула из ТЗ: операторы × смены × замен × 2 (пара) = пар? — Нет, в паре
    // 2 шт. ИТОГО ПАР/день = ops × shifts × changes. Кол-во ШТУК = пары × 2.
    const pairsPerDay = ops * shifts * changesPerShift;
    const pairsPerYear = Math.round(
      pairsPerDay * days * (1 + waste / 100)
    );
    const pairsPerMonth = Math.round(pairsPerYear / 12);
    const piecesPerYear = pairsPerYear * 2;

    // Пачка: стерильные обычно по 200 пар (например, 20830 — 100 пар),
    // нестерильные — по 100 шт (50 пар). Используем консервативно:
    // стерильные → 200 шт/пачка = 100 пар; нестерильные → 100 шт = 50 пар.
    const piecesPerBox = gloveType === 'sterile' ? 200 : 100;
    const pairsPerBox = piecesPerBox / 2;
    const boxesPerYear = Math.ceil(pairsPerYear / pairsPerBox);

    const sku =
      gloveType === 'sterile'
        ? {
            name: 'Isofield Gecko Nitrile (стерильные)',
            sku: '20830',
            href: '/catalog/perchatki-zashchitnye/20830',
            note: 'Стерильные нитриловые 300 мм, AQL 1.5 — для GMP A/B (фактически совместимы C/D)',
            packaging: '200 шт/пачка (100 пар)',
          }
        : {
            name: 'Shield White Nitrile 300 DI (нестерильные)',
            sku: '69845',
            href: '/catalog/perchatki-zashchitnye/69845',
            note: 'Нитриловые 300 мм, ESD-рассеивающие — для GMP C/D',
            packaging: '100 шт/пачка (50 пар)',
          };

    return {
      pairsPerDay,
      pairsPerMonth,
      pairsPerYear,
      piecesPerYear,
      boxesPerYear,
      piecesPerBox,
      sku,
    };
  }, [operators, shifts, zone, gloveType, workDays, waste]);

  return (
    <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-6 lg:gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <InputGroup
            number={1}
            label="Количество операторов в смене"
            required
            hint="Среднее количество персонала с перчатками в зоне одновременно"
          >
            <NumberInput
              value={operators}
              onChange={setOperators}
              min={1}
              max={500}
              suffix="чел."
            />
          </InputGroup>

          <InputGroup number={2} label="Смен в сутки" required>
            <RadioGroup
              name="shifts"
              layout="row"
              value={shifts}
              onChange={(v) => setShifts(v as 1 | 2 | 3)}
              options={[
                { value: 1, label: '1 смена' },
                { value: 2, label: '2 смены' },
                { value: 3, label: '3 смены' },
              ]}
            />
          </InputGroup>
        </div>

        <InputGroup
          number={3}
          label="Класс зоны GMP"
          required
          hint="Согласно Annex 1 §7.14 — типовая частота смены перчаток на оператора в смену"
        >
          <RadioGroup
            name="zone"
            value={zone}
            onChange={(v) => setZone(v as ZoneClass)}
            options={[
              {
                value: 'AB',
                label: 'A / B — стерильный',
                description: `${CHANGES_PER_SHIFT.AB} смен перчаток / смена`,
              },
              {
                value: 'C',
                label: 'C',
                description: `${CHANGES_PER_SHIFT.C} смены перчаток / смена`,
              },
              {
                value: 'D',
                label: 'D',
                description: `${CHANGES_PER_SHIFT.D} смены перчаток / смена`,
              },
            ]}
          />
        </InputGroup>

        <InputGroup number={4} label="Тип перчаток" required>
          <RadioGroup
            name="gtype"
            value={gloveType}
            onChange={(v) => setGloveType(v as GloveType)}
            options={[
              {
                value: 'sterile',
                label: 'Стерильные нитриловые',
                description: 'Зоны A/B, гамма-облучение',
              },
              {
                value: 'non_sterile',
                label: 'Нестерильные нитриловые',
                description: 'Зоны C/D, DI-промытые',
              },
            ]}
          />
        </InputGroup>

        <div className="grid sm:grid-cols-2 gap-4">
          <InputGroup
            number={5}
            label="Рабочих дней в году"
            hint="Учтите выходные, плановые остановки на CIP/SIP, отпуска"
          >
            <NumberInput
              value={workDays}
              onChange={setWorkDays}
              min={100}
              max={365}
              suffix="дн."
            />
          </InputGroup>

          <InputGroup
            number={6}
            label="Запас на брак / порчу"
            hint="Резерв на разрывы, ошибки при надевании, потери при инвентаризации"
          >
            <Slider
              value={waste}
              onChange={setWaste}
              min={5}
              max={25}
              step={1}
              suffix="%"
            />
          </InputGroup>
        </div>
      </div>

      {/* Result */}
      <div className="space-y-4 lg:sticky lg:top-[88px]">
        <ResultCard
          eyebrow="Годовой расход"
          bigNumber={formatNumber(calc.pairsPerYear)}
          bigUnit="пар/год"
          caption={
            <>
              Это <strong>{formatNumber(calc.piecesPerYear)}</strong>{' '}
              штук перчаток — с учётом {waste}% резерва на брак для зоны{' '}
              <strong>GMP {zone === 'AB' ? 'A/B' : zone}</strong>.
            </>
          }
          breakdown={[
            { label: '/ день', value: `${formatNumber(calc.pairsPerDay)} пар` },
            {
              label: '/ месяц',
              value: `${formatNumber(calc.pairsPerMonth)} пар`,
            },
            {
              label: 'Пачек / год',
              value: `${formatNumber(calc.boxesPerYear)} × ${calc.piecesPerBox} шт`,
            },
          ]}
        >
          <div className="mt-6 rounded-xl bg-white/10 backdrop-blur p-4">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-white/15">
                <Package size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1">
                  Рекомендуемый SKU
                </p>
                <Link
                  href={calc.sku.href}
                  className="text-[15px] font-bold hover:underline inline-flex items-center gap-1"
                >
                  {calc.sku.name} <ArrowRight size={14} />
                </Link>
                <p className="text-[12px] text-white/75 leading-snug mt-1">
                  SKU: {calc.sku.sku} • {calc.sku.packaging}
                </p>
                <p className="text-[12px] text-white/75 leading-snug mt-1">
                  {calc.sku.note}
                </p>
              </div>
            </div>
          </div>
        </ResultCard>

        <QuoteRequestForm
          calculatorId="gloves"
          calculatorName="Расход перчаток для cleanroom"
          resultAmount={calc.pairsPerYear}
          resultLabel={`${formatNumber(calc.pairsPerYear)} пар/год (${formatNumber(
            calc.piecesPerYear
          )} шт)`}
          payload={{
            operators,
            shifts,
            zone_class: zone,
            glove_type: gloveType,
            work_days: workDays,
            waste_pct: waste,
            pairs_per_day: calc.pairsPerDay,
            pairs_per_month: calc.pairsPerMonth,
            pairs_per_year: calc.pairsPerYear,
            pieces_per_year: calc.piecesPerYear,
            boxes_per_year: calc.boxesPerYear,
            pieces_per_box: calc.piecesPerBox,
            recommended_sku: calc.sku.sku,
            recommended_name: calc.sku.name,
          }}
        />
      </div>
    </div>
  );
}
