import Hero from '../components/Hero'
import ThemeToggle from '../components/ThemeToggle'
import './CreateWishPage.css'

function HomePage() {
  return (
    <main className="create-wish-page">
      <header className="page-header animate-fade-in">
        <div className="container page-header__inner">
          <span className="page-header__logo" aria-label="Rakhi Wishes">
            Rakhi Wishes
          </span>
          <ThemeToggle />
        </div>
      </header>

      <div className="container">
        <Hero />
      </div>

      <footer className="page-footer">
        <div className="container">
          <p className="page-footer__text">
            Made with love for Raksha Bandhan
          </p>
        </div>
      </footer>
    </main>
  )
}

export default HomePage
