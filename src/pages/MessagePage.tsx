import { useNavigate } from 'react-router-dom'
import StepHeader from '../components/StepHeader'
import WishForm from '../components/WishForm'
import { useCreateFlow } from '../App'
import './StepPage.css'

function MessagePage() {
  const navigate = useNavigate()
  const { recipientName, message, setRecipientName, setMessage } = useCreateFlow()

  const canProceed = recipientName.trim().length > 0 && message.trim().length > 0

  return (
    <main className="step-page">
      <StepHeader title="Write Your Heart Out" step={2} totalSteps={3} />

      <div className="container step-page__content">
        <WishForm
          recipientName={recipientName}
          message={message}
          onRecipientNameChange={setRecipientName}
          onMessageChange={setMessage}
        />

        <div className="step-page__action">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/create/preview')}
            disabled={!canProceed}
          >
            Preview Greeting
          </button>
          {!canProceed && (
            <p className="step-page__hint">
              Enter a name and message to continue
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default MessagePage
