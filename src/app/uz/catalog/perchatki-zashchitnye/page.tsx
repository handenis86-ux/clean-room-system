import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/i18n';
import UzCategoryView from '../UzCategoryView';

const UZ_TITLE = 'Toza xonalar uchun himoya qoʻlqoplari';
const UZ_DESCRIPTION =
  'Toza xonalar va farm-ishlab chiqarishlar uchun steril va nosteril qoʻlqoplar. Brendlar: Isofield, NPro, Shield Scientific. EN 374, EN 455 sertifikatlari, AQL ≤1.5, supplier qualification uchun toʻliq compliance-paket.';

export const metadata: Metadata = {
  title: `${UZ_TITLE} — Oʻzbekiston | GMP / ISO 14644`,
  description: `${UZ_DESCRIPTION} Toshkentdan yetkazib berish, KP 24 soat ichida.`.slice(0, 200),
  openGraph: {
    title: UZ_TITLE,
    description: UZ_DESCRIPTION,
    locale: 'uz_UZ',
    images: ['/og-image.png'],
  },
  alternates: buildAlternates('uz', '/catalog/perchatki-zashchitnye'),
};

const FAQ = [
  {
    q: 'Qaysi GMP zonalar uchun steril nitril qoʻlqoplar mos keladi?',
    a: 'EU GMP A va B zonalari uchun steril nitril qoʻlqoplar talab qilinadi (gamma-sterilizatsiya, alohida ikki tomonlama qadoq, partiyaga CoA). C zona uchun steril versiyasi tavsiya etiladi, D zonasida nosteril qoʻlqoplar standart hisoblanadi.',
  },
  {
    q: 'AQL koʻrsatkichi nima va u nima uchun muhim?',
    a: 'Acceptable Quality Level — qoʻlqopdagi mikroteshiklar darajasi koʻrsatkichi. EN 374-2 boʻyicha cleanroom uchun AQL ≤1.5 talab qilinadi. AQL 0.65 — eng yuqori himoya darajasi, asosan asseptik zonalar uchun. AQL 4.0 — past sifatli, GMP zonalari uchun yaroqsiz.',
  },
  {
    q: 'Bir yilda qoʻlqoplar sarfini qanday hisoblash mumkin?',
    a: 'Bir operator uchun yiliga oʻrtacha 2400-3600 juftlik qoʻlqop (12 juftlik bir smenada, 200-250 ish kunidan). Aniq hisob-kitob uchun bizning qoʻlqop kalkulyatoridan foydalaning yoki menejerga murojaat qiling — sizning operatorlar soni, smenalar soni va GMP zona sinfini hisobga olib KP tayyorlab beramiz.',
  },
  {
    q: 'Qoʻlqoplar uchun qaysi sertifikatlar mavjud?',
    a: 'Har bir SKU uchun TDS, MSDS, EN 374-1 / EN 374-2 / EN 374-5 (kimyoviy va mikrobiologik himoya), EN 455 (medizdiriya talablari), CoA partiyaga, sterillik sertifikati (steril versiyalar uchun) va supplier qualification anketasi. Toʻliq paket — qutidan tashqari.',
  },
];

export default function UzPerchatkiPage() {
  return (
    <UzCategoryView
      slug="perchatki-zashchitnye"
      uzTitle={UZ_TITLE}
      uzDescription={UZ_DESCRIPTION}
      uzFaq={FAQ}
    />
  );
}
