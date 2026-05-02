import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'default' | 'white' | 'footer';
  className?: string;
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  const isDark = variant === 'white' || variant === 'footer';
  const height = variant === 'footer' ? 36 : 44;

  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="Clean Room Systems">
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
