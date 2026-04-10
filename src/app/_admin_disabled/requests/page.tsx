'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Check,
  Clock,
  MailOpen,
  Phone,
  Building,
  Calendar,
} from 'lucide-react';

const mockRequests = [
  {
    id: '1',
    name: 'Иван Петров',
    email: 'petrov@pharma.ru',
    phone: '+7 (999) 123-45-67',
    company: 'ООО "Фармасинтез"',
    message: 'Здравствуйте! Интересует оптовая закупка перчаток нитриловых для нашего производства. Нужно около 10 000 пар в месяц. Просьба предоставить коммерческое предложение.',
    status: 'new',
    createdAt: '2024-03-15T10:30:00',
  },
  {
    id: '2',
    name: 'Анна Сидорова',
    email: 'sidorova@micron.ru',
    phone: '+7 (999) 234-56-78',
    company: 'ЗАО "Микрон"',
    message: 'Нужна консультация по выбору одежды для чистых помещений класса ISO 5. Какие варианты можете предложить?',
    status: 'processing',
    createdAt: '2024-03-15T09:15:00',
  },
  {
    id: '3',
    name: 'Сергей Козлов',
    email: 'kozlov@biocad.ru',
    phone: '+7 (999) 345-67-89',
    company: 'АО "Биокад"',
    message: 'Запрос на коммерческое предложение по комплексному оснащению нового чистого помещения. Площадь 500 м², класс чистоты ISO 7.',
    status: 'new',
    createdAt: '2024-03-15T08:00:00',
  },
  {
    id: '4',
    name: 'Елена Морозова',
    email: 'morozova@geropharm.ru',
    phone: '+7 (999) 456-78-90',
    company: 'ООО "Герофарм"',
    message: 'Добрый день! Нужны дезинфицирующие средства для производственных помещений. Просьба выслать каталог и прайс.',
    status: 'completed',
    createdAt: '2024-03-14T16:45:00',
  },
  {
    id: '5',
    name: 'Дмитрий Волков',
    email: 'volkov@nanolek.ru',
    phone: '+7 (999) 567-89-01',
    company: 'ООО "Нанолек"',
    message: 'Интересует поставка салфеток безворсовых на регулярной основе. Объем около 5000 упаковок в квартал.',
    status: 'processing',
    createdAt: '2024-03-14T14:20:00',
  },
];

const statusConfig = {
  new: { label: 'Новая', color: 'bg-green-100 text-green-700', icon: MailOpen },
  processing: { label: 'В работе', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  completed: { label: 'Завершена', color: 'bg-gray-100 text-gray-700', icon: Check },
};

export default function AdminRequestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedRequestData = mockRequests.find((r) => r.id === selectedRequest);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
        <p className="text-gray-600">Управление заявками с сайта</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <MailOpen className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {mockRequests.filter((r) => r.status === 'new').length}
              </p>
              <p className="text-sm text-gray-600">Новых заявок</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {mockRequests.filter((r) => r.status === 'processing').length}
              </p>
              <p className="text-sm text-gray-600">В работе</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {mockRequests.filter((r) => r.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Завершено</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Requests list */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Поиск по имени, email, компании..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Все статусы</option>
              <option value="new">Новые</option>
              <option value="processing">В работе</option>
              <option value="completed">Завершенные</option>
            </select>
          </div>

          {/* Requests */}
          <div className="space-y-3">
            {filteredRequests.map((request) => {
              const status = statusConfig[request.status as keyof typeof statusConfig];
              const isSelected = selectedRequest === request.id;

              return (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request.id)}
                  className={`bg-white rounded-xl p-4 border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary-500 ring-2 ring-primary-100'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{request.name}</p>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{request.company}</p>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {request.message}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-400">{formatDate(request.createdAt)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Request details */}
        <div className="lg:col-span-1">
          {selectedRequestData ? (
            <div className="bg-white rounded-xl border border-gray-100 sticky top-24">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">{selectedRequestData.name}</h3>
                <span
                  className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${
                    statusConfig[selectedRequestData.status as keyof typeof statusConfig].color
                  }`}
                >
                  {statusConfig[selectedRequestData.status as keyof typeof statusConfig].label}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MailOpen size={18} className="text-gray-400" />
                  <a
                    href={`mailto:${selectedRequestData.email}`}
                    className="text-primary-600 hover:underline"
                  >
                    {selectedRequestData.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={18} className="text-gray-400" />
                  <a
                    href={`tel:${selectedRequestData.phone}`}
                    className="text-primary-600 hover:underline"
                  >
                    {selectedRequestData.phone}
                  </a>
                </div>
                {selectedRequestData.company && (
                  <div className="flex items-center gap-3 text-sm">
                    <Building size={18} className="text-gray-400" />
                    <span className="text-gray-700">{selectedRequestData.company}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={18} className="text-gray-400" />
                  <span className="text-gray-700">
                    {formatDate(selectedRequestData.createdAt)}
                  </span>
                </div>

                <hr />

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Сообщение:</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {selectedRequestData.message}
                  </p>
                </div>

                <hr />

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Изменить статус:</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                      Новая
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
                      В работе
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Завершена
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <a
                    href={`mailto:${selectedRequestData.email}`}
                    className="flex-1 px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center"
                  >
                    Написать
                  </a>
                  <a
                    href={`tel:${selectedRequestData.phone}`}
                    className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
                  >
                    Позвонить
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Выберите заявку для просмотра деталей</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
