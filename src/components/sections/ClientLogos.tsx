import Image from 'next/image';
import { clients } from '@/data/clients';

/** Сетка логотипов покупателей CRS — общая для главной и страницы «О компании». */
export default function ClientLogos() {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-[1100px] mx-auto">
      {clients.map((client) => (
        <li
          key={client.name}
          title={client.title}
          className="h-[110px] rounded-xl bg-white border border-surface-border flex items-center justify-center px-5"
        >
          {client.logo ? (
            <Image
              src={client.logo}
              alt={client.title}
              width={client.width}
              height={client.height}
              style={{ height: client.displayHeight ?? 56, width: 'auto' }}
              className="max-w-full object-contain"
            />
          ) : (
            <span className="text-[17px] font-extrabold uppercase tracking-[1px] text-brand-dark text-center leading-tight">
              {client.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
