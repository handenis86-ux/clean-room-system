const clients = [
  'Novo Nordisk',
  'AstraZeneca',
  'Takeda',
  'Abbott',
  'Novartis',
  'Pfizer',
];

export default function ClientsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-brand uppercase tracking-[2px]">
            + КЛИЕНТЫ
          </span>
          <h2 className="text-[36px] font-extrabold text-text-dark mt-3 mb-4">
            Нам доверяют
          </h2>
          <p className="text-[16px] text-text">
            Ведущие фармацевтические и биотехнологические компании
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {clients.map((client) => (
            <span
              key={client}
              className="text-[16px] font-semibold text-text-muted"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
