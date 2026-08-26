/* ============================================
   Database Initialization
   ============================================
   Run once to create the wishes table:
     npm run db:init
   ============================================ */

import dotenv from 'dotenv'
dotenv.config()

import { query, testConnection } from './db.js'

async function initDatabase() {
  await testConnection()

  try {
    await query(`
      CREATE TABLE IF NOT EXISTS wishes (
        id VARCHAR(8) PRIMARY KEY,
        rakhi_id VARCHAR(50) NOT NULL,
        recipient_name VARCHAR(50) NOT NULL,
        message VARCHAR(500) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✓ Table "wishes" created or already exists')

    // Verify the table
    const result = await query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'wishes'
      ORDER BY ordinal_position
    `)
    console.log('Table schema:')
    for (const row of result.rows) {
      console.log(`  ${row.column_name}: ${row.data_type}`)
    }
  } catch (err) {
    console.error('Failed to initialize database:', err)
    process.exit(1)
  }

  process.exit(0)
}

initDatabase()
