import { useState, useCallback } from 'react'
import './ShareButtons.css'

/* ── Icon Components ── */

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="5.25" y="5.25" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12.75 12.75V14.25C12.75 14.6642 12.4142 15 12 15H3.75C3.33579 15 3 14.6642 3 14.25V6C3 5.58579 3.33579 5.25 3.75 5.25H5.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4.5 9.75L7.5 12.75L13.5 5.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M13.5 6.75C14.7426 6.75 15.75 5.74264 15.75 4.5C15.75 3.25736 14.7426 2.25 13.5 2.25C12.2574 2.25 11.25 3.25736 11.25 4.5C11.25 5.74264 12.2574 6.75 13.5 6.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4.5 11.25C5.74264 11.25 6.75 10.2426 6.75 9C6.75 7.75736 5.74264 6.75 4.5 6.75C3.25736 6.75 2.25 7.75736 2.25 9C2.25 10.2426 3.25736 11.25 4.5 11.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13.5 15.75C14.7426 15.75 15.75 14.7426 15.75 13.5C15.75 12.2574 14.7426 11.25 13.5 11.25C12.2574 11.25 11.25 12.2574 11.25 13.5C11.25 14.7426 12.2574 15.75 13.5 15.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M6.136 10.164L11.864 12.336" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.864 5.664L6.136 7.836" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ── Main Component ── */

interface ShareButtonsProps {
  wishUrl: string
  recipientName: string
}

function ShareButtons({ wishUrl, recipientName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [shareError, setShareError] = useState(false)

  const shareText = `Happy Raksha Bandhan, ${recipientName}! 🎀 Here's a special wish for you:`

  /* ── Copy to clipboard ── */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(wishUrl)
      setCopied(true)
      setShareError(false)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback: select + execCommand
      const input = document.createElement('input')
      input.value = wishUrl
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setShareError(false)
      setTimeout(() => setCopied(false), 2500)
    }
  }, [wishUrl])

  /* ── Web Share API ── */
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Rakhi Wish for ${recipientName}`,
          text: shareText,
          url: wishUrl,
        })
        setShareError(false)
      } catch (err) {
        // User cancelled or share failed — fall back to copy
        if ((err as Error).name !== 'AbortError') {
          setShareError(true)
          handleCopy()
        }
      }
    } else {
      // Web Share API not supported — just copy
      handleCopy()
    }
  }, [wishUrl, recipientName, shareText, handleCopy])

  const supportsWebShare = typeof navigator !== 'undefined' && !!navigator.share

  return (
    <div className="share-buttons" role="group" aria-label="Share wish">
      {/* Primary: Copy Link or Share */}
      {supportsWebShare ? (
        <button
          className="btn btn-primary share-btn"
          onClick={handleShare}
          aria-label="Share this wish"
        >
          <ShareIcon />
          Share
        </button>
      ) : (
        <button
          className="btn btn-primary share-btn"
          onClick={handleCopy}
          aria-label="Copy wish link"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      )}

      {/* Secondary: Copy Link (when Share is primary) */}
      {supportsWebShare && (
        <button
          className={`btn btn-secondary share-btn ${copied ? 'share-btn--copied' : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Link copied' : 'Copy wish link'}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      )}

      {/* Error fallback message */}
      {shareError && (
        <p className="share-buttons__fallback" role="alert">
          Link copied instead — paste it to share
        </p>
      )}
    </div>
  )
}

export default ShareButtons
