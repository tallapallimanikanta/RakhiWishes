/* ============================================
   Wishes API Routes
   ============================================
   POST /api/wishes     — Create a wish
   GET  /api/wishes/:id — Get a wish by ID
   
   Security:
   - All input validated server-side
   - Parameterized queries (no SQL injection)
   - Length limits enforced
   - XSS prevented by JSON response (no HTML rendering)
   ============================================ */

import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

/* ── Validation constants ── */
const NAME_MAX_LENGTH = 50
const MESSAGE_MAX_LENGTH = 500
const RAKHI_ID_MAX_LENGTH = 50
const WISH_ID_REGEX = /^[A-Za-z0-9]{8}$/

/* ── POST /api/wishes — Create a wish ── */
router.post('/', async (req, res) => {
  try {
    const { id, rakhiId, recipientName, message } = req.body

    /* Validate required fields */
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: 'Wish ID is required' })
      return
    }
    if (!rakhiId || typeof rakhiId !== 'string') {
      res.status(400).json({ error: 'Rakhi ID is required' })
      return
    }
    if (!recipientName || typeof recipientName !== 'string') {
      res.status(400).json({ error: 'Recipient name is required' })
      return
    }
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' })
      return
    }

    /* Validate format */
    if (!WISH_ID_REGEX.test(id)) {
      res.status(400).json({ error: 'Invalid wish ID format' })
      return
    }

    /* Validate lengths */
    const trimmedName = recipientName.trim()
    const trimmedMessage = message.trim()
    const trimmedRakhiId = rakhiId.trim()

    if (trimmedName.length === 0 || trimmedName.length > NAME_MAX_LENGTH) {
      res.status(400).json({
        error: `Recipient name must be 1–${NAME_MAX_LENGTH} characters`,
      })
      return
    }
    if (trimmedMessage.length === 0 || trimmedMessage.length > MESSAGE_MAX_LENGTH) {
      res.status(400).json({
        error: `Message must be 1–${MESSAGE_MAX_LENGTH} characters`,
      })
      return
    }
    if (trimmedRakhiId.length > RAKHI_ID_MAX_LENGTH) {
      res.status(400).json({ error: 'Invalid Rakhi ID' })
      return
    }

    /* Check if ID already exists */
    const existing = await query('SELECT id FROM wishes WHERE id = $1', [id])
    if (existing.rows.length > 0) {
      res.status(409).json({ error: 'Wish already exists' })
      return
    }

    /* Insert wish — parameterized query prevents SQL injection */
    const result = await query(
      `INSERT INTO wishes (id, rakhi_id, recipient_name, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, rakhi_id, recipient_name, message, created_at`,
      [id, trimmedRakhiId, trimmedName, trimmedMessage]
    )

    const wish = result.rows[0]
    res.status(201).json({
      id: wish.id,
      rakhiId: wish.rakhi_id,
      recipientName: wish.recipient_name,
      message: wish.message,
      createdAt: wish.created_at,
    })
  } catch (err) {
    console.error('Error creating wish:', err)
    res.status(500).json({ error: 'Failed to create wish' })
  }
})

/* ── GET /api/wishes/:id — Get a wish by ID ── */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    /* Validate ID format */
    if (!id || !WISH_ID_REGEX.test(id)) {
      res.status(400).json({ error: 'Invalid wish ID format' })
      return
    }

    /* Query — parameterized */
    const result = await query(
      `SELECT id, rakhi_id, recipient_name, message, created_at
       FROM wishes WHERE id = $1`,
      [id]
    )

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Wish not found' })
      return
    }

    const wish = result.rows[0]
    res.json({
      id: wish.id,
      rakhiId: wish.rakhi_id,
      recipientName: wish.recipient_name,
      message: wish.message,
      createdAt: wish.created_at,
    })
  } catch (err) {
    console.error('Error fetching wish:', err)
    res.status(500).json({ error: 'Failed to fetch wish' })
  }
})

export default router
