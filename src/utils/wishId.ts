/* ============================================
   Wish ID Generator
   ============================================
   Generates unique, URL-safe IDs for wishes.
   Format: 8-character alphanumeric string.
   Example: a8Kx92Lm
   ============================================ */

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const ID_LENGTH = 8

/**
 * Generate a random unique wish ID.
 * Uses crypto.getRandomValues for security where available.
 */
export function generateWishId(): string {
  const array = new Uint8Array(ID_LENGTH)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => CHARSET[byte % CHARSET.length]).join('')
}

/**
 * Validate a wish ID format.
 */
export function isValidWishId(id: string): boolean {
  return /^[A-Za-z0-9]{8}$/.test(id)
}
