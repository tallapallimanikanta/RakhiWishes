/* ============================================
   Express Server
   ============================================
   Serves the API and static files for RakhiWishes.
   In development: Vite proxies /api to this server.
   In production: This server serves everything.
   ============================================ */

import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { testConnection } from './db.js'
import wishesRouter from './routes/wishes.js'
import { rateLimit } from './rateLimit.js'

const app = express()
const PORT = process.env.PORT || 3001
const isProduction = process.env.NODE_ENV === 'production'

/* ── Middleware ── */
app.use(cors())
app.use(express.json({ limit: '10kb' }))

/* ── Rate limiting ── */
app.use(
  '/api/wishes',
  rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: 'Too many wish requests. Please try again later.',
  })
)

/* ── API Routes ── */
app.use('/api/wishes', wishesRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

/* ── Serve static files + SPA fallback in production ── */
if (isProduction) {
  const distPath = path.resolve(process.cwd(), 'dist')

  if (fs.existsSync(distPath)) {
    // Serve static assets (JS, CSS, images, favicon)
    app.use(express.static(distPath))

    // SPA fallback — for React Router routes like /wish/:id
    // Only triggered when express.static doesn't find a matching file
    app.use((req, res) => {
      // Don't intercept API routes
      if (req.path.startsWith('/api/')) {
        res.status(404).json({ error: 'Not found' })
        return
      }
      res.sendFile(path.join(distPath, 'index.html'))
    })

    console.log(`✓ Serving static files from ${distPath}`)
  } else {
    console.error(`✗ dist/ folder not found at ${distPath}`)
  }
}

/* ── Start server ── */
async function start() {
  await testConnection()
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
  })
}

start()
