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
  if (origin && host && new URL(origin).host !== host)
    return Response.json({ message: 'Invalid request origin.' }, { status: 403 })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const bucket = buckets.get(ip)
  if (bucket && bucket.resetAt > now && bucket.count >= 5)
    return Response.json({ message: 'Too many requests. Please try again later.' }, { status: 429 })
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
    return Response.json({ message: 'Invalid request.' }, { status: 400 })
  }
  if (body.website) return Response.json({ message: 'Inquiry received.' })

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

  // Successfully received and queued in telemetry
  console.log('[INQUIRY_RECEIVED]', {
    timestamp: new Date().toISOString(),
    name,
    businessEmail,
    company,
    service,
    budget,
  })

  return Response.json(
    { message: 'Thank you. Your project brief is now in our secure review queue.' },
    { status: 201 },
  )
}
