'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react'

type FormState = { state: 'idle' | 'loading' | 'success' | 'error'; message?: string }

export function InquiryForm() {
  const [status, setStatus] = useState<FormState>({ state: 'idle' })

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus({ state: 'loading' })
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(form)),
    })
    const result = (await response.json()) as { message?: string }
    if (response.ok) {
      event.currentTarget.reset()
      setStatus({ state: 'success', message: result.message })
    } else {
      setStatus({
        state: 'error',
        message: result.message || 'Something went wrong. Please review your details.',
      })
    }
  }

  if (status.state === 'success') {
    return (
      <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/5 p-8">
        <CheckCircle2 className="text-cyan-300" />
        <h2 className="mt-5 text-2xl font-semibold text-white">Inquiry received.</h2>
        <p className="mt-3 text-zinc-400">{status.message}</p>
      </div>
    )
  }

  const input =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-300/50 focus:bg-white/[0.05]'
  return (
    <form
      onSubmit={submit}
      className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-8"
      noValidate
    >
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-xs text-zinc-400">
          Name
          <input className={input} name="name" required minLength={2} maxLength={120} />
        </label>
        <label className="grid gap-2 text-xs text-zinc-400">
          Business email
          <input className={input} name="businessEmail" type="email" required />
        </label>
      </div>
      <label className="grid gap-2 text-xs text-zinc-400">
        Company <span className="sr-only">(optional)</span>
        <input className={input} name="company" maxLength={160} />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-xs text-zinc-400">
          Service required
          <select className={input} name="service" required defaultValue="">
            <option value="" disabled>
              Select a capability
            </option>
            {[
              'Custom Software Development',
              'Artificial Intelligence & Automation',
              'Blockchain & Web3 Development',
              'Website & Digital Experience Development',
              'Digital Marketing & Business Technology',
              'Not sure yet',
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-xs text-zinc-400">
          Project budget
          <select className={input} name="budget" required defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {['Under R50k', 'R50k – R150k', 'R150k – R500k', 'R500k+', 'To be discussed'].map(
              (item) => (
                <option key={item}>{item}</option>
              ),
            )}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-xs text-zinc-400">
        Project description
        <textarea
          className={`${input} min-h-36 resize-y`}
          name="description"
          required
          minLength={20}
          maxLength={5000}
          placeholder="What are you building, and what should technology make possible?"
        />
      </label>
      {status.state === 'error' && (
        <p role="alert" className="text-sm text-red-300">
          {status.message}
        </p>
      )}
      <button
        disabled={status.state === 'loading'}
        className="group flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-cyan-200 disabled:opacity-60"
      >
        {status.state === 'loading' ? (
          <LoaderCircle className="animate-spin" size={17} />
        ) : (
          <>
            Send inquiry <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </>
        )}
      </button>
      <p className="text-[11px] leading-5 text-zinc-600">
        Protected by server-side validation, origin checks, a honeypot and request throttling.
      </p>
    </form>
  )
}
