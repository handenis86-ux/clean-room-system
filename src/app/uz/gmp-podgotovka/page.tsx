import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Users,
  FileText,
  Search,
  Briefcase,
  Layers,
  Truck,
  Building2,
  CalendarClock,
  Phone,
  MessageCircle,
  Send,
  ArrowRight,
  Clock,
  CheckCircle2,
  Award,
  HelpCircle,
} from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';
import { buildAlternates } from '@/lib/i18n';
import { t } from '@/data/i18n/dictionary';
import GmpConsultingFormUz from './GmpConsultingForm';

const dict = t.uz;

const UZ_TITLE =
  'Oʻzbekistonda GMP ga tayyorgarlik 2027: oʻqitish, audit, GMP-tekshiruvda hamrohlik';
const UZ_DESCRIPTION =
  'Oʻzbekistonda GMP-tekshiruvdan birinchi marotaba muvaffaqiyatli oʻtishga yordam beramiz. QA xodimlarni oʻqitish, SOP tayyorlash, mock inspection, supplier qualification. Amaliyotchi GMP-konsultantlar bilan hamkorlik. Bepul tayyorlik diagnostikasi.';

export const metadata: Metadata = {
  title: UZ_TITLE,
  description: UZ_DESCRIPTION,
  keywords: [
    'GMP oʻqitish Oʻzbekiston',
    'GMP konsultant Oʻzbekiston',
    'GMP 2027 tayyorgarlik',
    'GMP sertifikatsiyasi',
    'GMP-konsalting Toshkent',
    'pre-audit GMP',
    'SOP tayyorlash farm-zavod',
    'supplier qualification',
    'CCS Annex 1 Oʻzbekiston',
  ],
  openGraph: {
    title: UZ_TITLE,
    description: UZ_DESCRIPTION,
    locale: 'uz_UZ',
    images: ['/og-image.png'],
  },
  alternates: buildAlternates('uz', '/gmp-podgotovka'),
  robots: { index: true, follow: true },
};

const services = [
  {
    icon: Users,
    title: 'QA xodimlarni oʻqitish',
    description:
      'GMP A/B/C/D zonalari uchun kompetensiyalar, gowning-protseduralari, toza zonalardagi xulq-atvor, hujjatlashtirish. Maydonchada yuzma-yuz mashgʻulotlar + attestatsiya bilan onlayn modullar.',
  },
  {
    icon: FileText,
    title: 'SOP va hujjatlarni tayyorlash',
    description:
      'Site Master File, Validation Master Plan, batch records, deviations log, CAPA. Shablonlarni oʻzbek tili va GMP-tekshiruv formatiga moslashtirish.',
  },
  {
    icon: Search,
    title: 'Pre-audit (ichki tayyorlik auditi)',
    description:
      'Maydonchada EU GMP Annex 1 (2022) ga muvofiq gap-tahlil. Criticality boʻyicha ustuvorlik va realistik yopish muddatlari bilan closures rejasi.',
  },
  {
    icon: ShieldCheck,
    title: 'Mock inspection',
    description:
      'Real GMP-tekshiruvdan 2-3 oy oldin uning imitatsiyasi. Maydonchada 3-5 kun, plant-walk, xodimlar soʻrovi, inspection-paket tekshiruvi.',
  },
  {
    icon: Briefcase,
    title: 'GMP-tekshiruvda hamrohlik',
    description:
      'Tekshiruv vaqtida maydonchada hozir boʻlish, reply-letter bilan yordam, 30 kun ichida observations yopilishi. Oʻzbekistondagi real GMP-tekshiruvlardan oʻtish tajribasi.',
  },
  {
    icon: Layers,
    title: 'CCS (Contamination Control Strategy)',
    description:
      'Annex 1 §2.5 boʻyicha CCS-hujjatni noldan ishlab chiqish yoki qayta koʻrib chiqish. Barcha kontaminatsiya manbalarini qoplash, nazorat choralari va monitoring asoslash.',
  },
  {
    icon: Truck,
    title: 'Sarflanadigan materiallar supplier qualification',
    description:
      'Barcha kritik pozitsiyalar boʻyicha TDS, CoA, EN/ISO sertifikatlar. Distribyutor sifatidagi tajribamiz — single-window qualification jarayonini tezlashtiradi.',
  },
];

const whyUs = [
  {
    title: '13 ta amaldagi GMP-zavodni taʼminlaymiz',
    description:
      'Markaz inspektorlari maydonchalarda nimani soʻrayotganini koʻrib turamiz. Tekshiruvga qadar tayyor boʻlishi kritik boʻlgan supplier compliance-hujjatlarini bilamiz.',
  },
  {
    title: 'Amaliyotchi GMP-konsultantlar bilan hamkorlik',
    description:
      'Nazariyotchilar emas — sheriklarimiz allaqachon Oʻzbekistonda korxonalarni sertifikatlashtirgan va Pharma Park rezidentlari bilan ishlamoqdalar. Real GMP-tekshiruvlar tajribasi.',
  },
  {
    title: 'Sarflanadigan materiallar + maslahat bir oynada',
    description:
      'Single supplier qualification sizning tayyorgarlikni tezlashtiradi. Yetkazib beruvchi va konsultantni alohida tender qilish shart emas — ikki yoʻnalishni bogʻlab yopamiz.',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Bepul 30-daqiqalik qoʻngʻiroq',
    description:
      'Boshlangʻich nuqtani aniqlaymiz: infratuzilma holati, SOP tayyorligi, QA-jamoa mavjudligi, maqsadli sertifikatsiya sanasi. Keyingi ish formatini kelishib olamiz.',
    duration: '30 daqiqa',
  },
  {
    num: '02',
    title: 'Maydonchada gap-audit',
    description:
      'Sizning maydonchaga 2-3 kunlik tashrif. EU GMP / Annex 1 dan farqlarni aniqlash, severity boʻyicha findings (critical / major / minor) misol va §-boʻlimlarga havolalar bilan.',
    duration: '2-3 kun',
  },
  {
    num: '03',
    title: '12-24 oylik tayyorgarlik rejasi',
    description:
      'Har bir blok boʻyicha budjet baholash, nazorat nuqtalari, javobgarlar bilan road-map tayyorlash. Egasi oldida budjetni himoya qila oladigan hujjat.',
    duration: '1-2 hafta',
  },
  {
    num: '04',
    title: 'Sertifikatgacha hamrohlik',
    description:
      'Muntazam tashriflar, ariza topshirishdan 2-3 oy oldin mock inspection, GMP-tekshiruvda hozir boʻlish, reply-letter bilan yordam. Sertifikat olinmaguncha shartnoma.',
    duration: '12-24 oy',
  },
];

const faqs = [
  {
    question: 'GMP-2027 ga 6 oyda tayyorlanish mumkinmi?',
    answer:
      'Realistik — faqat infratuzilma (HVAC, bosim oʻzgarishlari, ISO 14644 boʻyicha zonalar tasniflanishi) Annex 1 ga umumiy holda muvofiq boʻlsa va QA-jamoa SOP boʻyicha kamida 12 oy ishlasa. Boshlangʻich holat «EMsiz eski sovet ishlab chiqarish» boʻlsa — 6 oyda mumkin emas, realistik maqsad — 18-24 oy, Agentlik bilan bosqichli sertifikatsiyani oldindan kelishish bilan.',
  },
  {
    question: 'GMP-sertifikatsiyaga tayyorgarlik qancha turadi?',
    answer:
      '18 oylik hamrohligimiz qiymati — korxona oʻlchami va boshlangʻich holatga qarab $30-100k oraligʻida. Bu metodologiyani yopadi: gap-audit, SOP, oʻqitish, mock inspection, GMP-tekshiruvda hamrohlik. Infratuzilma (HVAC, ramont), QC-laboratoriya va sarflanadigan materiallar xaridlari alohida. Toʻliq budjet tahlili — bepul 30-daqiqalik qoʻngʻiroqda.',
  },
  {
    question: 'Oʻqitish va auditni kim oʻtkazadi — xodimlaringizmi?',
    answer:
      'CRS / TOPAZ COMPANY Oʻzbekistonda korxonalarni sertifikatlash tajribasiga ega amaliyotchi GMP-konsultantlar bilan hamkorlikda ishlaydi (jumladan Pharma Park rezidentlari). Auditni va oʻqitishni bevosita konsultantlar oʻtkazadilar — biz jarayonni boshqaramiz, sarflanadigan materiallar boʻyicha supplier qualification taʼminlaymiz va maydoncha bilan aloqani qoʻllab-quvvatlaymiz. Aniq jamoa tarkibini birinchi qoʻngʻiroqda taqdim etamiz.',
  },
  {
    question: 'Supplier qualification nimani oʻz ichiga oladi?',
    answer:
      'Har bir kritik pozitsiya boʻyicha toʻliq hujjatlar paketi: TDS (technical data sheet), partiyalar uchun CoA (certificate of analysis), EN/ISO muvofiqlik sertifikatlari (masalan, kiyim uchun EN 14126, medizdiriya uchun ISO 13485, cleanroom sarflanadigan materiallar uchun ISO 14644), CE / EAC deklaratsiyalari. Qoʻshimcha — yetkazib beruvchining QA-anketalari, audit-hisobotlar, nazorat namunalari. IBC Nanotex, Contec, BIMOS, Terragene va boshqalar distribyutori sifatida biz qutidan tashqari toʻliq compliance-paketni taqdim etamiz — bu har bir SKU boʻyicha qualificationni 2-4 hafta tezlashtiradi.',
  },
  {
    question: 'GMP-tekshiruvsiz GMP sertifikatini olish mumkinmi?',
    answer:
      'Yoʻq. Oʻzbekistondagi mahalliy ishlab chiqaruvchi uchun «Zarur amaliyotlar markazi» maydonchada GMP-tekshiruvi majburiy — bu Oʻzbekiston GMP sertifikatini olishning yagona yoʻli. Xorijiy GMP-sertifikatlar (EU, FDA, MHRA) preparatni roʻyxatga olishda importyorlar uchun eʼtirof etiladi, lekin mahalliy zavodni tekshiruvdan ozod qilmaydi. Oʻzbekiston PIC/S ga toʻliq aʼzo boʻlishga harakat qilmoqda (2027-2029 ufqi), bu kelajakda mutual recognition ni kengaytiradi, lekin u paytgacha — faqat Markaz tekshiruvi.',
  },
];

export default function UzGmpPodgotovkaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark py-14 lg:py-20 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <nav className="flex items-center gap-1.5 text-[13px] text-brand-muted mb-5" aria-label="Breadcrumb">
            <Link href="/uz" className="hover:text-white transition-colors">
              {dict.common.breadcrumbsHome}
            </Link>
            <span>/</span>
            <span className="text-white">GMP-ga tayyorgarlik</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand text-white rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
            <Clock size={14} />
            {dict.gmpConsulting.heroBadge}
          </div>

          <h1 className="text-[28px] md:text-[42px] lg:text-[48px] font-extrabold text-white leading-[1.1] max-w-[900px]">
            {dict.gmpConsulting.heroTitle}:
            <br />
            <span className="text-brand-muted">
              {dict.gmpConsulting.heroSubtitleLine2}
            </span>
          </h1>

          <p className="text-[16px] md:text-[18px] text-brand-muted mt-5 leading-relaxed max-w-[800px]">
            {dict.gmpConsulting.heroParagraph}
          </p>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[900px]">
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <Building2 size={22} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">13 GMP-zavod</p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  amaldagi sertifikatlangan korxonalarni taʼminlaymiz
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <CalendarClock size={22} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">18-24 oy</p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  noldan boshlanganda realistik taymlayn
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <Award size={22} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">Pharma Park</p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  amaliyotchi GMP-konsultantlar hamkorligi
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <CheckCircle2 size={22} className="text-white shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-bold text-white leading-tight">Bepul</p>
                <p className="text-[12px] text-brand-muted mt-1 leading-snug">
                  30-daqiqalik tayyorlik diagnostikasi
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              {dict.gmpConsulting.ctaPrimary}
              <ArrowRight size={16} />
            </a>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-surface py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <GmpConsultingFormUz />
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[800px] mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-3">
              Xizmatlar
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight">
              Nimaga yordam beramiz
            </h2>
            <p className="text-[15px] md:text-[16px] text-text mt-4 leading-relaxed">
              GMP-tekshiruvga tayyorgarlikning 7 yoʻnalishi — QA-jamoani
              oʻqitishdan tortib, tekshiruv vaqtida maydonchada hamrohlik qilishgacha.
              Butun zanjirni single window yopamiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="bg-surface rounded-xl border border-surface-input p-6 hover:border-brand/40 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-light text-brand mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-[18px] font-bold text-text-dark mb-2 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-text leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-hover transition-colors"
            >
              Arizani toʻldirish
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-surface py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[800px] mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-3">
              Nima uchun biz
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight">
              Nima uchun CRS / TOPAZ COMPANY
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyUs.map((w, i) => (
              <div key={w.title} className="bg-white rounded-xl border border-surface-input p-6">
                <div className="text-[42px] font-extrabold text-brand-light leading-none mb-3">
                  0{i + 1}
                </div>
                <h3 className="text-[18px] font-bold text-text-dark mb-2 leading-tight">
                  {w.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="max-w-[800px] mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-3">
              Jarayon
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight">
              Qanday ishlaymiz
            </h2>
            <p className="text-[15px] md:text-[16px] text-text mt-4 leading-relaxed">
              Birinchi qoʻngʻiroqdan sertifikat olishgacha 4 bosqich. Har bir bosqich
              belgilangan artefakt bilan tugaydi — reja, hisobot, mock inspection
              hisoboti, yakuniy reply-letter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="bg-surface rounded-xl border border-surface-input p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[44px] font-extrabold text-brand leading-none">
                      {step.num}
                    </span>
                    <span className="text-[11px] text-text-muted font-semibold uppercase tracking-wider">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-bold text-text-dark mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-text leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="hidden lg:block absolute top-[42px] -right-[14px] text-brand z-10"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold uppercase tracking-wider mb-3">
              <HelpCircle size={12} />
              FAQ
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight">
              Tez-tez beriladigan savollar
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group bg-white rounded-xl border border-surface-input p-5 lg:p-6 [&_summary]:list-none"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer">
                  <h3 className="text-[16px] lg:text-[17px] font-bold text-text-dark leading-snug">
                    {f.question}
                  </h3>
                  <ArrowRight
                    size={18}
                    className="text-brand shrink-0 mt-1 rotate-90 group-open:-rotate-90 transition-transform"
                  />
                </summary>
                <div className="mt-3 pt-3 border-t border-surface-input text-[14px] text-text leading-relaxed">
                  {f.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-dark py-14 lg:py-20 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-[26px] md:text-[36px] font-extrabold text-white mb-4 leading-tight">
            GMP-2027 ga tayyorgarlikni boshlashga tayyormisiz?
          </h2>
          <p className="text-[16px] text-brand-muted mb-8 leading-relaxed max-w-[700px] mx-auto">
            Bepul 30-daqiqalik diagnostika qoʻngʻiroq — boshlangʻich nuqtani
            aniqlaymiz, maqsadli muddat realligi haqida halol baholash beramiz,
            keyingi ish formatini kelishib olamiz.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
            <a
              href="#lead-form"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              Arizani toʻldirish
              <ArrowRight size={16} />
            </a>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap text-[14px] text-brand-muted">
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <span className="text-white/20">•</span>
            <a
              href={siteConfig.social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Send size={16} />
              Telegram
            </a>
            <span className="text-white/20">•</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <FileText size={16} />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
