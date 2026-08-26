/* ============================================
   Database Connection
   ============================================
   Uses pg (node-postgres) with connection pooling.
   Manually parses DATABASE_URL to handle special
   characters (brackets, @) in passwords.
   Pool is lazily created after dotenv loads.
   ============================================ */

import pg from 'pg'

let pool: pg.Pool | null = null

function getPool(): pg.Pool {
  if (pool) return pool

  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  // Parse the URL to extract components (handles special chars in password)
  const parsed = new URL(url)

  pool = new pg.Pool({
    host: parsed.hostname,
    port: parseInt(parsed.port || '5432', 10),
    database: parsed.pathname.slice(1), // Remove leading /
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    ssl: {
      rejectUnauthorized: false, // Supabase requires this
    },
  })

  pool.on('error', (err) => {
    console.error('Unexpected database error:', err)
  })

  return pool
}

export async function testConnection() {
  const p = getPool()
  try {
    const client = await p.connect()
    const result = await client.query('SELECT NOW()')
    console.log('✓ Database connected at', result.rows[0].now)
    client.release()
  } catch (err) {
    console.error('✗ Database connection failed:', err)
    process.exit(1)
  }
}

export async function query(text: string, params?: unknown[]) {
  return getPool().query(text, params)
}
