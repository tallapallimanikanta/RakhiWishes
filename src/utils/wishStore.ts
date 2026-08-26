/* ============================================
   Wish Store — API Client
   ============================================
   Communicates with the Express backend.
   In development, Vite proxies /api/* to port 3001.
   In production, both are served from the same origin.
   ============================================ */

import type { Rakhi } from '../data/rakhis'

export interface WishData {
  id: string
  rakhiId: string
  recipientName: string
  message: string
  createdAt: string
}

/* ── Create a wish ── */
export async function saveWish(
  rakhi: Rakhi,
  recipientName: string,
  message: string,
  id: string
): Promise<WishData> {
  const response = await fetch('/api/wishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      rakhiId: rakhi.id,
      recipientName: recipientName.trim(),
      message: message.trim(),
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to save wish' }))
    throw new Error(error.error || 'Failed to save wish')
  }

  return response.json()
}

/* ── Load a wish by ID ── */
export async function loadWish(id: string): Promise<WishData | null> {
  const response = await fetch(`/api/wishes/${id}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error('Failed to load wish')
  }

  return response.json()
}
