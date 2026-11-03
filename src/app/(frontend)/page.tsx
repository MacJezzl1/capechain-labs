import Link from 'next/link'
import {
  ArrowDown,
  ArrowRight,
  Braces,
  CircuitBoard,
  Cloud,
  Cpu,
  Database,
  Workflow,
} from 'lucide-react'
import { HeroScene } from '@/components/HeroScene'
import { Reveal } from '@/components/Reveal'
import { GithubShowcase } from '@/components/GithubShowcase'
import { capabilityPillars } from '@/lib/content'
import { getCompany, getGithubRepos, getProjects, getServices, getTechnologies } from '@/lib/data'

export default async function HomePage() {
  const [services, technologies, projects, company] = await Promise.all([
    getServices(),
    getTechnologies(),
    getProjects(),
    getCompany(),
  ])
  const github = await getGithubRepos(company.githubProfile)
  return (
    <main>
      <section className="relative min-h-screen overflow-hidden px-5">
        <div className="grid-surface absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(71,123,255,.16),transparent_38%),radial-gradient(circle_at_28%_70%,rgba(0,217,255,.08),transparent_28%)]" />
        <div className="absolute inset-y-0 right-[-12%] w-[75%] min-w-[650px] max-md:opacity-55">
          <HeroScene />
        </div>
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-end pb-20 pt-36 sm:items-center sm:pb-0">
          <div className="relative z-10 max-w-4xl">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              Software · Intelligence · Infrastructure
            </p>
            <h1 className="text-5xl font-medium leading-[0.94] tracking-[-0.06em] text-white sm:text-7xl lg:text-[6.7rem]">
              Engineering Tomorrow.
              <br />
              <span className="text-zinc-500">Building What Matters.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              CapeChain Labs transforms ambitious ideas into intelligent software, advanced digital
              infrastructure and technology-driven solutions.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-cyan-200"
              >
                Explore our capabilities{' '}
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm text-white transition hover:bg-white/5"
              >
                Start a project
              </Link>
            </div>
          </div>
        </div>
        <a
          href="#intro"
          className="absolute bottom-7 right-7 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:flex"
        >
          Scroll to explore <ArrowDown size={14} />
        </a>
      </section>

      <section id="intro" className="border-y border-white/10 bg-[#0b0d11] px-5 py-24 sm:py-36">
        <Reveal className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300">The lab</p>
          <div>
            <h2 className="max-w-4xl text-4xl leading-[1.05] tracking-[-0.045em] sm:text-6xl">
              Where ambitious ideas become{' '}
              <span className="text-zinc-500">intelligent technology.</span>
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-7 text-zinc-400">
              We engineer software, intelligent systems and digital infrastructure that help
              organisations innovate, operate and scale—without conventional boundaries.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300">
              Core capabilities
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl tracking-[-0.04em] sm:text-6xl">
              Beyond development.
              <br />
              <span className="text-zinc-500">Into engineering.</span>
            </h2>
          </Reveal>
          <div className="mt-16 border-t border-white/10">
            {capabilityPillars.map(([number, title, copy]) => (
              <Reveal
                key={number}
                className="group grid gap-4 border-b border-white/10 py-7 transition hover:bg-white/[0.02] sm:grid-cols-[80px_1fr_1fr] sm:items-center"
              >
                <span className="text-xs text-zinc-700">{number}</span>
                <h3 className="text-xl text-white sm:text-2xl">{title}</h3>
                <p className="max-w-lg text-sm leading-6 text-zinc-500">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-24 text-black sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-blue-600">
                Service architecture
              </p>
              <h2 className="mt-5 text-4xl tracking-[-0.045em] sm:text-6xl">
                Systems built for
                <br />
                real-world complexity.
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold">
              Full service directory <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-black/10 md:grid-cols-2">
            {services.length ? (
              services.map((service, index) => (
                <article key={service.id} className="min-h-64 bg-white p-7 sm:p-9">
                  <span className="text-xs text-blue-600">0{index + 1}</span>
                  <h3 className="mt-10 text-2xl tracking-[-0.03em]">{service.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600">{service.summary}</p>
                </article>
              ))
            ) : (
              <div className="col-span-2 p-10 text-zinc-500">
                Service content is being prepared in the CMS.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(128,91,255,.12),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300">
              Engineering approach
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl tracking-[-0.045em] sm:text-6xl">
              Clarity before code.
              <br />
              <span className="text-zinc-500">Architecture before scale.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {[
              [
                '01 / Discover',
                'Understand the problem, constraints, users and operational reality.',
              ],
              [
                '02 / Architect',
                'Design a resilient system with explicit trade-offs and measurable outcomes.',
              ],
              [
                '03 / Engineer',
                'Build, validate, secure and evolve the product through disciplined delivery.',
              ],
            ].map(([title, copy]) => (
              <Reveal
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-7"
              >
                <p className="text-sm text-cyan-300">{title}</p>
                <p className="mt-16 text-sm leading-6 text-zinc-400">{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0b0d11] px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300">
                Technology system
              </p>
              <h2 className="mt-5 text-4xl tracking-[-0.045em] sm:text-6xl">
                A stack is not a strategy.
              </h2>
            </div>
            <p className="max-w-xl self-end text-base leading-7 text-zinc-400">
              We select technology according to the product, team, risk profile and scale—not
              trends. Every decision must earn its place in the system.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[Braces, Cpu, CircuitBoard, Cloud, Database, Workflow].map((Icon, i) => (
              <div
                key={i}
                className="grid aspect-square place-items-center rounded-2xl border border-white/10 bg-black/20"
              >
                <Icon className="text-zinc-500" strokeWidth={1.2} />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {technologies.slice(0, 18).map((tech) => (
              <span
                key={tech.id}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-zinc-400"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300">Selected work</p>
              <h2 className="mt-5 text-4xl tracking-[-0.045em] sm:text-6xl">
                Built with intelligence.
                <br />
                Engineered with purpose.
              </h2>
            </div>
            <Link href="/projects" className="text-sm text-zinc-400 hover:text-white">
              View projects →
            </Link>
          </Reveal>
          {projects.length ? (
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {projects.slice(0, 4).map((project) => (
                <article
                  key={project.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.025] p-8"
                >
                  <p className="text-xs uppercase tracking-widest text-cyan-300">
                    {project.category}
                  </p>
                  <h3 className="mt-12 text-3xl">{project.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-zinc-500">{project.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-14 rounded-3xl border border-dashed border-white/15 p-10">
              <p className="text-xl text-white">The project archive is ready for verified work.</p>
              <p className="mt-3 text-sm text-zinc-500">
                No client or internal project has been published yet. Add real project information
                through the secure admin when available.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-300">
              Open engineering
            </p>
            <h2 className="mt-5 mb-12 text-4xl tracking-[-0.045em] sm:text-6xl">
              Code is part of the conversation.
            </h2>
          </Reveal>
          <GithubShowcase {...github} profile={company.githubProfile} />
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#477bff] px-6 py-16 sm:px-12 sm:py-24">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.26em] text-blue-100">
              Start with possibility
            </p>
            <h2 className="mt-5 max-w-4xl text-4xl tracking-[-0.05em] sm:text-7xl">
              What should technology make possible for you?
            </h2>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm text-white"
            >
              Start a project <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
