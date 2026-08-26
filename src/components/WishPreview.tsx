import { useState, useRef, useCallback } from 'react'
import type { Rakhi } from '../data/rakhis'
import './WishPreview.css'

interface WishPreviewProps {
  selectedRakhi: Rakhi | null
  recipientName: string
  senderName: string
  message: string
}

function WishPreview({ selectedRakhi, recipientName, senderName, message }: WishPreviewProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)
  const hasContent = selectedRakhi !== null || recipientName.trim().length > 0 || message.trim().length > 0

  const handleDragStart = useCallback((clientX: number) => {
    startXRef.current = clientX
    setIsDragging(true)
  }, [])

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startXRef.current
    if (!isFlipped && diff > 0) {
      setDragOffset(Math.min(diff, 400))
    } else if (isFlipped && diff < 0) {
      setDragOffset(Math.max(diff, -400))
    }
  }, [isDragging, isFlipped])

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragOffset) > 80) {
      setIsFlipped((prev) => !prev)
    }
    setDragOffset(0)
  }, [isDragging, dragOffset])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    handleDragStart(e.clientX)
  }, [handleDragStart])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }, [handleDragMove])

  const onMouseUp = useCallback(() => {
    handleDragEnd()
  }, [handleDragEnd])

  const onMouseLeave = useCallback(() => {
    handleDragEnd()
  }, [handleDragEnd])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }, [handleDragStart])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX)
  }, [handleDragMove])

  const onTouchEnd = useCallback(() => {
    handleDragEnd()
  }, [handleDragEnd])

  // Convert horizontal drag to Y-axis rotation
  const baseRotation = isFlipped ? 180 : 0
  const dragRotation = (dragOffset / 400) * 90
  const rotation = baseRotation + dragRotation

  return (
    <section className="preview-section" aria-labelledby="preview-title">
      <div className="section-header animate-fade-in-up">
        <h2 id="preview-title" className="section-title">
          Live Preview
        </h2>
        <p className="preview-flip-hint">Drag or tap the card to flip</p>
      </div>

      <div className="preview-wrapper animate-fade-in-up delay-1">
        <div
          ref={containerRef}
          className={`preview-card-container ${isDragging ? 'preview-card-container--dragging' : ''}`}
          onClick={() => { if (Math.abs(dragOffset) < 5) setIsFlipped((p) => !p) }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsFlipped((p) => !p) }}
          role="button"
          tabIndex={0}
          aria-label={isFlipped ? 'Drag or tap to see front' : 'Drag or tap to see back'}
        >
          <div
            className="preview-card-inner"
            style={{
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            {/* ── Front Side ── */}
            <div className={`preview-card preview-card--front ${hasContent ? 'preview-card--active' : ''}`}>
              <div className="preview-card__ornament-top" aria-hidden="true">
                <span className="preview-card__ornament-line" />
                <span className="preview-card__ornament-diamond" />
                <span className="preview-card__ornament-line" />
              </div>

              <div className="preview-card__rakhi">
                {selectedRakhi ? (
                  <div
                    className="preview-card__rakhi-circle"
                    style={{ background: selectedRakhi.gradient }}
                  >
                    {selectedRakhi.image ? (
                      <img src={selectedRakhi.image} alt="" className="preview-card__rakhi-image" />
                    ) : (
                      <div className="preview-card__rakhi-center">
                        <div className="preview-card__rakhi-dot" style={{ backgroundColor: selectedRakhi.accentColor }} />
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

              <h3 className="preview-card__heading">Happy Raksha Bandhan</h3>

              <p className="preview-card__greeting">
                {recipientName.trim()
                  ? `Dear ${recipientName.trim()},`
                  : <span className="preview-card__placeholder-text">Dear [Name],</span>
                }
              </p>

              <div className="preview-card__message">
                {message.trim() ? (
                  <p className="preview-card__message-text">{message.trim()}</p>
                ) : (
                  <p className="preview-card__placeholder-text">
                    Your heartfelt message will appear here...
                  </p>
                )}
              </div>

              <div className="preview-card__signature">
                <span className="preview-card__signature-text">With love,</span>
                <span className="preview-card__signature-name">
                  {senderName.trim() || <span className="preview-card__placeholder-text">Your Name</span>}
                </span>
                <span className="preview-card__signature-line" />
              </div>

              <div className="preview-card__ornament-bottom" aria-hidden="true">
                <span className="preview-card__ornament-line" />
                <span className="preview-card__ornament-diamond" />
                <span className="preview-card__ornament-line" />
              </div>
            </div>

            {/* ── Back Side ── */}
            <div className="preview-card preview-card--back">
              <div className="preview-card__back-content">
                <div className="preview-card__back-rakhi" aria-hidden="true">
                  {selectedRakhi?.image ? (
                    <img src={selectedRakhi.image} alt="" className="preview-card__back-rakhi-img" />
                  ) : (
                    <div className="preview-card__back-rakhi-circle" style={{ background: selectedRakhi?.gradient }}>
                      <div className="preview-card__back-rakhi-dot" style={{ backgroundColor: selectedRakhi?.accentColor }} />
                    </div>
                  )}
                </div>

                <h3 className="preview-card__back-heading">Happy Raksha Bandhan</h3>

                {recipientName.trim() && (
                  <p className="preview-card__back-greeting">to you, {recipientName.trim()}</p>
                )}

                <p className="preview-card__back-hint">
                  This is how your letter will appear to your loved one.
                </p>

                <div className="preview-card__back-ornament" aria-hidden="true">
                  <span className="preview-card__ornament-line" />
                  <span className="preview-card__ornament-diamond" />
                  <span className="preview-card__ornament-line" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WishPreview
