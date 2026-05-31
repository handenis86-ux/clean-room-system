import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

interface LogoProps {
  variant?: 'default' | 'white' | 'footer';
  className?: string;
  /** Locale, чтобы вести на корректную главную (`/` или `/uz`). */
  locale?: Locale;
}

export default function Logo({
  variant = 'default',
  className = '',
  locale = 'ru',
}: LogoProps) {
  const isDark = variant === 'white' || variant === 'footer';
  const height = variant === 'footer' ? 36 : 44;
  const href = locale === 'uz' ? '/uz' : '/';

  return (
    <Link href={href} className={`inline-flex items-center ${className}`} aria-label="Clean Room Systems">
      <Image
        src="/images/logo.webp"
        alt="Clean Room Systems"
        width={height * 4}
        height={height}
        priority
        className={isDark ? 'brightness-0 invert' : ''}
        style={{ height, width: 'auto' }}
      />
    </Link>
  );
}
