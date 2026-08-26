import { useNavigate } from 'react-router-dom'
import StepHeader from '../components/StepHeader'
import RakhiSelection from '../components/RakhiSelection'
import { useCreateFlow } from '../App'
import type { Rakhi } from '../data/rakhis'
import './StepPage.css'

function RakhiSelectPage() {
  const navigate = useNavigate()
  const { setSelectedRakhi } = useCreateFlow()

  const handleSelect = (rakhi: Rakhi) => {
    setSelectedRakhi(rakhi)
    navigate('/create/message')
  }

  return (
    <main className="step-page">
      <StepHeader title="Choose Your Rakhi" step={1} totalSteps={3} />

      <div className="container step-page__content">
        <RakhiSelection onSelect={handleSelect} />
      </div>
    </main>
  )
}

export default RakhiSelectPage
