import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__decor hero__decor--left" aria-hidden="true" />
      <div className="hero__decor hero__decor--right" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow animate-fade-in">Raksha Bandhan 2026</p>

        <h1 className="hero__heading animate-fade-in-up">
          Send a Little Love<br />
          <span className="hero__heading-accent">This Raksha Bandhan</span>
        </h1>

        <p className="hero__subtext animate-fade-in-up delay-2">
          Create a beautiful digital Rakhi wish for your brother or sister.
          <br className="hero__subtext-break" />
          Choose a Rakhi, write your heart out, and share the love.
        </p>
      </div>
    </section>
  )
}

export default Hero
