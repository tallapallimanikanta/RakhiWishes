/* ============================================
   Wish Store — Supabase REST API Client
   ============================================
   Calls Supabase's built-in PostgREST API directly.
   No Express server needed.
   
   Environment variables:
   VITE_SUPABASE_URL — Supabase project URL
   VITE_SUPABASE_ANON_KEY — Supabase anon/public key
   ============================================ */

import type { Rakhi } from '../data/rakhis'

export interface WishData {
  id: string
  rakhiId: string
  recipientName: string
  senderName: string
  message: string
  createdAt: string
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const headers = {
  'Content-Type': 'application/json',
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  Prefer: 'return=representation',
}

/* ── Create a wish ── */
export async function saveWish(
  rakhi: Rakhi,
  recipientName: string,
  senderName: string,
  message: string,
  id: string
): Promise<WishData> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/wishes`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      id,
      rakhi_id: rakhi.id,
      recipient_name: recipientName.trim(),
      sender_name: senderName.trim(),
      message: message.trim(),
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to save wish' }))
    throw new Error(error.message || 'Failed to save wish')
  }

  const data = await response.json()
  const wish = Array.isArray(data) ? data[0] : data

  return {
    id: wish.id,
    rakhiId: wish.rakhi_id,
    recipientName: wish.recipient_name,
    senderName: wish.sender_name ?? '',
    message: wish.message,
    createdAt: wish.created_at,
  }
}

/* ── Load a wish by ID ── */
export async function loadWish(id: string): Promise<WishData | null> {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/wishes?id=eq.${encodeURIComponent(id)}&select=*`,
    { headers }
  )

  if (!response.ok) {
    throw new Error('Failed to load wish')
  }

  const data = await response.json()

  if (!data || data.length === 0) {
    return null
  }

  const wish = data[0]
  return {
    id: wish.id,
    rakhiId: wish.rakhi_id,
    recipientName: wish.recipient_name,
    senderName: wish.sender_name ?? '',
    message: wish.message,
    createdAt: wish.created_at,
  }
}
