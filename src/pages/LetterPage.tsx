import type { Rakhi } from '../data/rakhis'
import DigitalLetter from '../components/DigitalLetter'
import './LetterPage.css'

interface LetterPageProps {
  selectedRakhi: Rakhi | null
  recipientName: string
  message: string
  onBack: () => void
  onShare: () => void
  isSaving?: boolean
  saveError?: string | null
}

function LetterPage({
  selectedRakhi,
  recipientName,
  message,
  onBack,
  onShare,
  isSaving = false,
  saveError = null,
}: LetterPageProps) {
  return (
    <main className="letter-page">
      {/* Back button */}
      <header className="letter-page__header animate-fade-in">
        <button
          className="btn btn-ghost letter-page__back"
          onClick={onBack}
          aria-label="Go back to edit"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Edit wish
        </button>
      </header>

      {/* Letter */}
      <div className="letter-page__body">
        <DigitalLetter
          selectedRakhi={selectedRakhi}
          recipientName={recipientName}
          message={message}
        />
      </div>

      {/* Footer with share action */}
      <footer className="letter-page__footer animate-fade-in delay-3">
        <p className="letter-page__hint">
          Tap the letter to read the message
        </p>
        {saveError && (
          <p className="letter-page__error" role="alert">
            {saveError}
          </p>
        )}
        <button
          className="btn btn-gold letter-page__share-btn"
          onClick={onShare}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Get Share Link'}
        </button>
      </footer>
    </main>
  )
}

export default LetterPage
