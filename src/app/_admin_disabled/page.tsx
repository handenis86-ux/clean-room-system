import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  MessageSquare,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    name: 'Всего товаров',
    value: '694',
    change: '+12',
    changeType: 'positive' as const,
    icon: Package,
    href: '/admin/products',
  },
  {
    name: 'Заявки',
    value: '23',
    change: '+5',
    changeType: 'positive' as const,
    icon: MessageSquare,
    href: '/admin/requests',
  },
  {
    name: 'Просмотры сайта',
    value: '12.5k',
    change: '+18%',
    changeType: 'positive' as const,
    icon: Eye,
    href: '#',
  },
  {
    name: 'Партнеры',
    value: '28',
    change: '+2',
    changeType: 'positive' as const,
    icon: Users,
    href: '/admin/partners',
  },
];

const recentRequests = [
  {
    id: 1,
    name: 'Иван Петров',
    company: 'ООО "Фармасинтез"',
    email: 'petrov@pharma.ru',
    message: 'Интересует оптовая закупка перчаток...',
    status: 'new',
    date: '10 мин назад',
  },
  {
    id: 2,
    name: 'Анна Сидорова',
    company: 'ЗАО "Микрон"',
    email: 'sidorova@micron.ru',
    message: 'Нужна консультация по выбору одежды...',
    status: 'processing',
    date: '1 час назад',
  },
  {
    id: 3,
    name: 'Сергей Козлов',
    company: 'АО "Биокад"',
    email: 'kozlov@biocad.ru',
    message: 'Запрос на коммерческое предложение...',
    status: 'new',
    date: '2 часа назад',
  },
];

const recentArticles = [
  {
    id: 1,
    title: 'Новые стандарты ISO 14644',
    views: 1234,
    date: '15 марта 2024',
    published: true,
  },
  {
    id: 2,
    title: 'Как выбрать одежду для чистых помещений',
    views: 892,
    date: '10 марта 2024',
    published: true,
  },
  {
    id: 3,
    title: 'Расширение ассортимента перчаток',
    views: 567,
    date: '5 марта 2024',
    published: false,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
        <p className="text-gray-600">Добро пожаловать в админ-панель Clean Room Systems</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent requests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Последние заявки</h2>
            <Link href="/admin/requests" className="text-sm text-primary-600 hover:text-primary-700">
              Все заявки →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentRequests.map((request) => (
              <div key={request.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{request.name}</p>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        request.status === 'new'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {request.status === 'new' ? 'Новая' : 'В работе'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{request.company}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                      {request.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {request.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent articles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">Статьи</h2>
            <Link href="/admin/articles" className="text-sm text-primary-600 hover:text-primary-700">
              Все статьи →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentArticles.map((article) => (
              <div key={article.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{article.title}</p>
                      {!article.published && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                          Черновик
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {article.views}
                      </span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Редактировать
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-bold text-gray-900 mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Package className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Добавить товар</span>
          </Link>
          <Link
            href="/admin/articles/new"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <TrendingUp className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Написать статью</span>
          </Link>
          <Link
            href="/admin/categories"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Package className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Категории</span>
          </Link>
          <Link
            href="/admin/settings"
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
          >
            <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Настройки</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
