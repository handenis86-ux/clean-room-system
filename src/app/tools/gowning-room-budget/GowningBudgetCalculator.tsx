'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InputGroup, {
  CheckboxRow,
  NumberInput,
  RadioGroup,
  Slider,
} from '@/components/calculators/InputGroup';
import ResultCard from '@/components/calculators/ResultCard';
import QuoteRequestForm from '@/components/calculators/QuoteRequestForm';
import { useCalcGtm } from '@/components/calculators/useCalcGtm';

type ZoneClass = 'AB' | 'C' | 'D';

const PRICES = {
  bench: 1500,
  cabinet: 2500,
  rack: 1000,
  sink: 2000,
  mirror: 300,
  stickyMat: 50,
  passThrough: 6000,
  wasteBin: 300,
  stepStool: 400,
};

const formatUsd = (n: number) =>
  '$' +
  n.toLocaleString('en-US', { maximumFractionDigits: 0 }).replace(/,/g, ' ');

const formatRound = (n: number) => {
  // Round to nearest 500
  return Math.round(n / 500) * 500;
};

interface Row {
  name: string;
  sku: string;
  href: string;
  qty: number;
  unitPrice: number | null; // null = «по запросу»
  note?: string;
}

export default function GowningBudgetCalculator() {
  const [area, setArea] = useState(30);
  const [operators, setOperators] = useState(8);
  const [zone, setZone] = useState<ZoneClass>('C');
  const [options, setOptions] = useState<Record<string, boolean>>({
    pass_through: true,
    sinks: true,
    mirrors: true,
    sticky_mats: true,
  });

  useCalcGtm('gowning', [area, operators, zone, options]);

  const toggleOption = (key: string, v: boolean) => {
    setOptions((prev) => ({ ...prev, [key]: v }));
  };

  const calc = useMemo(() => {
    const ops = Math.max(1, operators);
    const ceilDiv = (a: number, b: number) => Math.ceil(a / b);

    const benches = ceilDiv(ops, 4);
    const cabinets = ceilDiv(ops, 3);
    const racks = ceilDiv(ops, 5);
    const sinks = options.sinks ? ceilDiv(ops, 8) : 0;
    const mirrors = options.mirrors ? ceilDiv(ops, 5) : 0;
    const stickyMats = options.sticky_mats ? 2 : 0;
    const passThrough = options.pass_through && zone === 'AB' ? 1 : 0;
    const wasteBins = ceilDiv(ops, 6);
    const stepStools = 1;

    const rows: Row[] = [
      {
        name: 'Pharma CRB B — скамейка с обувницей',
        sku: 'TINMAN-PHARMA-CRB-B',
        href: '/catalog/tinman-benches',
        qty: benches,
        unitPrice: PRICES.bench,
        note: 'AISI 304, 1200 мм',
      },
      {
        name: 'CRGC — шкаф для cleanroom-одежды',
        sku: 'TINMAN-CRGC',
        href: '/catalog/tinman-cabinets',
        qty: cabinets,
        unitPrice: PRICES.cabinet,
        note: 'AISI 304, скош. верх, 2450 мм',
      },
      {
        name: 'CRG D — двойная напольная стойка',
        sku: 'TINMAN-CRG-D',
        href: '/catalog/tinman-garment-racks',
        qty: racks,
        unitPrice: PRICES.rack,
        note: 'AISI 304, перфорация 40%',
      },
    ];

    if (sinks > 0) {
      rows.push({
        name: 'CRSU — раковина из нерж. стали',
        sku: 'TINMAN-CRSU',
        href: '/catalog/tinman-sinks',
        qty: sinks,
        unitPrice: PRICES.sink,
        note: 'AISI 304, откидная крышка',
      });
    }

    if (mirrors > 0) {
      rows.push({
        name: 'CRM — настенное зеркало',
        sku: 'TINMAN-CRM',
        href: '/catalog/tinman-mirrors',
        qty: mirrors,
        unitPrice: PRICES.mirror,
        note: 'Нерж. сталь 2R, без стекла',
      });
    }

    if (stickyMats > 0) {
      rows.push({
        name: 'Sticky mats (липкие коврики)',
        sku: 'STICKY-MAT',
        href: '/catalog/cleaning-trolleys-systems',
        qty: stickyMats,
        unitPrice: PRICES.stickyMat,
        note: '60×90 см, 30 слоёв; entry + exit',
      });
    }

    if (passThrough > 0) {
      rows.push({
        name: 'CRGC Pass-Through — передаточный шкаф',
        sku: 'TINMAN-PASS-THROUGH-CRGC',
        href: '/catalog/tinman-pass-through',
        qty: passThrough,
        unitPrice: PRICES.passThrough,
        note: 'Электромагнит. блокировка, UV-опция',
      });
    }

    rows.push({
      name: 'CRW BH — урна с верхним фиксатором',
      sku: 'TINMAN-CRW-BH',
      href: '/catalog/tinman-waste-bins',
      qty: wasteBins,
      unitPrice: PRICES.wasteBin,
      note: 'AISI 304, 400×400×1000',
    });

    rows.push({
      name: 'CRST t — стремянка перфорированная',
      sku: 'TINMAN-CRST-T-STOOL',
      href: '/catalog/tinman-step-stools',
      qty: stepStools,
      unitPrice: PRICES.stepStool,
      note: '1 или 2 ступени',
    });

    const subtotal = rows.reduce(
      (acc, r) => acc + (r.unitPrice ?? 0) * r.qty,
      0
    );
    // 12% надбавка на крепёж/доставку/монтаж, округление до $500
    const total = formatRound(subtotal * 1.12);

    const itemsCount = rows.reduce((acc, r) => acc + r.qty, 0);

    // Recommended density warning if too tight
    const sqmPerOperator = area / ops;
    const densityWarning =
      sqmPerOperator < 2
        ? 'площадь меньше 2 м²/оператора — высокий риск превышения CFU и нарушения flow'
        : sqmPerOperator < 3
          ? 'площадь близка к минимуму (2–3 м²/оператора) — спроектируйте кабины переодевания внимательно'
          : null;

    return { rows, total, subtotal, itemsCount, densityWarning };
  }, [area, operators, zone, options]);

  return (
    <div className="grid lg:grid-cols-[1fr_minmax(0,460px)] gap-6 lg:gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-4">
        <InputGroup
          number={1}
          label="Площадь gowning room"
          required
          hint="Рекомендация Annex 1: минимум 2–3 м² свободной площади на оператора"
        >
          <Slider
            value={area}
            onChange={setArea}
            min={10}
            max={200}
            step={5}
            suffix="м²"
          />
        </InputGroup>

        <div className="grid sm:grid-cols-2 gap-4">
          <InputGroup
            number={2}
            label="Операторов в пиковую смену"
            required
            hint="Сколько человек переодеваются одновременно"
          >
            <NumberInput
              value={operators}
              onChange={setOperators}
              min={1}
              max={100}
              suffix="чел."
            />
          </InputGroup>

          <InputGroup
            number={3}
            label="Класс зоны входа"
            required
            hint="Pass-through шлюз нужен только для входа в зону A/B"
          >
            <RadioGroup
              name="zone"
              layout="row"
              value={zone}
              onChange={(v) => setZone(v as ZoneClass)}
              options={[
                { value: 'AB', label: 'A / B' },
                { value: 'C', label: 'C' },
                { value: 'D', label: 'D' },
              ]}
            />
          </InputGroup>
        </div>

        <InputGroup number={4} label="Дополнительно — выберите модули">
          <CheckboxRow
            value={options}
            onChange={toggleOption}
            options={[
              {
                key: 'pass_through',
                label: 'Pass-through шлюз',
                description: 'Передача материалов между зонами (только A/B)',
              },
              {
                key: 'sinks',
                label: 'Раковины CRSU',
                description: 'Мойка рук перед gowning',
              },
              {
                key: 'mirrors',
                label: 'Зеркала CRM',
                description: 'Контроль надевания одежды',
              },
              {
                key: 'sticky_mats',
                label: 'Sticky mats',
                description: 'Снятие частиц с обуви на входе и выходе',
              },
            ]}
          />
        </InputGroup>

        {/* Equipment table */}
        <div className="rounded-xl bg-white border border-surface-border overflow-hidden">
          <div className="px-4 py-3 border-b border-surface-border bg-surface flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-text-dark">
              Спецификация оборудования
            </h3>
            <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">
              {calc.itemsCount} ед.
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="bg-surface text-text-muted">
                <tr>
                  <th className="text-left px-3 py-2 font-semibold">SKU</th>
                  <th className="text-right px-3 py-2 font-semibold">Кол-во</th>
                  <th className="text-right px-3 py-2 font-semibold">
                    Цена/шт
                  </th>
                  <th className="text-right px-3 py-2 font-semibold">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {calc.rows.map((r, i) => (
                  <tr
                    key={i}
                    className="border-t border-surface-border align-top"
                  >
                    <td className="px-3 py-2.5">
                      <Link
                        href={r.href}
                        className="font-semibold text-brand hover:underline inline-flex items-center gap-1 text-[13px]"
                      >
                        {r.name} <ArrowRight size={11} />
                      </Link>
                      <div className="text-[11px] text-text-muted mt-0.5">
                        {r.sku} · {r.note}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-text-dark">
                      {r.qty}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums text-text">
                      {r.unitPrice !== null
                        ? formatUsd(r.unitPrice)
                        : 'по запросу'}
                    </td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-bold text-text-dark">
                      {r.unitPrice !== null
                        ? formatUsd(r.unitPrice * r.qty)
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-surface-border bg-surface">
                  <td
                    colSpan={3}
                    className="px-3 py-3 text-right text-[12px] text-text-muted font-semibold uppercase tracking-wider"
                  >
                    Подытог
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums font-bold text-text-dark">
                    {formatUsd(calc.subtotal)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="space-y-4 lg:sticky lg:top-[88px]">
        <ResultCard
          eyebrow="Примерная стоимость комплекта"
          bigNumber={`от ${formatUsd(calc.total)}`}
          caption={
            <>
              Цена ориентировочная — включает 12% на крепёж, доставку и
              монтаж. Точная стоимость зависит от материалов (AISI 304 vs 316),
              габаритов и сроков.
            </>
          }
          breakdown={[
            { label: 'Площадь', value: `${area} м²` },
            { label: 'Операторов', value: operators },
            { label: 'Позиций', value: calc.rows.length },
          ]}
        >
          {calc.densityWarning && (
            <div className="mt-4 rounded-lg bg-amber-400/15 border border-amber-200/30 px-3 py-2 text-[12px] text-amber-100 leading-snug">
              <strong className="text-amber-50">Внимание:</strong>{' '}
              {calc.densityWarning}
            </div>
          )}
        </ResultCard>

        <QuoteRequestForm
          calculatorId="gowning"
          calculatorName="Бюджет gowning room"
          resultAmount={calc.total}
          resultLabel={`Комплект gowning room ${area} м² / ${operators} операторов — от ${formatUsd(
            calc.total
          )}`}
          submitLabel="Запросить точное КП на проект"
          payload={{
            area_m2: area,
            operators,
            zone_class: zone,
            opt_pass_through: !!options.pass_through,
            opt_sinks: !!options.sinks,
            opt_mirrors: !!options.mirrors,
            opt_sticky_mats: !!options.sticky_mats,
            items_count: calc.itemsCount,
            subtotal_usd: calc.subtotal,
            total_usd: calc.total,
            spec: calc.rows
              .map((r) => `${r.sku} ×${r.qty}`)
              .join('; '),
          }}
        />
      </div>
    </div>
  );
}
