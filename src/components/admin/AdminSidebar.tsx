'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  FileText,
  Users,
  Settings,
  MessageSquare,
  Image,
  Award,
  Truck,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

const navigation = [
  { name: 'Панель управления', href: '/admin', icon: LayoutDashboard },
  {
    name: 'Каталог',
    icon: Package,
    children: [
      { name: 'Товары', href: '/admin/products' },
      { name: 'Категории', href: '/admin/categories' },
    ],
  },
  { name: 'Заявки', href: '/admin/requests', icon: MessageSquare, badge: 3 },
  { name: 'Новости', href: '/admin/articles', icon: FileText },
  { name: 'Партнеры', href: '/admin/partners', icon: Users },
  { name: 'Сертификаты', href: '/admin/certificates', icon: Award },
  { name: 'Слайдер', href: '/admin/slides', icon: Image },
  { name: 'Страницы', href: '/admin/pages', icon: FolderTree },
  { name: 'Настройки', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CR</span>
            </div>
            <span className="font-bold">Админ панель</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1 hover:bg-gray-800 rounded"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                      item.children.some((child) => isActive(child.href))
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openSubmenu === item.name ? 'max-h-40' : 'max-h-0'
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block pl-11 pr-3 py-2 text-sm rounded-lg transition-colors ${
                          isActive(child.href)
                            ? 'text-primary-400'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
