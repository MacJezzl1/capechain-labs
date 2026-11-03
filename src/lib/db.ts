import { Pool } from 'pg'

export type InquiryRecord = {
  id: string | number
  name: string
  email: string
  company: string
  service: string
  budget: string
  description: string
  createdAt: string
  source?: string
}

// In-memory fallback ring buffer (holds up to 500 recent inquiries across serverless invocations)
declare global {
  // eslint-disable-next-line no-var
  var __ccl_inquiries_store: InquiryRecord[] | undefined
  // eslint-disable-next-line no-var
  var __ccl_pg_pool: Pool | undefined
}

const memoryStore: InquiryRecord[] = global.__ccl_inquiries_store || []
global.__ccl_inquiries_store = memoryStore

function getPgPool(): Pool | null {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.SUPABASE_DB_URL

  if (!connectionString) {
    return null
  }

  if (!global.__ccl_pg_pool) {
    const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1')
    global.__ccl_pg_pool = new Pool({
      connectionString,
      ssl: isLocal ? false : { rejectUnauthorized: false },
      max: 5,
      connectionTimeoutMillis: 5000,
    })
  }
  return global.__ccl_pg_pool
}

let tableChecked = false

async function ensurePgTable(pool: Pool) {
  if (tableChecked) return
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        service VARCHAR(255) NOT NULL,
        budget VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
    `)
    tableChecked = true
  } catch (err) {
    console.warn('[DB_INIT_WARNING] Could not auto-initialize inquiries table:', err)
  }
}

/**
 * Dispatch instant notifications to team channels (Discord / Slack / Resend Email)
 */
async function dispatchNotifications(inquiry: InquiryRecord) {
  const promises: Promise<unknown>[] = []

  // 1. Team Webhook (Discord / Slack / Teams)
  const webhookUrl =
    process.env.INQUIRY_WEBHOOK_URL ||
    process.env.DISCORD_WEBHOOK_URL ||
    process.env.SLACK_WEBHOOK_URL

  if (webhookUrl) {
    const payload = webhookUrl.includes('discord.com')
      ? {
          username: 'CapeChain Labs Dispatch',
          avatar_url: 'https://capechain-labs.vercel.app/capechain-logo.png',
          embeds: [
            {
              title: '⚡ New Project Inquiry Received',
              color: 0x00d9ff,
              fields: [
                { name: 'Client Name', value: inquiry.name, inline: true },
                { name: 'Business Email', value: `[${inquiry.email}](mailto:${inquiry.email})`, inline: true },
                { name: 'Company', value: inquiry.company || 'Not specified', inline: true },
                { name: 'Service Required', value: inquiry.service, inline: true },
                { name: 'Project Budget', value: inquiry.budget, inline: true },
                { name: 'Project Description', value: inquiry.description.slice(0, 1024) },
              ],
              footer: { text: 'CapeChain Labs Digital Headquarters' },
              timestamp: inquiry.createdAt,
            },
          ],
        }
      : {
          text: `⚡ *New CapeChain Labs Inquiry*\n*From:* ${inquiry.name} (${inquiry.email})\n*Company:* ${inquiry.company || 'N/A'}\n*Service:* ${inquiry.service}\n*Budget:* ${inquiry.budget}\n*Details:* ${inquiry.description}`,
        }

    promises.push(
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((e) => console.warn('[WEBHOOK_ERROR]', e)),
    )
  }

  // 2. Email Dispatch via Resend (if RESEND_API_KEY is configured)
  const resendApiKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL

  if (resendApiKey && notifyEmail) {
    const emailPayload = {
      from: process.env.RESEND_FROM || 'CapeChain Labs Inquiries <onboarding@resend.dev>',
      to: [notifyEmail],
      reply_to: inquiry.email,
      subject: `[New Inquiry] ${inquiry.name} — ${inquiry.service}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #08090c; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
          <h2 style="color: #00d9ff; margin-top: 0;">New Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; color: #d4d4d8;">
            <tr><td style="padding: 8px 0; color: #71717a; width: 140px;">Client Name</td><td style="font-weight: 600; color: #ffffff;">${inquiry.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #71717a;">Business Email</td><td><a href="mailto:${inquiry.email}" style="color: #00d9ff; text-decoration: none;">${inquiry.email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #71717a;">Company</td><td>${inquiry.company || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; color: #71717a;">Service</td><td><span style="background: rgba(0,217,255,0.1); color: #00d9ff; padding: 4px 8px; border-radius: 6px; font-size: 12px;">${inquiry.service}</span></td></tr>
            <tr><td style="padding: 8px 0; color: #71717a;">Budget</td><td>${inquiry.budget}</td></tr>
            <tr><td style="padding: 8px 0; color: #71717a;">Timestamp</td><td>${new Date(inquiry.createdAt).toLocaleString()}</td></tr>
          </table>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 16px;">
            <p style="color: #71717a; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;">Project Description</p>
            <p style="color: #e4e4e7; line-height: 1.6; margin: 0; white-space: pre-wrap;">${inquiry.description}</p>
          </div>
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${inquiry.email}?subject=CapeChain%20Labs%20Project%20Brief" style="display: inline-block; background: #00d9ff; color: #000000; font-weight: 600; padding: 12px 24px; border-radius: 9999px; text-decoration: none;">Reply to Client</a>
          </div>
        </div>
      `,
    }

    promises.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      }).catch((e) => console.warn('[RESEND_EMAIL_ERROR]', e)),
    )
  }

  await Promise.allSettled(promises)
}

/**
 * Save an inquiry into PostgreSQL, Supabase, or persistent in-memory store
 */
export async function saveInquiry(data: {
  name: string
  email: string
  company: string
  service: string
  budget: string
  description: string
}): Promise<{ success: boolean; id: string | number; storage: string }> {
  const now = new Date().toISOString()
  const fallbackRecord: InquiryRecord = {
    id: `ccl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...data,
    createdAt: now,
    source: 'in-memory',
  }

  // Always keep in memory store as fallback
  memoryStore.unshift(fallbackRecord)
  if (memoryStore.length > 500) memoryStore.pop()

  // 1. Try PostgreSQL (Neon, Supabase Postgres, Vercel Postgres, Railway, etc.)
  const pgPool = getPgPool()
  if (pgPool) {
    try {
      await ensurePgTable(pgPool)
      const res = await pgPool.query(
        `INSERT INTO inquiries (name, email, company, service, budget, description, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, created_at`,
        [data.name, data.email, data.company, data.service, data.budget, data.description, now],
      )
      const id = res.rows[0]?.id || fallbackRecord.id
      fallbackRecord.id = id
      fallbackRecord.source = 'postgresql'

      // Dispatch async notifications
      dispatchNotifications(fallbackRecord).catch(() => {})
      return { success: true, id, storage: 'postgresql' }
    } catch (pgError) {
      console.warn('[DB_POSTGRES_INSERT_ERROR] Falling back to next storage tier:', pgError)
    }
  }

  // 2. Try Supabase REST API (if SUPABASE_URL is configured)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      const sbRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/inquiries`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          service: data.service,
          budget: data.budget,
          description: data.description,
          created_at: now,
        }),
      })

      if (sbRes.ok) {
        const rows = await sbRes.json()
        const id = Array.isArray(rows) && rows[0]?.id ? rows[0].id : fallbackRecord.id
        fallbackRecord.id = id
        fallbackRecord.source = 'supabase'

        dispatchNotifications(fallbackRecord).catch(() => {})
        return { success: true, id, storage: 'supabase' }
      }
    } catch (sbError) {
      console.warn('[DB_SUPABASE_INSERT_ERROR] Falling back to memory store:', sbError)
    }
  }

  // 3. Fallback store (saved in-memory & logged)
  dispatchNotifications(fallbackRecord).catch(() => {})
  return { success: true, id: fallbackRecord.id, storage: 'in-memory' }
}

/**
 * Retrieve inquiries for admin review
 */
export async function getInquiries(limit = 100): Promise<InquiryRecord[]> {
  const pgPool = getPgPool()
  if (pgPool) {
    try {
      await ensurePgTable(pgPool)
      const res = await pgPool.query(
        `SELECT id, name, email, company, service, budget, description, created_at as "createdAt"
         FROM inquiries
         ORDER BY created_at DESC
         LIMIT $1`,
        [limit],
      )
      return res.rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        company: row.company || '',
        service: row.service,
        budget: row.budget,
        description: row.description,
        createdAt: new Date(row.createdAt).toISOString(),
        source: 'postgresql',
      }))
    } catch (err) {
      console.warn('[DB_FETCH_POSTGRES_ERROR] Falling back to memory store:', err)
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      const sbRes = await fetch(
        `${supabaseUrl.replace(/\/$/, '')}/rest/v1/inquiries?select=*&order=created_at.desc&limit=${limit}`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        },
      )
      if (sbRes.ok) {
        const rows = (await sbRes.json()) as Record<string, unknown>[]
        return rows.map((r) => ({
          id: (r.id as string | number) || '',
          name: (r.name as string) || '',
          email: (r.email as string) || '',
          company: (r.company as string) || '',
          service: (r.service as string) || '',
          budget: (r.budget as string) || '',
          description: (r.description as string) || '',
          createdAt: (r.created_at as string) || new Date().toISOString(),
          source: 'supabase',
        }))
      }
    } catch {
      // Fallback below
    }
  }

  return memoryStore.slice(0, limit)
}
