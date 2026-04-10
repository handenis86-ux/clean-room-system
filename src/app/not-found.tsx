import Link from 'next/link';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-navy-900 px-4">
      <div className="text-center max-w-lg">
        {/* 404 heading */}
        <h1 className="text-[10rem] sm:text-[12rem] font-extrabold leading-none tracking-tight bg-gradient-to-b from-brand-500 to-brand-700/40 bg-clip-text text-transparent select-none">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-2 text-2xl sm:text-3xl font-heading font-bold text-white">
          Страница не найдена
        </h2>

        {/* Description */}
        <p className="mt-4 text-base text-navy-200 leading-relaxed">
          К сожалению, запрашиваемая страница не существует, была удалена или
          временно недоступна. Проверьте правильность адреса или перейдите на
          одну из основных страниц сайта.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-brand-600 rounded-full hover:bg-brand-500 transition-colors"
          >
            <Home size={16} />
            На главную
          </Link>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-navy-100 bg-navy-700/60 border border-navy-600/50 rounded-full hover:bg-navy-700 hover:text-white transition-colors"
          >
            <ShoppingBag size={16} />
            Каталог продукции
          </Link>
        </div>
      </div>
    </div>
  );
}
