'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const mockProducts = [
  {
    id: '1',
    name: 'Комбинезон для чистых помещений Tyvek Classic',
    sku: 'TVK-001',
    price: 2500,
    category: 'Одежда',
    inStock: true,
    image: '/images/products/product-1.jpg',
    createdAt: '2024-03-10',
  },
  {
    id: '2',
    name: 'Перчатки нитриловые стерильные Ansell',
    sku: 'GLV-002',
    price: 1800,
    category: 'Перчатки',
    inStock: true,
    image: '/images/products/product-2.jpg',
    createdAt: '2024-03-08',
  },
  {
    id: '3',
    name: 'Халат лабораторный многоразовый',
    sku: 'CLT-003',
    price: 3200,
    category: 'Одежда',
    inStock: false,
    image: '/images/products/product-3.jpg',
    createdAt: '2024-03-05',
  },
  {
    id: '4',
    name: 'Бахилы высокие антистатические ESD',
    sku: 'SHC-004',
    price: 450,
    category: 'Обувь',
    inStock: true,
    image: '/images/products/product-4.jpg',
    createdAt: '2024-03-01',
  },
  {
    id: '5',
    name: 'Маска трехслойная медицинская',
    sku: 'MSK-006',
    price: 350,
    category: 'Маски',
    inStock: true,
    image: '/images/products/product-5.jpg',
    createdAt: '2024-02-28',
  },
];

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === mockProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(mockProducts.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Товары</h1>
          <p className="text-gray-600">Управление каталогом товаров</p>
        </div>
        <Button href="/admin/products/new">
          <Plus size={18} className="mr-2" />
          Добавить товар
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Поиск по названию, артикулу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">Все категории</option>
              <option value="clothing">Одежда</option>
              <option value="gloves">Перчатки</option>
              <option value="footwear">Обувь</option>
              <option value="masks">Маски</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">Все статусы</option>
              <option value="in_stock">В наличии</option>
              <option value="out_of_stock">Нет в наличии</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter size={18} />
              Фильтры
            </button>
          </div>
        </div>
      </div>

      {/* Bulk actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-center justify-between">
          <span className="text-primary-700">
            Выбрано: {selectedProducts.length} товаров
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              Изменить категорию
            </button>
            <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700">
              Удалить
            </button>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === mockProducts.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-primary-600 rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Товар
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Артикул
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Категория
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Цена
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Статус
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4 text-primary-600 rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[200px]">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Добавлен: {product.createdAt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {product.sku}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.inStock
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenMenu(openMenu === product.id ? null : product.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                      >
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                      {openMenu === product.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenu(null)}
                          />
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                            <Link
                              href={`/admin/products/${product.id}`}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Edit size={16} />
                              Редактировать
                            </Link>
                            <Link
                              href={`/catalog/${product.id}`}
                              target="_blank"
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Eye size={16} />
                              Просмотреть
                            </Link>
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Copy size={16} />
                              Дублировать
                            </button>
                            <hr className="my-1" />
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                              <Trash2 size={16} />
                              Удалить
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Показано 1-5 из 694 товаров
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50">
              Назад
            </button>
            <button className="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              3
            </button>
            <span className="px-2 text-gray-400">...</span>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              139
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
