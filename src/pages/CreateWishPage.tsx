import { useNavigate } from 'react-router-dom'
import RakhiSelection from '../components/RakhiSelection'
import WishForm from '../components/WishForm'
import WishPreview from '../components/WishPreview'
import type { Rakhi } from '../data/rakhis'
import './CreateWishPage.css'

interface CreateWishPageProps {
  selectedRakhi: Rakhi | null
  recipientName: string
  senderName: string
  message: string
  onRakhiSelect: (rakhi: Rakhi) => void
  onRecipientNameChange: (value: string) => void
  onSenderNameChange: (value: string) => void
  onMessageChange: (value: string) => void
  onCreateWish: () => void
}

function CreateWishPage({
  selectedRakhi,
  recipientName,
  senderName,
  message,
  onRakhiSelect,
  onRecipientNameChange,
  onSenderNameChange,
  onMessageChange,
  onCreateWish,
}: CreateWishPageProps) {
  const navigate = useNavigate()
  const isFormValid =
    selectedRakhi !== null &&
    recipientName.trim().length > 0 &&
    message.trim().length > 0

  return (
    <main className="create-wish-page">
      {/* Header */}
      <header className="page-header animate-fade-in">
        <div className="container page-header__inner">
          <a href="/" className="page-header__logo" aria-label="Rakhi Wishes">
            Rakhi Wishes
          </a>
        </div>
      </header>

      <div className="container">
        {/* Back button + Rakhi Selection */}
        <div className="create-page__back-row">
          <button
            className="create-page__back"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="section-title">Choose Your Rakhi</h2>
        </div>
        <RakhiSelection onSelect={onRakhiSelect} hideTitle />

        {/* Divider */}
        <hr className="divider" aria-hidden="true" />

        {/* Personal Message Form */}
        <WishForm
          recipientName={recipientName}
          senderName={senderName}
          message={message}
          onRecipientNameChange={onRecipientNameChange}
          onSenderNameChange={onSenderNameChange}
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
