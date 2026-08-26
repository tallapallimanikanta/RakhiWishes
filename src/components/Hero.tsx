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
        <button
          className="hero__cta btn btn-primary animate-fade-in-up delay-3"
          onClick={() => {
            document.querySelector('.rakhi-section')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          Create your Greetings
        </button>
      </div>
    </section>
  )
}

export default Hero
