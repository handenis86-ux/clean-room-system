import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://cleanroom.uz${item.href}` }),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={14} className="text-gray-600" />}
            {item.href ? (
              <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
