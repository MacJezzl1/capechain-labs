import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { GithubShowcase } from '@/components/GithubShowcase'
import { getCompany, getGithubRepos, getProjects } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore verified CapeChain Labs software engineering and digital infrastructure projects.',
}

export default async function ProjectsPage() {
  const [projects, company] = await Promise.all([getProjects(), getCompany()])
  const github = await getGithubRepos(company.githubProfile)
  return (
    <main>
      <PageHero
        eyebrow="Engineering archive"
        title="Built with intelligence. Engineered with purpose."
        description="A transparent portfolio of real systems, technical decisions and measurable product work. Only verified projects are published."
      />
      <section className="px-5 pb-24">
        <div className="mx-auto max-w-7xl">
          {projects.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group rounded-3xl border border-white/10 bg-white/[.025] p-8"
                >
                  <div className="flex justify-between">
                    <span className="text-xs uppercase tracking-[.2em] text-cyan-300">
                      {project.category}
                    </span>
                    <span className="text-xs text-zinc-600">{project.status}</span>
                  </div>
                  <h2 className="mt-20 text-3xl tracking-[-.04em]">{project.name}</h2>
                  <p className="mt-4 text-sm leading-6 text-zinc-500">{project.description}</p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {(project.technologies ?? []).map((row) => (
                      <span
                        key={row.id}
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-zinc-500"
                      >
                        {row.item}
                      </span>
                    ))}
                  </div>
                  {(project.liveUrl || project.repositoryUrl) && (
                    <div className="mt-8 flex gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-white"
                        >
                          Live project <ArrowUpRight size={14} />
                        </a>
                      )}
                      {project.repositoryUrl && (
                        <a
                          href={project.repositoryUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-zinc-400"
                        >
                          Repository <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[.02] p-10 sm:p-16">
              <p className="text-xs uppercase tracking-[.22em] text-cyan-300">Portfolio status</p>
              <h2 className="mt-5 text-3xl">No verified project records are public yet.</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500">
                The showcase is fully configured for project overviews, architecture, technologies,
                screenshots, repositories and live URLs. It will populate as verified work is
                approved for publication.
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="border-t border-white/10 bg-[#0b0d11] px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-4xl tracking-[-.04em]">Open-source engineering</h2>
          <GithubShowcase {...github} profile={company.githubProfile} />
        </div>
      </section>
    </main>
  )
}
