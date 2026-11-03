import type { Metadata } from 'next'
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
            <p className="mt-8 text-sm leading-6 text-zinc-500">
              Official email, office and social contact details will appear only after they are
              verified and configured.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>
    </main>
  )
}
