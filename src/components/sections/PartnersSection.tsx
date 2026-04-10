const partners = [
  'Contec',
  'Alsico',
  'Terragene',
  'Kimberly-Clark',
  'Ansell',
  'NPRO',
];

export default function PartnersSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-brand uppercase tracking-[2px]">
            + НАШИ ПАРТНЁРЫ
          </span>
          <h2 className="text-[36px] font-extrabold text-text-dark mt-3">
            Официальный дистрибьютор ведущих брендов
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((brand) => (
            <div
              key={brand}
              className="w-[180px] h-[100px] rounded-xl bg-surface border border-surface-border flex items-center justify-center"
            >
              <span className="text-[18px] font-bold text-text-dark">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
