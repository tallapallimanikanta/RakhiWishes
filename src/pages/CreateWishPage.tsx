import { useState } from 'react'
import Hero from '../components/Hero'
import RakhiSelection from '../components/RakhiSelection'
import WishForm from '../components/WishForm'
import WishPreview from '../components/WishPreview'
import ThemeToggle from '../components/ThemeToggle'
import type { Rakhi } from '../data/rakhis'
import './CreateWishPage.css'

interface CreateWishPageProps {
  selectedRakhi: Rakhi | null
  recipientName: string
  message: string
  onRakhiSelect: (rakhi: Rakhi) => void
  onRecipientNameChange: (value: string) => void
  onMessageChange: (value: string) => void
  onCreateWish: () => void
}

function CreateWishPage({
  selectedRakhi,
  recipientName,
  message,
  onRakhiSelect,
  onRecipientNameChange,
  onMessageChange,
  onCreateWish,
}: CreateWishPageProps) {
  const [showForm, setShowForm] = useState(false)

  const isFormValid =
    selectedRakhi !== null &&
    recipientName.trim().length > 0 &&
    message.trim().length > 0

  const handleStart = () => {
    setShowForm(true)
    setTimeout(() => {
      document.querySelector('.rakhi-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <main className="create-wish-page">
      {/* Header */}
      <header className="page-header animate-fade-in">
        <div className="container page-header__inner">
          <span className="page-header__logo" aria-label="Rakhi Wish">
            Rakhi Wish
          </span>
          <ThemeToggle />
        </div>
      </header>

      <div className="container">
        {/* Hero */}
        <Hero onStart={handleStart} />

        {showForm && (
          <>
            {/* Divider */}
            <hr className="divider divider-ornate" aria-hidden="true" />

            {/* Rakhi Selection */}
            <RakhiSelection onSelect={onRakhiSelect} />

            {/* Divider */}
            <hr className="divider" aria-hidden="true" />

            {/* Personal Message Form */}
            <WishForm
              recipientName={recipientName}
              message={message}
              onRecipientNameChange={onRecipientNameChange}
              onMessageChange={onMessageChange}
            />

            {/* Divider */}
            <hr className="divider divider-ornate" aria-hidden="true" />

            {/* Live Preview */}
            <WishPreview
              selectedRakhi={selectedRakhi}
              recipientName={recipientName}
              message={message}
            />

            {/* Create Button */}
            <section className="create-section animate-fade-in-up">
              <button
                className="btn btn-primary btn-lg create-btn"
                onClick={onCreateWish}
                disabled={!isFormValid}
              >
                Create My Rakhi Wish
              </button>
              {!isFormValid && (
                <p className="create-section__hint">
                  {!selectedRakhi && 'Choose a Rakhi design '}
                  {selectedRakhi && recipientName.trim().length === 0 && 'Enter a name '}
                  {selectedRakhi &&
                    recipientName.trim().length > 0 &&
                    message.trim().length === 0 &&
                    'Write a message '}
                  to continue
                </p>
              )}
            </section>
          </>
        )}
      </div>

      {/* Footer */}
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

export default CreateWishPage
