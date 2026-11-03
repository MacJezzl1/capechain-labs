import { lazy, Suspense } from 'react';
import { ArrowRight, Cpu, GitBranch } from 'lucide-react';

const CapeChainCanvas = lazy(() =>
  import('../3d/CapeChainCanvas').then((m) => ({ default: m.CapeChainCanvas }))
);

export function HeroSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section id="nexus-3d" className="relative pt-12 pb-24 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-cyan-600/15 via-blue-600/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.35)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Engineering The Infrastructure of Tomorrow
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autonomous AI &bull; ZK Cryptography &bull; Cloud Mesh</span>
          </div>
        </div>

        {/* Hero Title & Positioning */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.08]">
            Where Ambitious Ideas Become <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">Intelligent Technology.</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 font-sans leading-relaxed max-w-3xl mx-auto">
            We believe technology should do more than solve today's problems. It should create possibilities that did not previously exist. We engineer software, intelligent systems and digital infrastructure that help businesses innovate, operate and scale.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm font-mono tracking-wider uppercase shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center gap-2"
            >
              <span>Explore Engineered Systems</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#engineering-showcase"
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm font-mono tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span>Verify GitHub Repositories</span>
            </a>

            <button
              onClick={onOpenContact}
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono tracking-wider uppercase transition-all"
            >
              Architectural Engagement
            </button>
          </div>
        </div>

        {/* 19. IMMERSIVE 3D DIGITAL EXPERIENCE */}
        <div className="relative mt-8">
          <div className="mb-3 flex items-center justify-between text-xs font-mono text-slate-400 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 uppercase tracking-widest font-semibold">
                Signature 3D Environment // Interactive WebGL Engine
              </span>
            </div>
            <span className="hidden sm:inline text-slate-500">
              [ Drag to Orbit &bull; Click Core to Pulse &bull; Switch Angles ]
            </span>
          </div>

          {/* 3D Canvas Container */}
          <Suspense
            fallback={
              <div className="relative w-full h-[580px] md:h-[660px] rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-b from-[#030712] via-[#050e1f] to-[#020617] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 p-3 mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-pulse">
                  <img src="/capechain-logo.png" alt="CapeChain Labs" className="w-full h-full object-contain" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin mb-3" />
                <p className="font-mono text-xs text-cyan-300 uppercase tracking-widest">
                  Loading 3D Spatial Environment...
                </p>
                <p className="font-mono text-[10px] text-slate-500 mt-1">
                  Three.js WebGL Engine &bull; Shaders Initializing
                </p>
              </div>
            }
          >
            <CapeChainCanvas />
          </Suspense>
        </div>

        {/* High-Impact Engineering Metrics Ribbon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
            <div className="text-[11px] font-mono text-slate-500 uppercase">LATENCY THRESHOLD</div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
              &lt; 12ms <span className="text-xs font-mono text-cyan-400">p99</span>
            </div>
            <div className="text-[11px] font-sans text-slate-400 mt-0.5">
              Mission-critical backend SLA
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
            <div className="text-[11px] font-mono text-slate-500 uppercase">SYSTEM VERIFICATION</div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
              100% <span className="text-xs font-mono text-emerald-400">Deterministic</span>
            </div>
            <div className="text-[11px] font-sans text-slate-400 mt-0.5">
              Formal audit & invariant suites
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
            <div className="text-[11px] font-mono text-slate-500 uppercase">STREAMING THROUGHPUT</div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
              2.4M <span className="text-xs font-mono text-blue-400">msg/sec</span>
            </div>
            <div className="text-[11px] font-sans text-slate-400 mt-0.5">
              Kernel-bypass eBPF ingest
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md">
            <div className="text-[11px] font-mono text-slate-500 uppercase">AI AGENT ORCHESTRATION</div>
            <div className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
              500+ <span className="text-xs font-mono text-purple-400">Swarm Concurrency</span>
            </div>
            <div className="text-[11px] font-sans text-slate-400 mt-0.5">
              Isolated WASM tool execution
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
