import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  Phone,
  CalendarClock,
  Building2,
  ClipboardCheck,
  Users,
} from 'lucide-react';
import { siteConfig, phoneTel } from '@/config/site';
import { buildAlternates } from '@/lib/i18n';
import { t } from '@/data/i18n/dictionary';

const dict = t.uz;

const UZ_TITLE = 'Oʻzbekistonda GMP sertifikati: 2027 yil 1 yanvariga qanday olish';
const UZ_DESCRIPTION =
  'Oʻzbekistonda 2027 yil 1 yanvarigacha GMP sertifikatini olish: kim beradi, qanday hujjatlar kerak, GMP-tekshiruv muddatlari va narxi, farm-zavod va Pharma Park rezidentlari uchun tayyorgarlik roʻyxati.';

export const metadata: Metadata = {
  title: UZ_TITLE,
  description: UZ_DESCRIPTION,
  keywords: [
    'GMP sertifikatlash Oʻzbekiston',
    'GMP Oʻzbekiston 2027',
    'GMP-tekshiruv',
    'Pharma Park Toshkent',
    'EU GMP Annex 1',
    'PIC/S Oʻzbekiston',
    'Site Master File',
  ],
  openGraph: {
    title: UZ_TITLE,
    description: UZ_DESCRIPTION,
    locale: 'uz_UZ',
    images: ['/og-image.png'],
  },
  alternates: buildAlternates('uz', '/compliance/gmp-2027-uzbekistan'),
  robots: { index: true, follow: true },
};

const sectionNav = [
  { id: 'regulatory-base', label: 'Meʼyoriy baza' },
  { id: 'who-is-affected', label: 'Kimga taalluqli' },
  { id: 'inspector-checks', label: 'Inspektor nimani tekshiradi' },
  { id: 'preparation', label: 'Bosqichli tayyorgarlik' },
  { id: 'resources', label: 'Yordamni qayerdan olish mumkin' },
  { id: 'today-actions', label: 'Bugun nima qilish kerak' },
  { id: 'faq', label: 'FAQ' },
];

const audience = [
  {
    title: 'Nosteril dori vositalari ishlab chiqaruvchilari',
    description:
      'Tabletkalar, kapsulalar, kukunlar, malham va siroplar. 2027 yil 1 yanvardan boshlab — har bir preparat roʻyxatdan oʻtkazish va Sogʻliqni saqlash vazirligi tenderlarida ishtirok etish uchun majburiy GMP-sertifikatsiya. C/D zonalar sinfi, soddalashtirilgan EM-rejim, lekin SOP va PQS toʻliq paketi shart.',
  },
  {
    title: 'Steril ishlab chiqarish',
    description:
      'Inʼeksiya eritmalari, liofilizatlar, oftalmologik preparatlar, biotexnologiya. Mezon — EU GMP Annex 1 (2022): A/B zonalari continuous monitoring bilan, CCS-hujjat, APS (media fill) — kamida 3 ta muvaffaqiyatli ketma-ket, gaz oqimlarini validatsiya qilish (smoke studies).',
  },
  {
    title: 'Pharma Park rezidentlari',
    description:
      'SEZ rezidentining shartnoma majburiyatlari soliqlar boʻyicha imtiyozlar va infratuzilma bilan parallel ravishda EU GMP boʻyicha sertifikatsiyani nazarda tutadi. 2027 yil 1 yanvargacha bajarmaslik — Pharma Park direksiyasi tomonidan rezidentlik maqomini qayta koʻrib chiqish uchun asos.',
  },
  {
    title: 'Xorijiy importyorlar',
    description:
      'EI / PIC/S mamlakatlaridan ishlab chiqaruvchilar Oʻzbekistonda roʻyxatdan oʻtkazish uchun oʻz milliy GMP-sertifikatlarini ishlatadilar. PIC/S tashqarisidagi mamlakatlardan — ishlab chiqaruvchi oʻz maydonchasida «Zarur amaliyotlar markazi» GMP-tekshiruvidan oʻtishi yoki mutual recognition uchun paket berishi kerak.',
  },
];

const inspectorChecks = [
  'Site Master File (SMF) — 30-60 sahifa EMA shabloni boʻyicha',
  'Validation Master Plan (VMP) — barcha validatsiya yondashuvi',
  'Contamination Control Strategy (CCS) — Annex 1 §2.5 boʻyicha markaziy hujjat',
  'Pharmaceutical Quality System (PQS) — ICH Q10 asosida',
  'Batch records va deviations log — soʻnggi 12 oy uchun',
  'EM-dasturi maʼlumotlari — baseline kamida 6-12 oy davomida toʻplangan',
  'Supplier qualification — har bir kritik SKU uchun TDS / CoA / EN-ISO sertifikatlari',
  'Personnel training records — gowning, behavioral, ICH Q7/Q9/Q10 boʻyicha',
  'Sterillik testlash, media fill — asseptika uchun 3 ta ketma-ket muvaffaqiyatli APS',
  'CAPA log va deviations management — ICH Q9 risk-based yondashuv bilan',
];

const preparationSteps = [
  {
    num: 'T-24',
    title: 'Gap-audit, road-map',
    desc: 'Mustaqil GMP-konsultant tomonidan gap-tahlil. Road-map bilan kapital ramont, HVAC, SOP-lar, EM-dastur, sotsial mehnat soni va muddatlari boʻyicha.',
  },
  {
    num: 'T-18',
    title: 'SMF, VMP, CCS birinchi versiyasi',
    desc: 'Site Master File, Validation Master Plan va CCS birinchi versiyalari. HVAC modernizatsiyasi va kapital ramont boshlanishi. Quality Person (QP) tayinlash.',
  },
  {
    num: 'T-12',
    title: '80+ SOP, EM-baseline',
    desc: 'Kritik jarayonlar boʻyicha SOP toʻliq paketi. EM-dastur ishga tushirish — particle count, microbiological monitoring. Hujjatlarni davlat tiliga tarjima qilish.',
  },
  {
    num: 'T-6',
    title: 'Validatsiya, supplier qualification',
    desc: 'DQ/IQ/OQ/PQ barcha kritik uskuna boʻyicha. Process Performance Qualification — 3 muvaffaqiyatli run preparat boʻyicha. Cleaning va disinfection validation. Asseptika uchun 3 ta media fill.',
  },
  {
    num: 'T-3',
    title: 'Mock inspection',
    desc: 'Tashqi GMP-konsultant tomonidan mock-tekshiruv. Ichki auditda topilgan barcha major findings yopilishi. EM trend-tahlili 12 oy uchun tayyor.',
  },
  {
    num: 'T-1',
    title: 'GMP-tekshiruv',
    desc: 'Markazga ariza topshirish. Inspection-paketni yakuniy yigʻish. GMP-tekshiruv (odatda maydonchada 3-5 kun). Observations boʻlsa, 30 kun ichida reply-letter.',
  },
];

const faqs = [
  {
    q: '2027 yil 1 yanvardan keyin GMPsiz ishlash mumkinmi?',
    a: 'Yoʻq, bosqichli sertifikatsiya yoki Agentlik vaqtinchalik ruxsati holatlaridan tashqari (fallback-stsenariy). Amaldagi GMP-sertifikatisiz dori vositalari ishlab chiqarish qonunbuzilik hisoblanadi; roʻyxatga olish guvohnomalari bekor qilinadi.',
  },
  {
    q: 'GMP-sertifikatlashga tayyorgarlik aslida qancha turadi?',
    a: 'Tipik nosteril ishlab chiqarish uchun (medium, 200 kishi) — $620k-1.3M; steril uchun — 2-3 marta yuqori. Toʻliq budjet tahlili — gmp-podgotovka maqolasida.',
  },
  {
    q: 'Tekshiruvni kim oʻtkazadi?',
    a: '«Zarur amaliyotlar markazi» davlat unitar korxonasi (ГУП Центр надлежащих практик) inspektorlari — uzpharm-gxp.uz. Baʼzi hollarda xorijiy konsultantlar jalb qilinadi. PIC/Sga aʼzo boʻlgach, sxema mamlakatlari vakillari ham tekshiruvga jalb qilinishi mumkin.',
  },
  {
    q: 'Boshqa mamlakatda berilgan GMP-sertifikati amal qiladimi?',
    a: 'PIC/S davlatining sertifikati eʼtirof etilishi mumkin, lekin mahalliy sharoitda muvofiqlikni tasdiqlash uchun Markaz GMP-tekshiruvidan ozod qilmaydi. Toʻliq validatsiya — 6-12 oy.',
  },
  {
    q: 'EU GMP Annex 1 nima va u nima uchun muhim?',
    a: 'Annex 1 EU GMP — steril ishlab chiqarish uchun maxsus ilova. 2022 yil tahriri monitoring, CCS va xodimlar malakasiga talablarni kuchaytirdi. Oʻzbekiston bu tahrirni mezon sifatida qabul qildi.',
  },
  {
    q: '2026 yilda boshlash va 2027 yil 1 yanvarigacha ulgurish mumkinmi?',
    a: 'Infratuzilma Annex 1ga yaqin va belgilangan QA-rahbar mavjud boʻlsa — ha. Noldan boshlanganda — realistik maqsad 2027 yil Q2-Q3, Sogʻliqni saqlash vazirligi qoshidagi Farmatsevtika tarmogʻini rivojlantirish agentligi bilan bosqichli sertifikatsiyani oldindan kelishish bilan.',
  },
];

export default function UzGmpHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark py-14 lg:py-20 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <nav className="flex items-center gap-1.5 text-[13px] text-brand-muted mb-5">
            <Link href="/uz" className="hover:text-white transition-colors">
              {dict.common.breadcrumbsHome}
            </Link>
            <span>/</span>
            <span className="text-white">GMP-2027 Oʻzbekiston</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand text-white rounded-full text-[12px] font-bold uppercase tracking-wider mb-4">
            <CalendarClock size={14} />
            {dict.compliance.heroEyebrow}
          </div>

          <h1 className="text-[28px] md:text-[42px] lg:text-[48px] font-extrabold text-white leading-[1.1] max-w-[900px]">
            {dict.compliance.heroTitle}
          </h1>

          <p className="text-[16px] md:text-[18px] text-brand-muted mt-5 leading-relaxed max-w-[800px]">
            {dict.compliance.heroSubtitle}
          </p>

          {/* Section nav chips */}
          <nav aria-label="On-page navigation" className="mt-7 flex flex-wrap gap-2">
            {sectionNav.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[12px] text-brand-muted hover:bg-white/10 hover:text-white transition-colors"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Regulatory base */}
      <section id="regulatory-base" className="bg-white py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-5">
            Meʼyoriy baza Oʻzbekistonda
          </h2>
          <p className="text-[16px] text-text leading-relaxed mb-4">
            Oʻzbekistonda farm-sohani tartibga solish ikki tashkilot oʻrtasida
            taqsimlangan:
          </p>
          <ul className="space-y-4">
            <li className="bg-surface p-5 rounded-xl border border-surface-border">
              <p className="font-bold text-text-dark mb-1.5">
                Sogʻliqni saqlash vazirligi qoshidagi Farmatsevtika sanoatini
                rivojlantirish agentligi (Агентство по развитию фармацевтической
                отрасли)
              </p>
              <p className="text-[14px] text-text leading-relaxed">
                uzpharmagency.uz, uzpharm-control.uz — soha siyosati, roʻyxatga
                olish guvohnomalari (РУ), ishlab chiqarish litsenziyalari, dori
                vositalari importi, farm-nazorat. Strategik qarorlar GMP, PIC/Sga
                oʻtish boʻyicha. Qisqacha — «Agentlik».
              </p>
            </li>
            <li className="bg-surface p-5 rounded-xl border border-surface-border">
              <p className="font-bold text-text-dark mb-1.5">
                «Zarur amaliyotlar markazi» davlat unitar korxonasi (ГУП Центр
                надлежащих практик)
              </p>
              <p className="text-[14px] text-text leading-relaxed">
                uzpharm-gxp.uz — bevosita ishlab chiqarish maydonchalarining
                GMP-tekshiruvi va ularning natijalari boʻyicha GMP-sertifikatlar
                berish. Markaz GxP-laboratoriyalarni akkreditatsiyalaydi,
                distribyutorlar uchun GDP-tekshiruvlarini oʻtkazadi. Qisqacha —
                «Markaz».
              </p>
            </li>
          </ul>
          <p className="text-[15px] text-text leading-relaxed mt-6">
            Regulyator <strong>EU GMP</strong> va Annex 1 (2022 yil tahriri,
            2023 yil 25 avgustda kuchga kirgan) standartlariga amal qiladi. Bu
            sertifikatga daʼvogar barcha ishlab chiqaruvchilar Yevropa
            qoidalariga toʻliq, jumladan Contamination Control Strategy (CCS),
            realtime monitoring 5 mkm zarrachalari va xodimlar malakasi boʻyicha
            yangilangan talablariga muvofiq boʻlishi kerakligini bildiradi.
          </p>
        </div>
      </section>

      {/* Who is affected */}
      <section id="who-is-affected" className="bg-surface py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-5">
            Kimga taalluqli
          </h2>
          <p className="text-[15px] text-text leading-relaxed mb-8 max-w-[800px]">
            2027 yil 1 yanvar muddati Oʻzbekistondagi ishlab chiqaruvchilarning
            keng doirasiga taalluqli — quyida har bir segment boʻyicha
            xususiyatlar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {audience.map((a) => (
              <div
                key={a.title}
                className="bg-white p-6 rounded-xl border border-surface-border"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-brand-light text-brand mb-3">
                  <Users size={20} />
                </div>
                <h3 className="text-[17px] font-bold text-text-dark mb-2">
                  {a.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What inspector checks */}
      <section id="inspector-checks" className="bg-white py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-5">
            «Zarur amaliyotlar markazi» inspektori nimani tekshiradi
          </h2>
          <p className="text-[15px] text-text leading-relaxed mb-6">
            GMP-tekshiruv odatda maydonchada 3-5 kun davom etadi. Inspektor
            quyidagi roʻyxatdagi har bir blokni tekshiradi. Inspection-paketni
            oldindan kelishilgan formatda tayyorlash — birinchi tekshiruvdan
            muvaffaqiyatli oʻtish ehtimolini sezilarli darajada oshiradi.
          </p>
          <div className="space-y-3">
            {inspectorChecks.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-surface-border"
              >
                <ClipboardCheck size={20} className="text-brand shrink-0 mt-0.5" />
                <p className="text-[14px] text-text leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation timeline */}
      <section id="preparation" className="bg-surface py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-5">
            Bosqichli tayyorgarlik — 24 oy
          </h2>
          <p className="text-[15px] text-text leading-relaxed mb-8 max-w-[800px]">
            Realistik tayyorgarlik muddati — <strong>18-24 oy</strong>. Quyida
            «X-soat»dan orqaga sanab kelganda har bir bosqichda nima bajarilishi
            kerakligi.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {preparationSteps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-xl border border-surface-border p-6"
              >
                <div className="text-[28px] font-extrabold text-brand leading-none mb-3">
                  {step.num}
                </div>
                <h3 className="text-[17px] font-bold text-text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] text-text leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where to get help */}
      <section id="resources" className="bg-white py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-5">
            Yordamni qayerdan olish mumkin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link
              href="/uz/gmp-podgotovka"
              className="block p-6 bg-brand-dark text-white rounded-xl hover:bg-brand transition-colors"
            >
              <ShieldCheck size={24} className="mb-3" />
              <h3 className="text-[18px] font-bold mb-2">
                GMP-konsalting va tayyorgarlik
              </h3>
              <p className="text-[14px] text-brand-muted leading-relaxed mb-3">
                Oʻqitish, SOP tayyorlash, pre-audit, mock inspection, real
                GMP-tekshiruvda hamrohlik. Bepul 30-daqiqalik diagnostika.
              </p>
              <span className="inline-flex items-center gap-1 text-[14px] font-semibold">
                Batafsil <ArrowRight size={14} />
              </span>
            </Link>
            <Link
              href="/uz/blog/gmp-uzbekistan-2027-podgotovka"
              className="block p-6 bg-surface border border-surface-border rounded-xl hover:border-brand transition-colors"
            >
              <Building2 size={24} className="text-brand mb-3" />
              <h3 className="text-[18px] font-bold text-text-dark mb-2">
                24 oylik tayyorgarlik rejasi
              </h3>
              <p className="text-[14px] text-text leading-relaxed mb-3">
                Batafsil taymlayn, kichik/oʻrta/katta korxonalar uchun budjet,
                13 ta xorijiy GMP-zavodning kompleks misoli, fallback-stsenariy.
              </p>
              <span className="inline-flex items-center gap-1 text-[14px] font-semibold text-brand">
                Maqolani oʻqish <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* What to do today */}
      <section id="today-actions" className="bg-surface py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-5">
            Bugun nima qilish kerak
          </h2>
          <ol className="space-y-4 list-decimal pl-6">
            <li className="text-[15px] text-text leading-relaxed">
              <strong>Stsenariyni baholash:</strong> agar tayyorgarlik
              boshlanmagan boʻlsa — bepul 30-daqiqalik diagnostika orqali maqsadli
              sana realligini aniqlashning kerakligini koʻrib chiqing.
            </li>
            <li className="text-[15px] text-text leading-relaxed">
              <strong>QA-rahbarni tayinlash:</strong> minimum 12 oy oldin
              Quality Person funksiyalari va relizlarga imzo huquqi bilan.
            </li>
            <li className="text-[15px] text-text leading-relaxed">
              <strong>Gap-audit buyurtma berish:</strong> mustaqil GMP-konsultant
              tomonidan EU GMP / Annex 1 ga muvofiqlikni baholash, road-map bilan.
            </li>
            <li className="text-[15px] text-text leading-relaxed">
              <strong>Supplier qualification ish boshlash:</strong> sarflanadigan
              materiallar boʻyicha toʻliq TDS / CoA paketlarini yigʻish. CRS
              barcha kritik SKU lar uchun compliance-paket beradi.
            </li>
            <li className="text-[15px] text-text leading-relaxed">
              <strong>CCS birinchi versiyasini boshlash:</strong> Contamination
              Control Strategy — Annex 1 §2.5 boʻyicha markaziy hujjat.
            </li>
          </ol>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/uz/gmp-podgotovka"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-white bg-brand rounded-lg hover:bg-brand-dark transition-colors"
            >
              Bepul diagnostika olish <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-brand-dark border border-brand-dark rounded-lg hover:bg-brand-light transition-colors"
            >
              <Phone size={16} />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-12 lg:py-16 px-4 lg:px-[80px]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-extrabold text-text-dark mb-6">
            Tez-tez beriladigan savollar
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-surface rounded-xl border border-surface-border p-5 lg:p-6 [&_summary]:list-none"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer">
                  <h3 className="text-[16px] lg:text-[17px] font-bold text-text-dark leading-snug">
                    {f.q}
                  </h3>
                  <ArrowRight
                    size={18}
                    className="text-brand shrink-0 mt-1 rotate-90 group-open:-rotate-90 transition-transform"
                  />
                </summary>
                <div className="mt-3 pt-3 border-t border-surface-border text-[14px] text-text leading-relaxed">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
