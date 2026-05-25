import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, AlertTriangle, FileText, Phone, Mail } from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';
import PrintButton from './PrintButton';
import './print.css';

export const metadata: Metadata = {
  title:
    'Валидация дезинфекции в cleanroom — пошаговый протокол QA',
  description:
    'Протокол валидации дезинфекции по EU GMP Annex 1 (2022): тест-микроорганизмы, suspension/carrier тесты, ротация спорицида, документация. Для QA фарм-предприятий Узбекистана.',
  alternates: {
    canonical: `${siteConfig.url}/resources/disinfection-validation-protocol`,
  },
  openGraph: {
    type: 'article',
    title:
      'Валидация дезинфекции — пошаговый протокол для QA фарм-предприятий',
    description:
      'EN 1276 / EN 13697 / EN 13727, USP <1072>, USP <1116>, ICH Q9, ATCC-штаммы, log-снижение, ротация спорицида, шаблоны VMP/VP/VR.',
    url: `${siteConfig.url}/resources/disinfection-validation-protocol`,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const toc = [
  { id: 'intro', title: 'Введение' },
  { id: 'regulations', title: '1. Регуляторная база' },
  { id: 'scope', title: '2. Что нужно валидировать' },
  { id: 'organisms', title: '3. Тестовые микроорганизмы' },
  { id: 'protocol', title: '4. Поэтапный протокол валидации' },
  { id: 'rotation', title: '5. Ротация спорицида' },
  { id: 'documentation', title: '6. Документация валидации' },
  { id: 'findings', title: '7. Типичные находки инспекторов' },
  { id: 'consumables', title: '8. Расходники для валидации' },
  { id: 'conclusion', title: 'Резюме и контакты' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline:
    'Валидация дезинфекции в чистых помещениях — пошаговый протокол',
  description:
    'Технический протокол валидации программы дезинфекции для фарм-производств: EU GMP Annex 1 (2022), USP <1072> / <1116>, ISO 14698-1, ICH Q9, EN 1276 / 13697 / 13727, ATCC-штаммы, suspension test, carrier test, in-use validation, ротация спорицида, документация.',
  inLanguage: 'ru',
  datePublished: '2026-05-04',
  dateModified: '2026-05-04',
  author: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo.webp`,
    },
  },
  image: `${siteConfig.url}/images/blog/gmp-standards.webp`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${siteConfig.url}/resources/disinfection-validation-protocol`,
  },
  about: [
    { '@type': 'Thing', name: 'Disinfection validation' },
    { '@type': 'Thing', name: 'EU GMP Annex 1' },
    { '@type': 'Thing', name: 'USP <1072>' },
    { '@type': 'Thing', name: 'USP <1116>' },
    { '@type': 'Thing', name: 'Cleanroom' },
    { '@type': 'Thing', name: 'Pharmaceutical microbiology' },
  ],
};

export default function DisinfectionValidationProtocolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white">
        <div className="container mx-auto px-4 lg:px-20 py-10 lg:py-14">
          {/* Header */}
          <div className="max-w-4xl">
            <div className="no-print flex items-center gap-2 text-[13px] text-text-muted mb-4">
              <Link href="/" className="hover:text-brand">
                Главная
              </Link>
              <span>/</span>
              <span>Ресурсы</span>
              <span>/</span>
              <span className="text-text-dark">
                Валидация дезинфекции
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-light text-brand-dark rounded-full text-[12px] font-bold uppercase tracking-wider mb-5">
              <FileText size={14} />
              Технический протокол
            </div>

            <h1 className="text-[30px] md:text-[40px] lg:text-[44px] font-extrabold text-text-dark leading-tight mb-5">
              Валидация дезинфекции в чистых помещениях — пошаговый
              протокол
            </h1>

            <p className="text-[17px] md:text-[18px] text-text leading-relaxed mb-6">
              Практический технический документ для QA-инженеров,
              специалистов валидации и руководителей производства,
              отвечающих за программу очистки и дезинфекции
              cleanroom-зон. Опирается на EU GMP Annex 1 (редакция
              2022 г., §4.33–4.36 и §11.1–11.13), USP &lt;1072&gt;
              «Disinfectants and Antiseptics», USP &lt;1116&gt;
              «Microbiological Control and Monitoring of Aseptic
              Processing Environments», ISO 14698-1 и подходы ICH Q9
              (R1) к управлению рисками.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-2">
              <PrintButton />
              <span className="text-[13px] text-text-muted">
                Распечатайте или сохраните как PDF — Ctrl + P
              </span>
            </div>
          </div>

          {/* Layout — sidebar TOC + content */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 mt-10">
            {/* TOC */}
            <aside className="no-print lg:sticky lg:top-24 lg:self-start">
              <div className="border border-surface-input rounded-xl p-5 bg-surface">
                <p className="eyebrow mb-3">Содержание</p>
                <ol className="space-y-2 text-[14px]">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-text hover:text-brand transition-colors block leading-snug"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            {/* Article body */}
            <article className="prose-content max-w-3xl">
              {/* Introduction */}
              <section id="intro" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  Введение
                </h2>
                <p className="mb-4">
                  Дезинфекция в чистом помещении — не уборка в бытовом
                  смысле, а валидируемый микробиологический процесс, от
                  которого напрямую зависит контаминационная безопасность
                  продукта. Регулятор больше не довольствуется фразой
                  «средство имеет паспорт качества от поставщика»: с
                  выходом редакции EU GMP Annex 1 от 22 августа 2022 г.
                  программа очистки и дезинфекции должна быть встроена
                  в Contamination Control Strategy (CCS) и подтверждена
                  результатами лабораторных и in-situ испытаний для
                  каждого средства, концентрации и поверхности.
                </p>
                <p className="mb-4">
                  Этот документ — пошаговый протокол, по которому
                  QA-команда фарм-предприятия может построить
                  валидационный пакет с нуля или закрыть пробелы в
                  существующем. Он не подменяет фармакопею или
                  официальные консультации по конкретным продуктам, но
                  даёт каркас, методики, числовые acceptance criteria
                  и пример структуры отчётов, которые ожидает увидеть
                  GMP-инспектор.
                </p>
                <p className="mb-4">
                  Кому документ полезен:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    QA / QC-инженерам и микробиологам — как чек-лист
                    подготовки suspension, carrier и in-use тестов и
                    структура VMP/VP/VR;
                  </li>
                  <li>
                    специалистам валидации — для написания протоколов
                    с корректными acceptance criteria и привязкой к
                    конкретным EN-стандартам;
                  </li>
                  <li>
                    начальникам производства — чтобы понимать, почему
                    «понедельник IPA, четверг гипохлорит» больше не
                    проходит;
                  </li>
                  <li>
                    директорам и владельцам предприятий — как карта
                    того, какие пакеты документов и расходники должны
                    быть в наличии до момента инспекции.
                  </li>
                </ul>
                <p className="mb-4">
                  Контекст Узбекистана. Согласно поэтапному графику
                  Uzpharmagentlik, все производители готовых
                  лекарственных средств обязаны подтвердить
                  соответствие GMP к 1 января 2027 года; производители
                  активных фармацевтических субстанций — в полном
                  объёме к тому же сроку после поэтапного перехода с
                  2026-го. Узбекистан — страна-наблюдатель PIC/S, что
                  означает гармонизацию инспекционных подходов с EU.
                  На практике у локальных предприятий валидация
                  дезинфекции — самое слабое место подготовки: часто
                  программа существует только в виде графика уборки
                  без подтверждения log-снижения, без carrier-теста на
                  реальных поверхностях, без рабочей ротации
                  спорицида.
                </p>
                <p className="mb-4">
                  Дальше документ построен следующим образом: глава 1
                  — нормативная рамка и какие именно пункты регулятор
                  будет проверять; глава 2 — объект валидации (что
                  именно подтверждаем); глава 3 — стандартный набор
                  тест-штаммов с ATCC-номерами; глава 4 — пять этапов
                  валидации с методами и acceptance criteria; главы 5
                  и 6 — ротация и документационный пакет; глава 7 —
                  наиболее частые находки аудиторов; глава 8 — список
                  расходников, без которых валидацию физически не
                  выполнить.
                </p>
              </section>

              {/* Section 1 — Regulatory base */}
              <section id="regulations" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  1. Регуляторная база
                </h2>
                <p className="mb-4">
                  Программа дезинфекции в фармпроизводстве находится
                  на стыке нескольких нормативных слоёв. Ниже —
                  минимальный набор документов, которые QA-команда
                  должна знать дословно (и иметь актуальные редакции в
                  controlled-папке предприятия).
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  EU GMP Annex 1 (2022) — ключевые пункты
                </h3>
                <p className="mb-4">
                  Раздел 4 (Premises) и раздел 11 (Monitoring of
                  Cleanliness) содержат требования, на которые опирается
                  любая инспекция:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>§4.33–4.36</strong> — программа уборки и
                    дезинфекции должна быть документирована, основана
                    на знаниях о флоре зоны, регулярно пересматриваться
                    и охватывать все cleanroom-зоны и оборудование.
                  </li>
                  <li>
                    <strong>§11.1</strong> — экологический мониторинг
                    (EM) должен подтверждать, что программа работает; в
                    зонах А и В дополнительно — непрерывный жизненно
                    важный мониторинг.
                  </li>
                  <li>
                    <strong>§11.6</strong> — обязательная ротация двух
                    дезинфектантов с разным механизмом действия плюс
                    спорицид как минимум; эффективность каждого должна
                    быть подтверждена.
                  </li>
                  <li>
                    <strong>§11.10–11.11</strong> — рабочие растворы
                    должны храниться корректно, с указанием срока
                    использования после разведения; стерильные растворы
                    для зон А/В.
                  </li>
                  <li>
                    <strong>§11.13</strong> — оператор обязан быть
                    обучен и квалифицирован для применения средств; в
                    зонах А/В — конкретный SOP с зафиксированной
                    последовательностью движений и контактного
                    времени.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  USP &lt;1072&gt; — Disinfectants and Antiseptics
                </h3>
                <p className="mb-4">
                  Глава USP &lt;1072&gt; — фармакопейный документ,
                  фактически задающий формат валидации. Она напрямую
                  описывает три уровня испытаний (suspension test,
                  surface/carrier test, in-use test), требования к
                  нейтрализатору, к выбору тестовых штаммов и к
                  использованию «environmental isolates» — реальных
                  изолятов, выделенных из EM конкретного предприятия.
                </p>
                <p className="mb-4">
                  Ключевые акценты USP &lt;1072&gt;: (а) валидация
                  должна включать как лабораторный, так и
                  использовательский этап; (б) применение средств без
                  предварительной очистки поверхности не считается
                  валидной дезинфекцией; (в) ротация — общепринятая
                  практика для предотвращения адаптации
                  микроорганизмов, особенно в зонах с высокой
                  спор-нагрузкой.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  USP &lt;1116&gt; — Microbiological Control
                </h3>
                <p className="mb-4">
                  USP &lt;1116&gt; задаёт референсные уровни
                  контаминации для каждого класса cleanroom (Grade A —
                  &lt;1 КОЕ, Grade B — 5 КОЕ, Grade C — 25 КОЕ, Grade
                  D — 50 КОЕ для контактной пластины 55 мм, как
                  ориентир) и описывает методологию trend-анализа.
                  Валидация дезинфекции в USP &lt;1116&gt; рассматривается
                  как часть общей системы контроля; неудачи EM —
                  триггер для пересмотра программы.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  ISO 14698-1
                </h3>
                <p className="mb-4">
                  Стандарт ISO 14698-1 описывает методологию
                  биоконтаминационного контроля, отбора проб воздуха,
                  поверхностей и персонала, оценки рисков. В контексте
                  валидации дезинфекции он даёт инструменты для
                  carrier-тестов, методики swab-отбора, расчёт
                  recovery rate.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  ICH Q9 (R1) — Quality Risk Management
                </h3>
                <p className="mb-4">
                  ICH Q9 — методологический фундамент. Любое решение
                  валидации (какие штаммы выбрать, какие поверхности
                  тестировать, как часто переаттестовать) должно быть
                  обосновано через risk assessment. На практике —
                  FMEA-таблица «зона × поверхность × средство ×
                  потенциальная находка × мера контроля» прилагается к
                  Validation Master Plan и обновляется как минимум раз
                  в год.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Семейство EN-стандартов
                </h3>
                <p className="mb-4">
                  Конкретные методики тестирования эффективности
                  дезинфектантов описаны в семействе европейских
                  норм EN. Их следует знать по именам и применять
                  именно те, которые соответствуют фармацевтическому
                  применению:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>EN 1040</strong> — базовая бактерицидная
                    активность (suspension test, минимальные
                    требования);
                  </li>
                  <li>
                    <strong>EN 1275</strong> — базовая фунгицидная
                    активность;
                  </li>
                  <li>
                    <strong>EN 1276</strong> — quantitative
                    suspension test для бактерий, область — пищевая,
                    промышленная, бытовая и institutional (ориентир для
                    GMP-применения);
                  </li>
                  <li>
                    <strong>EN 1650</strong> — quantitative
                    suspension test для дрожжей и грибов;
                  </li>
                  <li>
                    <strong>EN 13697</strong> — quantitative
                    non-porous surface test (carrier-тест на
                    непористых поверхностях — ключевой стандарт для
                    cleanroom);
                  </li>
                  <li>
                    <strong>EN 13727</strong> — bacterial test для
                    медицинской области; используется как референс для
                    GMP-валидации в контакте с инструментом и
                    оборудованием;
                  </li>
                  <li>
                    <strong>EN 13624</strong> — fungicidal test для
                    медицинской области;
                  </li>
                  <li>
                    <strong>EN 14347</strong> — basic sporicidal
                    activity (база для тестирования спорицидов);
                  </li>
                  <li>
                    <strong>EN 17126</strong> — quantitative
                    sporicidal test, расширенный (надлежит ссылаться в
                    Validation Protocol на спорицид).
                  </li>
                </ul>

                <Pitfall
                  text="В отчётах валидации часто встречается ссылка только на EN 1040 или EN 1275 — это базовые тесты, недостаточные для GMP-применения. Инспектор закономерно требует quantitative-тесты (EN 1276 / 13697 / 13727 / 17126) с числовыми acceptance criteria."
                />
              </section>

              {/* Section 2 — Scope */}
              <section id="scope" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  2. Что нужно валидировать
                </h2>
                <p className="mb-4">
                  Распространённая ошибка — считать, что валидация
                  дезинфекции = подтверждение, что средство «убивает
                  бактерии». Объект валидации значительно шире и
                  охватывает шесть взаимосвязанных аспектов.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  2.1 Эффективность каждого дезинфектанта
                </h3>
                <p className="mb-4">
                  Подтверждается двумя уровнями: in vitro
                  (suspension test против стандартных штаммов и
                  environmental isolates) и in situ (carrier-test на
                  купонах из реальных материалов поверхностей и
                  in-use-test на действующем оборудовании). Без обоих
                  уровней утверждать, что средство эффективно в
                  условиях предприятия, нельзя — лабораторный результат
                  не учитывает реальную геометрию поверхности,
                  температуру, влажность, остаточные органические
                  загрязнения.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  2.2 Контактное время
                </h3>
                <p className="mb-4">
                  Для каждой пары «средство × поверхность» определяется
                  минимальное контактное время, при котором достигается
                  целевое log-снижение. Производитель указывает
                  типичные значения (например, IPA 70% — 30 сек на
                  стекле против S. aureus), но они должны быть
                  подтверждены или скорректированы для условий
                  предприятия. Часто на матовой эпоксидной краске
                  фактическое контактное время в 2–3 раза больше, чем
                  на нержавейке.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  2.3 Совместимость с поверхностями
                </h3>
                <p className="mb-4">
                  Список типовых материалов, для которых требуется
                  оценить совместимость:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    нержавеющая сталь 304/316L — стены, столы,
                    оборудование класса A/B;
                  </li>
                  <li>
                    эпоксидное покрытие — полы и часть стен зон C/D;
                  </li>
                  <li>
                    поликарбонат — окна изоляторов и RABS;
                  </li>
                  <li>
                    ПВХ-линолеум — пол в зоне D и складских помещениях;
                  </li>
                  <li>
                    стекло — иллюминаторы, поверхности микроскопов;
                  </li>
                  <li>
                    силикон/EPDM — уплотнители оборудования;
                  </li>
                  <li>
                    HPL/Trespa — мебель класса C/D.
                  </li>
                </ul>
                <p className="mb-4">
                  Совместимость подтверждается двойной оценкой:
                  визуальной (отсутствие коррозии, помутнения, потери
                  цвета или структуры после многократного применения) и
                  функциональной (смачиваемость, адгезия, отсутствие
                  потери прочности уплотнителя). Стандартный протокол —
                  100 циклов применения на купонах с фиксированным
                  контактным временем; допускается ускорение по ASTM
                  G31 для металлов.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  2.4 Ротация для предотвращения резистентности
                </h3>
                <p className="mb-4">
                  Annex 1 §11.6 и USP &lt;1072&gt; рассматривают
                  ротацию как защиту от селективного давления. Программа
                  должна включать как минимум: средство A (бактерицид
                  широкого спектра) → средство B (бактерицид с другим
                  механизмом) + спорицид с регулярным циклом. Сама
                  схема ротации (intervals, triggers) валидируется как
                  отдельная система: подтверждается, что чередование не
                  приводит к выходу EM-показателей за alert/action
                  limits.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  2.5 Применение в реальных условиях (qualification of
                  cleaning workers)
                </h3>
                <p className="mb-4">
                  Дезинфектант любого качества бесполезен в руках
                  необученного оператора. Согласно §11.13 Annex 1,
                  каждый сотрудник, выполняющий очистку и дезинфекцию
                  cleanroom, должен пройти теоретическое обучение
                  (микробиология, SOP, контактное время, рисунок
                  движения) и практическую квалификацию: операционные
                  тесты с фиксацией результатов EM до и после.
                  Минимум — три последовательно успешные смены под
                  наблюдением QA, после которых оператор включается в
                  список квалифицированных.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  2.6 Отсутствие остатков после дезинфекции
                </h3>
                <p className="mb-4">
                  После применения активного вещества (особенно
                  спорицидов на основе перекиси водорода и надуксусной
                  кислоты, четвертичных аммониевых соединений,
                  гипохлорита) на поверхностях могут оставаться
                  остатки, способные взаимодействовать с продуктом или
                  материалами оборудования. Валидация включает оценку
                  необходимости финального ополаскивания (rinse step)
                  стерильной WFI или 70% IPA, измерение остаточной
                  активности (ATP-метрия, кондуктометрия, специфические
                  тесты на действующее вещество) и определение
                  допустимых уровней остатков.
                </p>
              </section>

              {/* Section 3 — Test organisms */}
              <section id="organisms" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  3. Тестовые микроорганизмы — стандартный набор
                </h2>
                <p className="mb-4">
                  Подбор тестовых штаммов — ключевой методологический
                  выбор. Задача — покрыть основные категории
                  микроорганизмов, реально встречающихся в
                  cleanroom-окружении: грамположительные и
                  грамотрицательные бактерии, спорообразующие, дрожжи и
                  плесневые грибы. Дополнительно тестируются
                  «environmental isolates» — реальные изоляты,
                  обнаруженные в EM конкретного предприятия за
                  последние 6–12 месяцев. Их добавление —
                  обязательное требование USP &lt;1072&gt;: средство
                  должно быть эффективным именно против той флоры, с
                  которой будет встречаться на производстве.
                </p>

                <div className="overflow-x-auto -mx-4 lg:mx-0 my-6">
                  <table className="min-w-[640px] w-full text-[14px] border-collapse">
                    <thead>
                      <tr className="bg-surface">
                        <th className="p-3 text-left border border-surface-input">
                          Микроорганизм
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          ATCC / эквивалент
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Категория
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Зачем
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-surface-input">
                          <em>Staphylococcus aureus</em>
                        </td>
                        <td className="p-3 border border-surface-input">
                          ATCC 6538
                        </td>
                        <td className="p-3 border border-surface-input">
                          Грам(+) бактерия
                        </td>
                        <td className="p-3 border border-surface-input">
                          Базовый штамм USP/EN, кожная флора
                          оператора
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input">
                          <em>Pseudomonas aeruginosa</em>
                        </td>
                        <td className="p-3 border border-surface-input">
                          ATCC 9027
                        </td>
                        <td className="p-3 border border-surface-input">
                          Грам(–) бактерия
                        </td>
                        <td className="p-3 border border-surface-input">
                          Влажные зоны, биоплёнки, водные системы
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input">
                          <em>Escherichia coli</em>
                        </td>
                        <td className="p-3 border border-surface-input">
                          ATCC 8739
                        </td>
                        <td className="p-3 border border-surface-input">
                          Грам(–) бактерия
                        </td>
                        <td className="p-3 border border-surface-input">
                          Дополнительный штамм для широкого спектра
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input">
                          <em>Bacillus subtilis</em> spores
                        </td>
                        <td className="p-3 border border-surface-input">
                          ATCC 6633
                        </td>
                        <td className="p-3 border border-surface-input">
                          Спорообразующая бактерия
                        </td>
                        <td className="p-3 border border-surface-input">
                          Базовый sporicidal challenge
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input">
                          <em>Geobacillus stearothermophilus</em>{' '}
                          spores
                        </td>
                        <td className="p-3 border border-surface-input">
                          ATCC 7953
                        </td>
                        <td className="p-3 border border-surface-input">
                          Термоустойчивые споры
                        </td>
                        <td className="p-3 border border-surface-input">
                          Расширенный спорицидный тест
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input">
                          <em>Candida albicans</em>
                        </td>
                        <td className="p-3 border border-surface-input">
                          ATCC 10231
                        </td>
                        <td className="p-3 border border-surface-input">
                          Дрожжи
                        </td>
                        <td className="p-3 border border-surface-input">
                          Антифунгальный тест, USP-стандарт
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input">
                          <em>Aspergillus brasiliensis</em>
                        </td>
                        <td className="p-3 border border-surface-input">
                          ATCC 16404
                        </td>
                        <td className="p-3 border border-surface-input">
                          Плесневый гриб
                        </td>
                        <td className="p-3 border border-surface-input">
                          Стандарт USP/EP, замена A. niger
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input">
                          Environmental isolates
                        </td>
                        <td className="p-3 border border-surface-input">
                          (собственные)
                        </td>
                        <td className="p-3 border border-surface-input">
                          Локальная флора
                        </td>
                        <td className="p-3 border border-surface-input">
                          Адаптация под фактическую контаминацию
                          предприятия
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Подбор environmental isolates
                </h3>
                <p className="mb-4">
                  Из общего EM-журнала за последние 12 месяцев
                  отбираются изоляты, удовлетворяющие хотя бы одному из
                  критериев: (а) повторное обнаружение в одной и той
                  же зоне ≥3 раз; (б) обнаружение в зонах А/В на
                  любом носителе; (в) превышение action limit; (г)
                  идентификация до уровня вида (genus + species)
                  методом MALDI-TOF или 16S rRNA. Каждый изолят
                  криоконсервируется при –80 °C в ампулах по 0,5 мл с
                  криопротектором; рабочие ампулы выводятся не более
                  чем через 5 пассажей от исходной.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Подготовка инокулятов
                </h3>
                <p className="mb-4">
                  Стандартная инокуляция для suspension test —
                  свежесуточная культура (16–24 ч на TSA, для дрожжей
                  и грибов — на SDA), смытая в фосфатно-буферном
                  растворе с 0,1% пептона до целевой концентрации
                  10⁷–10⁸ КОЕ/мл (контроль методом 10-кратных
                  разведений и высева на TSA с подсчётом). Споровая
                  суспензия готовится из споровой запасной культуры
                  (хранение при 2–8 °C ≤6 месяцев) с термообработкой
                  80 °C × 10 мин для инактивации вегетативных клеток.
                  Подтверждение титра — обязательное приложение к
                  каждому отчёту теста.
                </p>
              </section>

              {/* Section 4 — Step-by-step protocol */}
              <section id="protocol" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  4. Поэтапный протокол валидации
                </h2>
                <p className="mb-4">
                  Полная валидация состоит из пяти последовательных
                  этапов. Каждый завершается отчётом, который
                  подписывается ответственным микробиологом и
                  QA-руководителем; результаты предыдущего этапа
                  являются входом для следующего.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Этап 1 — Pre-validation (планирование)
                </h3>
                <p className="mb-4">
                  Цель этапа — собрать исходные данные, оценить риски и
                  утвердить стратегию. Без полноценного pre-validation
                  следующие шаги превращаются в формальное упражнение.
                </p>
                <Checklist
                  items={[
                    'Risk assessment (FMEA) по ICH Q9 (R1) с матрицей «зона × поверхность × действующее вещество × штамм × вероятность × тяжесть × детектируемость».',
                    'Список целевых поверхностей и материалов с привязкой к зоне (A/B/C/D) и площади применения.',
                    'Список используемых дезинфектантов с фактической концентрацией активного вещества, поставщиком, batch-номерами, сроком годности после разбавления.',
                    'Microbial flora baseline — сводка EM за последние 6–12 месяцев с указанием recurring isolates, частоты обнаружения, зоны.',
                    'Инвентаризация имеющихся данных от поставщика (suspension test report от производителя дезинфектанта, EN-сертификаты, MSDS).',
                    'Утверждённый Validation Master Plan (VMP) с описанием объёма, ответственных, сроков, бюджета.',
                    'Quality Agreement с поставщиком дезинфектантов — обязательное условие.',
                  ]}
                />
                <Pitfall
                  text="Часто FMEA пишется задним числом «под результаты». Корректный подход — risk assessment датируется до начала тестирования и используется для выбора штаммов и поверхностей; любое расхождение между планом и фактическими тестами фиксируется в Change Control."
                />

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Этап 2 — Suspension test (in vitro)
                </h3>
                <p className="mb-4">
                  Методическая база — EN 1276 (бактерии), EN 1650
                  (дрожжи и грибы), EN 13727 (медицинская область) и
                  EN 17126 (sporicidal). Цель — подтвердить заявленную
                  активность средства в стандартных условиях против
                  типового набора штаммов (раздел 3) с обязательным
                  включением environmental isolates.
                </p>
                <p className="mb-4">
                  Базовая методика (EN 1276): к 1 мл суспензии
                  тест-микроорганизма (10⁷–10⁸ КОЕ/мл) добавляется
                  1 мл интерференса (BSA 0,3% для clean conditions
                  или BSA 3% + дрожжевой экстракт для dirty
                  conditions) и 8 мл рабочего раствора дезинфектанта
                  при 20 ± 1 °C. После заданного контактного времени
                  отбирается аликвота, переносится в нейтрализатор,
                  через 5 мин выполняется серия 10-кратных разведений
                  и высев на питательную среду. Инкубация при 30–37 °C
                  для бактерий, 20–25 °C для дрожжей/грибов.
                </p>
                <p className="mb-4">
                  Acceptance criteria:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>≥5 log₁₀</strong> снижение для
                    вегетативных бактерий (EN 1276 минимум, для
                    GMP-применения требуется тот же порог);
                  </li>
                  <li>
                    <strong>≥4 log₁₀</strong> снижение для дрожжей и
                    грибов (EN 1650);
                  </li>
                  <li>
                    <strong>≥3 log₁₀</strong> снижение для бактериальных
                    спор (EN 17126); для сильных спорицидов целью
                    может быть ≥4 или ≥5;
                  </li>
                  <li>
                    эффективность нейтрализатора подтверждена
                    отдельным контролем (toxicity / interference test):
                    после нейтрализации тестовая культура должна
                    восстанавливаться в пределах 50–200% контрольного
                    титра;
                  </li>
                  <li>
                    результаты воспроизведены минимум на трёх
                    независимых партиях средства.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Этап 3 — Carrier test (на поверхностях)
                </h3>
                <p className="mb-4">
                  Методическая база — EN 13697 (quantitative
                  non-porous surface test). Цель — подтвердить
                  активность средства на конкретных материалах
                  поверхностей предприятия в условиях, максимально
                  приближённых к реальным.
                </p>
                <p className="mb-4">
                  Coupon test method: на купоны размером 2×2 см из
                  каждого валидируемого материала (нержавейка 316L,
                  эпоксид, поликарбонат, ПВХ, стекло, HPL и т. д.)
                  наносится 50 мкл инокулята целевой концентрации.
                  Высушивание под ламинарным потоком 30–60 минут до
                  визуального высыхания. Затем — нанесение
                  дезинфектанта в реальной концентрации и применении
                  (свободное нанесение, протирка стерильной
                  безворсовой салфеткой, спрей+wipe). После заданного
                  контактного времени — нейтрализация и recovery.
                </p>
                <p className="mb-4">
                  Recovery method: купон погружается в 10 мл
                  нейтрализатора + стеклянные шарики, vortex 60 сек.
                  Полученный смыв высевается методом мембранной
                  фильтрации или прямого high-volume посева. Кроме
                  тестовых купонов готовятся: control coupon
                  (инокулят + нейтрализатор без дезинфектанта) и
                  blank coupon (только нейтрализатор) — для
                  подтверждения корректности recovery rate.
                </p>
                <p className="mb-4">
                  Statistical evaluation: не менее трёх повторов
                  каждой комбинации «материал × штамм × контактное
                  время»; оценка через лог-снижение от input
                  inoculum, среднее ± стандартное отклонение.
                </p>
                <p className="mb-4">
                  Acceptance criteria для carrier test обычно мягче
                  suspension (учитывает геометрию):
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    ≥4 log₁₀ снижение для вегетативных бактерий на
                    непористых поверхностях;
                  </li>
                  <li>
                    ≥3 log₁₀ для дрожжей и грибов;
                  </li>
                  <li>
                    ≥2 log₁₀ для спор для большинства спорицидов
                    (для надуксусной кислоты и H₂O₂-vapour может
                    требоваться ≥3);
                  </li>
                  <li>
                    recovery rate с control coupon — 50–100% от
                    исходного инокулята; ниже 50% означает
                    неприменимость метода recovery.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Этап 4 — In-use validation
                </h3>
                <p className="mb-4">
                  Цель — подтвердить, что лабораторные результаты
                  переносятся в реальную эксплуатацию. Тестируется не
                  только средство, но и весь рабочий процесс:
                  подготовка раствора, расходники, действия оператора,
                  условия зоны.
                </p>
                <p className="mb-4">
                  Методика: на типовых поверхностях производства
                  отбираются swab-пробы согласно ISO 14698-1 до
                  применения средства (baseline) и через
                  установленное контактное время после применения
                  (post-cleaning). Параллельно ставятся контактные
                  пластины 55 мм с нейтрализатором. Минимум — три
                  серии испытаний на трёх различных
                  производственных сменах с разными операторами.
                </p>
                <Checklist
                  items={[
                    'Карта точек отбора (sampling plan) утверждена и привязана к layout зоны.',
                    'Минимум 10 точек на зону для swab + 10 точек для контактных пластин в каждой серии.',
                    'Параллельный воздушный мониторинг (active air sampling) для контекста.',
                    'Точки worst-case — углы, стыки, труднодоступные места — обязательны.',
                    'Использование нейтрализатора в каждой контактной пластине; контроль эффективности нейтрализации в этой партии.',
                    'Документация — по каждой пробе: ID, время, оператор, температура зоны, текущая стадия производства.',
                    'Минимум три независимые серии испытаний.',
                    'Результаты сопоставляются с alert/action limits соответствующего класса (EU GMP таблицы 1 и 2).',
                  ]}
                />
                <p className="mb-4">
                  Acceptance criteria для in-use validation
                  привязаны к классу cleanroom: post-cleaning
                  результаты должны быть стабильно ниже action
                  limit (зона A — &lt;1 КОЕ, зона B — 5 КОЕ, зона
                  C — 25 КОЕ, зона D — 50 КОЕ для контактной
                  пластины 55 мм) на всех точках; baseline-данные
                  должны показать значимое снижение (как минимум
                  log₁₀ 1–2 в зонах с высокой нагрузкой).
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Этап 5 — Continuous monitoring и re-validation
                </h3>
                <p className="mb-4">
                  Валидация — не разовое событие. После успешного
                  завершения этапов 1–4 средство и программа
                  переходят в режим непрерывного мониторинга, в
                  рамках которого:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    Routine EM — ежедневно/еженедельно по
                    утверждённому графику с фиксацией каждой точки;
                  </li>
                  <li>
                    Trend analysis — ежеквартально, с построением
                    графиков КОЕ по точкам и отслеживанием выхода за
                    alert/action;
                  </li>
                  <li>
                    Annual review (PQR-блок) — оценка
                    устойчивости программы дезинфекции, подсчёт
                    отклонений, статус CAPA;
                  </li>
                  <li>
                    Re-validation triggers (полный или частичный
                    повтор этапов 2–4): смена поставщика средства;
                    смена фактической концентрации действующего
                    вещества; смена технологии нанесения; смена
                    материалов поверхностей; устойчивое нарушение
                    EM-показателей; изменение SOP уборки;
                  </li>
                  <li>
                    Periodic re-validation — как минимум один раз
                    в 2 года, даже без триггеров; раз в год для
                    зон A/B.
                  </li>
                </ul>
              </section>

              {/* Section 5 — Rotation */}
              <section id="rotation" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  5. Ротация спорицида — критично
                </h2>
                <p className="mb-4">
                  Annex 1 §11.6 требует обязательного включения
                  спорицида в программу плюс ротацию средств с
                  разными механизмами действия. Это одна из самых
                  частых причин major-замечаний на инспекциях
                  УЗ-предприятий: либо спорицид формально записан в
                  графике, но фактически не применяется, либо
                  ротация существует только на бумаге.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Зачем ротация
                </h3>
                <p className="mb-4">
                  Длительное применение одного действующего вещества
                  создаёт селективное давление на микрофлору. Через
                  6–18 месяцев эксплуатации в зоне с высокой
                  нагрузкой могут начать преобладать резистентные
                  изоляты — например, плесневые грибы устойчивые к
                  четвертичным аммониевым соединениям, или
                  bacillus-споровые формы, переживающие IPA. Ротация
                  средств с разным механизмом действия
                  (окислительный — спирты — катионные ПАВ — фенолы
                  — H₂O₂/PAA) минимизирует это давление.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Стандартные циклы
                </h3>
                <p className="mb-4">
                  Типовой график ротации зависит от класса зоны и
                  риска. Минимум:
                </p>
                <div className="overflow-x-auto -mx-4 lg:mx-0 my-6">
                  <table className="min-w-[640px] w-full text-[14px] border-collapse">
                    <thead>
                      <tr className="bg-surface">
                        <th className="p-3 text-left border border-surface-input">
                          Зона
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Бактерицид A
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Бактерицид B
                        </th>
                        <th className="p-3 text-left border border-surface-input">
                          Спорицид
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-surface-input">
                          A / B (асептика)
                        </td>
                        <td className="p-3 border border-surface-input">
                          стерильный IPA 70% — ежедневно
                        </td>
                        <td className="p-3 border border-surface-input">
                          стерильный QAC / amphoteric — каждое 2-е
                          применение
                        </td>
                        <td className="p-3 border border-surface-input">
                          H₂O₂ 6–7,5% или PAA — еженедельно
                        </td>
                      </tr>
                      <tr className="bg-surface/50">
                        <td className="p-3 border border-surface-input">
                          C
                        </td>
                        <td className="p-3 border border-surface-input">
                          IPA 70% — ежедневно
                        </td>
                        <td className="p-3 border border-surface-input">
                          QAC / phenolic — раз в неделю (другой день)
                        </td>
                        <td className="p-3 border border-surface-input">
                          H₂O₂ или гипохлорит — раз в 2 недели
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-surface-input">
                          D
                        </td>
                        <td className="p-3 border border-surface-input">
                          QAC — еженедельно
                        </td>
                        <td className="p-3 border border-surface-input">
                          IPA 70% — раз в 2 недели
                        </td>
                        <td className="p-3 border border-surface-input">
                          H₂O₂ или гипохлорит — раз в месяц
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mb-4">
                  График — это базовый ориентир. Конкретные интервалы
                  устанавливаются на основании результатов EM и
                  trend-анализа. В зонах с высокой плесневой
                  нагрузкой частота применения H₂O₂ или PAA может
                  быть повышена до 2–3 раз в неделю.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Документация ротации
                </h3>
                <Checklist
                  items={[
                    'SOP с матрицей «зона × средство × частота × контактное время × оператор × подпись».',
                    'Календарь ротации, утверждённый QA, с указанием дней спорицидной обработки.',
                    'Журнал применения с фотофиксацией для зон A/B и подписью супервайзера.',
                    'Trend-анализ EM с разбивкой «дни средства A vs дни средства B vs дни спорицида» — для подтверждения отсутствия систематического выхода за alert.',
                    'Validation rotation schedule — отдельный документ, обосновывающий именно эти интервалы через risk assessment.',
                  ]}
                />
                <Pitfall
                  text="Классическая находка: на стене висит график ротации, но в журнале применения за последние 6 месяцев спорицид не зафиксирован ни разу. Объяснение «нет в наличии» или «не успели» = major-замечание + предписание о приостановке release продукции до закрытия CAPA."
                />
              </section>

              {/* Section 6 — Documentation */}
              <section id="documentation" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  6. Документация валидации
                </h2>
                <p className="mb-4">
                  Документационный пакет валидации дезинфекции
                  опирается на классическую структуру V-модели:
                  Validation Master Plan → Validation Protocol →
                  Validation Report. К ним добавляются SOP уборки,
                  записи обучения операторов и материалы EM.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.1 Validation Master Plan (VMP)
                </h3>
                <p className="mb-4">
                  VMP — стратегический документ, описывающий весь
                  объём валидационных активностей предприятия.
                  Раздел по дезинфекции должен включать:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    цель и scope (какие зоны, какие средства, какие
                    поверхности);
                  </li>
                  <li>
                    регуляторные референсы (Annex 1, USP, EN);
                  </li>
                  <li>
                    распределение ответственности (RACI: QA,
                    QC-лаборатория, эксплуатация, валидация);
                  </li>
                  <li>
                    последовательность этапов с временными рамками;
                  </li>
                  <li>
                    стратегию re-validation и триггеры;
                  </li>
                  <li>
                    deliverables (список выходных документов);
                  </li>
                  <li>
                    бюджет и материальные ресурсы;
                  </li>
                  <li>
                    план обучения персонала.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.2 Validation Protocol (VP)
                </h3>
                <p className="mb-4">
                  VP — детальный документ для конкретного теста
                  (suspension, carrier, in-use), который пишется
                  ДО начала испытаний и подписывается до того, как
                  получены результаты. Структура:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    1. Цель и обоснование;
                  </li>
                  <li>
                    2. Регуляторная база (точные ссылки на Annex 1,
                    USP &lt;1072&gt;, EN с номерами разделов);
                  </li>
                  <li>
                    3. Объект тестирования (средство, концентрация,
                    batch, supplier, expiry);
                  </li>
                  <li>
                    4. Тестовые штаммы (ATCC + environmental
                    isolates с обоснованием);
                  </li>
                  <li>
                    5. Материалы и оборудование (среды, шкафы,
                    термостаты, неутрализаторы — с
                    калибровочными свидетельствами);
                  </li>
                  <li>
                    6. Методика (пошагово, с временными метками);
                  </li>
                  <li>
                    7. Acceptance criteria — числовые!;
                  </li>
                  <li>
                    8. Контроли (positive, negative, neutralizer
                    toxicity, recovery);
                  </li>
                  <li>
                    9. Объём испытаний (количество повторов);
                  </li>
                  <li>
                    10. Ответственные и подписи;
                  </li>
                  <li>
                    11. Документы записи (формы лабораторных журналов).
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  6.3 Validation Report (VR)
                </h3>
                <p className="mb-4">
                  VR пишется по итогам выполнения VP и привязывается к
                  конкретному номеру протокола. Содержит фактические
                  результаты, обработку данных, выводы и подпись
                  ответственного. Должен явно сравнить полученное
                  значение с acceptance criteria из VP и в случае
                  расхождений — описать deviation и решение
                  (повторение, расширение, отказ от средства).
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Что должен видеть инспектор за 30 минут
                </h3>
                <Checklist
                  items={[
                    'Утверждённый VMP с актуальной датой пересмотра.',
                    'Список всех используемых дезинфектантов с привязкой к VP/VR (validation matrix).',
                    'Подписанные протоколы и отчёты по каждому средству (suspension + carrier + in-use).',
                    'Сертификаты ATCC-штаммов и журнал учёта environmental isolates с криохранилищем.',
                    'SOP уборки и дезинфекции (актуальная версия) с подписями обученных операторов.',
                    'Журнал ротации с подписью каждой смены — без пробелов.',
                    'Trend-анализ EM за последние 12 месяцев с привязкой к программе дезинфекции.',
                    'CAPA по любым отклонениям, обнаруженным за последние 12 месяцев.',
                    'Records обучения и квалификации операторов уборки.',
                    'Calibration records для всех средств измерения (термостаты, ламинары, дозаторы).',
                  ]}
                />

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Шаблоны (краткие)
                </h3>
                <p className="mb-4">
                  Минимальный шаблон swab-формы:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    ID пробы, дата, время, зона, точка отбора, тип
                    поверхности, температура и влажность зоны;
                  </li>
                  <li>
                    стадия производства (idle / dynamic / cleaning);
                  </li>
                  <li>
                    оператор отбора, подпись;
                  </li>
                  <li>
                    результаты подсчёта КОЕ через 48–72 ч (бактерии)
                    и 5–7 сут (грибы);
                  </li>
                  <li>
                    идентификация при превышении — обязательно;
                  </li>
                  <li>
                    подпись микробиолога QC.
                  </li>
                </ul>
              </section>

              {/* Section 7 — Findings */}
              <section id="findings" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  7. Типичные находки инспекторов
                </h2>
                <p className="mb-4">
                  Сводка повторяющихся замечаний по программе
                  дезинфекции, основанная на публичных отчётах
                  EU GMP-инспекций и практике подготовки
                  УЗ-предприятий к аудиту:
                </p>
                <ol className="list-decimal pl-6 space-y-2 mb-4">
                  <li>
                    <strong>Нет числовых acceptance criteria.</strong>{' '}
                    VP содержит фразу «средство должно быть
                    эффективным», но не указан целевой log-снижение
                    и не привязан к EN-стандарту.
                  </li>
                  <li>
                    <strong>Только in-vitro данные от поставщика.</strong>{' '}
                    Carrier-тест на реальных материалах
                    предприятия не выполнялся; in-use validation
                    отсутствует или ограничивается одной серией.
                  </li>
                  <li>
                    <strong>Environmental isolates не используются.</strong>{' '}
                    Все тесты выполнены только на ATCC-штаммах,
                    несмотря на наличие повторно встречающихся
                    изолятов в EM-журнале.
                  </li>
                  <li>
                    <strong>Спорицид формально присутствует.</strong>{' '}
                    Запись в SOP есть, но журнал применения за
                    последние 6 месяцев показывает использование
                    спорицида менее чем в 50% запланированных дат.
                  </li>
                  <li>
                    <strong>Нейтрализатор не валидирован.</strong>{' '}
                    Recovery rate не подтверждён, toxicity-control
                    отсутствует — соответственно, все полученные
                    значения log-снижения нерелевантны.
                  </li>
                  <li>
                    <strong>Стерильные растворы не стерильны.</strong>{' '}
                    В зонах А/В применяются растворы, разлитые в
                    нестерильную тару, или растворы с истёкшим сроком
                    после открытия; вход-контроль качества
                    отсутствует.
                  </li>
                  <li>
                    <strong>Контактное время не контролируется.</strong>{' '}
                    SOP указывает «не менее 5 минут», но фактически
                    оператор делает один проход за 60 секунд и
                    переходит дальше.
                  </li>
                  <li>
                    <strong>Без квалификации оператора.</strong>{' '}
                    Записи обучения отсутствуют или не содержат
                    практической квалификации с измеримыми
                    результатами.
                  </li>
                  <li>
                    <strong>Trend-анализ EM не привязан к программе.</strong>{' '}
                    Графики строятся, но рост КОЕ в определённые
                    дни не сопоставляется с реальным графиком
                    применения средств.
                  </li>
                  <li>
                    <strong>Нет re-validation после смены поставщика.</strong>{' '}
                    Завод закупил новый brand «эквивалентного»
                    средства от другого производителя, считая, что
                    предыдущая валидация переносится автоматически.
                    Это критическая ошибка — каждая смена
                    производителя требует как минимум suspension +
                    carrier-теста.
                  </li>
                </ol>
              </section>

              {/* Section 8 — Consumables */}
              <section id="consumables" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  8. Расходники для валидации
                </h2>
                <p className="mb-4">
                  Без правильных расходников валидация невозможна
                  технически: нестерильная мопа смажет результаты
                  carrier-теста, не та контактная пластина не
                  восстановит споры, неверный нейтрализатор сделает
                  весь suspension test недействительным. Ниже —
                  минимальный набор, который должен быть на складе
                  предприятия и у валидационной лаборатории.
                </p>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Что нужно иметь под рукой
                </h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>Стерильные дезинфектанты с
                    протоколами партий</strong> — рабочие растворы
                    в изначально стерильной упаковке (γ-облучение)
                    с CoA на каждую партию: содержание активного
                    вещества, sterility test, эндотоксины,
                    bioburden, дата производства, expiry.
                  </li>
                  <li>
                    <strong>Стерильный 70% IPA в спрее</strong>{' '}
                    (медленный распыл, низкая аэрозольная фракция)
                    — для финальной обработки и подготовки точек
                    отбора.
                  </li>
                  <li>
                    <strong>Стерильные мопы</strong> для in-situ
                    тестов — гамма-стерилизованные, низковорсовые,
                    одноразовые, совместимые с активным веществом
                    выбранного средства.
                  </li>
                  <li>
                    <strong>Безворсовые салфетки</strong>{' '}
                    (полиэстер 100% / полиэстер-целлюлоза) —
                    cleanroom-классифицированные, low-particulate,
                    для протирок и заборной техники.
                  </li>
                  <li>
                    <strong>Биоиндикаторы со спорами B. subtilis</strong>{' '}
                    (Terragene или эквивалент) — с актуальными
                    D-value/Z-value на партию, для подтверждения
                    спорицидной активности и контроля стерилизации
                    инструмента.
                  </li>
                  <li>
                    <strong>Контактные пластины 55 мм с
                    нейтрализатором</strong> (TSA + lecithin +
                    polysorbate 80 + histidine) для всех типов
                    средств (QAC, phenolic, oxidative). Хранение
                    при 2–8 °C, контроль ростовых свойств перед
                    применением.
                  </li>
                  <li>
                    <strong>Swabs стерильные</strong> с фиксированной
                    площадью (10 или 25 см² шаблон) и транспортной
                    средой с нейтрализатором — для отбора со стен,
                    оборудования, труднодоступных точек.
                  </li>
                  <li>
                    <strong>Питательные среды</strong> — TSA, SDA,
                    R2A для воды, готовые plates и
                    bouillon-флаконы; контроль ростовых свойств
                    каждой партии.
                  </li>
                  <li>
                    <strong>Купоны для carrier-теста</strong> из
                    каждого валидируемого материала — нержавейка
                    316L, эпоксид, поликарбонат, ПВХ, стекло, HPL —
                    минимум по 30 штук каждого вида.
                  </li>
                  <li>
                    <strong>Калиброванные дозаторы</strong>{' '}
                    (1–10 мкл, 10–100 мкл, 100–1000 мкл) с
                    подтверждением калибровки и стерильные
                    наконечники.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Бренды и поставщики
                </h3>
                <p className="mb-4">
                  Глобальный набор брендов, признанных в
                  фарм-индустрии:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <strong>Contec</strong> — стерильные
                    дезинфектанты (ProClean, Sporicidin), мопы,
                    салфетки, спреи 70% IPA в стерильной упаковке;
                  </li>
                  <li>
                    <strong>Hydroflex</strong> — премиальные
                    cleanroom-системы уборки, стерильные мопы и
                    тележки PurMop, валидированные комбинации
                    «средство + расходник»;
                  </li>
                  <li>
                    <strong>Terragene</strong> — биологические
                    индикаторы (BT-Sure, Bionova) для контроля
                    стерилизации и спорицидных применений, с
                    сертификатами D/Z-value на каждую партию;
                  </li>
                  <li>
                    <strong>IBC Nanotex</strong> — стерильные и
                    нестерильные cleanroom-салфетки и мопы с
                    подтверждением низкого particle count и
                    extractables;
                  </li>
                  <li>
                    Производители контактных пластин и swab —
                    глобальные (Merck Millipore, Cherwell, VWR),
                    выбор зависит от валидационных данных по
                    нейтрализатору.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Внутренние ресурсы CRS
                </h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    <Link
                      href="/catalog/disinfectants-and-detergents"
                      className="text-brand hover:underline"
                    >
                      Дезинфектанты и спороциды
                    </Link>{' '}
                    — стерильные и нестерильные средства для зон
                    A/B/C/D с CoA;
                  </li>
                  <li>
                    <Link
                      href="/catalog/cleanroom-wipes"
                      className="text-brand hover:underline"
                    >
                      Cleanroom-салфетки и мопы
                    </Link>{' '}
                    — стерильные безворсовые расходники для
                    in-situ-тестов и рутинной дезинфекции;
                  </li>
                  <li>
                    <Link
                      href="/catalog/indicators"
                      className="text-brand hover:underline"
                    >
                      Биологические индикаторы Terragene
                    </Link>{' '}
                    — для подтверждения спорицидной активности и
                    контроля стерилизации;
                  </li>
                  <li>
                    <Link
                      href="/catalog/cleaning-trolleys-systems"
                      className="text-brand hover:underline"
                    >
                      Системы уборки и cleanroom-тележки
                    </Link>{' '}
                    — для соблюдения SOP уборки в зонах С/D;
                  </li>
                  <li>
                    <Link
                      href="/catalog/garments"
                      className="text-brand hover:underline"
                    >
                      Стерильная одежда для зон A/B
                    </Link>{' '}
                    — обязательное условие выполнения
                    in-use-валидации в асептических зонах;
                  </li>
                  <li>
                    <Link
                      href="/resources/gmp-audit-checklist"
                      className="text-brand hover:underline"
                    >
                      GMP-чек-лист 2027
                    </Link>{' '}
                    — связанный документ для общей подготовки к
                    аудиту;
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-brand hover:underline"
                    >
                      База знаний
                    </Link>{' '}
                    — статьи по cleanroom-индустрии и
                    практической дезинфекции.
                  </li>
                </ul>
              </section>

              {/* Conclusion */}
              <section id="conclusion" className="mb-12">
                <h2 className="text-[26px] md:text-[30px] font-extrabold text-text-dark mb-4 leading-tight">
                  Резюме и контакты
                </h2>
                <p className="mb-4">
                  Валидация дезинфекции в чистом помещении — это
                  пятиэтапный процесс (pre-validation → suspension
                  test → carrier test → in-use validation →
                  continuous monitoring), опирающийся на EU GMP
                  Annex 1 (2022), USP &lt;1072&gt; и &lt;1116&gt;,
                  ISO 14698-1 и семейство EN-стандартов. Ключевые
                  условия успеха:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>
                    числовые acceptance criteria (≥5 log для
                    бактерий, ≥3 для спор) с явной привязкой к
                    конкретному EN-методу;
                  </li>
                  <li>
                    тестирование на реальных материалах и с
                    реальной микрофлорой предприятия;
                  </li>
                  <li>
                    рабочая ротация бактерицида A → бактерицида B +
                    спорицида с журналами применения, а не
                    бумажным графиком;
                  </li>
                  <li>
                    нейтрализатор валидирован вместе со средствами;
                  </li>
                  <li>
                    обученные и квалифицированные операторы;
                  </li>
                  <li>
                    непрерывный trend-анализ EM с привязкой к
                    программе и прозрачные re-validation triggers;
                  </li>
                  <li>
                    стабильное снабжение стерильными расходниками
                    с CoA — без них валидацию выполнить
                    невозможно ни технически, ни юридически.
                  </li>
                </ul>

                <h3 className="text-[20px] font-bold text-text-dark mb-3 mt-6">
                  Чем поможет {siteConfig.name}
                </h3>
                <p className="mb-4">
                  {siteConfig.name} (ООО TOPAZ COMPANY) —
                  официальный B2B-поставщик расходных материалов для
                  чистых помещений в Узбекистане. Мы поставляем
                  стерильные дезинфектанты с CoA, спороциды,
                  cleanroom-салфетки и мопы, биоиндикаторы Terragene,
                  стерильную одежду и перчатки, а также сопутствующее
                  оборудование для уборки зон A/B/C/D. Помогаем
                  собрать релевантную валидационную корзину под
                  конкретные SOP и обеспечить страховой запас на
                  длительные циклы поставки.
                </p>

                <div className="rounded-2xl border border-brand/30 bg-brand-light/30 p-6 md:p-8 my-8 no-print-bg">
                  <h3 className="text-[22px] md:text-[24px] font-extrabold text-text-dark mb-3 leading-tight">
                    Запросить КП на валидационные расходники
                  </h3>
                  <p className="text-[15px] text-text mb-5 leading-relaxed">
                    Свяжитесь с менеджерами CRS — поможем подобрать
                    стерильные дезинфектанты, спороциды,
                    биоиндикаторы и расходники под выбранные
                    EN-стандарты и acceptance criteria; составим
                    коммерческое предложение со сроками поставки и
                    спецификацией.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contacts"
                      className="no-print inline-flex items-center justify-center px-6 h-[48px] text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors"
                    >
                      Запросить КП
                    </Link>
                    <Link
                      href="/catalog/disinfectants-and-detergents"
                      className="no-print inline-flex items-center justify-center px-6 h-[48px] text-[15px] font-semibold text-brand-dark bg-white border border-brand-dark rounded-lg hover:bg-surface transition-colors"
                    >
                      Каталог дезинфектантов
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-brand/20 flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
                    <a
                      href={`tel:${phoneTel}`}
                      className="inline-flex items-center gap-2 text-text-dark hover:text-brand transition-colors"
                    >
                      <Phone size={16} className="text-brand" />
                      {siteConfig.phone}
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="inline-flex items-center gap-2 text-text-dark hover:text-brand transition-colors"
                    >
                      <Mail size={16} className="text-brand" />
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <p className="text-[13px] text-text-muted mt-10 pt-6 border-t border-surface-input">
                  Документ носит информационный характер, является
                  обзорным руководством и не заменяет нормативное
                  консультирование, валидационные работы или
                  лабораторные испытания. Для каждого предприятия
                  требуется индивидуальный валидационный пакет с
                  учётом конкретных продуктов, процессов и
                  EM-данных. Не гарантирует результатов
                  GMP-инспекции. Перед принятием решений
                  проверяйте актуальные редакции EU GMP Annex 1,
                  USP, EN и нормативных актов Республики
                  Узбекистан.
                </p>
                <p className="text-[13px] text-text-muted mt-2">
                  Обновлено: май 2026 г. © {siteConfig.name}.
                </p>
              </section>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 my-4">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-[15px] text-text leading-relaxed"
        >
          <CheckCircle2
            size={18}
            className="text-brand shrink-0 mt-1"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Pitfall({ text }: { text: string }) {
  return (
    <div className="flex gap-3 p-4 my-5 bg-amber-50 border border-amber-200 rounded-lg">
      <AlertTriangle
        size={20}
        className="text-amber-600 shrink-0 mt-0.5"
      />
      <p className="text-[14px] text-amber-900 leading-relaxed m-0">
        <strong className="font-semibold">Типичная находка: </strong>
        {text}
      </p>
    </div>
  );
}
