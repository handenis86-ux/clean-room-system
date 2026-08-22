import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  Phone,
  CalendarClock,
  FlaskConical,
  AlertTriangle,
} from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';

const URL = `${siteConfig.url}/compliance/iso-13485-uzbekistan`;

export const metadata: Metadata = {
  title: 'ISO 13485 в Узбекистане с 1 июля 2027: что требует указ УП-137',
  description:
    'Указ УП-137 от 19.08.2025: с 1 июля 2027 года сертификат соответствия на медицинское изделие выдаётся только при наличии сертификата производителя по ISO 13485. Требования к производственной среде, валидации стерилизации и индикаторам по методам EtO, пар, VH2O2.',
  alternates: { canonical: URL },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'ISO 13485 в Узбекистане — требование с 1 июля 2027 года',
    description:
      'Что меняет указ УП-137 для производителей медизделий: сроки, исключения, требования к чистым зонам и валидации стерилизации.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

/** Методы стерилизации → стандарт валидации → серия биоиндикаторов. */
const STERILIZATION_METHODS: {
  method: string;
  badge: string;
  validation: string;
  bi: string;
  note: string;
}[] = [
  {
    method: 'Оксид этилена (EtO)',
    badge: 'EtO',
    validation: 'ISO 11135',
    bi: 'ISO 11138-2',
    note: 'Основной метод для изделий, не выдерживающих нагрев: перевязочные материалы, полимерные изделия, наборы. Требует контроля остаточного EtO по ISO 10993-7.',
  },
  {
    method: 'Влажный жар (пар)',
    badge: 'Пар',
    validation: 'ISO 17665',
    bi: 'ISO 11138-3',
    note: 'Термостойкие изделия и инструменты. Контроль проникновения пара — тест Боуи-Дика, химический индикатор класса 2 по ISO 11140-1.',
  },
  {
    method: 'Радиационная стерилизация',
    badge: '—',
    validation: 'ISO 11137',
    bi: 'дозиметрия',
    note: 'Гамма или пучок электронов. Биоиндикаторы не применяются: контроль ведётся по поглощённой дозе, метод VDmax по ISO 11137-2.',
  },
  {
    method: 'Пары перекиси водорода',
    badge: 'VH2O2',
    validation: 'ISO 22441',
    bi: 'ISO 11138-1',
    note: 'Низкотемпературный метод для чувствительных изделий и электроники.',
  },
  {
    method: 'Низкотемпературный пар + формальдегид',
    badge: 'LTSF',
    validation: 'EN 14180',
    bi: 'ISO 11138-5',
    note: 'Применяется реже, преимущественно в госпитальном сегменте и для термолабильных изделий.',
  },
];

const CATALOG_LINKS: { href: string; title: string; text: string }[] = [
  {
    href: '/catalog/indicators',
    title: 'Индикаторы стерилизации',
    text: 'Биологические и химические индикаторы Terragene под все перечисленные методы. В каталоге метод стерилизации указан в карточке — можно отобрать сразу по EtO, пару или VH2O2.',
  },
  {
    href: '/catalog/garments',
    title: 'Одноразовая одежда',
    text: 'Комбинезоны, шапочки, бахилы и маски для контролируемых зон. Требование к одежде вытекает из §6.4.2 — контроль загрязнения от персонала.',
  },
  {
    href: '/catalog/disinfectants-and-detergents',
    title: 'Дезинфектанты и моющие средства',
    text: 'Программа очистки и дезинфекции производственных помещений. Для зон, где изделие открыто, применяются те же принципы ротации, что и в фармпроизводстве.',
  },
  {
    href: '/catalog/cleanroom-wipes',
    title: 'Салфетки для чистых помещений',
    text: 'Безворсовые салфетки для протирки оборудования и поверхностей — прямой вклад в §7.5.2, чистоту продукции.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'С какой даты ISO 13485 становится обязательным в Узбекистане?',
    a: 'С 1 июля 2027 года. Согласно указу Президента Республики Узбекистан от 19.08.2025 № УП-137, для медицинских изделий при получении сертификата соответствия требуется сертификат соответствия производителя национальному стандарту ISO 13485.',
  },
  {
    q: 'Чем требование к медизделиям отличается от требования к лекарствам?',
    a: 'Это два разных трека одного указа. Для лекарственных средств с 1 января 2027 года требуется национальный сертификат GMP. Для медицинских изделий с 1 июля 2027 года — сертификат по ISO 13485. Даты и стандарты разные, путать их не следует.',
  },
  {
    q: 'Есть ли исключения?',
    a: 'Да. Требование не распространяется на лекарственные средства и медицинские изделия для лечения орфанных заболеваний, ввозимые по заказу Министерства здравоохранения, а также на препараты для профилактики, диагностики и лечения особо опасных инфекций.',
  },
  {
    q: 'Обязывает ли ISO 13485 строить чистое помещение?',
    a: 'Напрямую — нет. Стандарт требует определить и контролировать производственную среду так, чтобы она не влияла на соответствие изделия (§6.4.1), а для стерильных изделий — управлять загрязнением (§6.4.2, §7.5.2). Нужен ли для этого классифицированный по ISO 14644-1 чистый участок, определяется типом изделия и результатом риск-анализа.',
  },
  {
    q: 'Что именно проверяют в части стерилизации?',
    a: 'Валидацию процесса стерилизации и системы стерильного барьера (§7.5.7) — с записями по каждому циклу. Метод валидации определяется способом стерилизации: ISO 11135 для оксида этилена, ISO 17665 для влажного жара, ISO 11137 для радиационной. Рутинный контроль ведётся биологическими индикаторами по серии ISO 11138 и химическими по ISO 11140-1.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Iso13485UzbekistanPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-brand-dark text-white py-14 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[12px] font-bold uppercase tracking-wider mb-4">
            <CalendarClock size={14} /> Срок — 1 июля 2027
          </div>
          <h1 className="text-[28px] md:text-[42px] font-extrabold leading-tight mb-4">
            ISO 13485 в Узбекистане: что требует указ УП-137
          </h1>
          <p className="text-[16px] md:text-[18px] text-white/85 leading-relaxed">
            С 1 июля 2027 года сертификат соответствия на медицинское изделие
            выдаётся только при наличии сертификата производителя по национальному
            стандарту ISO 13485. Разбираем, что это меняет для производственной
            среды, валидации стерилизации и рутинного контроля.
          </p>
        </div>
      </section>

      {/* Что говорит указ */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-5">
            Что именно установлено
          </h2>
          <div className="rounded-xl border-l-4 border-brand bg-surface p-5 mb-6">
            <p className="text-[15px] text-text-dark leading-relaxed mb-3">
              Указ Президента Республики Узбекистан от 19.08.2025 № УП-137
              «О дополнительных мерах по регулированию обращения лекарственных
              средств и медицинских изделий» вводит для получения сертификата
              соответствия:
            </p>
            <ul className="space-y-2 text-[15px] text-text leading-relaxed">
              <li>
                <strong className="text-text-dark">
                  для лекарственных средств — с 1 января 2027 года
                </strong>{' '}
                национальный сертификат «Надлежащая производственная практика — GMP»;
              </li>
              <li>
                <strong className="text-text-dark">
                  для медицинских изделий — с 1 июля 2027 года
                </strong>{' '}
                сертификат соответствия производителя национальному стандарту
                «ISO: 13485».
              </li>
            </ul>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 mb-6">
            <AlertTriangle
              size={18}
              className="text-amber-600 shrink-0 mt-0.5"
            />
            <p className="text-[14px] text-text leading-relaxed">
              Это <strong>два разных трека</strong> с разными датами и разными
              стандартами. Производитель лекарств готовится к GMP к январю,
              производитель медизделий — к ISO 13485 к июлю. Компании, выпускающие
              и то и другое, проходят оба.
            </p>
          </div>
          <p className="text-[15px] text-text leading-relaxed">
            Исключения указом предусмотрены: требование не распространяется на
            лекарственные средства и медицинские изделия для лечения орфанных
            заболеваний, ввозимые по заказу Министерства здравоохранения, а также
            на препараты для профилактики, диагностики и лечения особо опасных
            инфекций.
          </p>
        </div>
      </section>

      {/* Производственная среда */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-5">
            Что ISO 13485 требует от производственной среды
          </h2>
          <p className="text-[15px] text-text leading-relaxed mb-5">
            Распространённое заблуждение — что стандарт обязывает построить чистое
            помещение. Напрямую он этого не требует. Требования сформулированы
            через результат, а способ его достижения производитель обосновывает
            сам:
          </p>
          <div className="space-y-4">
            {[
              {
                clause: '§6.4.1',
                title: 'Производственная среда',
                text: 'Организация должна документировать требования к производственной среде и вести записи о её контроле, если среда может повлиять на соответствие изделия установленным требованиям.',
              },
              {
                clause: '§6.4.2',
                title: 'Контроль загрязнения',
                text: 'Для стерильных изделий — планирование и документирование мер по контролю загрязнения микроорганизмами и частицами, включая требования к персоналу и его одежде.',
              },
              {
                clause: '§7.5.2',
                title: 'Чистота продукции',
                text: 'Требования к чистоте изделия и к удалению технологических загрязнений на этапах производства и упаковки.',
              },
              {
                clause: '§7.5.5',
                title: 'Стерильные изделия',
                text: 'Записи о параметрах каждого цикла стерилизации с прослеживаемостью до партии изделий.',
              },
              {
                clause: '§7.5.7',
                title: 'Валидация стерилизации',
                text: 'Валидация процессов стерилизации и систем стерильного барьера до начала применения и при любых изменениях процесса.',
              },
            ].map((c) => (
              <div
                key={c.clause}
                className="bg-white rounded-xl border border-surface-input p-5"
              >
                <div className="flex items-baseline gap-3 mb-1.5">
                  <span className="text-[13px] font-bold text-brand-dark whitespace-nowrap">
                    {c.clause}
                  </span>
                  <h3 className="text-[16px] font-bold text-text-dark">
                    {c.title}
                  </h3>
                </div>
                <p className="text-[14px] text-text leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="text-[14px] text-text-muted leading-relaxed mt-5">
            Нужен ли классифицированный по{' '}
            <Link
              href="/resources/iso-14644-classes-spec"
              className="text-brand font-semibold hover:underline"
            >
              ISO 14644-1
            </Link>{' '}
            участок и какого класса — определяется типом изделия и результатом
            риск-анализа. Для стерильных изделий, вскрываемых в процессе сборки,
            контролируемая зона нужна практически всегда.
          </p>
        </div>
      </section>

      {/* Стерилизация */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-3">
            Стерилизация: метод определяет стандарт и индикатор
          </h2>
          <p className="text-[15px] text-text leading-relaxed mb-6 max-w-[860px]">
            §7.5.7 требует валидировать процесс, но не предписывает метод — его
            выбирает производитель исходя из изделия. От выбранного метода зависит
            и стандарт валидации, и серия биологических индикаторов для рутинного
            контроля. Ошибка на этом шаге означает, что весь пакет валидации
            собран не по тому стандарту.
          </p>
          <div className="overflow-x-auto rounded-xl border border-surface-input">
            <table className="w-full border-collapse text-[14px] min-w-[760px]">
              <thead className="bg-brand-light">
                <tr>
                  <th className="text-left p-3 font-bold text-text-dark border-b border-surface-input">
                    Метод
                  </th>
                  <th className="text-left p-3 font-bold text-text-dark border-b border-l border-surface-input whitespace-nowrap">
                    Валидация
                  </th>
                  <th className="text-left p-3 font-bold text-text-dark border-b border-l border-surface-input whitespace-nowrap">
                    Биоиндикатор
                  </th>
                  <th className="text-left p-3 font-bold text-text-dark border-b border-l border-surface-input">
                    Комментарий
                  </th>
                </tr>
              </thead>
              <tbody>
                {STERILIZATION_METHODS.map((m) => (
                  <tr key={m.method} className="align-top">
                    <td className="p-3 border-b border-surface-input">
                      <span className="font-semibold text-text-dark">
                        {m.method}
                      </span>
                      {m.badge !== '—' && (
                        <span className="ml-2 inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-light text-brand-dark">
                          {m.badge}
                        </span>
                      )}
                    </td>
                    <td className="p-3 border-b border-l border-surface-input font-semibold text-brand-dark whitespace-nowrap">
                      {m.validation}
                    </td>
                    <td className="p-3 border-b border-l border-surface-input whitespace-nowrap">
                      {m.bi}
                    </td>
                    <td className="p-3 border-b border-l border-surface-input text-text leading-relaxed">
                      {m.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/catalog/indicators"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors"
            >
              <FlaskConical size={16} />
              Индикаторы по методам стерилизации
            </Link>
            <p className="text-[13px] text-text-muted">
              В карточках каталога метод указан — отбор по EtO, пару или VH2O2
              делается прямо в списке.
            </p>
          </div>
          <p className="text-[14px] text-text-muted leading-relaxed mt-5">
            Помимо индикаторов, пакет валидации опирается на ISO 11737-1
            (определение биобременности), ISO 11737-2 (испытания на стерильность)
            и EN 556-1 — требование к уровню обеспечения стерильности SAL 10⁻⁶ для
            изделий, маркируемых как «STERILE». Химические индикаторы
            классифицируются по ISO 11140-1, типы 1–6.
          </p>
        </div>
      </section>

      {/* Каталог */}
      <section className="bg-surface py-12 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-6">
            Что из этого закрывает каталог
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {CATALOG_LINKS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group bg-white rounded-xl border border-surface-input p-5 hover:border-brand transition-colors"
              >
                <h3 className="text-[16px] font-bold text-text-dark mb-2 inline-flex items-center gap-1.5">
                  {c.title}
                  <ArrowRight
                    size={15}
                    className="text-brand group-hover:translate-x-0.5 transition-transform"
                  />
                </h3>
                <p className="text-[14px] text-text leading-relaxed">{c.text}</p>
              </Link>
            ))}
          </div>
          <p className="text-[14px] text-text-muted leading-relaxed mt-6">
            Полная матрица соответствия категорий каталога стандартам, включая
            ISO 13485, — в разделе{' '}
            <Link
              href="/compliance/standards"
              className="text-brand font-semibold hover:underline"
            >
              соответствия стандартам
            </Link>
            . Производителям лекарственных средств — отдельный разбор{' '}
            <Link
              href="/compliance/gmp-2027-uzbekistan"
              className="text-brand font-semibold hover:underline"
            >
              требований GMP к 1 января 2027
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-text-dark mb-6">
            Частые вопросы
          </h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <div
                key={f.q}
                className="rounded-xl border border-surface-input p-5"
              >
                <h3 className="text-[16px] font-bold text-text-dark mb-2">
                  {f.q}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark text-white py-12 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto flex flex-col lg:flex-row lg:items-center gap-6 lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[11px] font-bold uppercase tracking-wider mb-3">
              <ShieldCheck size={13} /> Подбор под метод стерилизации
            </div>
            <h2 className="text-[22px] md:text-[28px] font-extrabold leading-tight mb-2">
              Подберём индикаторы и расходники под ваш процесс
            </h2>
            <p className="text-[15px] text-white/80 leading-relaxed max-w-[560px]">
              Назовите метод стерилизации и тип изделия — вернёмся со
              спецификацией, паспортами качества и сроками поставки.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              Написать нам
              <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
