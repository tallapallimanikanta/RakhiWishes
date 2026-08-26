import { useEffect, useState } from 'react'
import './EnvelopeAnimation.css'

interface EnvelopeAnimationProps {
  onComplete: () => void
}

function EnvelopeAnimation({ onComplete }: EnvelopeAnimationProps) {
  const [phase, setPhase] = useState<'enter' | 'flap-open' | 'card-in' | 'flap-close' | 'done'>('enter')

  useEffect(() => {
    // Phase timeline
    const timers: ReturnType<typeof setTimeout>[] = []

    // 1. Envelope enters
    timers.push(setTimeout(() => setPhase('flap-open'), 600))
    // 2. Flap opens
    timers.push(setTimeout(() => setPhase('card-in'), 1200))
    // 3. Card slides in
    timers.push(setTimeout(() => setPhase('flap-close'), 2200))
    // 4. Flap closes
    timers.push(setTimeout(() => setPhase('done'), 3000))
    // 5. Navigate
    timers.push(setTimeout(() => onComplete(), 3600))

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className={`envelope-overlay envelope-overlay--${phase}`}>
      <div className="envelope-scene">
        {/* Floating hearts */}
        <div className="envelope-hearts" aria-hidden="true">
          <span className="envelope-heart envelope-heart--1">♥</span>
          <span className="envelope-heart envelope-heart--2">♥</span>
          <span className="envelope-heart envelope-heart--3">♥</span>
          <span className="envelope-heart envelope-heart--4">♥</span>
          <span className="envelope-heart envelope-heart--5">♥</span>
        </div>

        {/* The letter/card going in */}
        <div className="envelope-letter" aria-hidden="true">
          <div className="envelope-letter__inner">
            <div className="envelope-letter__rakhi">✦</div>
            <div className="envelope-letter__line" />
            <div className="envelope-letter__line envelope-letter__line--short" />
            <div className="envelope-letter__line" />
          </div>
        </div>

        {/* Envelope */}
        <div className="envelope">
          <div className="envelope__body">
            <div className="envelope__liner" />
          </div>
          <div className="envelope__flap" />
          <div className="envelope__seal">♥</div>
        </div>

        <p className="envelope-text">
          {phase === 'enter' && 'Preparing your letter...'}
          {phase === 'flap-open' && 'Opening envelope...'}
          {phase === 'card-in' && 'Placing your wish inside...'}
          {phase === 'flap-close' && 'Sealing with love...'}
          {phase === 'done' && 'Sent with love!'}
        </p>
      </div>
    </div>
  )
}

export default EnvelopeAnimation
