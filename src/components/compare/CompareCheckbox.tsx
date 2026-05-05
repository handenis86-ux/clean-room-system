'use client';

import { useCompare } from './CompareContext';
import { Check } from 'lucide-react';

interface Props {
  sku: string;
  name: string;
  categorySlug: string;
}

export default function CompareCheckbox({ sku, name, categorySlug }: Props) {
  const { has, add, remove, items, hydrated, maxItems } = useCompare();

  const checked = has(sku);
  const sameCategory = items.length === 0 || items[0]?.categorySlug === categorySlug;
  const limitReached = sameCategory && !checked && items.length >= maxItems;

  // Avoid hydration mismatch — render disabled placeholder until hydrated
  const interactive = hydrated;

  function handleToggle(e: React.MouseEvent | React.ChangeEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!interactive || limitReached) return;
    if (checked) {
      remove(sku);
    } else {
      add({ sku, name, categorySlug });
    }
  }

  const label = limitReached
    ? `Достигнут лимит сравнения (${maxItems})`
    : checked
    ? 'Убрать из сравнения'
    : 'Добавить в сравнение';

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      title={label}
      onClick={handleToggle}
      disabled={!interactive || limitReached}
      className={[
        'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium transition-colors select-none border',
        checked
          ? 'bg-brand text-white border-brand hover:bg-brand-dark'
          : limitReached
          ? 'bg-surface text-text-muted border-surface-stroke cursor-not-allowed'
          : 'bg-white text-brand border-brand/40 hover:border-brand hover:bg-brand-light/30',
      ].join(' ')}
    >
      <span
        aria-hidden
        className={[
          'flex h-4 w-4 items-center justify-center rounded-sm border',
          checked
            ? 'bg-white border-white text-brand'
            : 'bg-white border-current',
        ].join(' ')}
      >
        {checked && <Check size={12} strokeWidth={3} />}
      </span>
      <span>{checked ? 'В сравнении' : 'Сравнить'}</span>
    </button>
  );
}
