import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/i18n';
import UzCategoryView from '../UzCategoryView';

const UZ_TITLE = 'Toza xonalar uchun bir martalik kiyim';
const UZ_DESCRIPTION =
  'Toza xonalar va GMP-ishlab chiqarishlar uchun bir martalik kombinezonlar, xalatlar, qalpoqlar, bahillar, niqoblar va yengkiyimlar. Isofield, NPro, Lakeland brendlari. EN 14126 (yuqumli agentlardan himoya), EN 13795 (tibbiy sharoit kiyimi), A/B zonalari uchun sterillik sertifikatlari.';

export const metadata: Metadata = {
  title: `${UZ_TITLE} — Oʻzbekiston | GMP / ISO 14644`,
  description: `${UZ_DESCRIPTION} Toshkentdan yetkazib berish, KP 24 soat ichida.`.slice(0, 200),
  openGraph: {
    title: UZ_TITLE,
    description: UZ_DESCRIPTION,
    locale: 'uz_UZ',
    images: ['/og-image.png'],
  },
  alternates: buildAlternates('uz', '/catalog/garments'),
};

const FAQ = [
  {
    q: 'Bir martalik va qayta ishlatiladigan cleanroom-kiyimlar oʻrtasidagi farq nima?',
    a: 'Bir martalik kiyim — gamma-sterilizatsiya qilingan, individual qadoqda, bir smenadan keyin tashlab yuboriladi. EU GMP A va B zonalari uchun ustun yechim, chunki har bir tsikldan keyin sterillik kafolatlanadi. Qayta ishlatiladigan kiyim — sanoat avtoklavida sterilizatsiya bilan 30-50 marotaba yuvilishi mumkin, C va D zonalari uchun iqtisodiy yondashuv, lekin validatsiyalangan kiyish protokoli va seriya kuzatuvi talab qilinadi.',
  },
  {
    q: 'GMP A va B zonalari uchun qaysi material standartlari talab qilinadi?',
    a: 'A va B zonalari uchun: zarrachalar uchun toʻsiq sifati ≥ 0.5 mkm, EN 14126 (yuqumli agentlardan himoya), EN 13795 toʻliq parametr boʻyicha (mikrobiologik tozalik, zarrachalar emissiyasi), partiyaga steril sertifikat, ikki tomonlama steril qadoq. Material — odatda yengil nafas oluvchi laminat (polipropilen+polietilen) yoki MEDISPEC tipidagi mikrofibralar.',
  },
  {
    q: 'Operator uchun yiliga qancha kombinezon kerak boʻladi?',
    a: 'Oʻrtacha hisoblar: bir martalik steril kombinezon — har bir smenada bittadan + boquvchi va ehtiyot, ya\'ni operator uchun yiliga 250-350 dona. Kichik tafsilotlar (qalpoqlar, niqoblar, bahillar) — har smenada toʻliq toʻplam. Aniq hisob-kitobni menejer KP bilan birga taqdim etadi.',
  },
  {
    q: 'Supplier qualification uchun qanday hujjatlar kerak?',
    a: 'Har bir SKU uchun: Technical Data Sheet (TDS), partiyaga Certificate of Analysis (CoA), EN 14126 va EN 13795 testlash hisobotlari, sterillik sertifikati (steril SKU uchun), material safety data sheet (MSDS), CE / EAC deklaratsiyalari. CRS bu paketni yetkazib berish bilan birga taqdim etadi — supplier qualificationni 2-4 hafta tezlashtiradi.',
  },
];

export default function UzGarmentsPage() {
  return (
    <UzCategoryView
      slug="garments"
      uzTitle={UZ_TITLE}
      uzDescription={UZ_DESCRIPTION}
      uzFaq={FAQ}
    />
  );
}
