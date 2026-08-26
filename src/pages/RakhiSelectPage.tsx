import { useNavigate } from 'react-router-dom'
import StepHeader from '../components/StepHeader'
import RakhiSelection from '../components/RakhiSelection'
import type { Rakhi } from '../data/rakhis'
import './StepPage.css'

interface RakhiSelectPageProps {
  onSelect: (rakhi: Rakhi) => void
}

function RakhiSelectPage({ onSelect }: RakhiSelectPageProps) {
  const navigate = useNavigate()

  const handleSelect = (rakhi: Rakhi) => {
    onSelect(rakhi)
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
