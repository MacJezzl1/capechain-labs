import { useState } from 'react';
import { PILLARS_DATA } from '../../data/pillarsData';
import {
  Terminal,
  Cpu,
  Layers,
  Server,
  Boxes,
  CheckCircle2,
  ArrowRight,
  Shield,
  Activity,
  Zap
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Terminal,
  Cpu,
  Layers,
  Server,
  Boxes
};

export function PillarsSection() {
  const [selectedPillarId, setSelectedPillarId] = useState(PILLARS_DATA[0].id);

  const activePillar = PILLARS_DATA.find((p) => p.id === selectedPillarId) || PILLARS_DATA[0];
  const ActiveIcon = ICON_MAP[activePillar.iconName] || Terminal;

  return (
    <section id="capabilities" className="relative py-28 bg-[#030712] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Core Engineering Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Complete Digital Products & <br className="hidden sm:inline" />
            <span className="text-gradient-cyan">Intelligent Technology Infrastructure</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg font-sans leading-relaxed">
            Our identity is rooted in deep engineering. We do not build fragile prototypes; we design and operate mission-critical systems across five foundational disciplines.
          </p>
        </div>

        {/* Pillar Navigation Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {PILLARS_DATA.map((pillar) => {
            const Icon = ICON_MAP[pillar.iconName] || Terminal;
            const isSelected = selectedPillarId === pillar.id;

            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {pillar.number}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-slate-500'}`}
                  />
                </div>
                <div>
                  <div
                    className={`font-heading font-bold text-xs sm:text-sm leading-snug ${
                      isSelected ? 'text-white' : 'text-slate-300'
                    }`}
                  >
                    {pillar.title}
                  </div>
                  <div className="font-mono text-[10px] text-slate-500 mt-1">
                    {pillar.badge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Deep Dive Display */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/30 relative overflow-hidden">
          {/* Subtle watermark number */}
          <div className="absolute right-6 top-6 text-8xl sm:text-9xl font-mono font-extrabold text-cyan-500/5 select-none pointer-events-none">
            {activePillar.number}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left Column: Overview & Capabilities */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    Pillar {activePillar.number} // {activePillar.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                    {activePillar.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm font-mono text-cyan-300/90 font-medium">
                {activePillar.subtitle}
              </p>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                {activePillar.description}
              </p>

              {/* Exact Capabilities as specified in Master Requirements */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                  Engineering Capabilities:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activePillar.capabilities.map((cap, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs text-slate-200 font-sans"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Highlights & Specs */}
            <div className="lg:col-span-5 space-y-6">
              {/* Architectural Highlights */}
              <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  Architectural Rigor
                </h4>

                <div className="space-y-3">
                  {activePillar.architecturalHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Telemetry Benchmark Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activePillar.systemSpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/50 border border-cyan-500/20 text-center"
                  >
                    <div className="text-[10px] font-mono text-slate-400 uppercase">
                      {spec.label}
                    </div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-cyan-300 mt-1">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

