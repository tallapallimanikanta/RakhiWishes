/* ============================================
   Express Server
   ============================================
   Serves the API for RakhiWishes.
   Runs on port 3001 in development.
   ============================================ */

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import { testConnection } from './db.js'
import wishesRouter from './routes/wishes.js'
import { rateLimit } from './rateLimit.js'

const app = express()
const PORT = process.env.PORT || 3001

/* ── Middleware ── */
app.use(cors())
app.use(express.json({ limit: '10kb' })) // Limit body size

/* ── Rate limiting ── */
app.use(
  '/api/wishes',
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20, // 20 requests per minute per IP
    message: 'Too many wish requests. Please try again later.',
  })
)

/* ── Routes ── */
app.use('/api/wishes', wishesRouter)

/* ── Health check ── */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

/* ── Start server ── */
async function start() {
  await testConnection()
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
  })
}

start()
