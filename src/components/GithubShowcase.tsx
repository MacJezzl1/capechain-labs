import { ArrowUpRight, GitFork, Star } from 'lucide-react'
import type { GithubRepo } from '@/lib/data'

export function GithubShowcase({
  state,
  repos,
  profile,
}: {
  state: 'ready' | 'unconfigured' | 'unavailable'
  repos: GithubRepo[]
  profile?: string | null
}) {
  if (state !== 'ready' || repos.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-8 sm:p-12">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Engineering feed</p>
        <h3 className="mt-4 text-2xl font-medium text-white">
          {state === 'unconfigured'
            ? 'Official GitHub profile pending.'
            : 'Repositories are temporarily unavailable.'}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
          {state === 'unconfigured'
            ? 'Add the verified CapeChain Labs GitHub profile in the Company Profile admin setting to activate the live repository showcase.'
            : 'The public API may be rate-limited. Cached results will return automatically when available.'}
        </p>
      </div>
    )
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.045]"
        >
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-white">{repo.name}</span>
            <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-cyan-300" />
          </div>
          <p className="mt-3 line-clamp-2 min-h-10 text-xs leading-5 text-zinc-500">
            {repo.description || 'No public description provided.'}
          </p>
          <div className="mt-7 flex items-center gap-4 text-[11px] text-zinc-500">
            <span>{repo.language || 'Mixed'}</span>
            <span className="flex items-center gap-1">
              <Star size={12} />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={12} />
              {repo.forks_count}
            </span>
          </div>
        </a>
      ))}
      {profile && (
        <a
          href={profile}
          target="_blank"
          rel="noreferrer"
          className="md:col-span-2 lg:col-span-3 mt-2 inline-flex items-center gap-2 text-sm text-cyan-300"
        >
          Explore our open-source engineering <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  )
}
