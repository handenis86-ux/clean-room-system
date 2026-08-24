import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/i18n';
import UzCategoryView from '../UzCategoryView';

const UZ_TITLE = 'Toza xonalar uchun dezinfeksiyalovchi va yuvuvchi vositalar';
const UZ_DESCRIPTION =
  'Contec, Diversey, Neokhim — toza xonalar dezinfeksiyasi va CIP-yuvish uchun professional vositalar. Steril IPA 70%, vodorod peroksid asosidagi sporitsidlar, EN 1276 / EN 13697 / EN 13624 boʻyicha validatsiya hisobotlari. EU GMP Annex 1 (2022) talablariga muvofiq.';

export const metadata: Metadata = {
  title: `${UZ_TITLE} — Oʻzbekiston | GMP / ISO 14644`,
  description: `${UZ_DESCRIPTION} Toshkentdan yetkazib berish, KP 24 soat ichida.`.slice(0, 200),
  openGraph: {
    title: UZ_TITLE,
    description: UZ_DESCRIPTION,
    locale: 'uz_UZ',
    images: ['/og-image.png'],
  },
  alternates: buildAlternates('uz', '/catalog/disinfectants-and-detergents'),
};

const FAQ = [
  {
    q: 'EU GMP Annex 1 boʻyicha dezinfektantlar rotatsiyasi nima uchun majburiy?',
    a: 'Annex 1 §4.33–4.36 dezinfeksiya dasturida turli taʼsir mexanizmlariga ega vositalarning rotatsiyasini talab qiladi (masalan, IPA + chlorli sporitsid + perekiy peroksid). Bu mikroorganizmlarning rezistentligi shakllanishini oldini oladi va EM-baseline ustida nazoratni mustahkamlaydi. CCSda har bir zona uchun rotatsiya jadvali va asoslash boʻlishi kerak.',
  },
  {
    q: 'Stеril va nosteril dezinfektant oʻrtasidagi farq nima?',
    a: 'Stеril dezinfektant — 0.22 mkm filtr orqali oʻtgan, partiyaga sterillik testi sertifikati bilan, individual qadoqda. A/B zonalari uchun majburiy. Nosteril dezinfektant — partiyaga maksimal bioburden taʼminlash bilan, C/D zonalari uchun yetarli. EU GMP Annex 1 §4.35 toʻgʻridan-toʻgʻri stеril zonalar uchun stеril dezinfektantlar talab qiladi.',
  },
  {
    q: 'Bir chorakda dezinfektant sarfini qanday hisoblash mumkin?',
    a: 'Asosiy formulalar: zona maydoni × ishlovga chastotasi × 1 m² uchun eritma sarfi (~30-50 ml). Misol: 200 m² C zona, kunda 2 marta ishlov × 90 kun × 40 ml/m² = ~1440 litr eritma chorakda. Aniq hisob-kitob uchun bizning dezinfektant kalkulyatoridan foydalaning yoki sizning CCS asosida menejerga murojaat qiling.',
  },
  {
    q: 'Validation paketi nimani oʻz ichiga oladi?',
    a: 'Toʻliq paket: TDS, MSDS (oʻzbek/rus tilida), CoA partiyaga, efficacy testlash hisobotlari EN 1276 (umumiy bakteritsid), EN 13697 (yuza dezinfeksiyasi), EN 13624 (fungitsid), EN 14476 (virutsid), EN 13704 (sporitsid). Steril SKU uchun — sterillik sertifikati. Bioseptiklar uchun — roʻyxatga olish guvohnomasi.',
  },
];

export default function UzDisinfectantsPage() {
  return (
    <UzCategoryView
      slug="disinfectants-and-detergents"
      uzTitle={UZ_TITLE}
      uzDescription={UZ_DESCRIPTION}
      uzFaq={FAQ}
    />
  );
}
