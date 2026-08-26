import { useState, useEffect, useCallback } from 'react'
import type { Rakhi } from '../data/rakhis'
import LetterFront from './LetterFront'
import LetterBack from './LetterBack'
import './DigitalLetter.css'

interface DigitalLetterProps {
  selectedRakhi: Rakhi | null
  recipientName: string
  senderName: string
  message: string
}

function DigitalLetter({
  selectedRakhi,
  recipientName,
  senderName,
  message,
}: DigitalLetterProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [phase, setPhase] = useState<'entering' | 'hint' | 'ready'>('entering')

  /* ── Entrance animation sequence ── */
  useEffect(() => {
    // Phase 1: Letter enters (CSS handles the scale-in)
    // Phase 2: After 1.8s, show hint jerk
    const hintTimer = setTimeout(() => {
      setPhase('hint')
    }, 1800)

    // Phase 3: After 3.2s, ready for interaction
    const readyTimer = setTimeout(() => {
      setPhase('ready')
    }, 3200)

    return () => {
      clearTimeout(hintTimer)
      clearTimeout(readyTimer)
    }
  }, [])

  /* ── Flip handler ── */
  const handleFlip = useCallback(() => {
    if (phase === 'entering') return // Don't allow flip during entrance
    setIsFlipped((prev) => !prev)
  }, [phase])

  return (
    <div
      className={`digital-letter ${
        phase === 'entering'
          ? 'digital-letter--entering'
          : phase === 'hint'
            ? 'digital-letter--hint'
            : 'digital-letter--ready'
      } ${isFlipped ? 'digital-letter--flipped' : ''}`}
      role="region"
      aria-label="Digital Raksha Bandhan letter"
    >
      {/* Accessible flip trigger */}
      <button
        className="digital-letter__flip-trigger"
        onClick={handleFlip}
        aria-label={
          isFlipped
            ? 'Flip letter to see the front'
            : 'Flip letter to read the message'
        }
      >
        <div className="digital-letter__card">
          {/* Front side */}
          <div className="digital-letter__face digital-letter__face--front">
            <LetterFront
              selectedRakhi={selectedRakhi}
              recipientName={recipientName}
            />
          </div>

          {/* Back side */}
          <div className="digital-letter__face digital-letter__face--back">
            <LetterBack
              recipientName={recipientName}
              senderName={senderName}
              message={message}
            />
          </div>
        </div>
      </button>

      {/* Flip hint label */}
      <p
        className={`digital-letter__label ${
          phase === 'ready' && !isFlipped
            ? 'digital-letter__label--visible'
            : ''
        }`}
        aria-hidden="true"
      >
        Tap to open
      </p>
      <p
        className={`digital-letter__label ${
          phase === 'ready' && isFlipped
            ? 'digital-letter__label--visible'
            : ''
        }`}
        aria-hidden="true"
      >
        Tap to close
      </p>
    </div>
  )
}

export default DigitalLetter
