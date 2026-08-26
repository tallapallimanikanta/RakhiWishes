import { useNavigate } from 'react-router-dom'
import StepHeader from '../components/StepHeader'
import WishPreview from '../components/WishPreview'
import type { Rakhi } from '../data/rakhis'
import './StepPage.css'

interface PreviewPageProps {
  selectedRakhi: Rakhi | null
  recipientName: string
  message: string
  onCreateWish: () => void
}

function PreviewPage({
  selectedRakhi,
  recipientName,
  message,
  onCreateWish,
}: PreviewPageProps) {
  const navigate = useNavigate()

  return (
    <main className="step-page">
      <StepHeader title="Preview Your Wish" step={3} totalSteps={3} />

      <div className="container step-page__content">
        <WishPreview
          selectedRakhi={selectedRakhi}
          recipientName={recipientName}
          message={message}
        />

        <div className="step-page__action">
          <button
            className="btn btn-primary btn-lg"
            onClick={onCreateWish}
          >
            Create My Rakhi Wish
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate('/create/message')}
          >
            Edit Message
          </button>
        </div>
      </div>
    </main>
  )
}

export default PreviewPage
