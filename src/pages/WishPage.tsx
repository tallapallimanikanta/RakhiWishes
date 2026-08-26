import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { isValidWishId } from '../utils/wishId'
import { loadWish, type WishData } from '../utils/wishStore'
import { rakhis } from '../data/rakhis'
import DigitalLetter from '../components/DigitalLetter'
import ShareButtons from '../components/ShareButtons'
import './WishPage.css'

type WishState = 'loading' | 'found' | 'not-found' | 'error' | 'invalid'

function WishPage() {
  const { id } = useParams<{ id: string }>()
  const [state, setState] = useState<WishState>('loading')
  const [wishData, setWishData] = useState<WishData | null>(null)

  /* ── Derive invalid state during render ── */
  const isInvalid = !id || !isValidWishId(id)

  /* ── Load wish from API ── */
  useEffect(() => {
    if (isInvalid) return
    if (!id) return

    let cancelled = false

    async function fetchWish() {
      try {
        const data = await loadWish(id!)
        if (cancelled) return

        if (data) {
          setWishData(data)
          setState('found')
        } else {
          setState('not-found')
        }
      } catch {
        if (!cancelled) {
          setState('error')
        }
      }
    }

    fetchWish()

    return () => {
      cancelled = true
    }
  }, [id, isInvalid])

  /* ── Resolve Rakhi data ── */
  const rakhi = useMemo(() => {
    if (!wishData) return null
    return rakhis.find((r) => r.id === wishData.rakhiId) ?? null
  }, [wishData])

  /* ── Build share URL ── */
  const shareUrl = useMemo(() => {
    if (!id) return ''
    return `${window.location.origin}/wish/${id}`
  }, [id])

  /* ── Invalid ID ── */
  if (isInvalid) {
    return (
      <main className="wish-page wish-page--error">
        <div className="wish-page__status animate-fade-in-up">
          <div className="wish-page__status-icon" aria-hidden="true">✕</div>
          <h1 className="wish-page__status-title">Invalid Link</h1>
          <p className="wish-page__status-text">
            This wish link is not valid. Please check the URL and try again.
          </p>
          <Link to="/" className="btn btn-primary">
            Create a Wish
          </Link>
        </div>
      </main>
    )
  }

  /* ── Loading State ── */
  if (state === 'loading') {
    return (
      <main className="wish-page wish-page--loading">
        <div className="wish-page__status animate-pulse">
          <div className="wish-page__loading-circle" aria-hidden="true" />
          <p className="wish-page__status-text">Loading your wish...</p>
        </div>
      </main>
    )
  }

  /* ── Not Found ── */
  if (state === 'not-found') {
    return (
      <main className="wish-page wish-page--error">
        <div className="wish-page__status animate-fade-in-up">
          <div className="wish-page__status-icon" aria-hidden="true">?</div>
          <h1 className="wish-page__status-title">Wish Not Found</h1>
          <p className="wish-page__status-text">
            This wish may have been removed or the link may be incorrect.
          </p>
          <Link to="/" className="btn btn-primary">
            Create a Wish
          </Link>
        </div>
      </main>
    )
  }

  /* ── Error ── */
  if (state === 'error') {
    return (
      <main className="wish-page wish-page--error">
        <div className="wish-page__status animate-fade-in-up">
          <div className="wish-page__status-icon" aria-hidden="true">!</div>
          <h1 className="wish-page__status-title">Something Went Wrong</h1>
          <p className="wish-page__status-text">
            We couldn't load this wish. Please try again later.
          </p>
          <Link to="/" className="btn btn-primary">
            Create a Wish
          </Link>
        </div>
      </main>
    )
  }

  /* ── Found — Show Letter ── */
  return (
    <main className="wish-page wish-page--found">
      {/* Letter */}
      <div className="wish-page__letter animate-scale-in">
        <DigitalLetter
          selectedRakhi={rakhi}
          recipientName={wishData?.recipientName ?? ''}
          message={wishData?.message ?? ''}
        />
      </div>

      {/* Share section */}
      <section className="wish-page__share animate-fade-in delay-3">
        <hr className="divider" aria-hidden="true" />
        <p className="wish-page__share-text">
          Send a wish to someone you love
        </p>
        <ShareButtons
          wishUrl={shareUrl}
          recipientName={wishData?.recipientName ?? ''}
        />
      </section>

      {/* Footer */}
      <footer className="wish-page__footer animate-fade-in delay-4">
        <Link to="/" className="wish-page__create-link">
          Create your own wish →
        </Link>
      </footer>
    </main>
  )
}

export default WishPage
