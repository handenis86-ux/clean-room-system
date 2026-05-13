import { ReactNode } from 'react';

interface ResultCardProps {
  eyebrow?: string;
  bigNumber: ReactNode;
  bigUnit?: string;
  caption?: ReactNode;
  breakdown?: { label: string; value: ReactNode }[];
  children?: ReactNode;
}

export default function ResultCard({
  eyebrow,
  bigNumber,
  bigUnit,
  caption,
  breakdown,
  children,
}: ResultCardProps) {
  return (
    <div className="calculator-print rounded-2xl bg-gradient-to-br from-brand-dark to-brand text-white p-6 lg:p-8 shadow-xl">
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-widest text-white/60 font-bold mb-3">
          {eyebrow}
        </p>
      )}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="text-4xl lg:text-6xl font-extrabold tabular-nums leading-none">
          {bigNumber}
        </span>
        {bigUnit && (
          <span className="text-xl lg:text-2xl font-semibold text-white/85">
            {bigUnit}
          </span>
        )}
      </div>
      {caption && (
        <p className="mt-3 text-[14px] text-white/85 leading-relaxed">
          {caption}
        </p>
      )}

      {breakdown && breakdown.length > 0 && (
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-3">
          {breakdown.map((b, i) => (
            <div
              key={i}
              className="rounded-xl bg-white/10 backdrop-blur px-3 py-3"
            >
              <p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold mb-1">
                {b.label}
              </p>
              <p className="text-[16px] lg:text-[18px] font-bold tabular-nums">
                {b.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}
