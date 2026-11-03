import { useState } from 'react';
import type { Project } from '../../types';
import { INITIAL_PROJECTS } from '../../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { PortfolioManagerModal } from './PortfolioManagerModal';
import {
  Cpu,
  Layers,
  ArrowRight,
  GitBranch,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Terminal,
  Activity,
  Zap,
  Server
} from 'lucide-react';

const CATEGORIES = [
  'All Sectors',
  'Software Engineering',
  'Artificial Intelligence',
  'Blockchain Engineering',
  'Digital Infrastructure',
  'Digital Product Innovation'
] as const;

export function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>('All Sectors');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All Sectors' || p.category === activeCategory
  );

  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const handleResetDefaults = () => {
    setProjects(INITIAL_PROJECTS);
  };

  return (
    <section id="projects" className="relative py-28 bg-[#040813] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mandatory Exact Section Title as Specified */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Verified Systems & Applied Architectures
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Built With Intelligence. <br />
              <span className="text-gradient-cyan">Engineered With Purpose.</span>
            </h2>

            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              Each system is engineered from mathematical first principles. We design architectures that handle extreme transactional density, cryptographically verifiable state proofs, and autonomous decision swarms.
            </p>
          </div>

          {/* Configurable Portfolio Management CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsManagerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-lg"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Configure Registry</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_18px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-slate-800/80 hover:border-cyan-500/50 group relative"
            >
              <div>
                {/* Status & Category */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
                    {project.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {project.status}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="mt-1 text-xs sm:text-sm font-mono text-slate-400 leading-snug">
                  {project.tagline}
                </p>

                {/* Problem Statement Box */}
                <div className="mt-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs font-sans text-slate-300 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-red-400/90 font-semibold tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-red-400" />
                    Problem Addressed:
                  </div>
                  <p className="line-clamp-2 text-slate-300 leading-relaxed">
                    {project.problemSolved}
                  </p>
                </div>

                {/* Technical Architecture Metric Badges */}
                <div className="grid grid-cols-3 gap-2 mt-5 p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-1">
                      <div className="text-[10px] font-mono text-slate-400 truncate">{m.label}</div>
                      <div className="text-sm sm:text-base font-bold font-mono text-cyan-300 mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Technologies List */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-1 rounded bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-500">
                      +{project.technologies.length - 5} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer & Action Buttons */}
              <div className="mt-8 pt-5 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Inspect Architecture Spec</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
                      title="GitHub Repository"
                    >
                      <GitBranch className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 hover:text-white transition-colors border border-cyan-500/40"
                      title="Live System"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Portfolio Config Manager Modal */}
      <PortfolioManagerModal
        projects={projects}
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        onAddProject={handleAddProject}
        onDeleteProject={handleDeleteProject}
        onResetDefaults={handleResetDefaults}
      />
    </section>
  );
}
