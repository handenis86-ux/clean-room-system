'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
  Bell,
  User,
  LogOut,
  Settings,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export default function AdminHeader() {
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-900 hidden md:block">
          Clean Room Systems
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* View site link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600"
        >
          <ExternalLink size={16} />
          Открыть сайт
        </Link>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User size={16} className="text-primary-600" />
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700">
              {session?.user?.name || 'Admin'}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {isProfileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{session?.user?.email}</p>
                </div>
                <Link
                  href="/admin/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Settings size={16} />
                  Настройки
                </Link>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Выйти
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
