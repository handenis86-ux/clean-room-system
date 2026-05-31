import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buildAlternates } from '@/lib/i18n';
import { t } from '@/data/i18n/dictionary';

const dict = t.uz;

export const metadata: Metadata = {
  title: dict.about.pageTitle,
  description:
    'Clean Room Systems — Oʻzbekistonda toza xonalar uchun kiyim va sarflanadigan materiallar yetkazib beruvchisi. Farm, oziq-ovqat, kosmetika va mikroelektronika uchun GMP / ISO 14644 yechimlari.',
  openGraph: {
    title: dict.about.pageTitle,
    description:
      'Clean Room Systems — Oʻzbekistonda toza xonalar uchun kiyim va sarflanadigan materiallar yetkazib beruvchisi.',
    locale: 'uz_UZ',
    images: ['/og-image.png'],
  },
  alternates: buildAlternates('uz', '/company/about'),
};

const stats = [
  { value: '15+', label: 'yillik tajriba' },
  { value: '500+', label: 'mamnun mijozlar' },
  { value: '13', label: 'amaldagi GMP-zavod' },
  { value: 'ISO', label: '9001:2015' },
];

const certifications = [
  'ISO 9001:2015 — sifat menejmenti tizimi',
  'ISO 14644 — toza xonalar va bogʻliq nazorat ostidagi muhitlar',
  'GMP — Good Manufacturing Practice',
  'CE — EI standartlariga muvofiqlikni tasdiqlash',
  'EAC — YeOII standartlariga muvofiqlikni tasdiqlash',
];

const partners = [
  'IBC Nanotex',
  'Contec',
  'BIMOS',
  'Terragene',
  'Hydroflex',
  'NPro',
  'Isofield',
  'Alsico',
];

export default function UzAboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-dark h-[400px] flex items-center">
        <div className="w-full px-4 lg:px-[80px]">
          <nav className="flex items-center gap-1.5 text-[13px] text-[#88C5D9] mb-4">
            <Link href="/uz" className="hover:text-white transition-colors">
              {dict.common.breadcrumbsHome}
            </Link>
            <span>/</span>
            <Link href="/uz/company/about" className="hover:text-white transition-colors">
              {dict.about.pageTitle}
            </Link>
          </nav>
          <h1 className="text-[32px] md:text-[56px] font-extrabold text-white leading-tight">
            {dict.about.pageTitle}
          </h1>
          <p className="text-[18px] text-brand-muted max-w-[700px] mt-4 leading-relaxed">
            {dict.about.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-4 lg:px-[80px]">
        <div className="flex flex-col lg:flex-row gap-[60px] items-start max-w-[1200px] mx-auto">
          {/* Left */}
          <div className="flex-1">
            <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
              + BIZ KIMMIZ
            </p>
            <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight mb-6">
              {dict.about.whoTitle}
            </h2>
            <p className="text-[15px] text-text leading-relaxed mb-4">
              <strong className="text-text-dark">{siteConfig.name}</strong>{' '}
              (yuridik shaxs: ООО «TOPAZ COMPANY») — Toshkentdagi ixtisoslashgan
              kompaniya, korxonalarni toza ishlab chiqarish muhitlarini yaratish va
              foydalanish uchun zarur boʻlgan barcha narsalar bilan taʼminlaydi. Biz
              yetakchi jahon ishlab chiqaruvchilaridan kiyim, qoʻlqoplar,
              dezinfektantlar, salfetkalar, tozalash inventarya va boshqa sarflanadigan
              materiallarni yetkazib beramiz.
            </p>
            <p className="text-[15px] text-text leading-relaxed mb-4">
              Bizning missiyamiz — Oʻzbekiston korxonalariga xalqaro tozalik va
              xavfsizlik standartlariga muvofiq boʻlishida yordam berish. Biz toza
              xonalar uchun mahsulot sifati bizning mijozlarimizning yakuniy mahsulot
              sifatiga toʻgʻridan-toʻgʻri taʼsir qilishini tushunamiz.
            </p>
            <p className="text-[15px] text-text leading-relaxed">
              Kichik laboratoriyalardan tortib yirik farmatsevtika ishlab chiqarish
              korxonalarigacha — biz har bir loyiha uchun tozalik sinfi, soha
              standartlari va budjetni hisobga olib optimal yechimlarni tanlaymiz.
            </p>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-4 lg:w-[400px]">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-surface rounded-xl p-5 border border-surface-border"
              >
                <div className="text-[28px] font-extrabold text-brand leading-none mb-2">
                  {s.value}
                </div>
                <div className="text-[13px] text-text">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
            + NIMA QILAMIZ
          </p>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight mb-6">
            CRS / TOPAZ COMPANY — IBC Nanotex rasmiy distribyutori
          </h2>
          <p className="text-[15px] text-text leading-relaxed mb-4 max-w-[900px]">
            Oʻzbekistondagi 13 ta amaldagi GMP-sertifikatlangan farm-zavodni
            taʼminlaymiz. Contec, Terragene, Hydroflex, BIMOS, Alsico, Isofield,
            NPro va TINMAN ishlab chiqaruvchilari bilan toʻgʻridan-toʻgʻri
            shartnomalar. Supplier qualification uchun toʻliq compliance-paket:
            TDS, CoA, EN / ISO sertifikatlari — qutidan tashqari. Tekshiruvga
            tayyorgarlik vaqtini 2-4 hafta qisqartiradi.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
            + SERTIFIKATSIYA
          </p>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight mb-6">
            Standartlar va sertifikatlar
          </h2>
          <p className="text-[15px] text-text leading-relaxed mb-8 max-w-[800px]">
            Biz va yetkazib beruvchilarimiz quyidagi xalqaro standartlar boʻyicha
            faoliyat yuritamiz. Har bir SKU uchun toʻliq compliance-paket
            (TDS, CoA, sertifikatlar) bizning supplier qualification taklifimiz
            bilan birga taqdim etiladi.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[900px]">
            {certifications.map((c) => (
              <li
                key={c}
                className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-surface-border"
              >
                <ArrowRight size={18} className="text-brand shrink-0 mt-0.5" />
                <span className="text-[14px] text-text">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-surface py-16 px-4 lg:px-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-xs font-bold text-brand uppercase tracking-[2px] mb-3">
            + HAMKORLAR
          </p>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark leading-tight mb-6">
            Yetakchi jahon brendlari
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((p) => (
              <div
                key={p}
                className="bg-white rounded-xl border border-surface-border p-6 text-center"
              >
                <p className="text-[16px] font-bold text-text-dark">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark py-16">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-4">
            Hamkorlikni boshlashga tayyormisiz?
          </h2>
          <p className="text-[16px] text-brand-light mb-8">
            Tijorat taklifini soʻrang yoki 30-daqiqalik bepul maslahatga yoziling
            — sizning zonangiz va tozalik sinfiga moslangan yechimlarni taklif
            qilamiz.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/uz/contacts"
              className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-semibold text-brand-dark bg-white rounded-lg hover:bg-brand-light transition-colors"
            >
              {dict.common.leaveRequest}
            </Link>
            <Link
              href="/uz/catalog"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white border border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Katalogga oʻtish
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
