import { forwardRef } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'white' | 'white-outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  href?: string;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, href, children, className = '', disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed';

    const variants: Record<string, string> = {
      primary: 'bg-brand-600 text-white hover:bg-brand-500 focus:ring-brand-600/50',
      secondary: 'text-gray-700 border border-gray-300 hover:border-brand-600 hover:text-brand-700 focus:ring-brand-600/50',
      ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300',
      white: 'bg-white text-gray-900 hover:bg-gray-100 focus:ring-white/50',
      'white-outline': 'text-white border border-white/30 hover:bg-white/10 focus:ring-white/50',
      danger: 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-500/50',
    };

    const sizes: Record<string, string> = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-[15px] gap-2',
    };

    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
