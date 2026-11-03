import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn how CapeChain Labs approaches software engineering, intelligent systems and digital infrastructure.',
}

const principles = [
  [
    '01',
    'Technology should create possibility',
    'We look beyond incremental improvement toward systems that unlock entirely new ways to operate and grow.',
  ],
  [
    '02',
    'Complexity needs disciplined clarity',
    'Strong architecture makes complex products understandable, resilient and maintainable.',
  ],
  [
    '03',
    'Quality is a system, not a phase',
    'Security, performance, accessibility and reliability belong in the process from the first decision.',
  ],
  [
    '04',
    'Innovation must be useful',
    'Novelty matters only when it improves the human or business outcome.',
  ],
]

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About CapeChain Labs"
        title="Technology without conventional boundaries."
        description="We are a technology engineering company focused on turning ambitious ideas into intelligent software, digital products and future-ready infrastructure."
      />
      <section className="border-y border-white/10 bg-[#0b0d11] px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[.25em] text-cyan-300">Who we are</p>
            <h2 className="mt-5 text-4xl tracking-[-.04em] sm:text-6xl">
              A lab for serious digital ambition.
            </h2>
          </Reveal>
          <Reveal className="space-y-6 text-base leading-8 text-zinc-400">
            <p>
              CapeChain Labs designs and engineers complete digital products and intelligent
              technology infrastructure.
            </p>
            <p>
              We work at the intersection of software engineering, artificial intelligence,
              blockchain and digital transformation—connecting strategic thinking to executable
              systems.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal className="min-h-72 rounded-3xl border border-white/10 bg-white/[.025] p-8">
              <p className="text-xs uppercase tracking-[.2em] text-cyan-300">Vision</p>
              <h3 className="mt-16 text-3xl tracking-[-.03em]">
                A future where ambitious organisations can access the engineering capability to
                build what comes next.
              </h3>
            </Reveal>
            <Reveal className="min-h-72 rounded-3xl bg-white p-8 text-black">
              <p className="text-xs uppercase tracking-[.2em] text-blue-600">Mission</p>
              <h3 className="mt-16 text-3xl tracking-[-.03em]">
                Engineer intelligent systems that create durable value, operational leverage and new
                possibility.
              </h3>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="px-5 pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[.25em] text-cyan-300">Principles</p>
            <h2 className="mt-5 text-4xl tracking-[-.04em] sm:text-6xl">
              How we think shapes what we build.
            </h2>
          </Reveal>
          <div className="mt-14 border-t border-white/10">
            {principles.map(([n, t, c]) => (
              <Reveal
                key={n}
                className="grid gap-5 border-b border-white/10 py-8 md:grid-cols-[80px_1fr_1fr]"
              >
                <span className="text-xs text-zinc-700">{n}</span>
                <h3 className="text-xl">{t}</h3>
                <p className="text-sm leading-6 text-zinc-500">{c}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
