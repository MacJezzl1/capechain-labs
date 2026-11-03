import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { getTechnologies } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'Explore CapeChain Labs capabilities across frontend, backend, AI, blockchain, cloud, databases, DevOps and cybersecurity.',
}

export default async function TechnologyPage() {
  const technologies = await getTechnologies()
  const categories = [...new Set(technologies.map((tech) => tech.category))]
  return (
    <main>
      <PageHero
        eyebrow="Technology system"
        title="Tools selected with architectural intent."
        description="Technology is never the headline. The right system is the one that serves the product, its users and its future without unnecessary complexity."
      />
      <section className="px-5 pb-28">
        <div className="mx-auto max-w-7xl space-y-5">
          {categories.map((category, index) => (
            <Reveal
              key={category}
              className="grid gap-8 rounded-3xl border border-white/10 bg-white/[.025] p-7 sm:p-10 lg:grid-cols-[.55fr_1.45fr]"
            >
              <div>
                <p className="text-xs text-cyan-300">0{index + 1}</p>
                <h2 className="mt-5 text-3xl tracking-[-.04em]">{category}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {technologies
                  .filter((tech) => tech.category === category)
                  .map((tech) => (
                    <article
                      key={tech.id}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5"
                    >
                      <h3 className="text-base">{tech.name}</h3>
                      <p className="mt-3 text-xs leading-5 text-zinc-500">{tech.description}</p>
                    </article>
                  ))}
              </div>
            </Reveal>
          ))}
          {!technologies.length && (
            <div className="rounded-3xl border border-dashed border-white/15 p-10 text-zinc-500">
              Technology records are being prepared in the CMS.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
