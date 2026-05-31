import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, Phone, List } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { buildAlternates } from '@/lib/i18n';
import { t } from '@/data/i18n/dictionary';

const dict = t.uz;

const ARTICLE = {
  title: 'Oʻzbekistonda GMP 2027: farm-korxonalar nimani bajarib ulgurishi kerak',
  excerpt:
    'Oʻzbekiston farmatsevtika sohasining 2027 yil 1 yanvariga majburiy GMP-sertifikatsiyaga oʻtishi: 24 oylik taymlayn, korxona oʻlchamiga qarab budjet, oʻzbekistonga xos tekshiruv roʻyxati, 13 ta xorijiy GMP-zavodning muvaffaqiyatli misollari va kechikkanlar uchun fallback-stsenariy.',
  category: 'Tartibga solish',
  image: '/images/blog/gmp-standards.webp',
  publishedAt: '2026-05-05',
  readingTime: 22,
};

const TOC = [
  { id: 'gmp-2027', title: 'GMP nima va 2027 yil 1 yanvar nima uchun kritik sana' },
  { id: 'changes', title: 'Ishlab chiqaruvchilar uchun nima oʻzgaradi' },
  { id: 'timeline', title: '2027 yil 1 yanvarigacha 24 oylik taymlayn' },
  { id: 'uzb-checklist', title: 'Oʻzbekistonga xos tayyorlik roʻyxati' },
  { id: 'budget', title: 'Tayyorgarlik budjeti: small / medium / large' },
  { id: 'foreign-factories', title: 'Mezon sifatida 13 ta xorijiy GMP-zavod' },
  { id: 'consumables', title: 'GMP-ishlab chiqarish uchun sarflanadigan materiallar' },
  { id: 'pics', title: 'PIC/S — keyingi bosqich' },
  { id: 'uzb-mistakes', title: 'Oʻzbekistonga xos 5 ta tayyorgarlik xatosi' },
  { id: 'fallback', title: 'Kechikayotgan boʻlsangiz: fallback-stsenariy' },
  { id: 'faq', title: 'Tez-tez beriladigan savollar' },
];

const ARTICLE_HTML = `
<h2 id="gmp-2027">GMP nima va 2027 yil 1 yanvar nima uchun kritik sana</h2>
<p><strong>Good Manufacturing Practice (GMP)</strong> — bu dori vositalarini ishlab chiqarishni tashkil etish va sifat nazoratiga boʻlgan talablar tizimi boʻlib, u mahsulotning roʻyxatdan oʻtkazilgan spetsifikatsiyalarga barqaror muvofiqligini kafolatlaydi. Oʻzbekistonda majburiy GMP-sertifikatsiyaga oʻtish kursi Vazirlar Mahkamasining qarori va Sogʻliqni saqlash vazirligi meʼyorlari bilan belgilangan. Aksariyat ishlab chiqaruvchilar uchun kalit nazorat nuqtasi sifatida <strong>2027 yil 1 yanvar</strong> belgilangan: bu sanadan keyin amaldagi GMP-sertifikatisiz nosteril va steril dori shakllarini ishlab chiqarish preparatni roʻyxatdan oʻtkazish va aylanmaga chiqarish uchun qonuniy asos boʻlmay qoladi.</p>
<p>Bu qaror uchta omilga asoslangan: Oʻzbekistonning JTSga qoʻshilishi, eksport ambitsiyalari (YeOII, MENA, Janubi-Sharqiy Osiyo) va sohaning Pharma Park davriga oʻtishi. GMP-sertifikatisiz na eksport, na davlat xaridlarida ishtirok, na xalqaro shartnoma ishlab chiqaruvchilar (CMO/CDMO) bilan hamkorlik mumkin emas.</p>
<p>Tartibga solishni muvofiqlashtiruvchi — Sogʻliqni saqlash vazirligi qoshidagi Farmatsevtika tarmogʻini rivojlantirish agentligi (Агентство по развитию фармацевтической отрасли) — uzpharmagency.uz. Qisqacha — «Agentlik». GMP-tekshiruvlarni va ularning natijalari boʻyicha sertifikatlarni «Zarur amaliyotlar markazi» davlat unitar korxonasi (ГУП Центр надлежащих практик) — uzpharm-gxp.uz amalga oshiradi. Qisqacha — «Markaz». Regulyator <strong>EU GMP</strong> va Annex 1 (2022 yil tahriri, 2023 yil 25 avgustda kuchga kirgan) standartlariga amal qiladi. Bu sertifikatga daʼvogar barcha ishlab chiqaruvchilar Yevropa qoidalariga toʻliq, jumladan Contamination Control Strategy (CCS), real vaqt rejimida 5 mkm zarrachalar monitoringi va xodimlar malakasi boʻyicha yangilangan talablariga muvofiq boʻlishi kerakligini bildiradi.</p>

<h2 id="changes">Ishlab chiqaruvchilar uchun nima oʻzgaradi</h2>
<p>2027 yilgacha mahalliy korxonalarning bir qismi soddalashtirilgan milliy qoidalar boʻyicha yoki oʻzlarining boshqaruv tizimlari sertifikatlari bilan ishlamoqda. X-soatdan keyin nomuvofiqlik oqibatlari jiddiy:</p>
<ul>
  <li><strong>Amaldagi GMPsiz ishlab chiqarilayotgan dori preparatlari uchun roʻyxatga olish guvohnomalarini bekor qilish.</strong></li>
  <li><strong>Sogʻliqni saqlash vazirligi tenderlarida, davlat shifoxonalari tizimlarida va tibbiy sugʻurta fondlarida ishtirok eta olmaslik.</strong></li>
  <li><strong>Eksport shartnomalarini toʻxtatish</strong> — koʻp importyor mamlakatlar yetkazib beruvchidan GMP-sertifikat talab qiladi.</li>
  <li><strong>Reja boʻyicha yoki rejasiz audit chogʻida nuqsonlar aniqlanganda jarima va litsenziyani toʻxtatib turish.</strong></li>
</ul>
<p>Steril ishlab chiqarish uchun Annex 1 zonalarni tasniflash, 5 mkm zarrachalar real vaqt rejimida monitoringi, gaz oqimlari validatsiyasi (smoke studies), CCS tizimi va A/B zonalariga kiruvchi xodimlar majburiy malakasiga talablarni kuchaytirdi.</p>

<h2 id="timeline">2027 yil 1 yanvarigacha 24 oylik taymlayn</h2>
<p>Sertifikatsiyaning barcha bosqichlarini real oʻtish uchun <strong>18-24 oy</strong> kerak, bu ham infratuzilma Annex 1 ga umumiy holda muvofiq boʻlsa. 2026 yil mayda boshlansangiz, vaqt zaxirasi roppa-rosa 20 oy. Quyida — chorakli ishchi reja.</p>
<table>
  <thead>
    <tr><th>Davr</th><th>X-gacha oylar</th><th>Nima bajarilishi kerak</th></tr>
  </thead>
  <tbody>
    <tr><td>2025 Q2</td><td>T-21</td><td>Mustaqil konsultant tomonidan GMP-audit, gap-tahlil, road-map shakllantirish. Reliz uchun imzo huquqi bilan Quality Person (QP) tayinlash.</td></tr>
    <tr><td>2025 Q3</td><td>T-18</td><td>HVAC modernizatsiyasi, Site Master File va Validation Master Plan ishlab chiqish shartnomalarini tuzish. CCS birinchi versiyasini tayyorlash.</td></tr>
    <tr><td>2025 Q4</td><td>T-15</td><td>Barcha kritik jarayonlar boʻyicha SOPlarni yakunlash (steril uchun kamida 80 SOP, nosteril uchun 50). GMP-inspektor uchun hujjatlarni davlat-rus tiliga tarjima qilish.</td></tr>
    <tr><td>2026 Q1</td><td>T-12</td><td>Infratuzilma ishlarini yakunlash: bosim oʻzgarishlari, A/B zonalarida HEPA H14, shlyuzlar, pass-through, smoke studies. Gowning-qualification dasturini ishga tushirish.</td></tr>
    <tr><td>2026 Q2</td><td>T-9</td><td>Barcha kritik uskunalar boʻyicha DQ/IQ/OQ/PQ. EM-dasturini ishga tushirish va baseline maʼlumotlarini toʻplash. Barcha sarflanadigan materiallar va xom ashyo boʻyicha supplier qualification.</td></tr>
    <tr><td>2026 Q3</td><td>T-6</td><td>Process Performance Qualification (preparat boʻyicha 3 muvaffaqiyatli run). Cleaning validation, disinfection validation, asseptika uchun — ketma-ket 3 APS / Media Fill.</td></tr>
    <tr><td>2026 Q4 (Okt)</td><td>T-3</td><td>External GMP-konsultant bilan mock inspection. Ichki auditdan barcha major findings yopilishi. EM trend-tahlili 12 oy uchun tayyor.</td></tr>
    <tr><td>2026 Q4 (Noy)</td><td>T-2</td><td>«Zarur amaliyotlar markazi»ga GMP-tekshiruv uchun ariza topshirish. Inspection-paketni yakuniy yigʻish: SMF, VMP, CCS, SOP roʻyxati, batch records, deviations log, CAPA, PQR.</td></tr>
    <tr><td>2026 Q4 (Dek)</td><td>T-1</td><td>GMP-tekshiruv (odatda maydonchada 3-5 kun). Kuzatishlar boʻlsa 30 kun ichida reply-letter.</td></tr>
    <tr><td>2027 yil 1 yanvar</td><td>X</td><td>GMP sertifikati amaldagi. Ishlab chiqarish va eksport qonuniy davom etadi.</td></tr>
  </tbody>
</table>
<p>Agar 2026 yil mayda hali boshlamagan boʻlsangiz — realistik maqsad 2027 yil 1 yanvar emas, balki 2027 yil Q2-Q3 da sertifikat olish, Agentlik bilan bosqichli sertifikatsiyani oldindan kelishish bilan (quyida fallback-stsenariyga qarang).</p>

<h2 id="uzb-checklist">Oʻzbekistonga xos tayyorlik roʻyxati</h2>
<p>EU GMP dan farqli, «Zarur amaliyotlar markazi» inspektori qoʻshimcha oʻzbekiston regulyatori hujjatlarini ham tekshiradi. Konsultant-emigrantlarga tayanib «Yevropa namunasi boʻyicha» tayyorgarlik koʻrayotgan korxonalar buni koʻpincha hisobga olmaydi. Quyida — Markaz alohida nima soʻraydi.</p>
<h3>Sogʻliqni saqlash vazirligi roʻyxatga olish guvohnomalari (РУ)</h3>
<p>Har bir ishlab chiqarilayotgan preparat amaldagi РУga ega boʻlishi va undagi maʼlumotlar — tarkibi, dozasi, qadoqlash, texnologiya — haqiqiy ishlab chiqarish jarayoni va batch records yozuvlariga mos kelishi kerak. SMF va РУning nomuvofiqligi — major / critical finding. GMP-tekshiruvni boshlashdan oldin barcha РУlarni hozirgi SOPlar bilan solishtirib chiqish foydali.</p>
<h3>Dori vositalarini ishlab chiqarishga litsenziya</h3>
<p>Litsenziya GMP-sertifikatidan alohida Sogʻliqni saqlash vazirligi tomonidan beriladi. Tekshiring: litsenziyadagi nomenklatura barcha ishlab chiqarilayotgan shakllarni qamrab olishi kerak (qattiq, yumshoq, steril suyuq, liofilizatlar va h.k.). Nomenklatura oʻzgarganda — GMP uchun ariza topshirishdan oldin litsenziya yangilanadi.</p>
<h3>Davlat-rus tilidagi SOPlar</h3>
<p>Barcha SOPlar, jurnallar, batch records va operator yoʻriqnomalari davlat (oʻzbek) yoki rus tilida boʻlishi kerak. «Zarur amaliyotlar markazi» inspektori — Oʻzbekiston fuqarosi va hujjatlarni faqat shu tillarda oʻqiydi. Agar SOPlar «korporativ shablon» boʻyicha ingliz tilida tuzilgan boʻlsa — tasdiqlangan tarjima talab qilinadi, bunga odatda vaqt yetmaydi.</p>
<h3>GMP-inspektor hujjatlari</h3>
<p>Standart inspection-paketdan (SMF, VMP, CCS, batch records) tashqari inspektor quyidagilarni soʻraydi: javobgar shaxslarning fotosuratlari bilan tashkiliy tuzilma, QP va QA-rahbar diplomlarining nusxalari (xorijiy uchun notarial tarjima bilan), Agentlik shakli boʻyicha roʻyxatdan oʻtgan РУlar roʻyxati, kritik sarflanadigan materiallar boʻyicha supplier qualification shartnomalari nusxalari, soʻnggi sanitar-epidemiologik tekshiruv akti.</p>
<h3>Yongʻin xavfsizligi sertifikati</h3>
<p>Tez-tez eʼtibordan chetda qoladigan hujjat. Inspektor osongina yonuvchi (IPA, atseton) va toksik (formaldegid, peroksid) moddalarni saqlash xonalari boʻyicha yongʻin nazorati inspektor aktini tekshiradi. Amaldagi aktsiz — tekshiruv toʻxtatiladi.</p>

<h2 id="budget">Tayyorgarlik budjeti: small / medium / large</h2>
<p>Oʻzbekistonda GMP-sertifikatsiyaga tayyorgarlikning realistik budjeti infratuzilma boshlangʻich holatiga juda bogʻliq. Quyida — qattiq dori shakllarining (tabletkalar, kapsulalar) tipik nosteril ishlab chiqarish uchun baholash oraliqlari. Steril ishlab chiqarishlar uchun 2-3 ga koʻpaytiring.</p>
<table>
  <thead>
    <tr><th>Xarajatlar moddasi</th><th>Small (50 kishi)</th><th>Medium (200 kishi)</th><th>Large (500+ kishi)</th></tr>
  </thead>
  <tbody>
    <tr><td>GMP-konsultant: birlamchi gap-audit</td><td>$5-8k</td><td>$10-15k</td><td>$15-25k</td></tr>
    <tr><td>GMP-konsultant: 18 oy hamrohlik (3-6 tashrif)</td><td>$15-25k</td><td>$30-50k</td><td>$60-100k</td></tr>
    <tr><td>External mock inspection (T-3 oy)</td><td>$8-12k</td><td>$15-20k</td><td>$20-30k</td></tr>
    <tr><td>A-D zonalari kapital taʼmiri (noldan boshlansa)</td><td>$50-150k</td><td>$200-500k</td><td>$500-1500k</td></tr>
    <tr><td>HVAC modernizatsiyasi (HEPA H14, bosim oʻzgarishlari)</td><td>$30-80k</td><td>$150-300k</td><td>$300-800k</td></tr>
    <tr><td>Laboratoriya uskunalari (HPLC, spektrofotometrlar, EM)</td><td>$50-100k</td><td>$150-300k</td><td>$300-700k</td></tr>
    <tr><td>SOPlarni yangilash (60-150 hujjat)</td><td>$5-10k</td><td>$10-20k</td><td>$15-30k</td></tr>
    <tr><td>Xodimlar treningi (gowning, Annex 1, behavioral)</td><td>$1-2k</td><td>$2-4k</td><td>$3-6k</td></tr>
    <tr><td>GMP darajasidagi sarflanadigan materiallar — tekshiruv paytidagi yillik zaxira</td><td>$15-30k</td><td>$50-100k</td><td>$120-250k</td></tr>
    <tr><td>GMP-tekshiruv va sertifikat uchun davlat boji</td><td>~$3-5k</td><td>~$3-5k</td><td>~$3-5k</td></tr>
    <tr><td><strong>Jami diapazon</strong></td><td><strong>$180-420k</strong></td><td><strong>$620-1320k</strong></td><td><strong>$1340-3450k</strong></td></tr>
  </tbody>
</table>
<p>Kalit moddasi — zonalar kapital taʼmiri, ayniqsa sovet OST-77 yoki GOST 23-67 boʻyicha loyihalashtirilgan korxonalar uchun (1990-2000-yillardagi koʻpchilik mahalliy zavodlar). Agar boshlangʻich infratuzilma GMPga yaqin boʻlsa (masalan, 2020+ yillarda loyihalashtirilgan Pharma Park rezidentlari), bu modda 5-10 marta qisqaradi.</p>

<h2 id="foreign-factories">Mezon sifatida 13 ta xorijiy GMP-zavod</h2>
<p>2026 yil aprel holatiga koʻra Oʻzbekistonda xorijiy kapital bilan 13 ta farm-zavod ishlamoqda, EU GMP yoki ekvivalent tekshiruvlardan oʻtgan. Bu mahalliy sharoitda sertifikatsiya amaliyotda qanday koʻrinishi haqida ishchi misollar.</p>
<table>
  <thead>
    <tr><th>Brend / guruh</th><th>Joylashuv</th><th>Profil</th></tr>
  </thead>
  <tbody>
    <tr><td>Jurabek Laboratories (Sandoz/Novartis hamkori)</td><td>Toshkent</td><td>Qattiq shakllar, generiklar</td></tr>
    <tr><td>World Medicine UZ (Turkiya)</td><td>Pharma Park, Toshkent vil.</td><td>Parenteral eritmalar, inʼeksiyalar</td></tr>
    <tr><td>Remedy Group (UZ-EU JV)</td><td>Pharma Park</td><td>Steril shakllar, liofilizatlar</td></tr>
    <tr><td>Mega Pharm (Turkiya)</td><td>Samarqand</td><td>Antibiotiklar, qattiq shakllar</td></tr>
    <tr><td>Nika Pharm (Polsha)</td><td>Toshkent</td><td>Kapsulalar, tabletkalar</td></tr>
    <tr><td>Asia Pharm (Koreya, JV)</td><td>Pharma Park</td><td>Biopreparatlar, inʼeksiyalar</td></tr>
    <tr><td>UzGSK (GlaxoSmithKline package)</td><td>Toshkent</td><td>Qadoqlash, distribyutsiya (litsenziya boʻyicha)</td></tr>
    <tr><td>Sanofi (mahalliy CMO bilan shartnoma)</td><td>Toshkent</td><td>Generiklarni shartnoma ishlab chiqarish</td></tr>
    <tr><td>Pfizer (shartnoma qadoqlash)</td><td>Toshkent</td><td>Mahalliy РУlar ostida qadoqlash</td></tr>
    <tr><td>Kusum Healthcare (Hindiston)</td><td>Pharma Park</td><td>Qattiq shakllar, jeneriklar</td></tr>
    <tr><td>Hetero Drugs (Hindiston)</td><td>Pharma Park</td><td>API + tayyor shakllar</td></tr>
    <tr><td>Reddy\'s Laboratories (Hindiston, vakolat)</td><td>Toshkent</td><td>Tayyor shakllar, tadqiqot sherigi</td></tr>
    <tr><td>Akrikhin / Polpharma (mintaqaviy bogʻliqlik)</td><td>Toshkent</td><td>Jeneriklar, qattiq shakllar</td></tr>
  </tbody>
</table>
<p>Muvaffaqiyatli kompleks misollarni nima birlashtiradi: (1) boshidanoq EU GMP Annex 1 boʻyicha loyihalash, «sovet korpuslari moslashtirish» urinishlarisiz; (2) 18-24 oylik hamrohlik uchun belgilangan GMP-konsultant, bir martalik maslahat emas; (3) sarflanadigan materiallar boʻyicha (kiyim, qoʻlqoplar, dezinfektantlar, indikatorlar) Yevropa brendlari bilan supplier qualification — xitoylik no-name emas; (4) xalqaro tajribaga ega va tekshiruvga kamida 12 oy oldin yollangan Quality Person.</p>

<h2 id="consumables">GMP-ishlab chiqarish uchun sarflanadigan materiallar</h2>
<p>Har qanday GMP-oʻtish dasturi materiallarning kunlik xarajatlariga borib taqaladi: bir martalik kiyim, qoʻlqoplar, salfetkalar, dezinfektantlar, sterilizatsiya indikatorlari. Bu sarflanadigan materiallarning sifati toʻgʻridan-toʻgʻri sizning Particle Count va mikrobiologik fonni shakllantiradi. Barcha pozitsiyalar TDS, CoA, EN/ISO sertifikatlariga ega boʻlishi va supplier qualificationdan oʻtishi kerak.</p>
<ul>
  <li><a href="/uz/catalog/garments">A/B zonalari uchun bir martalik kiyim</a> — tasdiqlangan tirqishlar oʻlchami va ikki tomonlama paketdagi qadoq bilan steril kombinezonlar, bahillar, qalpoqlar va yengkiyimlar.</li>
  <li><a href="/uz/catalog/perchatki-zashchitnye">Toza xonalar uchun qoʻlqoplar</a> — uzun manjet bilan steril nitril, AQL ≤1.5, EN 374 va EN 455 sertifikatlari.</li>
  <li><a href="/catalog/cleanroom-wipes">Salfetkalar</a> — C/D zonalari uchun nosteril polietilen, A/B zonalari uchun steril IPA bilan shimdirilgan (masalan, Contec Polynit, Contec Sterile EasyReach).</li>
  <li><a href="/uz/catalog/disinfectants-and-detergents">Dezinfektantlar</a> — steril 70% IPA, vodorod peroksid asosidagi sporitsidlar, sizning yuzalaringiz uchun validatsiya qilingan.</li>
  <li><a href="/catalog/indicators">Sterilizatsiya indikatorlari</a> — biologik indikatorlar Terragene BT60Bion, avtoklavlash va plazma sterilizatsiyasi uchun 5/6 sinf kimyoviy indikatorlar.</li>
  <li><a href="/catalog/cleaning-trolleys-systems">Tozalash tizimlari</a> — C/D zonalari uchun sertifikatli Hydroflex yopiq moplari, sterilizatsiyalanadigan aravachalar.</li>
</ul>
<p>CCSda har bir zonada qaysi aniq SKU ishlatilishi va qaysi supplier qualificationdan oʻtgani yozilgan boʻlishi kerak. Ekvivalent bilan sarflanadigan materialni qayta tasdiqlashsiz almashtirish — kritik chetlanish.</p>

<h2 id="pics">PIC/S — keyingi bosqich</h2>
<p>Oʻzbekiston rasmiy ravishda <strong>Pharmaceutical Inspection Co-operation Scheme (PIC/S)</strong> aʼzoligi uchun ariza topshirgan. PIC/Sga qabul qilinish — mahalliy GMP sertifikatlari tizimning 56 ta aʼzo davlatida eʼtirof etilishi, bu eksport bozorlariga qisqa yoʻl. Biroq, aʼzo boʻlish keyingi talablarni kuchaytirishni talab qiladi: pre-accession assessment regulyatorning oʻzini, uning inspektorlarini va u bergan sertifikatlar sifatini tekshirishni oʻz ichiga oladi. 2027 yilgacha GMP olgan ishlab chiqaruvchilar yana bir bor PIC/S mezonlari boʻyicha kuchaytirilgan auditdan oʻtishlari kerak boʻladi.</p>
<p>Mantiq oddiy: korxona EU GMP/Annex 1 boʻyicha tizimni qanchalik tezroq qursa, 2028-2030 yillardagi PIC/S tekshiruvlariga oʻtish shunchalik kam stress bilan boʻladi.</p>

<h2 id="uzb-mistakes">Oʻzbekistonga xos 5 ta tayyorgarlik xatosi</h2>
<p>Umumiy GMP darajasidagi xatolar (CCSni keyinga qoldirish, gowningga ekonomiya) hamma joyda uchraydi. Quyida — mahalliy auditlarda takrorlanadigan Oʻzbekistonga xos 5 ta nosozlik:</p>
<ul>
  <li><strong>1. SOPlar faqat ingliz tilida.</strong> Korporativ shablon yoki konsultant-emigrant SOPlarni «Ona kompaniyada shunday» boʻlgani uchun ingliz versiyasida qoldiradi. «Zarur amaliyotlar markazi» inspektori oʻzbek yoki rus tilida oʻqiydi. Tasdiqlangan tarjimasiz — audit birinchi soatda bloklanadi.</li>
  <li><strong>2. РУ va SMF nomuvofiqligi.</strong> Site Master File hozirgi ishlab chiqarish jarayonini tasvirlaydi, lekin u РУda roʻyxatdan oʻtgan jarayonga mos kelmaydi (masalan, qadoqlash yoki nazorat protsedurasi oʻzgargan). Bu avtomatik critical finding, chunki inspektor «noqonuniy chiqarilgan partiyalarni» koʻradi.</li>
  <li><strong>3. Supplier qualification faqat «odatdagi» yetkazib beruvchilarga.</strong> Sarflanadigan materiallar yillar davomida full TDS / CoAsiz mahalliy vositachidan sotib olingan. Tekshiruvda qoʻlqoplarda EN 374 yoʻqligi, salfetkalarda agar turi boʻyicha TDS yoʻqligi aniqlanadi. Soʻnggi onda sertifikatlangan liniyaga oʻzgartirish — 3-6 oy davomida toʻliq qayta validatsiya tsiklini bildiradi.</li>
  <li><strong>4. CCSda iqlim omili aks ettirilmagan.</strong> Yozgi +40°C harorat va PM10 changi pre-filtration ga yuqori yukni yaratadi. CCSda pre-filtrlarni almashtirish chastotasi va HVACning mavsumiy moslashuvi asoslangan boʻlishi kerak. Yevropa manbasidan shablon CCS buni hisobga olmaydi — major observation.</li>
  <li><strong>5. Batch recordsda davlat-rus tilini aralashtirib yuborish.</strong> Operator oʻzbek tilida batch record toʻldiradi, QA rus tilini oʻqiydi, korporatsiya ingliz tilini talab qiladi. Natijada — yozuvlar dublirovkasi, tarjima xatolari, kelishmovchiliklar. Regulyator batch record originali bitta tilda (davlat-rus yoki oʻzbek) boʻlishini va QA imzosi shu tilda boʻlishini talab qiladi.</li>
</ul>

<h2 id="fallback">Kechikayotgan boʻlsangiz: fallback-stsenariy</h2>
<p>Agar 2026 yil mayda 2027 yil 1 yanvarigacha realistik ulgurmayotgan boʻlsangiz — eng yaxshisi <strong>jim turmaslik</strong>. Agentlik Oʻzbekistonning ishlab chiqarish bazasini maksimal saqlab qolishdan manfaatdor va bir nechta bosqichli variantlarga ruxsat beradi.</p>
<h3>Liniyalar boʻyicha bosqichli sertifikatsiya</h3>
<p>Korxona 3-5 ta turli dori shakllarini ishlab chiqarsa, regulyator dastlab bitta liniyaga (masalan, qattiq shakllar) GMP-sertifikatini olish va qolganlarni 12-18 oy ichida sertifikatlash majburiyati bilan ruxsat beradi. Liniya boʻyicha sertifikatsiya faqat tegishli mahsulotlar uchun РУlarni boshqarish imkonini beradi; qolganlar alohida sertifikatsiyagacha toʻxtatiladi.</p>
<h3>Sertifikatlangan sherik orqali shartnoma ishlab chiqarish</h3>
<p>Sizning ishlab chiqarish ulgurmayotgan boʻlsa, kritik SKUlarni amaldagi GMP-sertifikatli CMO ga (masalan, Jurabek Laboratories, World Medicine UZ yoki Remedy Group) vaqtinchalik koʻchirish varianti bor. Bu sizning РУlaringizni amaldagi saqlab qoladi va oʻzingizning sertifikatsiyangiz tugaguncha daromad oqimini taʼminlaydi. Minus — 25-40% margin yoʻqotish va sherikka bogʻliqlik.</p>
<h3>Vaqtinchalik ruxsat uchun ariza</h3>
<p>Sogʻliqni saqlash vazirligi sertifikatsiya rejasi tasdiqlangan va GMP-konsultant bilan shartnoma tuzilgan boʻlsa, 2027 yil 1 yanvardan keyin <strong>12 oygacha ishlab chiqarishni davom ettirish uchun vaqtinchalik ruxsat</strong> berishi mumkin. Ariza Agentlikga 2026 yil noyabr oxirigacha topshiriladi; qaror individual ravishda qabul qilinadi va moliyaviy kafolatlar (bank kafolati yoki eskroʻ) bilan mustahkamlanadi. Bu yoʻl shaffoflik va kuchli reputatsiyani talab qiladi — korxonada sanitar nuqsonlar, mahsulot chaqirib olish yoki yopilmagan CAPA boʻlsa rad etish mumkin.</p>
<h3>Qadoqlash va distribyutsiyaga oʻtish</h3>
<p>Agar GMP-sertifikatsiya aniq realistik boʻlmasa, korxonani xalqaro sherik litsenziyasi ostida qadoqlash operatsiyalariga (shartnoma qadoqlash) yoki distribyutsiyaga oʻtkazish mantiqan toʻgʻri. Qadoqlash va ulgurji distribyutsiyaga litsenziya toʻliq GMP-sertifikatisiz beriladi va bu ishlab chiqarish РУlarini yoʻqotgan taqdirda ham biznesni saqlab qoladi.</p>

<div style="margin: 28px 0; padding: 24px; background: linear-gradient(135deg, #E6F2F8 0%, #FFFFFF 100%); border: 2px solid #00608A; border-radius: 16px;">
  <p style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #00608A; margin: 0 0 8px 0;">GMP-konsalting</p>
  <p style="font-size: 20px; font-weight: 800; color: #0E1E2A; margin: 0 0 8px 0; line-height: 1.25;">Shaxsiy yordam kerakmi?</p>
  <p style="font-size: 14px; color: #34495E; margin: 0 0 16px 0; line-height: 1.55;">Korxonangiz vaziyatini taʼriflang — GMP-tekshiruvga realistik tayyorgarlik rejasini tuzishga yordam beramiz. Bepul 30-daqiqalik diagnostika. Oʻzbekistonda korxonalarni sertifikatlashtirgan amaliyotchi GMP-konsultantlar bilan hamkorlikda ishlaymiz.</p>
  <a href="/uz/gmp-podgotovka" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #00608A; color: #FFFFFF; font-weight: 600; font-size: 14px; border-radius: 8px; text-decoration: none;">Tayyorgarlik rejasini olish →</a>
</div>

<h2 id="faq">Tez-tez beriladigan savollar</h2>
<p><strong>2027 yil 1 yanvardan keyin GMPsiz ishlash mumkinmi?</strong><br/>Yoʻq, bosqichli sertifikatsiya yoki Agentlikning vaqtinchalik ruxsati holatlaridan tashqari (fallback-stsenariyga qarang). Amaldagi GMP-sertifikatisiz dori vositalari ishlab chiqarish qonun buzilishi hisoblanadi; roʻyxatga olish guvohnomalari bekor qilinadi.</p>
<p><strong>GMP-sertifikatsiyaga tayyorgarlik aslida qancha turadi?</strong><br/>Tipik nosteril ishlab chiqarish uchun (medium, 200 kishi) — $620k-1.3M; steril uchun — 2-3 marta yuqori. Yuqoridagi budjet jadvaliga qarang.</p>
<p><strong>Tekshiruvni kim oʻtkazadi?</strong><br/>«Zarur amaliyotlar markazi» davlat unitar korxonasi inspektorlari (uzpharm-gxp.uz), baʼzi hollarda xorijiy konsultantlar jalb qilinishi bilan. PIC/Sga aʼzo boʻlgach, sxema mamlakatlari vakillari ham tekshiruvlarga jalb qilinishi mumkin.</p>
<p><strong>Boshqa mamlakatda berilgan GMP-sertifikati amal qiladimi?</strong><br/>PIC/S davlatining sertifikati eʼtirof etilishi mumkin, lekin mahalliy sharoitda muvofiqlikni tasdiqlash uchun «Zarur amaliyotlar markazi» GMP-tekshiruvidan ozod qilmaydi. Toʻliq validatsiya — 6-12 oy.</p>
<p><strong>Annex 1 nima va u nima uchun muhim?</strong><br/>Annex 1 EU GMP — steril ishlab chiqarish uchun maxsus ilova. 2022 yil tahriri monitoring, CCS va xodimlar malakasiga talablarni kuchaytirdi. Oʻzbekiston bu tahrirni mezon sifatida qabul qildi.</p>
<p><strong>Sertifikat olingandan keyin qayta tekshiruv qanchalik tez-tez oʻtkaziladi?</strong><br/>2-3 yilda bir marta reja boʻyicha tekshiruv, ortiq mahsulot chaqirib olishlar, isteʼmolchilar shikoyatlari yoki ishlab chiqarishdagi oʻzgarishlarda mumkin boʻlgan rejasiz tekshiruvlar.</p>
<p><strong>Auditdan oʻtish uchun kerakli sarflanadigan materiallar sotib olish yetarlimi?</strong><br/>Yoʻq. Sarflanadigan materiallar — zarur, lekin yetarli shart emas. CCS, oʻqitilgan xodimlar, validatsiyalangan jarayonlar va ishlaydigan hujjatlarsiz inspektor muvofiqlikni tasdiqlamaydi.</p>
<p><strong>2026 yilda tayyorgarlikni boshlash va 2027 yil 1 yanvarigacha ulgurish mumkinmi?</strong><br/>Infratuzilma Annex 1 ga yaqin va belgilangan QA-rahbar mavjud boʻlsa — ha. Noldan boshlanganda — realistik maqsad 2027 yil Q2-Q3, Agentlik bilan bosqichli sertifikatsiyani oldindan kelishish bilan.</p>
<p><strong>Sarflanadigan materiallar yetkazib beruvchi sifatida CRS nima qiladi?</strong><br/>CRS (ООО «Topaz Company») — Oʻzbekistonda IBC Nanotex, Contec, Terragene, Hydroflex, BIMOS, Alsico, NPro, Isofield rasmiy distribyutori. Supplier qualification uchun TDS / CoA / EN-sertifikatlari toʻliq paketini, Toshkentdagi asosiy SKUlar boʻyicha ombor zaxiralarini va sarflanadigan materiallar boʻyicha CCS-boʻlimlarini tuzishda QAga yordam taqdim etamiz.</p>
`;

export const metadata: Metadata = {
  title: ARTICLE.title,
  description: ARTICLE.excerpt,
  openGraph: {
    title: ARTICLE.title,
    description: ARTICLE.excerpt,
    type: 'article',
    publishedTime: ARTICLE.publishedAt,
    locale: 'uz_UZ',
    images: [{ url: `${siteConfig.url}${ARTICLE.image}` }],
  },
  alternates: buildAlternates('uz', '/blog/gmp-uzbekistan-2027-podgotovka'),
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function UzGmpBlogArticlePage() {
  const articleImageAbs = `${siteConfig.url}${ARTICLE.image}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: ARTICLE.title,
    description: ARTICLE.excerpt,
    image: [articleImageAbs],
    datePublished: ARTICLE.publishedAt,
    dateModified: ARTICLE.publishedAt,
    inLanguage: 'uz',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/uz/blog/gmp-uzbekistan-2027-podgotovka`,
    },
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs + Header */}
      <section className="bg-white pt-28 pb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-[800px]">
            <nav className="flex items-center gap-1.5 text-[13px] text-text mb-6">
              <Link href="/uz" className="hover:text-brand transition-colors">
                {dict.common.breadcrumbsHome}
              </Link>
              <span className="text-text-muted">/</span>
              <Link href="/blog" className="hover:text-brand transition-colors">
                Blog
              </Link>
              <span className="text-text-muted">/</span>
              <span className="text-text-muted">{ARTICLE.category}</span>
            </nav>

            <span className="inline-block text-[11px] font-semibold text-white bg-brand-dark px-2.5 py-1 rounded-full mb-4">
              {ARTICLE.category}
            </span>

            <h1 className="text-[28px] md:text-[34px] lg:text-[36px] font-extrabold text-text-dark leading-tight mb-4">
              {ARTICLE.title}
            </h1>

            <div className="flex items-center gap-4 text-[13px] text-text-muted mb-8">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <time dateTime={ARTICLE.publishedAt}>{formatDate(ARTICLE.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{ARTICLE.readingTime} {dict.blog.readingMin}</span>
              </div>
            </div>
          </div>

          <div className="max-w-[800px]">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
              <Image
                src={ARTICLE.image}
                alt={ARTICLE.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="bg-white py-10 md:py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 max-w-[1100px]">
            <div className="flex-1 min-w-0 max-w-[800px]">
              <div
                className="
                  [&_h2]:text-[22px] [&_h2]:md:text-[24px] [&_h2]:font-bold [&_h2]:text-text-dark [&_h2]:mt-10 [&_h2]:mb-4
                  [&_h3]:text-[18px] [&_h3]:md:text-[20px] [&_h3]:font-bold [&_h3]:text-text-dark [&_h3]:mt-6 [&_h3]:mb-3
                  [&_p]:text-base [&_p]:text-[#333] [&_p]:leading-[1.7] [&_p]:mb-4
                  [&_a]:text-brand [&_a]:underline [&_a]:hover:text-brand-dark
                  [&_strong]:text-text-dark [&_strong]:font-semibold
                  [&_ul]:space-y-2 [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:list-disc
                  [&_li]:text-base [&_li]:text-[#333] [&_li]:leading-[1.6]
                  [&_table]:w-full [&_table]:border-collapse [&_table]:rounded-lg [&_table]:overflow-hidden [&_table]:mb-6 [&_table]:border [&_table]:border-surface-border
                  [&_thead]:bg-brand-dark
                  [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:text-white
                  [&_tbody_tr:nth-child(even)]:bg-surface
                  [&_td]:px-4 [&_td]:py-3 [&_td]:text-sm [&_td]:text-text-dark [&_td]:border-b [&_td]:border-[#EEE]
                "
                dangerouslySetInnerHTML={{ __html: ARTICLE_HTML }}
              />

              {/* Inline CTA */}
              <div className="bg-brand-dark rounded-xl p-8 md:p-10 mt-12">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {dict.blog.inlineCtaTitle}
                </h3>
                <p className="text-white/70 text-sm mb-6 max-w-lg">
                  {dict.blog.inlineCtaBody}
                </p>
                <Link
                  href="/uz/contacts"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-brand-dark bg-white rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Phone size={16} />
                  {dict.blog.inlineCtaButton}
                </Link>
              </div>

              {/* Back link */}
              <div className="mt-8 pt-8 border-t border-surface-border">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-brand font-medium text-sm hover:text-brand-dark transition-colors"
                >
                  <ArrowLeft size={16} />
                  {dict.blog.backToBlog}
                </Link>
              </div>
            </div>

            {/* Table of Contents */}
            <aside className="lg:w-60 flex-shrink-0">
              <div className="lg:sticky lg:top-28">
                <div className="bg-surface rounded-xl p-5 border border-surface-border">
                  <div className="flex items-center gap-2 mb-4">
                    <List size={16} className="text-brand" />
                    <h3 className="font-semibold text-text-dark text-sm">
                      {dict.blog.tocTitle}
                    </h3>
                  </div>
                  <nav className="space-y-1">
                    {TOC.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-[13px] text-text hover:text-brand transition-colors py-1.5 border-l-2 border-surface-border hover:border-brand pl-3"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
