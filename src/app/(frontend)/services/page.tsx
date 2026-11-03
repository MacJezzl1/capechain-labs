import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { getServices } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Custom software, AI automation, blockchain engineering, digital experiences and business technology services.',
}

export default async function ServicesPage() {
  const services = await getServices()
  return (
    <main>
      <PageHero
        eyebrow="Capabilities"
        title="Engineering services for what comes next."
        description="From product strategy to production infrastructure, CapeChain Labs combines technical depth with a clear focus on business outcomes."
      />
      <section className="px-5 pb-28">
        <div className="mx-auto max-w-7xl">
          {services.length ? (
            <div className="space-y-5">
              {services.map((service, index) => (
                <Reveal
                  key={service.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.025]"
                >
                  <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[.9fr_1.1fr]">
                    <div>
                      <p className="text-xs text-cyan-300">
                        0{index + 1} / {service.eyebrow}
                      </p>
                      <h2 className="mt-6 text-3xl tracking-[-.04em] sm:text-5xl">
                        {service.title}
                      </h2>
                      <p className="mt-6 max-w-xl text-sm leading-7 text-zinc-400">
                        {service.summary}
                      </p>
                      <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm hover:bg-white/5"
                      >
                        Discuss this capability <ArrowRight size={15} />
                      </Link>
                    </div>
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div>
                        <p className="mb-4 text-[10px] uppercase tracking-[.22em] text-zinc-600">
                          Problems we solve
                        </p>
                        <ul className="space-y-3">
                          {(service.problems ?? []).map((row) => (
                            <li key={row.id} className="text-sm text-zinc-400">
                              — {row.item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-4 text-[10px] uppercase tracking-[.22em] text-zinc-600">
                          Deliverables
                        </p>
                        <ul className="space-y-3">
                          {(service.deliverables ?? []).map((row) => (
                            <li key={row.id} className="text-sm text-zinc-400">
                              — {row.item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="mb-4 text-[10px] uppercase tracking-[.22em] text-zinc-600">
                          Technology landscape
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(service.technologies ?? []).map((row) => (
                            <span
                              key={row.id}
                              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-500"
                            >
                              {row.item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/15 p-10 text-zinc-500">
              Service content is being prepared in the CMS.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
