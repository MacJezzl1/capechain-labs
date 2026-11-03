import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { InquiryForm } from '@/components/InquiryForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a software, AI, blockchain or digital infrastructure project with CapeChain Labs.',
}

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Start a project"
        title="Bring us the ambition. We’ll bring engineering clarity."
        description="Tell us what you are building, what is getting in the way and what success should make possible. No fake contact details—just a secure path to the right conversation."
      />
      <section className="px-5 pb-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[.24em] text-cyan-300">
              What happens next
            </p>
            <ol className="mt-8 space-y-7">
              {[
                ['01', 'We review your context'],
                ['02', 'We clarify scope and constraints'],
                ['03', 'We propose the right next step'],
              ].map(([n, t]) => (
                <li key={n} className="flex gap-5 border-b border-white/10 pb-7">
                  <span className="text-xs text-zinc-600">{n}</span>
                  <p className="text-sm text-zinc-300">{t}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                Official Channels
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="https://www.linkedin.com/company/capechain-labs"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between text-sm text-zinc-300 transition hover:text-cyan-300"
                >
                  <span className="font-medium text-white group-hover:text-cyan-300">
                    LinkedIn / CapeChain Labs
                  </span>
                  <ArrowUpRight size={15} className="text-zinc-600 group-hover:text-cyan-300" />
                </a>
                <a
                  href="https://github.com/MacJezzl1"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between text-sm text-zinc-300 transition hover:text-cyan-300"
                >
                  <span className="text-zinc-400 group-hover:text-white">
                    GitHub / MacJezzl1
                  </span>
                  <ArrowUpRight size={15} className="text-zinc-600 group-hover:text-white" />
                </a>
              </div>
              <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-zinc-500">
                Inquiries are triaged directly by our engineering leads within 24–48 hours.
              </p>
            </div>
          </div>
          <InquiryForm />
        </div>
      </section>
    </main>
  )
}
