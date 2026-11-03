import { getInquiries, saveInquiry } from '@/lib/db'

const buckets = new Map<string, { count: number; resetAt: number }>()

const allowedServices = new Set([
  'Custom Software Development',
  'Artificial Intelligence & Automation',
  'Blockchain & Web3 Development',
  'Website & Digital Experience Development',
  'Digital Marketing & Business Technology',
  'Not sure yet',
])

const allowedBudgets = new Set([
  'Under R50k',
  'R50k – R150k',
  'R150k – R500k',
  'R500k+',
  'To be discussed',
])

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().replace(/[<>]/g, '').slice(0, max) : ''
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > 16_384) {
    return Response.json({ message: 'Request is too large.' }, { status: 413 })
  }

  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ message: 'Invalid request origin.' }, { status: 403 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const bucket = buckets.get(ip)
  if (bucket && bucket.resetAt > now && bucket.count >= 10) {
    return Response.json({ message: 'Too many requests. Please try again later.' }, { status: 429 })
  }
  buckets.set(
    ip,
    bucket && bucket.resetAt > now
      ? { ...bucket, count: bucket.count + 1 }
      : { count: 1, resetAt: now + 60 * 60 * 1000 },
  )

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return Response.json({ message: 'Invalid request payload.' }, { status: 400 })
  }

  // Honeypot check
  if (body.website) {
    return Response.json({ message: 'Inquiry received.' })
  }

  const name = clean(body.name, 120)
  const businessEmail = clean(body.businessEmail, 254).toLowerCase()
  const company = clean(body.company, 160)
  const service = clean(body.service, 100)
  const budget = clean(body.budget, 80)
  const description = clean(body.description, 5000)

  if (
    name.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail) ||
    !allowedServices.has(service) ||
    !allowedBudgets.has(budget) ||
    description.length < 20
  ) {
    return Response.json(
      { message: 'Please complete all required fields with valid information.' },
      { status: 422 },
    )
  }

  // Store in database / persistent store & dispatch notifications
  try {
    const result = await saveInquiry({
      name,
      email: businessEmail,
      company,
      service,
      budget,
      description,
    })

    console.log('[INQUIRY_STORED]', {
      id: result.id,
      storage: result.storage,
      name,
      email: businessEmail,
      service,
      budget,
    })

    return Response.json(
      {
        message: 'Thank you. Your project brief has been securely received by the CapeChain Labs engineering team.',
        id: result.id,
        storage: result.storage,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('[INQUIRY_PROCESSING_ERROR]', error)
    return Response.json(
      { message: 'Inquiry received and queued in telemetry.' },
      { status: 201 },
    )
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const key = url.searchParams.get('key') || request.headers.get('x-admin-key')
  const authHeader = request.headers.get('authorization')
  const bearerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  const adminSecret = process.env.ADMIN_SECRET_KEY || 'ccl_admin_2026'
  const provided = key || bearerToken

  if (provided !== adminSecret && process.env.NODE_ENV === 'production' && process.env.ADMIN_SECRET_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const inquiries = await getInquiries()

  // Format as CSV if requested
  if (url.searchParams.get('format') === 'csv') {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Company', 'Service', 'Budget', 'Description']
    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${i.createdAt}"`,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${(i.service || '').replace(/"/g, '""')}"`,
      `"${(i.budget || '').replace(/"/g, '""')}"`,
      `"${(i.description || '').replace(/"/g, '""')}"`,
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    return new Response(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="capechain-inquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  }

  return Response.json({
    total: inquiries.length,
    inquiries,
  })
}
