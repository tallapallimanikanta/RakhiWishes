import { useNavigate } from 'react-router-dom'
import './StepHeader.css'

interface StepHeaderProps {
  title: string
  step: number
  totalSteps: number
}

function StepHeader({ title, step, totalSteps }: StepHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="step-header">
      <div className="container step-header__inner">
        <button
          className="step-header__back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="step-header__center">
          <h1 className="step-header__title">{title}</h1>
          <div className="step-header__progress">
            <div className="step-header__bar">
              <div
                className="step-header__fill"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <span className="step-header__count">{step}/{totalSteps}</span>
          </div>
        </div>

      </div>
    </header>
  )
}

export default StepHeader
