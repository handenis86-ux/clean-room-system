import Link from 'next/link';

interface LogoProps {
  variant?: 'default' | 'white';
  className?: string;
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  return (
    <Link href="/" className={`font-heading font-bold text-xl tracking-tight ${
      variant === 'white' ? 'text-white' : 'text-brand-800'
    } ${className}`}>
      Clean Room System
    </Link>
  );
}
