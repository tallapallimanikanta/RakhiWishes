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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
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

  const shareText = `Happy Raksha Bandhan, ${recipientName}! 🎀 Here's a special wish for you:`

  /* ── Copy to clipboard ── */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(wishUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      const input = document.createElement('input')
      input.value = wishUrl
      input.style.position = 'fixed'
      input.style.opacity = '0'
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }, [wishUrl])

  /* ── Share ── */
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Rakhi Wish for ${recipientName}`,
          text: shareText,
          url: wishUrl,
        })
      } catch {
        // User cancelled — do nothing
      }
    } else {
      // Fallback: copy link
      handleCopy()
    }
  }, [wishUrl, recipientName, shareText, handleCopy])

  return (
    <div className="share-buttons" role="group" aria-label="Share wish">
      <button
        className="btn btn-primary share-btn"
        onClick={handleShare}
        aria-label="Share this wish"
      >
        <ShareIcon />
        Share
      </button>

      <button
        className={`btn btn-secondary share-btn ${copied ? 'share-btn--copied' : ''}`}
        onClick={handleCopy}
        aria-label={copied ? 'Link copied' : 'Copy wish link'}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  )
}

export default ShareButtons
