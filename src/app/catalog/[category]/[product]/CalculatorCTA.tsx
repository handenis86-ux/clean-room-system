'use client';

import Link from 'next/link';
import { Calculator } from 'lucide-react';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface CalculatorConfig {
  href: (sku: string) => string;
  label: string;
}

/**
 * Map of category slug -> calculator configuration.
 * Only categories listed here render a calculator CTA on the product page.
 */
const CATEGORY_CALCULATOR: Record<string, CalculatorConfig> = {
  'perchatki-zashchitnye': {
    href: (sku) => `/tools/gloves-calculator?sku=${encodeURIComponent(sku)}`,
    label: 'Рассчитать месячный расход',
  },
  garments: {
    href: (sku) => `/tools/gowning-room-budget?sku=${encodeURIComponent(sku)}`,
    label: 'Рассчитать комплектацию gowning',
  },
  'reusable-garm': {
    href: (sku) => `/tools/gowning-room-budget?sku=${encodeURIComponent(sku)}`,
    label: 'Рассчитать комплектацию gowning',
  },
  'disinfectants-and-detergents': {
    href: (sku) => `/tools/disinfectant-calculator?sku=${encodeURIComponent(sku)}`,
    label: 'Рассчитать расход дезинфектанта',
  },
};

interface Props {
  category: string;
  sku: string;
}

export default function CalculatorCTA({ category, sku }: Props) {
  const config = CATEGORY_CALCULATOR[category];
  if (!config) return null;

  const handleClick = () => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'product_calculator_click',
      sku,
      category,
    });
  };

  return (
    <Link
      href={config.href(sku)}
      onClick={handleClick}
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-[14px] font-semibold text-[#00608A] bg-white border-2 border-[#00608A] rounded-lg hover:bg-brand-light transition-colors no-print"
    >
      <Calculator size={16} />
      {config.label}
    </Link>
  );
}
