/* ============================================
   Rate Limiter (In-Memory)
   ============================================
   Simple sliding window rate limiter.
   For production, consider Redis-backed limiter.
   ============================================ */

import type { Request, Response, NextFunction } from 'express'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key)
    }
  }
}, 5 * 60 * 1000)

export function rateLimit(opts: {
  windowMs: number
  max: number
  message?: string
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || req.socket.remoteAddress || 'unknown'
    const now = Date.now()
    const entry = store.get(key)

    if (!entry || now > entry.resetAt) {
      // New window
      store.set(key, { count: 1, resetAt: now + opts.windowMs })
      next()
      return
    }

    if (entry.count >= opts.max) {
      res.status(429).json({
        error: opts.message || 'Too many requests. Please try again later.',
      })
      return
    }

    entry.count++
    next()
  }
}
