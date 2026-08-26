import './DigitalLetter.css'

interface LetterBackProps {
  recipientName: string
  senderName: string
  message: string
}

function LetterBack({ recipientName, senderName, message }: LetterBackProps) {
  const displayName = recipientName.trim() || '[Name]'
  const displayMessage = message.trim()
  const displaySender = senderName.trim() || 'Your Name'

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
        <span className="letter-back__ornament-diamond" />
        <span className="letter-back__ornament-line" />
      </div>

      {/* Message content */}
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
          <span className="letter-back__signature-name">{displaySender}</span>
          <span className="letter-back__signature-line" />
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="letter-back__ornament" aria-hidden="true">
        <span className="letter-back__ornament-line" />
        <span className="letter-back__ornament-diamond" />
        <span className="letter-back__ornament-line" />
      </div>
    </div>
  )
}

export default LetterBack
