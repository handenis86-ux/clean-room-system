/**
 * Словарь UI-строк для русской и узбекской (латиница) локалей.
 *
 * Узбекская локаль (`uz`) — это официальная латиница, утверждённая
 * Постановлением Президента №УП-30 от 21.06.2023. На ней работают
 * QA-инспекторы Pharma Park и регуляторные специалисты иностранных
 * фарм-групп в Узбекистане.
 *
 * Технические термины (GMP, ISO 14644, Annex 1, EU GMP, CCS,
 * mock inspection, SMF, VMP, SOP, supplier qualification, CAPA,
 * EM-программа и т.д.) НЕ переводятся — фарм-отрасль использует
 * английский глобально. Бренды (Contec, Terragene, IBC Nanotex,
 * TINMAN, Hydroflex, BIMOS, Alsico, Isofield, NPro) остаются
 * в оригинальной форме.
 */

import type { Locale } from './locales';

/**
 * Тип-форма словаря. Описана как «русская версия», т. к. она —
 * мастер-копия; узбекская локаль обязана повторять ту же структуру.
 */
export type Dictionary = typeof t.ru;

export const t = {
  ru: {
    nav: {
      home: 'Главная',
      catalog: 'Каталог',
      calculators: 'Калькуляторы',
      about: 'О компании',
      blog: 'База знаний',
      contacts: 'Контакты',
    },
    common: {
      phone: 'Телефон',
      email: 'Email',
      address: 'Адрес',
      requestQuote: 'Запросить КП',
      requestConsultation: 'Запросить консультацию',
      leaveRequest: 'Оставить заявку',
      callUs: 'Позвонить',
      submitForm: 'Отправить',
      sending: 'Отправка...',
      breadcrumbsHome: 'Главная',
      relatedTopics: 'По теме',
      readMore: 'Читать далее',
      year: '2026',
      allRightsReserved: 'Все права защищены.',
      privacyPolicy: 'Политика конфиденциальности',
      scheduleTitle: 'График работы',
      scheduleWeekdays: 'Пн — Пт: 09:00 — 18:00',
      scheduleWeekend: 'Сб — Вс: Выходной',
      contactInfo: 'Контактная информация',
      menuOpen: 'Открыть меню',
      menuClose: 'Закрыть меню',
      languageRu: 'Русский',
      languageUz: 'Oʻzbekcha',
      switchLanguage: 'Изменить язык',
    },
    header: {
      requestQuoteCta: 'Запросить КП',
    },
    footer: {
      brandDescription:
        'Одежда и расходные материалы для чистых помещений. Решения для фармацевтики, пищевой, косметической промышленности и микроэлектроники.',
      catalogHeading: 'Каталог',
      companyHeading: 'Компания',
      contactsHeading: 'Контакты',
      catalogItems: {
        indicators: 'Индикаторы стерилизации',
        disinfectants: 'Дезинфицирующие средства',
        garments: 'Защитная одежда',
        gloves: 'Перчатки',
        wipes: 'Салфетки',
        chairs: 'Стулья',
      },
      companyItems: {
        about: 'О компании',
        tinman: 'TINMAN — мебель cleanroom',
        blog: 'База знаний',
        contacts: 'Контакты',
      },
    },
    home: {
      metaTitle:
        'Расходники и мебель для чистых помещений Узбекистан — TINMAN, Contec, Terragene',
      metaDescription:
        'Поставщик расходников cleanroom в Узбекистане: перчатки, дезинфектанты, биоиндикаторы, мебель TINMAN. Для GMP, ISO 14644, Pharma Park. Доставка из Ташкента, КП за 24 ч.',
      heroEyebrow: 'B2B-поставщик cleanroom Узбекистан',
      heroTitle: 'Расходники и мебель для чистых помещений в Узбекистане',
      heroSubtitle:
        'Перчатки, дезинфектанты, одежда, биоиндикаторы, мебель TINMAN для фарм-, биотех- и медицинских предприятий. Поставка из Ташкента, КП за 24 часа.',
      heroCta: 'Запросить КП',
      heroSecondaryCta: 'Открыть каталог',
      aboutSectionTitle: 'CRS / TOPAZ COMPANY — официальный дистрибьютор IBC Nanotex',
      aboutSectionBody:
        'Снабжаем 13 действующих GMP-сертифицированных фарм-заводов в Узбекистане. Прямые контракты с производителями Contec, Terragene, Hydroflex, BIMOS, Alsico, Isofield, NPro и TINMAN. Полный compliance-пакет: TDS, CoA, сертификаты EN / ISO для supplier qualification — «из коробки».',
      categoriesTitle: 'Категории каталога',
      ctaTitle: 'Готовы начать сотрудничество?',
      ctaSubtitle:
        'Запросите коммерческое предложение или 30-минутную бесплатную консультацию по подбору расходников и мебели cleanroom под вашу зону и класс чистоты.',
    },
    catalog: {
      metaTitle: 'Каталог расходных материалов для чистых помещений | Узбекистан',
      metaDescription:
        'Каталог расходников для чистых помещений GMP / ISO 14644 в Узбекистане: индикаторы стерилизации, дезинфектанты, одежда, перчатки, салфетки, тележки. Купить в Ташкенте.',
      breadcrumbCurrent: 'Каталог',
      pageTitle: 'Каталог продукции',
      pageSubtitle:
        'Одежда и расходные материалы для чистых помещений от ведущих мировых производителей: Contec, Alsico, Terragene, Hydroflex, NPro, Isofield, BIMOS и других.',
      notFoundTitle: 'Не нашли нужный товар?',
      notFoundBody:
        'Мы работаем с широким каталогом поставщиков и можем найти любую продукцию для чистых помещений. Оставьте заявку, и мы подберём решение.',
    },
    category: {
      breadcrumbCatalog: 'Каталог',
      coveredStandards: 'Категория покрывает стандарты',
      otherCategoriesTitle: 'Другие категории',
      faqTitle: 'Часто задаваемые вопросы',
      ctaTitle: 'Нужна консультация по товару?',
      ctaBody:
        'Наши специалисты помогут подобрать оптимальное решение и подготовят коммерческое предложение.',
      productsCountLabel: 'SKU в наличии',
    },
    compliance: {
      heroEyebrow: 'GMP-2027 Узбекистан',
      heroTitle: 'GMP сертификация в Узбекистане к 1 января 2027',
      heroSubtitle:
        'Reference-hub для QA-департаментов фарм-предприятий: нормативная база, кого касается, чек-лист инспекции Центра надлежащих практик, поэтапная подготовка.',
    },
    contacts: {
      metaTitle: 'Контакты | Поставщик расходников для чистых помещений в Ташкенте',
      metaDescription:
        'Свяжитесь с Clean Room Systems для консультации по расходным материалам для чистых помещений GMP / ISO 14644. Телефон, email, адрес офиса в Ташкенте, Узбекистан.',
      pageTitle: 'Контакты',
      pageSubtitle:
        'Свяжитесь с нами любым удобным способом — мы готовы ответить на ваши вопросы.',
      formTitle: 'Оставить заявку',
      formSubtitle: 'Заполните форму, и мы свяжемся с вами в ближайшее время.',
    },
    about: {
      pageTitle: 'О компании',
      pageSubtitle:
        'Комплексное оснащение чистых помещений для фармацевтической, пищевой, косметической промышленности и микроэлектроники в Узбекистане.',
      whoTitle: 'Профессионалы в области чистых помещений',
    },
    gmpConsulting: {
      heroBadge: 'До GMP-сертификации — 7 месяцев',
      heroTitle: 'Подготовка к GMP в Узбекистане',
      heroSubtitleLine2: 'обучение, аудит, сопровождение GMP-инспекции',
      heroParagraph:
        'До обязательной GMP-сертификации осталось 7 месяцев. Поможем пройти GMP-инспекцию с первого раза. Работаем в партнёрстве с практикующими GMP-консультантами, которые уже сертифицировали предприятия в Узбекистане.',
      ctaPrimary: 'Получить план подготовки',
      formTitle: 'Получите план подготовки к GMP-инспекции',
      formSubtitle:
        'Заполните форму — свяжемся в течение 24 часов и согласуем 30-минутный диагностический созвон. Бесплатно.',
      successTitle: 'Спасибо! Заявка отправлена',
      successBody: 'Свяжемся с вами в течение 24 часов по телефону',
      successOrEmail: 'или email',
      successFooter: 'А пока — подборка наших гайдов по GMP:',
      labelName: 'Имя',
      labelPhone: 'Телефон',
      labelEmail: 'Email',
      labelCompany: 'Компания',
      labelPosition: 'Должность',
      labelProductionType: 'Тип производства',
      labelTargetDate: 'Целевая дата сертификации',
      labelHelp: 'Какая помощь нужна',
      labelComment: 'Комментарий',
      labelAgree: 'Согласен с',
      privacyLink: 'политикой обработки персональных данных',
      placeholderName: 'Ваше имя',
      placeholderPhone: '+998 __ ___-__-__',
      placeholderEmail: 'email@company.com',
      placeholderCompany: 'Название предприятия',
      placeholderPosition: 'QA-директор, регуляторный специалист...',
      placeholderSelect: 'Выберите…',
      placeholderComment: 'Опишите ситуацию: что уже сделано, в чём затруднения…',
      submitButton: 'Получить план подготовки',
      callDirect: 'Или позвоните',
      errorName: 'Укажите ваше имя.',
      errorPhone: 'Укажите телефон.',
      errorEmail: 'Укажите корректный email.',
      errorCompany: 'Укажите название компании.',
      errorProduction: 'Выберите тип производства.',
      errorDate: 'Выберите целевую дату GMP-сертификации.',
      errorHelp: 'Выберите хотя бы один пункт «Какая помощь нужна».',
      errorAgree: 'Подтвердите согласие на обработку персональных данных.',
      errorGeneric:
        'Произошла ошибка при отправке. Попробуйте позже или позвоните напрямую.',
      errorPhoneHint: 'Если форма не отправляется — позвоните напрямую:',
    },
    blog: {
      readingMin: 'мин чтения',
      tocTitle: 'Содержание',
      backToBlog: 'Все статьи',
      inlineCtaTitle: 'Нужна помощь в оснащении чистого помещения?',
      inlineCtaBody:
        'Специалисты Clean Room Systems подберут расходные материалы и одежду с учетом требований вашего производства.',
      inlineCtaButton: 'Получить консультацию',
    },
  },

  uz: {
    nav: {
      home: 'Bosh sahifa',
      catalog: 'Katalog',
      calculators: 'Kalkulyatorlar',
      about: 'Kompaniya haqida',
      blog: 'Bilim bazasi',
      contacts: 'Aloqa',
    },
    common: {
      phone: 'Telefon',
      email: 'Email',
      address: 'Manzil',
      requestQuote: 'Tijorat taklifini soʻrash',
      requestConsultation: 'Maslahat olish',
      leaveRequest: 'Ariza qoldirish',
      callUs: 'Qoʻngʻiroq qilish',
      submitForm: 'Yuborish',
      sending: 'Yuborilmoqda...',
      breadcrumbsHome: 'Bosh sahifa',
      relatedTopics: 'Tegishli mavzular',
      readMore: 'Davomini oʻqish',
      year: '2026',
      allRightsReserved: 'Barcha huquqlar himoyalangan.',
      privacyPolicy: 'Maxfiylik siyosati',
      scheduleTitle: 'Ish vaqti',
      scheduleWeekdays: 'Dush — Juma: 09:00 — 18:00',
      scheduleWeekend: 'Shanba — Yakshanba: Dam olish kuni',
      contactInfo: 'Aloqa maʼlumotlari',
      menuOpen: 'Menyuni ochish',
      menuClose: 'Menyuni yopish',
      languageRu: 'Русский',
      languageUz: 'Oʻzbekcha',
      switchLanguage: 'Tilni almashtirish',
    },
    header: {
      requestQuoteCta: 'Taklif soʻrash',
    },
    footer: {
      brandDescription:
        'Toza xonalar uchun kiyim va sarflanadigan materiallar. Farmatsevtika, oziq-ovqat, kosmetika sanoati va mikroelektronika korxonalari uchun yechimlar.',
      catalogHeading: 'Katalog',
      companyHeading: 'Kompaniya',
      contactsHeading: 'Aloqa',
      catalogItems: {
        indicators: 'Sterilizatsiya indikatorlari',
        disinfectants: 'Dezinfeksiyalovchi vositalar',
        garments: 'Himoya kiyimlari',
        gloves: 'Qoʻlqoplar',
        wipes: 'Toza xona salfetkalari',
        chairs: 'Toza xona stullari',
      },
      companyItems: {
        about: 'Kompaniya haqida',
        tinman: 'TINMAN — cleanroom mebeli',
        blog: 'Bilim bazasi',
        contacts: 'Aloqa',
      },
    },
    home: {
      metaTitle:
        'Toza xonalar uchun sarflanadigan materiallar va mebel — Oʻzbekiston | TINMAN, Contec, Terragene',
      metaDescription:
        'Oʻzbekistonda cleanroom sarflanadigan materiallar yetkazib beruvchisi: qoʻlqoplar, dezinfektantlar, bioindikatorlar, TINMAN mebeli. GMP, ISO 14644, Pharma Park uchun. Toshkentdan yetkazib berish, KP 24 soat ichida.',
      heroEyebrow: 'B2B cleanroom yetkazib beruvchi — Oʻzbekiston',
      heroTitle: 'Oʻzbekistonda toza xonalar uchun sarflanadigan materiallar va mebel',
      heroSubtitle:
        'Farm-, biotex- va tibbiy korxonalar uchun qoʻlqoplar, dezinfektantlar, kiyim, bioindikatorlar, TINMAN mebeli. Toshkentdan yetkazib berish, tijorat taklifi 24 soat ichida.',
      heroCta: 'Tijorat taklifini soʻrash',
      heroSecondaryCta: 'Katalogga oʻtish',
      aboutSectionTitle:
        'CRS / TOPAZ COMPANY — IBC Nanotex rasmiy distribyutori Oʻzbekistonda',
      aboutSectionBody:
        'Oʻzbekistondagi 13 ta amaldagi GMP-sertifikatlangan farm-zavodni taʼminlaymiz. Contec, Terragene, Hydroflex, BIMOS, Alsico, Isofield, NPro va TINMAN ishlab chiqaruvchilari bilan toʻgʻridan-toʻgʻri shartnomalar. Supplier qualification uchun toʻliq compliance-paket: TDS, CoA, EN / ISO sertifikatlari — «qutidan tashqari».',
      categoriesTitle: 'Katalog toifalari',
      ctaTitle: 'Hamkorlikni boshlashga tayyormisiz?',
      ctaSubtitle:
        'Tijorat taklifini yoki sizning zonangiz va tozalik sinfiga moslangan cleanroom sarflanadigan materiallar hamda mebelni tanlash boʻyicha 30-daqiqalik bepul maslahatni soʻrang.',
    },
    catalog: {
      metaTitle: 'Toza xonalar uchun sarflanadigan materiallar katalogi | Oʻzbekiston',
      metaDescription:
        'Oʻzbekistonda GMP / ISO 14644 toza xonalar uchun sarflanadigan materiallar katalogi: sterilizatsiya indikatorlari, dezinfektantlar, kiyim, qoʻlqoplar, salfetkalar, aravachalar. Toshkentda xarid qiling.',
      breadcrumbCurrent: 'Katalog',
      pageTitle: 'Mahsulotlar katalogi',
      pageSubtitle:
        'Yetakchi jahon ishlab chiqaruvchilaridan toza xonalar uchun kiyim va sarflanadigan materiallar: Contec, Alsico, Terragene, Hydroflex, NPro, Isofield, BIMOS va boshqalar.',
      notFoundTitle: 'Kerakli mahsulotni topa olmadingizmi?',
      notFoundBody:
        'Biz keng yetkazib beruvchilar katalogi bilan ishlaymiz va toza xonalar uchun har qanday mahsulotni topa olamiz. Ariza qoldiring, yechim taklif qilamiz.',
    },
    category: {
      breadcrumbCatalog: 'Katalog',
      coveredStandards: 'Toifa quyidagi standartlarni qamrab oladi',
      otherCategoriesTitle: 'Boshqa toifalar',
      faqTitle: 'Tez-tez beriladigan savollar',
      ctaTitle: 'Mahsulot boʻyicha maslahat kerakmi?',
      ctaBody:
        'Mutaxassislarimiz optimal yechimni tanlashga yordam berib, tijorat taklifini tayyorlab beradi.',
      productsCountLabel: 'mavjud SKU',
    },
    compliance: {
      heroEyebrow: 'GMP-2027 Oʻzbekiston',
      heroTitle: 'Oʻzbekistonda GMP sertifikatsiyasi 2027 yil 1 yanvariga',
      heroSubtitle:
        'Farm-korxonalar QA-boʻlimlari uchun reference-hub: meʼyoriy baza, kimga taalluqli, «Toʻgʻri amaliyot markazi» tekshiruv roʻyxati, bosqichli tayyorgarlik.',
    },
    contacts: {
      metaTitle:
        'Aloqa | Toshkentda toza xonalar uchun sarflanadigan materiallar yetkazib beruvchisi',
      metaDescription:
        'GMP / ISO 14644 toza xonalar uchun sarflanadigan materiallar boʻyicha maslahat olish uchun Clean Room Systems bilan bogʻlaning. Toshkentdagi telefon, email, ofis manzili.',
      pageTitle: 'Aloqa',
      pageSubtitle:
        'Bizning savollaringizga javob berishga tayyormiz — sizga qulay boʻlgan har qanday usul bilan bogʻlaning.',
      formTitle: 'Ariza qoldirish',
      formSubtitle: 'Formani toʻldiring va biz tez orada siz bilan bogʻlanamiz.',
    },
    about: {
      pageTitle: 'Kompaniya haqida',
      pageSubtitle:
        'Oʻzbekistonda farmatsevtika, oziq-ovqat, kosmetika sanoati va mikroelektronika uchun toza xonalarni kompleks jihozlash.',
      whoTitle: 'Toza xonalar sohasidagi professionallar',
    },
    gmpConsulting: {
      heroBadge: 'GMP-sertifikatsiyasiga — 7 oy',
      heroTitle: 'Oʻzbekistonda GMP-ga tayyorgarlik',
      heroSubtitleLine2:
        'oʻqitish, audit, GMP-tekshiruvni hamrohlik qilish',
      heroParagraph:
        'Majburiy GMP-sertifikatsiyasiga 7 oy qoldi. GMP-tekshiruvdan birinchi marotaba muvaffaqiyatli oʻtishga yordam beramiz. Oʻzbekistonda korxonalarni sertifikatlashtirgan amaliyotchi GMP-konsultantlar bilan hamkorlikda ishlaymiz.',
      ctaPrimary: 'Tayyorgarlik rejasini olish',
      formTitle: 'GMP-tekshiruvga tayyorgarlik rejasini oling',
      formSubtitle:
        'Formani toʻldiring — 24 soat ichida bogʻlanamiz va 30-daqiqalik diagnostik qoʻngʻiroqni kelishib olamiz. Bepul.',
      successTitle: 'Rahmat! Arizangiz qabul qilindi',
      successBody: '24 soat ichida siz bilan telefon orqali bogʻlanamiz',
      successOrEmail: 'yoki email orqali',
      successFooter: 'Shu vaqtda — GMP boʻyicha qoʻllanmalarimiz:',
      labelName: 'Ism',
      labelPhone: 'Telefon',
      labelEmail: 'Email',
      labelCompany: 'Kompaniya',
      labelPosition: 'Lavozim',
      labelProductionType: 'Ishlab chiqarish turi',
      labelTargetDate: 'Sertifikatsiyaning maqsadli sanasi',
      labelHelp: 'Qanday yordam kerak',
      labelComment: 'Izoh',
      labelAgree: 'Men quyidagi shartlarga roziman:',
      privacyLink: 'shaxsiy maʼlumotlarni qayta ishlash siyosati',
      placeholderName: 'Ismingiz',
      placeholderPhone: '+998 __ ___-__-__',
      placeholderEmail: 'email@company.com',
      placeholderCompany: 'Korxona nomi',
      placeholderPosition: 'QA-direktor, regulator mutaxassis...',
      placeholderSelect: 'Tanlang…',
      placeholderComment:
        'Vaziyatni tasvirlab bering: nima bajarilgan, qanday qiyinchiliklar bor…',
      submitButton: 'Tayyorgarlik rejasini olish',
      callDirect: 'Yoki qoʻngʻiroq qiling',
      errorName: 'Ismingizni kiriting.',
      errorPhone: 'Telefon raqamingizni kiriting.',
      errorEmail: 'Toʻgʻri email manzilini kiriting.',
      errorCompany: 'Kompaniya nomini kiriting.',
      errorProduction: 'Ishlab chiqarish turini tanlang.',
      errorDate: 'GMP-sertifikatsiyaning maqsadli sanasini tanlang.',
      errorHelp: '«Qanday yordam kerak» punktidan kamida bittasini tanlang.',
      errorAgree: 'Shaxsiy maʼlumotlarni qayta ishlashga rozilik bering.',
      errorGeneric:
        'Yuborishda xatolik yuz berdi. Keyinroq urinib koʻring yoki bevosita qoʻngʻiroq qiling.',
      errorPhoneHint: 'Agar forma yuborilmasa — bevosita qoʻngʻiroq qiling:',
    },
    blog: {
      readingMin: 'daqiqa oʻqish',
      tocTitle: 'Mundarija',
      backToBlog: 'Barcha maqolalar',
      inlineCtaTitle: 'Toza xonangizni jihozlashda yordam kerakmi?',
      inlineCtaBody:
        'Clean Room Systems mutaxassislari sizning ishlab chiqarish talablariga muvofiq sarflanadigan materiallar va kiyimlarni tanlab beradi.',
      inlineCtaButton: 'Maslahat olish',
    },
  },
} satisfies Record<Locale, unknown>;

/**
 * Утилита: получить словарь для конкретной локали (типизированный).
 */
export function getDictionary(locale: Locale): Dictionary {
  return t[locale] as Dictionary;
}
