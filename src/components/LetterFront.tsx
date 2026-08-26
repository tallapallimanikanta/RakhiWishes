import type { Rakhi } from '../data/rakhis'
import './DigitalLetter.css'

interface LetterFrontProps {
  selectedRakhi: Rakhi | null
  recipientName: string
}

function LetterFront({ selectedRakhi, recipientName }: LetterFrontProps) {
  return (
    <div className="letter-front">
      {/* Background ornament pattern */}
      <div className="letter-front__pattern" aria-hidden="true">
        <span className="letter-front__pattern-dot letter-front__pattern-dot--1" />
        <span className="letter-front__pattern-dot letter-front__pattern-dot--2" />
        <span className="letter-front__pattern-dot letter-front__pattern-dot--3" />
        <span className="letter-front__pattern-dot letter-front__pattern-dot--4" />
        <span className="letter-front__pattern-dot letter-front__pattern-dot--5" />
        <span className="letter-front__pattern-dot letter-front__pattern-dot--6" />
      </div>

      {/* Top decorative border */}
      <div className="letter-front__border letter-front__border--top" aria-hidden="true">
        <span className="letter-front__border-ornament">✦</span>
        <span className="letter-front__border-line" />
        <span className="letter-front__border-ornament">✦</span>
      </div>

      {/* Main content */}
      <div className="letter-front__content">
        {/* Rakhi display */}
        <div className="letter-front__rakhi">
          {selectedRakhi ? (
            <div
              className="letter-front__rakhi-circle"
              style={{ background: selectedRakhi.gradient }}
            >
              <div className="letter-front__rakhi-center">
                <div
                  className="letter-front__rakhi-dot"
                  style={{ backgroundColor: selectedRakhi.accentColor }}
                />
              </div>
              {/* Thread ends */}
              <span className="letter-front__thread letter-front__thread--left" style={{ backgroundColor: selectedRakhi.accentColor }} aria-hidden="true" />
              <span className="letter-front__thread letter-front__thread--right" style={{ backgroundColor: selectedRakhi.accentColor }} aria-hidden="true" />
            </div>
          ) : (
            <div className="letter-front__rakhi-circle letter-front__rakhi-circle--empty">
              <div className="letter-front__rakhi-center">
                <span className="letter-front__rakhi-question">✦</span>
              </div>
            </div>
          )}
        </div>

        {/* Heading */}
        <h1 className="letter-front__heading">
          Happy Raksha Bandhan
        </h1>

        {/* Recipient */}
        <p className="letter-front__greeting">
          to you,
          <br />
          <span className="letter-front__name">
            {recipientName.trim() || '[Name]'}
          </span>
        </p>

        {/* Decorative flourish */}
        <div className="letter-front__flourish" aria-hidden="true">
          <span className="letter-front__flourish-line" />
          <span className="letter-front__flourish-diamond" />
          <span className="letter-front__flourish-diamond letter-front__flourish-diamond--small" />
          <span className="letter-front__flourish-diamond" />
          <span className="letter-front__flourish-line" />
        </div>

        {/* Subtitle */}
        <p className="letter-front__subtitle">
          A special bond of love and protection
        </p>
      </div>

      {/* Bottom decorative border */}
      <div className="letter-front__border letter-front__border--bottom" aria-hidden="true">
        <span className="letter-front__border-ornament">✦</span>
        <span className="letter-front__border-line" />
        <span className="letter-front__border-ornament">✦</span>
      </div>
    </div>
  )
}

export default LetterFront
