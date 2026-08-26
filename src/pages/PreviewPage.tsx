import { useState, useCallback } from 'react'
import StepHeader from '../components/StepHeader'
import WishPreview from '../components/WishPreview'
import EnvelopeAnimation from '../components/EnvelopeAnimation'
import { useCreateFlow } from '../App'
import './StepPage.css'

function PreviewPage() {
  const { selectedRakhi, recipientName, senderName, message, createAndShare } = useCreateFlow()
  const [showEnvelope, setShowEnvelope] = useState(false)

  const handlePost = useCallback(() => {
    setShowEnvelope(true)
  }, [])

  const handleEnvelopeComplete = useCallback(() => {
    createAndShare()
  }, [createAndShare])

  return (
    <main className="step-page">
      <StepHeader title="Preview Your Wish" step={3} totalSteps={3} />

      <div className="container step-page__content">
        <WishPreview
          selectedRakhi={selectedRakhi}
          recipientName={recipientName}
          senderName={senderName}
          message={message}
        />

        <div className="step-page__action">
          <button
            className="btn btn-primary btn-lg"
            onClick={handlePost}
          >
            Post the Letter
          </button>
        </div>
      </div>

      {showEnvelope && (
        <EnvelopeAnimation onComplete={handleEnvelopeComplete} />
      )}
    </main>
  )
}

export default PreviewPage
