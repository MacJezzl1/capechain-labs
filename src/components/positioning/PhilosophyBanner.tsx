import { Quote, Shield, Terminal, ArrowUpRight, Compass, Cpu, Zap } from 'lucide-react';

export function PhilosophyBanner() {
  return (
    <section className="relative py-28 bg-[#02050f] border-y border-cyan-500/15 overflow-hidden">
      {/* Background glow & subtle circuit lines */}
      <div className="absolute inset-0 circuit-grid opacity-15 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Brand Tag badge */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Brand Philosophy & Mission
          </div>
        </div>

        {/* Brand Positioning Statement */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight max-w-4xl mx-auto">
            "CapeChain Labs is where <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">ambitious ideas</span> become <br className="hidden sm:inline" />
            <span className="text-white underline decoration-cyan-500/50 decoration-2 underline-offset-8">
              intelligent technology.
            </span>"
          </h2>
        </div>

        {/* Brand Philosophy Box */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-cyan-500/25 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto">
          <Quote className="w-12 h-12 text-cyan-500/20 absolute top-6 left-6 -scale-x-100" />

          <p className="text-lg sm:text-2xl text-slate-200 font-heading font-medium leading-relaxed text-center sm:text-left relative z-10 pl-0 sm:pl-8">
            We believe technology should do more than solve today's problems. It should create possibilities that did not previously exist.
          </p>

          <p className="mt-6 text-sm sm:text-base text-slate-400 font-sans leading-relaxed text-center sm:text-left pl-0 sm:pl-8 border-t border-slate-800/80 pt-6">
            We engineer software, intelligent systems and digital infrastructure that help businesses innovate, operate and scale on global terms.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-4 pl-0 sm:pl-8 text-xs font-mono text-cyan-400">
            <span className="px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/40">
              #IdeasIntoIntelligence
            </span>
            <span className="px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/40">
              #InfrastructureOfTomorrow
            </span>
            <span className="px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-800/40">
              #BeyondDevelopment
            </span>
          </div>
        </div>

        {/* Engineering Maxims Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              Beyond Development. Into Engineering.
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              We reject superficial templates. Every solution is designed around architectural longevity, formal correctness, and deterministic scale.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              Building Intelligent Digital Infrastructure.
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Autonomous agents, low-latency messaging fabrics, and fault-tolerant micro-clouds that empower organizations to run autonomously.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-2">
              Technology Without Conventional Boundaries.
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Unifying decentralized cryptographic proofs with hyperscale cloud throughput to deliver sovereign, uncompromised performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

