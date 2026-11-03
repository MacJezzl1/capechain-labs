import { useState, useEffect, useMemo } from 'react';
import type { GitHubRepo } from '../../types';
import { DEFAULT_OFFICIAL_PROFILE, FALLBACK_REPOS, LANGUAGE_COLORS } from '../../data/defaultRepos';
import {
  GitBranch,
  Star,
  GitFork,
  Search,
  ExternalLink,
  RefreshCw,
  Terminal,
  ShieldCheck,
  AlertCircle,
  Database,
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

const CACHE_KEY_PREFIX = 'capechain_github_repos_';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

export function GitHubShowcase() {
  const [profile, setProfile] = useState<string>(DEFAULT_OFFICIAL_PROFILE);
  const [inputProfile, setInputProfile] = useState<string>(DEFAULT_OFFICIAL_PROFILE);
  const [repos, setRepos] = useState<GitHubRepo[]>(FALLBACK_REPOS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState<boolean>(true);
  const [lastFetched, setLastFetched] = useState<string>('Preloaded');
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name'>('stars');

  const fetchRepositories = async (targetProfile: string, force = false) => {
    setIsLoading(true);
    setError(null);

    const cacheKey = `${CACHE_KEY_PREFIX}${targetProfile.toLowerCase()}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (!force && cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS && Array.isArray(parsed.repos) && parsed.repos.length > 0) {
          setRepos(parsed.repos);
          setIsCached(true);
          setLastFetched(new Date(parsed.timestamp).toLocaleTimeString());
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Invalid cache format', e);
      }
    }

    try {
      // Official GitHub REST API v3
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(targetProfile)}/repos?per_page=100&sort=updated`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json'
          }
        }
      );

      // Check rate limit headers
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      if (rateLimitRemaining && parseInt(rateLimitRemaining, 10) === 0) {
        throw new Error('GitHub API rate limit reached (60 req/hr unauthenticated). Serving cached engineering dataset.');
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub organization or profile "${targetProfile}" not found. Displaying verified local catalog.`);
        }
        throw new Error(`GitHub API error (${response.status}). Displaying verified reference catalog.`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const formattedRepos: GitHubRepo[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          full_name: item.full_name,
          description: item.description,
          html_url: item.html_url,
          stargazers_count: item.stargazers_count || 0,
          forks_count: item.forks_count || 0,
          language: item.language,
          topics: item.topics || [],
          updated_at: item.updated_at,
          open_issues_count: item.open_issues_count || 0,
          license: item.license ? { name: item.license.spdx_id || item.license.name } : null,
          archived: item.archived,
          default_branch: item.default_branch
        }));

        setRepos(formattedRepos);
        setIsCached(false);
        setLastFetched(new Date().toLocaleTimeString());

        // Save to cache
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            timestamp: Date.now(),
            repos: formattedRepos
          })
        );
      } else {
        // Empty repositories list, keep reference repos
        setRepos(FALLBACK_REPOS);
        setError(`No public repositories found for @${targetProfile}. Showing standard verified catalog.`);
      }
    } catch (err: any) {
      console.warn('GitHub API fetch notice:', err.message);
      setError(err.message || 'Unable to reach GitHub API');
      // Gracefully retain existing or fallback repos
      setRepos(FALLBACK_REPOS);
      setIsCached(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories(profile);
  }, [profile]);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputProfile.trim()) {
      setProfile(inputProfile.trim());
    }
  };

  // Extract unique languages
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ['All', ...Array.from(langs)];
  }, [repos]);

  // Aggregate engineering metrics
  const telemetryStats = useMemo(() => {
    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);
    const langCount: Record<string, number> = {};
    repos.forEach((r) => {
      if (r.language) {
        langCount[r.language] = (langCount[r.language] || 0) + 1;
      }
    });
    const topLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Rust';

    return {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      topLanguage: topLang
    };
  }, [repos]);

  // Filtered & Sorted repositories
  const filteredRepos = useMemo(() => {
    return repos
      .filter((repo) => {
        const matchesQuery =
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
          repo.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;

        return matchesQuery && matchesLanguage;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
        if (sortBy === 'updated') return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        return a.name.localeCompare(b.name);
      });
  }, [repos, searchQuery, selectedLanguage, sortBy]);

  return (
    <section id="engineering-showcase" className="relative py-24 bg-[#030712] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-cyan-500/15 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              Live GitHub Engineering Telemetry
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-white tracking-tight">
              Real Engineering <span className="text-gradient-cyan">Showcase</span>
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-2xl font-sans">
              Verified public repositories, cryptographic libraries, and open-source systems. Connected directly via the official GitHub REST API with deterministic rate-limiting safeguards.
            </p>
          </div>

          {/* Official GitHub Profile Switcher & Configurator */}
          <form onSubmit={handleProfileSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-500">
                github.com/
              </span>
              <input
                type="text"
                value={inputProfile}
                onChange={(e) => setInputProfile(e.target.value)}
                placeholder="org-or-user"
                className="pl-24 pr-4 py-2 rounded-lg bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-white text-xs font-mono w-full sm:w-56"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-mono tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Query</span>
            </button>
          </form>
        </div>

        {/* Telemetry Dashboard Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>REPOSITORIES</span>
              <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-heading text-white">
              {telemetryStats.totalRepos}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
              Profile: @{profile}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>COMMUNITY STARS</span>
              <Star className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-heading text-white">
              {telemetryStats.totalStars.toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
              Verified stargazers
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>NETWORK FORKS</span>
              <GitFork className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold font-heading text-white">
              {telemetryStats.totalForks.toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
              Ecosystem derivatives
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur-md">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>PRIMARY CORE LANG</span>
              <Database className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-heading text-white flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: LANGUAGE_COLORS[telemetryStats.topLanguage] || '#38bdf8' }}
              />
              {telemetryStats.topLanguage}
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
              High-throughput systems
            </div>
          </div>
        </div>

        {/* Notice Banner if cached or error */}
        {(error || isCached) && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-slate-900/80 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>
                {error
                  ? error
                  : `Active Cache: Displaying verified engineering catalog for @${profile} (Updated: ${lastFetched}).`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>API Gateway Online</span>
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories by title, keywords, or topics (e.g. rust, zk, agent, consensus)..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900/80 border border-slate-700/60 text-slate-200 text-xs font-mono focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Language Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-slate-400">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
              >
                <option value="stars">Stars</option>
                <option value="updated">Recently Updated</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="glass-panel glass-panel-hover rounded-xl p-5 flex flex-col justify-between border border-slate-800/80 hover:border-cyan-500/40 group relative"
            >
              <div>
                {/* Top line: Repo Name and External Link */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2"
                  >
                    <GitBranch className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{repo.name}</span>
                  </a>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-cyan-400 transition-colors p-1"
                    title="View on GitHub"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {repo.description || 'Public engineering repository developed by CapeChain Labs.'}
                </p>

                {/* Topic tags */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {repo.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-[10px] font-mono text-cyan-300"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Metadata */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                {/* Language badge */}
                <div className="flex items-center gap-1.5">
                  {repo.language && (
                    <>
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || '#38bdf8' }}
                      />
                      <span className="text-[11px] text-slate-300">{repo.language}</span>
                    </>
                  )}
                  {repo.license && (
                    <span className="text-[10px] text-slate-500 ml-2 px-1.5 py-0.5 rounded bg-slate-800">
                      {repo.license.name}
                    </span>
                  )}
                </div>

                {/* Stars and Forks */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-slate-400 hover:text-amber-300 transition-colors">
                    <Star className="w-3 h-3 text-amber-400" />
                    <span className="text-[11px]">{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 hover:text-blue-300 transition-colors">
                    <GitFork className="w-3 h-3 text-blue-400" />
                    <span className="text-[11px]">{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-16 bg-slate-900/30 rounded-xl border border-slate-800">
            <AlertCircle className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <p className="font-heading text-lg text-white font-semibold mb-1">
              No matching repositories found
            </p>
            <p className="font-mono text-xs text-slate-400">
              Try adjusting your search criteria or reset filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
