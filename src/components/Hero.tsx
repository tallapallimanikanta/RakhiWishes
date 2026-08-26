import FlowerPetals from './FlowerPetals'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <FlowerPetals />
      <div className="hero__decor hero__decor--left" aria-hidden="true" />
      <div className="hero__decor hero__decor--right" aria-hidden="true" />

      <div className="hero__content">
        {/* Video above content */}
        <div className="hero__video-wrapper animate-scale-in">
          <video
            className="hero__video"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          >
            <source src="/Rakhi.mp4" type="video/mp4" />
          </video>
        </div>

        <h1 className="hero__heading animate-fade-in-up">
          Send a Little Love<br />
          <span className="hero__heading-accent">This Raksha Bandhan</span>
        </h1>

        <p className="hero__subtext animate-fade-in-up delay-2">
          Create a beautiful digital Rakhi wish for your brother.
          <br className="hero__subtext-break" />
          Choose a Rakhi, write your heart out, and share the love.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll animate-fade-in delay-4" aria-hidden="true">
        <span className="hero__scroll-text">Scroll down</span>
        <span className="hero__scroll-arrow">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M10 16L5 11M10 16L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </section>
  )
}

export default Hero
