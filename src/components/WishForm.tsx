import { useState } from 'react'
import {
  presetCategories,
  presetMessages,
  type PresetCategory,
} from '../data/presetMessages'
import { translateText, languages } from '../utils/translate'
import './WishForm.css'

/* ── Validation constants ── */
const NAME_MAX_LENGTH = 50
const MESSAGE_MAX_LENGTH = 500

interface WishFormProps {
  recipientName: string
  senderName: string
  message: string
  onRecipientNameChange: (value: string) => void
  onSenderNameChange: (value: string) => void
  onMessageChange: (value: string) => void
}

function WishForm({
  recipientName,
  senderName,
  message,
  onRecipientNameChange,
  onSenderNameChange,
  onMessageChange,
}: WishFormProps) {
  const [activeCategory, setActiveCategory] = useState<PresetCategory | null>(null)
  const [nameTouched, setNameTouched] = useState(false)
  const [messageTouched, setMessageTouched] = useState(false)
  const [targetLang, setTargetLang] = useState('hi')
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, string>>({})
  const [translatingId, setTranslatingId] = useState<string | null>(null)

  /* ── Derived state ── */
  const trimmedName = recipientName.trim()
  const nameError =
    nameTouched && trimmedName.length === 0
      ? 'Please enter their name so we can personalize your wish.'
      : nameTouched && trimmedName.length > NAME_MAX_LENGTH
        ? `Name must be ${NAME_MAX_LENGTH} characters or fewer.`
        : null

  const messageError =
    messageTouched && message.trim().length === 0
      ? 'A short message will make their day special.'
      : message.length > MESSAGE_MAX_LENGTH
        ? `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`
        : null

  const filteredPresets = activeCategory
    ? presetMessages.filter((p) => p.category === activeCategory)
    : []

  const selectedPresetId = presetMessages.find((p) => p.text === message)?.id ?? null

  /* ── Handlers ── */
  const handleNameChange = (value: string) => {
    if (value.length <= MESSAGE_MAX_LENGTH) {
      onRecipientNameChange(value)
    }
  }

  const handleNameBlur = () => {
    setNameTouched(true)
  }

  const handleMessageChange = (value: string) => {
    if (value.length <= MESSAGE_MAX_LENGTH) {
      onMessageChange(value)
    }
  }

  const handleMessageBlur = () => {
    setMessageTouched(true)
  }

  const handlePresetSelect = (text: string) => {
    onMessageChange(text)
    setMessageTouched(true)
  }

  const handleTranslate = async (presetId: string, text: string) => {
    const cacheKey = `${presetId}_${targetLang}`

    // If already translated, use it
    if (translatedTexts[cacheKey]) {
      handlePresetSelect(translatedTexts[cacheKey])
      return
    }

    setTranslatingId(presetId)
    try {
      const result = await translateText(text, targetLang)
      setTranslatedTexts((prev) => ({ ...prev, [cacheKey]: result }))
      handlePresetSelect(result)
    } catch {
      // On error, use original
      handlePresetSelect(text)
    } finally {
      setTranslatingId(null)
    }
  }

  return (
    <section className="wish-form" aria-labelledby="wish-form-title">
      <div className="section-header animate-fade-in-up">
        <h2 id="wish-form-title" className="section-title">
          ❤ Write Your Heart Out ❤
        </h2>
      </div>

      <div className="wish-form__fields">
        {/* ── Recipient Name ── */}
        <div className="wish-form__field animate-fade-in-up delay-1">
          <label htmlFor="recipient-name" className="label">
            To
            <span className="label__required" aria-hidden="true">*</span>
          </label>
          <input
            id="recipient-name"
            type="text"
            className={`input input-lg ${nameError ? 'input--error' : ''}`}
            placeholder="e.g. Rahul, Priya, Bhaiya..."
            value={recipientName}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={handleNameBlur}
            autoComplete="off"
            maxLength={NAME_MAX_LENGTH}
            aria-required="true"
            aria-invalid={!!nameError}
            aria-describedby={nameError ? 'name-error' : undefined}
          />
          {nameError && (
            <p className="wish-form__error" id="name-error" role="alert">
              {nameError}
            </p>
          )}
        </div>

        {/* ── Sender Name ── */}
        <div className="wish-form__field animate-fade-in-up delay-2">
          <label htmlFor="sender-name" className="label">
            From
            <span className="label__required" aria-hidden="true">*</span>
          </label>
          <input
            id="sender-name"
            type="text"
            className="input input-lg"
            placeholder="Your name"
            value={senderName}
            onChange={(e) => onSenderNameChange(e.target.value)}
            autoComplete="off"
            maxLength={NAME_MAX_LENGTH}
          />
        </div>

        {/* ── Preset Messages ── */}
        <div className="wish-form__field animate-fade-in-up delay-2">
          <div className="preset-header">
            <span className="label">Quick Message Ideas</span>

            {/* Language selector */}
            <div className="translate-lang">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 5h7" />
                <path d="M4 3v2" />
                <path d="M6 11c1.5-1.5 3.5-2 5.5-2 3 0 5 1.5 5.5 3.5" />
                <path d="M14.5 9.5c0-2 1.5-3.5 3.5-3.5s3 1.5 3 3.5-1.5 3.5-3.5 3.5c-2 0-3.5-1-4.5-2.5" />
                <path d="M2 17h7" />
                <path d="M9 17l3-8 3 8" />
                <path d="M10.5 14.5h3" />
              </svg>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="translate-select"
                aria-label="Translate to language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category tabs */}
          <div className="preset-tabs" role="tablist" aria-label="Message categories">
            {presetCategories.map((cat) => (
              <button
                key={cat.id}
                className={`preset-tab ${
                  activeCategory === cat.id ? 'preset-tab--active' : ''
                }`}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls={`preset-panel-${cat.id}`}
                onClick={() =>
                  setActiveCategory(activeCategory === cat.id ? null : cat.id)
                }
              >
                <span className="preset-tab__emoji" aria-hidden="true">
                  {cat.emoji}
                </span>
                <span className="preset-tab__label">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Preset cards */}
          {activeCategory && (
            <div
              className="preset-panel"
              id={`preset-panel-${activeCategory}`}
              role="tabpanel"
              aria-label={`${activeCategory} message presets`}
            >
              <div className="preset-grid">
                {filteredPresets.map((preset) => {
                  const cacheKey = `${preset.id}_${targetLang}`
                  const isTranslated = !!translatedTexts[cacheKey]
                  const displayText = translatedTexts[cacheKey] || preset.text

                  return (
                    <div
                      key={preset.id}
                      className={`preset-card ${
                        selectedPresetId === preset.id ||
                        (isTranslated && message === translatedTexts[cacheKey])
                          ? 'preset-card--selected'
                          : ''
                      }`}
                    >
                      <button
                        className="preset-card__body"
                        onClick={() => handlePresetSelect(displayText)}
                        aria-label={`Use ${preset.label} message`}
                      >
                        <span className="preset-card__label">{preset.label}</span>
                        <span className="preset-card__preview">{displayText}</span>
                        {isTranslated && (
                          <span className="preset-card__translated-badge">Translated</span>
                        )}
                        <span className="preset-card__action">
                          {(selectedPresetId === preset.id ||
                            (isTranslated && message === translatedTexts[cacheKey])) ? (
                            <span className="preset-card__check" aria-label="Selected">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Selected
                            </span>
                          ) : (
                            'Use this'
                          )}
                        </span>
                      </button>
                      <button
                        className="preset-card__translate"
                        onClick={() => handleTranslate(preset.id, preset.text)}
                        disabled={translatingId === preset.id}
                        aria-label={`Translate ${preset.label} to ${languages.find(l => l.code === targetLang)?.label}`}
                      >
                        {translatingId === preset.id ? (
                          <span className="preset-card__translate-spinner" />
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M2 5h7" />
                            <path d="M4 3v2" />
                            <path d="M6 11c1.5-1.5 3.5-2 5.5-2 3 0 5 1.5 5.5 3.5" />
                            <path d="M14.5 9.5c0-2 1.5-3.5 3.5-3.5s3 1.5 3 3.5-1.5 3.5-3.5 3.5c-2 0-3.5-1-4.5-2.5" />
                            <path d="M2 17h7" />
                            <path d="M9 17l3-8 3 8" />
                            <path d="M10.5 14.5h3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── Personal Message ── */}
        <div className="wish-form__field animate-fade-in-up delay-3">
          <label htmlFor="personal-message" className="label">
            Your Personal Message
            <span className="label__required" aria-hidden="true">*</span>
          </label>
          <textarea
            id="personal-message"
            className={`textarea ${messageError ? 'textarea--error' : ''}`}
            placeholder="Write something heartfelt... Tell them what they mean to you."
            value={message}
            onChange={(e) => handleMessageChange(e.target.value)}
            onBlur={handleMessageBlur}
            rows={5}
            aria-required="true"
            aria-invalid={!!messageError}
            aria-describedby={
              messageError
                ? 'message-error'
                : 'message-hint'
            }
          />
          <div className="wish-form__meta">
            {messageError ? (
              <p className="wish-form__error" id="message-error" role="alert">
                {messageError}
              </p>
            ) : (
              <p className="wish-form__hint" id="message-hint">
                {message.length > 0
                  ? `${message.length} / ${MESSAGE_MAX_LENGTH} characters`
                  : 'This message will appear inside the digital letter'}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WishForm
