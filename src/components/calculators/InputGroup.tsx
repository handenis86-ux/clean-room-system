'use client';

import { ReactNode } from 'react';

interface InputGroupProps {
  label: string;
  hint?: ReactNode;
  number?: number;
  required?: boolean;
  children: ReactNode;
}

export default function InputGroup({
  label,
  hint,
  number,
  required,
  children,
}: InputGroupProps) {
  return (
    <div className="bg-white rounded-xl border border-surface-border p-4 lg:p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <label className="block text-[14px] font-semibold text-text-dark leading-snug">
          {number !== undefined && (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-light text-brand text-[12px] font-bold mr-2">
              {number}
            </span>
          )}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>
      {hint && (
        <p className="text-[12px] text-text-muted leading-relaxed mb-3 -mt-2">
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

// Helper: numeric input with stepper
export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <div className="flex items-stretch h-[44px] rounded-lg border border-surface-input overflow-hidden focus-within:border-brand focus-within:ring-1 focus-within:ring-brand/20">
      <button
        type="button"
        onClick={() =>
          onChange(Math.max(min ?? -Infinity, Number(value) - step))
        }
        className="px-3 text-text-muted hover:bg-brand-light hover:text-brand transition-colors"
        aria-label="Минус"
      >
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        value={Number.isFinite(value) ? value : ''}
        onChange={(e) => {
          const v = e.target.value === '' ? 0 : Number(e.target.value);
          if (!Number.isNaN(v)) onChange(v);
        }}
        min={min}
        max={max}
        step={step}
        className="flex-1 min-w-0 text-center text-[16px] font-semibold text-text-dark bg-white outline-none"
      />
      {suffix && (
        <span className="px-3 flex items-center text-[13px] text-text-muted bg-surface border-l border-surface-border">
          {suffix}
        </span>
      )}
      <button
        type="button"
        onClick={() => onChange(Math.min(max ?? Infinity, Number(value) + step))}
        className="px-3 text-text-muted hover:bg-brand-light hover:text-brand transition-colors border-l border-surface-border"
        aria-label="Плюс"
      >
        +
      </button>
    </div>
  );
}

// Helper: Radio group
export function RadioGroup<T extends string | number>({
  options,
  value,
  onChange,
  name,
  layout = 'grid',
}: {
  options: { value: T; label: string; description?: string }[];
  value: T;
  onChange: (v: T) => void;
  name: string;
  layout?: 'grid' | 'row';
}) {
  return (
    <div
      className={
        layout === 'row'
          ? 'flex flex-wrap gap-2'
          : 'grid grid-cols-1 sm:grid-cols-2 gap-2'
      }
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <label
            key={String(opt.value)}
            className={`relative flex flex-col cursor-pointer rounded-lg border-2 transition-colors p-3 select-none ${
              active
                ? 'border-brand bg-brand-light/40'
                : 'border-surface-border hover:border-brand/50 bg-white'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={String(opt.value)}
              checked={active}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span
              className={`text-[14px] font-semibold leading-tight ${
                active ? 'text-brand-dark' : 'text-text-dark'
              }`}
            >
              {opt.label}
            </span>
            {opt.description && (
              <span className="text-[12px] text-text-muted mt-1 leading-snug">
                {opt.description}
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}

// Helper: Slider
export function Slider({
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  formatLabel,
}: {
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  formatLabel?: (n: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[22px] font-extrabold text-brand-dark tabular-nums">
          {formatLabel ? formatLabel(value) : value}
          {suffix && (
            <span className="ml-1 text-[13px] font-medium text-text-muted">
              {suffix}
            </span>
          )}
        </span>
        <span className="text-[12px] text-text-muted tabular-nums">
          {min}–{max}
          {suffix ? ` ${suffix}` : ''}
        </span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 appearance-none bg-surface-input rounded-full outline-none cursor-pointer accent-brand"
        style={{
          background: `linear-gradient(to right, #00608A 0%, #00608A ${pct}%, #DDE1E6 ${pct}%, #DDE1E6 100%)`,
        }}
      />
    </div>
  );
}

// Helper: Checkbox row (multi-check)
export function CheckboxRow({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string; description?: string }[];
  value: Record<string, boolean>;
  onChange: (key: string, checked: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => {
        const active = !!value[opt.key];
        return (
          <label
            key={opt.key}
            className={`flex items-start gap-3 cursor-pointer rounded-lg border-2 transition-colors p-3 select-none ${
              active
                ? 'border-brand bg-brand-light/40'
                : 'border-surface-border hover:border-brand/50 bg-white'
            }`}
          >
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => onChange(opt.key, e.target.checked)}
              className="mt-0.5 w-[18px] h-[18px] shrink-0 accent-brand cursor-pointer"
            />
            <span className="flex flex-col leading-tight">
              <span
                className={`text-[14px] font-semibold ${
                  active ? 'text-brand-dark' : 'text-text-dark'
                }`}
              >
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-[12px] text-text-muted mt-0.5">
                  {opt.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
