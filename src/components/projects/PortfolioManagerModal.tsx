import { useState } from 'react';
import type { Project } from '../../types';
import {
  X,
  Plus,
  Download,
  Copy,
  Check,
  Code2,
  Trash2,
  Sliders,
  Sparkles
} from 'lucide-react';

interface PortfolioManagerModalProps {
  projects: Project[];
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (newProject: Project) => void;
  onDeleteProject: (id: string) => void;
  onResetDefaults: () => void;
}

export function PortfolioManagerModal({
  projects,
  isOpen,
  onClose,
  onAddProject,
  onDeleteProject,
  onResetDefaults
}: PortfolioManagerModalProps) {
  const [activeTab, setActiveTab] = useState<'add' | 'export' | 'manage'>('add');
  const [copied, setCopied] = useState(false);

  // Form state for new project
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<Project['category']>('Software Engineering');
  const [status, setStatus] = useState<Project['status']>('Active Development');
  const [problemSolved, setProblemSolved] = useState('');
  const [overview, setOverview] = useState('');
  const [throughput, setThroughput] = useState('');
  const [latency, setLatency] = useState('');
  const [technologiesStr, setTechnologiesStr] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problemSolved.trim()) return;

    const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const techs = technologiesStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newProject: Project = {
      id,
      title,
      tagline: tagline || title,
      category,
      status,
      problemSolved,
      overview: overview || problemSolved,
      technicalArchitecture: {
        overview: overview || 'Modular cloud-native architecture.',
        throughput: throughput || 'N/A',
        latency: latency || 'N/A'
      },
      technologies: techs.length > 0 ? techs : ['TypeScript', 'Cloud'],
      features: [
        'Automated deterministic pipeline execution',
        'Multi-region failover and telemetry logging'
      ],
      metrics: [
        { label: 'Latency', value: latency || '< 25ms' },
        { label: 'Throughput', value: throughput || '10k op/s' },
        { label: 'Reliability', value: '99.9%' }
      ],
      repoUrl: repoUrl || undefined,
      liveUrl: liveUrl || undefined,
      featured: false
    };

    onAddProject(newProject);
    // Reset form
    setTitle('');
    setTagline('');
    setProblemSolved('');
    setOverview('');
    setThroughput('');
    setLatency('');
    setTechnologiesStr('');
    setRepoUrl('');
    setLiveUrl('');
    setActiveTab('manage');
  };

  const exportCode = `// Generated Portfolio Configuration
export const CAPECHAIN_PROJECTS = ${JSON.stringify(projects, null, 2)};
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#091122] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-bold font-heading text-white">
                Portfolio Management System
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Zero-Code Deployment & Project Registry Controller
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-3 gap-4">
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 text-xs font-mono transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'add'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register New Project</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-3 text-xs font-mono transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'manage'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Manage Registry ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 text-xs font-mono transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'export'
                ? 'border-cyan-400 text-cyan-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Export Configuration</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {activeTab === 'add' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <p className="text-xs text-slate-400 font-sans">
                Add a new verified engineering project to CapeChain Labs. The project will appear immediately on the live website and can be exported as a permanent configuration.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    PROJECT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CapeChain Quantum Key Vault"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    CATEGORY *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Blockchain Engineering">Blockchain Engineering</option>
                    <option value="Digital Infrastructure">Digital Infrastructure</option>
                    <option value="Digital Product Innovation">Digital Product Innovation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  TAGLINE / SUBTITLE
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Cryptographically isolated threshold key store for institutional rollups"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  PROBLEM BEING SOLVED *
                </label>
                <textarea
                  required
                  rows={3}
                  value={problemSolved}
                  onChange={(e) => setProblemSolved(e.target.value)}
                  placeholder="Describe the exact technical bottleneck, latency hurdle, or architectural vulnerability being solved..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  TECHNICAL ARCHITECTURE OVERVIEW
                </label>
                <textarea
                  rows={2}
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  placeholder="Describe the distributed pipeline, consensus engine, or message protocol..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    THROUGHPUT (e.g. 15k tx/s)
                  </label>
                  <input
                    type="text"
                    value={throughput}
                    onChange={(e) => setThroughput(e.target.value)}
                    placeholder="15k tx/s"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    LATENCY TARGET (e.g. &lt; 2ms p99)
                  </label>
                  <input
                    type="text"
                    value={latency}
                    onChange={(e) => setLatency(e.target.value)}
                    placeholder="< 2ms p99"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  TECHNOLOGIES (Comma-separated)
                </label>
                <input
                  type="text"
                  value={technologiesStr}
                  onChange={(e) => setTechnologiesStr(e.target.value)}
                  placeholder="Rust, Go, gRPC, Docker, Prometheus"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    GITHUB REPOSITORY URL
                  </label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/capechainlabs/..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    LIVE DEPLOYMENT URL
                  </label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://vault.capechainlabs.io"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Inject Project Into Live Registry</span>
                </button>
              </div>
            </form>
          )}

          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <p className="text-xs text-slate-400 font-mono">
                  Currently active projects in portfolio memory ({projects.length})
                </p>
                <button
                  onClick={onResetDefaults}
                  className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                >
                  Reset to Verified Defaults
                </button>
              </div>

              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-white text-sm">
                          {proj.title}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono">
                          {proj.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{proj.tagline}</p>
                    </div>

                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors"
                      title="Remove Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400 font-mono">
                  Copy and paste directly into <code className="text-cyan-400">src/data/portfolioData.ts</code>
                </p>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-cyan-300/90 overflow-x-auto max-h-[400px]">
                {exportCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
