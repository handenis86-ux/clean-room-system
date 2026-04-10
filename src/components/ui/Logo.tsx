import Link from 'next/link';

interface LogoProps {
  variant?: 'default' | 'white' | 'footer';
  className?: string;
}

export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  const variantStyles = {
    default: 'text-xl font-bold text-[#00608A]',
    white: 'text-xl font-bold text-white',
    footer: 'text-lg font-extrabold text-white',
  };

  return (
    <Link
      href="/"
      className={`font-heading tracking-tight ${variantStyles[variant]} ${className}`}
    >
      Clean Room System
    </Link>
  );
}
