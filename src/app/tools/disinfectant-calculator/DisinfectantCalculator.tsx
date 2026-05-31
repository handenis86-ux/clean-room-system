'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Droplet } from 'lucide-react';
import InputGroup, {
  NumberInput,
  RadioGroup,
  Slider,
} from '@/components/calculators/InputGroup';
import ResultCard from '@/components/calculators/ResultCard';
import QuoteRequestForm from '@/components/calculators/QuoteRequestForm';
import { useCalcGtm } from '@/components/calculators/useCalcGtm';

type ZoneClass = 'AB' | 'C' | 'D';
type ProductLine = 'sterile' | 'non_sterile';

/**
 * SKU → product line prefill. Sterile Contec SKUs start with `SBC*`; the
 * non-sterile «F» family (FBC*, FBT*) maps to non_sterile.
 */
const SKU_PRODUCT_LINE: Record<string, ProductLine> = {
  // Sterile Contec
  SBC56HP: 'sterile',
  SBC570I: 'sterile',
  SBC502PC: 'sterile',
  // Non-sterile Contec / ClearKlens
  FBC570I: 'non_sterile',
  FBT170I: 'non_sterile',
  FBC502PC: 'non_sterile',
};

// Расход рабочего раствора на 1 м² (мл) — типовая практика
// для протирочной дезинфекции в cleanroom.
const ML_PER_SQM = 60;

// Частота обработок поверхностей в неделю по зоне (типовая SOP):
// A/B — ежедневно (7×), C — 5×, D — 3×.
const TREATMENTS_PER_WEEK: Record<ZoneClass, number> = {
  AB: 7,
  C: 5,
  D: 3,
};

// Цикл ротации: ProChlor (спорицид) вместо обычного дезинфектанта
// еженедельно по Annex 1 §8.66 — 1 раз из всех обработок.
// Остальные обработки делятся: 60% базовая дезинфекция (HydroPure / QUAT),
// 20% IPA для критических точек.
const SHARE_REGULAR = 0.6;
const SHARE_IPA = 0.2;
const SHARE_SPORICIDE = 0.2;

const WEEKS_PER_YEAR = 52;

const formatL = (n: number) =>
  n.toLocaleString('ru-RU', { maximumFractionDigits: 0 });

interface SkuLine {
  category: 'regular' | 'ipa' | 'sporicide';
  name: string;
  sku: string;
  href: string;
  note: string;
  litres: number;
  unitL: number; // объём канистры (5 или 1 л)
  units: number;
}

export default function DisinfectantCalculator() {
  const searchParams = useSearchParams();
  const [area, setArea] = useState(200);
  const [zone, setZone] = useState<ZoneClass>('C');
  const [productLine, setProductLine] = useState<ProductLine>('non_sterile');
  const [weeks, setWeeks] = useState(WEEKS_PER_YEAR);
  const [reserve, setReserve] = useState(15);

  // Prefill from ?sku=… — product pages can deep-link with a known Contec SKU.
  useEffect(() => {
    const sku = searchParams.get('sku');
    if (!sku) return;
    const mapped = SKU_PRODUCT_LINE[sku.trim().toUpperCase()];
    if (mapped) {
      setProductLine(mapped);
      if (mapped === 'sterile') setZone('AB');
    }
  }, [searchParams]);

  useCalcGtm('disinfectant', [area, zone, productLine, weeks, reserve]);

  const calc = useMemo(() => {
    const sqm = Math.max(1, area);
    const w = Math.max(1, weeks);
    const treatmentsPerWeek = TREATMENTS_PER_WEEK[zone];

    // Литры рабочего раствора за год
    const mlPerYear = sqm * ML_PER_SQM * treatmentsPerWeek * w;
    const litresGross = mlPerYear / 1000;
    const litresWithReserve = litresGross * (1 + reserve / 100);

    const litresRegular = litresWithReserve * SHARE_REGULAR;
    const litresIPA = litresWithReserve * SHARE_IPA;
    const litresSporicide = litresWithReserve * SHARE_SPORICIDE;

    // Каноническая канистра — 5 л; стерильные триггеры доступны от 1 л.
    const unitL = 5;
    const ceilUnits = (l: number) => Math.ceil(l / unitL);

    const lines: SkuLine[] = [];

    if (productLine === 'sterile') {
      lines.push({
        category: 'regular',
        name: 'Contec Sterile HydroPure (5L)',
        sku: 'SBC56HP',
        href: '/catalog/disinfectants-and-detergents/SBC56HP',
        note: 'H₂O₂ 6%, стерильная, GMP A/B — базовая дезинфекция',
        litres: litresRegular,
        unitL,
        units: ceilUnits(litresRegular),
      });
      lines.push({
        category: 'ipa',
        name: 'Contec Sterile 70% IPA (5L)',
        sku: 'SBC570I',
        href: '/catalog/disinfectants-and-detergents/SBC570I',
        note: 'IPA 70% стерильный — критические точки и финиш',
        litres: litresIPA,
        unitL,
        units: ceilUnits(litresIPA),
      });
      lines.push({
        category: 'sporicide',
        name: 'Contec Sterile ProChlor (5L)',
        sku: 'SBC502PC',
        href: '/catalog/disinfectants-and-detergents/SBC502PC',
        note: 'HClO 2000 ppm, стерильный спорицид — ротация раз в неделю (Annex 1 §8.66)',
        litres: litresSporicide,
        unitL,
        units: ceilUnits(litresSporicide),
      });
    } else {
      lines.push({
        category: 'regular',
        name: 'ClearKlens IPA (1L) / Contec IPA 70% (5L)',
        sku: 'FBC570I',
        href: '/catalog/disinfectants-and-detergents/FBC570I',
        note: 'IPA 70% нестерильный — базовая обработка GMP C/D',
        litres: litresRegular,
        unitL,
        units: ceilUnits(litresRegular),
      });
      lines.push({
        category: 'ipa',
        name: 'Contec IPA 70% (1L)',
        sku: 'FBT170I',
        href: '/catalog/disinfectants-and-detergents/FBT170I',
        note: 'IPA 70% триггер-спрей — точечная дезинфекция',
        litres: litresIPA,
        unitL: 1,
        units: Math.ceil(litresIPA / 1),
      });
      lines.push({
        category: 'sporicide',
        name: 'Contec ProChlor (5L)',
        sku: 'FBC502PC',
        href: '/catalog/disinfectants-and-detergents/FBC502PC',
        note: 'HClO 2000 ppm, нестерильный спорицид — ротация раз в неделю',
        litres: litresSporicide,
        unitL,
        units: ceilUnits(litresSporicide),
      });
    }

    const totalLitres = Math.round(litresWithReserve);
    const totalUnits = lines.reduce((acc, l) => acc + l.units, 0);

    return {
      lines,
      totalLitres,
      totalUnits,
      treatmentsPerWeek,
      litresPerMonth: Math.round(litresWithReserve / 12),
      litresPerWeek: Math.round(litresWithReserve / w),
    };
  }, [area, zone, productLine, weeks, reserve]);

  return (
    <div className="grid lg:grid-cols-[1fr_minmax(0,440px)] gap-6 lg:gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-4">
        <InputGroup
          number={1}
          label="Площадь обрабатываемых поверхностей"
          required
          hint="Полы + стены + рабочие столы; для тёплых зон класс A/B учитывайте только критические поверхности"
        >
          <Slider
            value={area}
            onChange={setArea}
            min={20}
            max={2000}
            step={20}
            suffix="м²"
          />
        </InputGroup>

        <InputGroup
          number={2}
          label="Класс зоны GMP"
          required
          hint="Частота протирочной дезинфекции в неделю определяется классом и SOP"
        >
          <RadioGroup
            name="zone"
            value={zone}
            onChange={(v) => setZone(v as ZoneClass)}
            options={[
              {
                value: 'AB',
                label: 'A / B — стерильный',
                description: `${TREATMENTS_PER_WEEK.AB}× / неделя (ежедневно)`,
              },
              {
                value: 'C',
                label: 'C',
                description: `${TREATMENTS_PER_WEEK.C}× / неделя`,
              },
              {
                value: 'D',
                label: 'D',
                description: `${TREATMENTS_PER_WEEK.D}× / неделя`,
              },
            ]}
          />
        </InputGroup>

        <InputGroup number={3} label="Линейка препаратов" required>
          <RadioGroup
            name="line"
            value={productLine}
            onChange={(v) => setProductLine(v as ProductLine)}
            options={[
              {
                value: 'sterile',
                label: 'Стерильная линейка',
                description: 'Для GMP A/B: HydroPure / Sterile IPA / Sterile ProChlor',
              },
              {
                value: 'non_sterile',
                label: 'Нестерильная',
                description: 'Для GMP C/D: ClearKlens IPA / ProChlor',
              },
            ]}
          />
        </InputGroup>

        <div className="grid sm:grid-cols-2 gap-4">
          <InputGroup
            number={4}
            label="Рабочих недель в году"
            hint="Учтите плановые остановки на CIP/валидацию"
          >
            <NumberInput
              value={weeks}
              onChange={setWeeks}
              min={20}
              max={52}
              suffix="нед."
            />
          </InputGroup>

          <InputGroup
            number={5}
            label="Запас на пролив / резерв"
            hint="Потери при разбавлении, пролив, испарение"
          >
            <Slider
              value={reserve}
              onChange={setReserve}
              min={5}
              max={30}
              step={1}
              suffix="%"
            />
          </InputGroup>
        </div>

        {/* SKU breakdown table */}
        <div className="rounded-xl bg-white border border-surface-border overflow-hidden">
          <div className="px-4 py-3 border-b border-surface-border bg-surface flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-text-dark">
              Расход по SKU
            </h3>
            <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">
              {calc.totalUnits} канистр
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-surface text-text-muted">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold">
                    Препарат
                  </th>
                  <th className="text-right px-3 py-2 font-semibold">Литры</th>
                  <th className="text-right px-3 py-2 font-semibold">Упак.</th>
                </tr>
              </thead>
              <tbody>
                {calc.lines.map((l, i) => (
                  <tr
                    key={i}
                    className="border-t border-surface-border align-top"
                  >
                    <td className="px-3 py-2.5">
                      <Link
                        href={l.href}
                        className="font-semibold text-brand hover:underline inline-flex items-center gap-1 text-[13px]"
                      >
                        {l.name} <ArrowRight size={11} />
                      </Link>
                      <div className="text-[11px] text-text-muted mt-0.5">
                        {l.sku} · {l.note}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-text-dark">
                      {formatL(l.litres)} л
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-bold text-text-dark">
                      {l.units} × {l.unitL}л
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="space-y-4 lg:sticky lg:top-[88px]">
        <ResultCard
          eyebrow="Годовой расход дезинфектантов"
          bigNumber={formatL(calc.totalLitres)}
          bigUnit="л/год"
          caption={
            <>
              При обработке <strong>{area} м²</strong> с частотой{' '}
              <strong>{calc.treatmentsPerWeek}× / нед.</strong> для зоны{' '}
              <strong>GMP {zone === 'AB' ? 'A/B' : zone}</strong>. Включает{' '}
              {reserve}% резерва и ротацию спорицида по Annex 1 §8.66.
            </>
          }
          breakdown={[
            { label: '/ неделя', value: `${formatL(calc.litresPerWeek)} л` },
            { label: '/ месяц', value: `${formatL(calc.litresPerMonth)} л` },
            { label: 'Канистр', value: `${calc.totalUnits} шт` },
          ]}
        >
          <div className="mt-6 rounded-xl bg-white/10 backdrop-blur p-4">
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 shrink-0 flex items-center justify-center rounded-lg bg-white/15">
                <Droplet size={20} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1">
                  Состав годовой потребности
                </p>
                <p className="text-[13px] text-white/85 leading-snug">
                  60% базовая дезинфекция, 20% IPA для критических точек,
                  20% спорицид на еженедельную ротацию.
                </p>
              </div>
            </div>
          </div>
        </ResultCard>

        <QuoteRequestForm
          calculatorId="disinfectant"
          calculatorName="Расход дезинфектантов для cleanroom"
          resultAmount={calc.totalLitres}
          resultLabel={`${formatL(calc.totalLitres)} л/год (${calc.totalUnits} канистр)`}
          payload={{
            area_m2: area,
            zone_class: zone,
            product_line: productLine,
            weeks,
            reserve_pct: reserve,
            treatments_per_week: calc.treatmentsPerWeek,
            total_litres: calc.totalLitres,
            total_units: calc.totalUnits,
            spec: calc.lines
              .map((l) => `${l.sku} ×${l.units}×${l.unitL}л`)
              .join('; '),
          }}
        />
      </div>
    </div>
  );
}
