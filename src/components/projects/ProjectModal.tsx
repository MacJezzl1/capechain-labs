import type { Project } from '../../types';
import {
  X,
  ExternalLink,
  GitBranch,
  Cpu,
  Layers,
  Shield,
  Activity,
  ArrowRight,
  Zap,
  Server
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-[#070d1b] border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.25)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300 uppercase tracking-wider">
              Technical Architectural Spec :: {project.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto">
          {/* Title & Tagline */}
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-xs font-mono mb-3">
              {project.category} // {project.status}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              {project.title}
            </h2>
            <p className="mt-2 text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs font-mono text-slate-400 uppercase">{m.label}</div>
                <div className="text-lg sm:text-xl font-bold font-heading text-cyan-300 mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Problem Solved */}
          <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/20">
            <h3 className="text-xs font-mono uppercase tracking-wider text-red-400 flex items-center gap-2 mb-2 font-semibold">
              <Zap className="w-4 h-4 text-red-400" />
              The Engineering Challenge & Problem Solved
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.problemSolved}
            </p>
          </div>

          {/* Technical Architecture Deep Dive */}
          <div className="p-6 rounded-xl bg-slate-900/50 border border-cyan-500/20 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2 font-semibold">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Technical Architecture & Distributed Pipeline
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                Verified Production Benchmark
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {project.technicalArchitecture.overview}
            </p>

            {/* Architecture telemetry specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {project.technicalArchitecture.throughput && (
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400">THROUGHPUT</div>
                  <div className="text-xs font-bold font-mono text-white mt-0.5">
                    {project.technicalArchitecture.throughput}
                  </div>
                </div>
              )}
              {project.technicalArchitecture.latency && (
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400">LATENCY TARGET</div>
                  <div className="text-xs font-bold font-mono text-white mt-0.5">
                    {project.technicalArchitecture.latency}
                  </div>
                </div>
              )}
              {project.technicalArchitecture.concurrency && (
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400">CONCURRENCY</div>
                  <div className="text-xs font-bold font-mono text-white mt-0.5">
                    {project.technicalArchitecture.concurrency}
                  </div>
                </div>
              )}
              {project.technicalArchitecture.security && (
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <div className="text-[10px] font-mono text-slate-400">SECURITY STANDARD</div>
                  <div className="text-xs font-bold font-mono text-white mt-0.5 truncate">
                    {project.technicalArchitecture.security}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Engineering Features */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Key Engineering Innovations:
            </h3>
            <div className="space-y-2">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 text-xs text-slate-300 font-sans"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
              Technologies & Infrastructure Stack:
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md bg-cyan-950/70 border border-cyan-800/40 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono flex items-center gap-2 border border-slate-700 transition-colors"
                >
                  <GitBranch className="w-4 h-4 text-cyan-400" />
                  <span>Source Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Deployment</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-mono border border-slate-800 transition-colors"
            >
              Close Specification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
