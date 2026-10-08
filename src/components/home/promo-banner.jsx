export default function PromoBanner() {
  return (
    <section
      className="promo-banner"
      aria-label="Promotion: Buy one get one free"
    >
      <img src="/media/promo.jpg" alt="Two freshly brewed cups of coffee" />
      <span className="promo-label">Promo</span>
      <h1 className="promo-title">
        <span>Buy one get</span>
        <br />
        <span>one FREE</span>
      </h1>
    </section>
  );
}
