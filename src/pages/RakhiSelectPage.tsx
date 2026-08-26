import { useNavigate } from 'react-router-dom'
import StepHeader from '../components/StepHeader'
import RakhiSelection from '../components/RakhiSelection'
import { useCreateFlow } from '../App'
import './StepPage.css'

function RakhiSelectPage() {
  const navigate = useNavigate()
  const { selectedRakhi, setSelectedRakhi } = useCreateFlow()

  return (
    <main className="step-page">
      <StepHeader title="Choose Your Rakhi" step={1} totalSteps={3} />

      <div className="container step-page__content">
        <RakhiSelection onSelect={setSelectedRakhi} />

        <div className="step-page__action">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/create/message')}
            disabled={!selectedRakhi}
          >
            Next
          </button>
          {!selectedRakhi && (
            <p className="step-page__hint">
              Select a Rakhi to continue
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default RakhiSelectPage
