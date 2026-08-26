import type { Rakhi } from '../data/rakhis'
import './DigitalLetter.css'

interface LetterBackProps {
  selectedRakhi: Rakhi | null
  recipientName: string
  message: string
}

function LetterBack({ selectedRakhi, recipientName, message }: LetterBackProps) {
  const displayName = recipientName.trim() || '[Name]'
  const displayMessage = message.trim()

  return (
    <div className="letter-back">
      {/* Background pattern */}
      <div className="letter-back__pattern" aria-hidden="true">
        <span className="letter-back__pattern-dot letter-back__pattern-dot--1" />
        <span className="letter-back__pattern-dot letter-back__pattern-dot--2" />
        <span className="letter-back__pattern-dot letter-back__pattern-dot--3" />
        <span className="letter-back__pattern-dot letter-back__pattern-dot--4" />
      </div>

      {/* Subtle particles */}
      <div className="letter-back__particles" aria-hidden="true">
        <span className="letter-back__particle letter-back__particle--1" />
        <span className="letter-back__particle letter-back__particle--2" />
        <span className="letter-back__particle letter-back__particle--3" />
        <span className="letter-back__particle letter-back__particle--4" />
        <span className="letter-back__particle letter-back__particle--5" />
      </div>

      {/* Top ornament */}
      <div className="letter-back__ornament" aria-hidden="true">
        <span className="letter-back__ornament-line" />
        <span className="letter-back__ornament-star">✦</span>
        <span className="letter-back__ornament-diamond" />
        <span className="letter-back__ornament-star">✦</span>
        <span className="letter-back__ornament-line" />
      </div>

      {/* Message content — staggered fade-in */}
      <div className="letter-back__content">
        {/* Greeting */}
        <p className="letter-back__greeting letter-back__reveal letter-back__reveal--1">
          Dear {displayName},
        </p>

        {/* Message */}
        <div className="letter-back__message letter-back__reveal letter-back__reveal--2">
          {displayMessage ? (
            <p className="letter-back__message-text">{displayMessage}</p>
          ) : (
            <p className="letter-back__placeholder">
              Your heartfelt message will appear here...
            </p>
          )}
        </div>

        {/* Closing */}
        <p className="letter-back__closing letter-back__reveal letter-back__reveal--3">
          Happy Raksha Bandhan!
        </p>

        {/* Signature */}
        <div className="letter-back__signature letter-back__reveal letter-back__reveal--4">
          <span className="letter-back__signature-text">With love,</span>
          <span className="letter-back__signature-line" />
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="letter-back__ornament" aria-hidden="true">
        <span className="letter-back__ornament-line" />
        <span className="letter-back__ornament-diamond" />
        <span className="letter-back__ornament-line" />
      </div>

      {/* Branding */}
      <p className="letter-back__brand letter-back__reveal letter-back__reveal--5">
        Sent with love via RakhiWishes
      </p>

      {/* Small Rakhi */}
      {selectedRakhi && (
        <div className="letter-back__rakhi-small letter-back__reveal letter-back__reveal--5" aria-hidden="true">
          <div
            className="letter-back__rakhi-small-circle"
            style={{ background: selectedRakhi.gradient }}
          >
            <div className="letter-back__rakhi-small-center">
              <div
                className="letter-back__rakhi-small-dot"
                style={{ backgroundColor: selectedRakhi.accentColor }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LetterBack
