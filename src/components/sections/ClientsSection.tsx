import ClientLogos from './ClientLogos';

export default function ClientsSection() {
  return (
    <section className="bg-surface py-20">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-brand uppercase tracking-[2px]">
            + ПАРТНЁРЫ
          </span>
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-text-dark mt-3 mb-4">
            Наши партнёры
          </h2>
          <p className="text-[16px] text-text">
            Фармацевтические производства и компании Узбекистана, которые работают с Clean Room Systems
          </p>
        </div>

        <ClientLogos />
      </div>
    </section>
  );
}
