import { useEffect, useState } from 'react'
import './EnvelopeAnimation.css'

interface EnvelopeAnimationProps {
  onComplete: () => void
}

function EnvelopeAnimation({ onComplete }: EnvelopeAnimationProps) {
  const [phase, setPhase] = useState<'enter' | 'flap-open' | 'card-in' | 'flap-close' | 'done'>('enter')

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(setTimeout(() => setPhase('flap-open'), 600))
    timers.push(setTimeout(() => setPhase('card-in'), 1400))
    timers.push(setTimeout(() => setPhase('flap-close'), 2400))
    timers.push(setTimeout(() => setPhase('done'), 3200))
    timers.push(setTimeout(() => onComplete(), 3800))

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className={`envelope-overlay envelope-overlay--${phase}`}>
      <div className="envelope-scene">
        {/* Letter */}
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
