import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности и обработки персональных данных Clean Room Systems.',
  alternates: {
    canonical: 'https://clean-room-systems.uz/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-900 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Политика конфиденциальности' }]} />
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              Политика конфиденциальности
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Настоящая Политика конфиденциальности персональных данных (далее — Политика)
                действует в отношении всей информации, которую {siteConfig.name} может получить
                о пользователе во время использования сайта.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                1. Определение терминов
              </h2>
              <p className="text-gray-700 mb-4">
                В настоящей Политике используются следующие термины:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>
                  <strong>Администрация сайта</strong> — уполномоченные сотрудники на управление
                  сайтом, действующие от имени {siteConfig.name}.
                </li>
                <li>
                  <strong>Персональные данные</strong> — любая информация, относящаяся к прямо
                  или косвенно определенному физическому лицу (субъекту персональных данных).
                </li>
                <li>
                  <strong>Обработка персональных данных</strong> — любое действие с персональными
                  данными, совершаемое с использованием средств автоматизации или без них.
                </li>
                <li>
                  <strong>Пользователь</strong> — лицо, имеющее доступ к сайту посредством сети Интернет.
                </li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                2. Общие положения
              </h2>
              <p className="text-gray-700 mb-4">
                Использование сайта означает безоговорочное согласие пользователя с настоящей
                Политикой и указанными в ней условиями обработки его персональных данных.
              </p>
              <p className="text-gray-700 mb-6">
                В случае несогласия с условиями Политики пользователь должен прекратить
                использование сайта.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                3. Предмет политики
              </h2>
              <p className="text-gray-700 mb-4">
                Настоящая Политика устанавливает обязательства Администрации по неразглашению
                и обеспечению режима защиты конфиденциальности персональных данных, которые
                пользователь предоставляет при заполнении форм на сайте.
              </p>
              <p className="text-gray-700 mb-6">
                Персональные данные, разрешенные к обработке в рамках настоящей Политики,
                предоставляются пользователем путем заполнения форм на сайте и включают:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Фамилию, имя пользователя</li>
                <li>Контактный телефон</li>
                <li>Адрес электронной почты (e-mail)</li>
                <li>Название организации</li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                4. Цели сбора персональных данных
              </h2>
              <p className="text-gray-700 mb-4">
                Администрация может использовать персональные данные пользователя в целях:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Идентификации пользователя для оформления заказа или обратной связи</li>
                <li>Предоставления пользователю доступа к персонализированным ресурсам сайта</li>
                <li>
                  Установления с пользователем обратной связи, включая направление уведомлений,
                  запросов, обработку заявок
                </li>
                <li>
                  Предоставления пользователю информации о новых продуктах и услугах (с согласия
                  пользователя)
                </li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                5. Способы и сроки обработки персональных данных
              </h2>
              <p className="text-gray-700 mb-4">
                Обработка персональных данных осуществляется без ограничения срока любым
                законным способом, в том числе в информационных системах персональных данных
                с использованием средств автоматизации или без использования таких средств.
              </p>
              <p className="text-gray-700 mb-6">
                Персональные данные пользователя могут быть переданы уполномоченным органам
                государственной власти только по основаниям и в порядке, установленным
                законодательством Республики Узбекистан.
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                6. Обязательства сторон
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>Пользователь обязан:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Предоставить актуальную информацию о персональных данных</li>
                <li>
                  Обновлять предоставленную информацию в случае её изменения
                </li>
              </ul>
              <p className="text-gray-700 mb-4">
                <strong>Администрация обязана:</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>
                  Использовать полученную информацию исключительно для целей, указанных в
                  настоящей Политике
                </li>
                <li>
                  Обеспечить хранение конфиденциальной информации в тайне, не разглашать без
                  предварительного письменного разрешения пользователя
                </li>
                <li>
                  Принимать меры предосторожности для защиты конфиденциальности персональных
                  данных пользователя
                </li>
              </ul>

              <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                7. Контактная информация
              </h2>
              <p className="text-gray-700 mb-4">
                По вопросам, связанным с настоящей Политикой, обращайтесь:
              </p>
              <ul className="list-none text-gray-700 space-y-2 mb-6">
                <li>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${siteConfig.email}`} className="text-brand-700 hover:text-brand-600 hover:underline">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <strong>Телефон:</strong>{' '}
                  <a href={`tel:${siteConfig.phone}`} className="text-brand-700 hover:text-brand-600 hover:underline">
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <strong>Адрес:</strong> {siteConfig.address}
                </li>
              </ul>

              <p className="text-sm text-gray-500 mt-8">
                Дата последнего обновления: 1 января 2024 года
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
