import { Check, X, ShieldAlert, Cpu, Sparkles, Terminal } from 'lucide-react';

interface ComparisonRow {
  domain: string;
  agencyApproach: string;
  capechainApproach: string;
}

const COMPARISONS: ComparisonRow[] = [
  {
    domain: 'Software Architecture',
    agencyApproach: 'Generic CMS templates, monolithic codebases, and fragile off-the-shelf plugins.',
    capechainApproach: 'Hexagonal Domain-Driven Design (DDD), high-throughput event buses, and zero-downtime microservices.'
  },
  {
    domain: 'Artificial Intelligence',
    agencyApproach: 'Superficial prompt wrappers with uncontrolled hallucinations and fragile token limits.',
    capechainApproach: 'Autonomous multi-agent swarms with topological DAG task scheduling, vector episodic memory, and WASM sandboxes.'
  },
  {
    domain: 'Blockchain & Cryptography',
    agencyApproach: 'Copy-pasted smart contracts with unverified security vulnerabilities and high gas fees.',
    capechainApproach: 'Formally verified smart contracts, threshold signature schemes (TSS), and zero-knowledge state bridge verification.'
  },
  {
    domain: 'Digital Infrastructure',
    agencyApproach: 'Single-region shared hosting with manual maintenance and unpredictable outages.',
    capechainApproach: 'Multi-region Kubernetes mesh, geo-replicated active-active databases, and automated disaster recovery (< 60s RTO).'
  },
  {
    domain: 'Performance & Telemetry',
    agencyApproach: 'Basic Google Analytics with unmonitored server backpressure and slow p99 spikes.',
    capechainApproach: 'Sub-millisecond kernel bypass (eBPF), real-time OpenTelemetry tracing, and sub-12ms p99 latency guarantees.'
  }
];

export function EngineeringComparison() {
  return (
    <section className="relative py-28 bg-[#020614] border-t border-cyan-500/15 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Engineering Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Beyond Development. <br />
            <span className="text-gradient-cyan">Into Serious Engineering.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg font-sans leading-relaxed">
            We are not a website development agency. We engineer complete digital products and resilient technical infrastructure engineered for international scale.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-hidden rounded-2xl border border-cyan-500/25 bg-slate-950/70 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-800 bg-slate-900/80 p-4 sm:p-6 text-xs font-mono uppercase tracking-wider">
            <div className="md:col-span-3 text-slate-400 font-bold">Engineering Dimension</div>
            <div className="md:col-span-4 text-red-400/90 font-bold hidden md:block">
              Conventional Agency Work
            </div>
            <div className="md:col-span-5 text-cyan-300 font-bold hidden md:block">
              CapeChain Labs Engineering Standard
            </div>
          </div>

          <div className="divide-y divide-slate-800/80">
            {COMPARISONS.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 gap-4 items-center hover:bg-slate-900/30 transition-colors"
              >
                {/* Domain Title */}
                <div className="md:col-span-3">
                  <span className="font-heading font-bold text-white text-sm sm:text-base">
                    {row.domain}
                  </span>
                </div>

                {/* Agency Approach */}
                <div className="md:col-span-4 p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-xs font-sans text-slate-400">
                  <div className="text-[10px] font-mono uppercase text-red-400 font-semibold mb-1 flex items-center gap-1.5 md:hidden">
                    <X className="w-3.5 h-3.5 text-red-400" />
                    Conventional Agency:
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-400/80 flex-shrink-0 mt-0.5 hidden md:block" />
                    <span>{row.agencyApproach}</span>
                  </div>
                </div>

                {/* CapeChain Engineering */}
                <div className="md:col-span-5 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs font-sans text-slate-200">
                  <div className="text-[10px] font-mono uppercase text-cyan-400 font-semibold mb-1 flex items-center gap-1.5 md:hidden">
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                    CapeChain Standard:
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5 hidden md:block" />
                    <span className="leading-relaxed font-medium text-cyan-100">
                      {row.capechainApproach}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

