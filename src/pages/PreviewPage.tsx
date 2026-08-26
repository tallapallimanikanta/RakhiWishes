import { useNavigate } from 'react-router-dom'
import StepHeader from '../components/StepHeader'
import WishPreview from '../components/WishPreview'
import { useCreateFlow } from '../App'
import './StepPage.css'

function PreviewPage() {
  const navigate = useNavigate()
  const { selectedRakhi, recipientName, message, showLetter } = useCreateFlow()

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
            onClick={showLetter}
          >
            Post the Letter
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
