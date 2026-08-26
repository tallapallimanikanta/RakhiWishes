import { useState } from 'react'
import { rakhis, type Rakhi } from '../data/rakhis'
import './RakhiSelection.css'

interface RakhiSelectionProps {
  onSelect: (rakhi: Rakhi) => void
}

function RakhiSelection({ onSelect }: RakhiSelectionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (rakhi: Rakhi) => {
    setSelectedId(rakhi.id)
    onSelect(rakhi)
  }

  return (
    <section className="rakhi-section" aria-labelledby="rakhi-section-title">
      <div className="section-header animate-fade-in-up">
        <h2 id="rakhi-section-title" className="section-title">
          Choose Your Rakhi
        </h2>
        <p className="section-subtitle">
          Pick a design that speaks to your heart
        </p>
      </div>

      <div
        className="rakhi-grid"
        role="radiogroup"
        aria-label="Rakhi design selection"
      >
        {rakhis.map((rakhi, index) => {
          const isSelected = selectedId === rakhi.id

          return (
            <button
              key={rakhi.id}
              className={[
                'rakhi-card',
                'animate-scale-in',
                `delay-${index + 1}`,
                isSelected && 'rakhi-card--selected',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleSelect(rakhi)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${rakhi.name} — ${rakhi.description}`}
            >
              {/* Selection indicator */}
              <span
                className={`rakhi-card__check ${isSelected ? 'rakhi-card__check--visible' : ''}`}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* Rakhi preview */}
              <div className="rakhi-card__preview-wrapper">
                <div
                  className="rakhi-card__preview"
                  style={{ background: rakhi.gradient }}
                >
                  {rakhi.image ? (
                    <img
                      src={rakhi.image}
                      alt=""
                      className="rakhi-card__image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="rakhi-card__placeholder" aria-hidden="true">
                      <div
                        className="rakhi-card__center"
                        style={{ borderColor: rakhi.accentColor }}
                      >
                        <div
                          className="rakhi-card__dot"
                          style={{ backgroundColor: rakhi.accentColor }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card label */}
              <span className="rakhi-card__name">{rakhi.name}</span>
              <span className="rakhi-card__desc">{rakhi.description}</span>
            </button>
          )
        })}
      </div>

      {/* Selected feedback */}
      <div
        className={`rakhi-feedback ${selectedId ? 'rakhi-feedback--visible' : ''}`}
        aria-live="polite"
      >
        {selectedId && (
          <p>
            <span className="rakhi-feedback__label">Selected:</span>{' '}
            {rakhis.find((r) => r.id === selectedId)?.name}
          </p>
        )}
      </div>
    </section>
  )
}

export default RakhiSelection
