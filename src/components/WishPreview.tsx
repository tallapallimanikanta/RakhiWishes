import type { Rakhi } from '../data/rakhis'
import './WishPreview.css'

interface WishPreviewProps {
  selectedRakhi: Rakhi | null
  recipientName: string
  senderName: string
  message: string
}

function WishPreview({ selectedRakhi, recipientName, senderName, message }: WishPreviewProps) {
  const hasContent = selectedRakhi !== null || recipientName.trim().length > 0 || message.trim().length > 0

  return (
    <section className="preview-section" aria-labelledby="preview-title">
      <div className="section-header animate-fade-in-up">
        <h2 id="preview-title" className="section-title">
          Live Preview
        </h2>
      </div>

      <div className="preview-wrapper animate-fade-in-up delay-1">
        <div className={`preview-card ${hasContent ? 'preview-card--active' : ''}`}>
          {/* Top ornament */}
          <div className="preview-card__ornament-top" aria-hidden="true">
            <span className="preview-card__ornament-line" />
            <span className="preview-card__ornament-diamond" />
            <span className="preview-card__ornament-line" />
          </div>

          {/* Rakhi display */}
          <div className="preview-card__rakhi">
            {selectedRakhi ? (
              <div
                className="preview-card__rakhi-circle"
                style={{ background: selectedRakhi.gradient }}
              >
                {selectedRakhi.image ? (
                  <img
                    src={selectedRakhi.image}
                    alt=""
                    className="preview-card__rakhi-image"
                  />
                ) : (
                  <div className="preview-card__rakhi-center">
                    <div
                      className="preview-card__rakhi-dot"
                      style={{ backgroundColor: selectedRakhi.accentColor }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="preview-card__rakhi-placeholder">
                <div className="preview-card__rakhi-circle preview-card__rakhi-circle--empty">
                  <div className="preview-card__rakhi-center">
                    <span className="preview-card__rakhi-question">?</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Heading */}
          <h3 className="preview-card__heading">
            Happy Raksha Bandhan
          </h3>

          {/* Recipient name */}
          <p className="preview-card__greeting">
            {recipientName.trim()
              ? `Dear ${recipientName.trim()},`
              : <span className="preview-card__placeholder-text">Dear [Name],</span>
            }
          </p>

          {/* Message */}
          <div className="preview-card__message">
            {message.trim() ? (
              <p className="preview-card__message-text">{message.trim()}</p>
            ) : (
              <p className="preview-card__placeholder-text">
                Your heartfelt message will appear here...
              </p>
            )}
          </div>

          {/* Signature line */}
          <div className="preview-card__signature">
            <span className="preview-card__signature-text">With love,</span>
            <span className="preview-card__signature-name">
              {senderName.trim() || <span className="preview-card__placeholder-text">Your Name</span>}
            </span>
            <span className="preview-card__signature-line" />
          </div>

          {/* Bottom ornament */}
          <div className="preview-card__ornament-bottom" aria-hidden="true">
            <span className="preview-card__ornament-line" />
            <span className="preview-card__ornament-diamond" />
            <span className="preview-card__ornament-line" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WishPreview
