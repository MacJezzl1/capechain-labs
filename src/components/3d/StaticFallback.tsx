interface StaticFallbackProps {
  onToggle3D?: () => void;
}

export function StaticFallback({ onToggle3D }: StaticFallbackProps) {
  return (
    <div className="relative w-full h-[540px] md:h-[620px] flex items-center justify-center overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-950 via-[#030917] to-slate-950 p-6">
      {/* Background circuit grid */}
      <div className="absolute inset-0 circuit-grid opacity-30" />
      <div className="absolute inset-0 radial-glow" />

      {/* Holographic Hexagonal Schematic */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          {/* Outer rotating pulse ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40 animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border border-sky-400/20 animate-[spin_15s_linear_infinite_reverse]" />
          
          {/* Centered official CapeChain mark */}
          <div className="relative w-28 h-28 rounded-2xl bg-cyan-950/60 border border-cyan-400/40 backdrop-blur-md p-4 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)]">
            <img src="/capechain-logo.png" alt="CapeChain Labs" className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          </div>

          {/* Node points */}
          <div className="absolute top-2 left-6 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          <div className="absolute bottom-2 right-6 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
          <div className="absolute top-1/2 -right-2 w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_10px_#7dd3fc]" />
          <div className="absolute top-1/2 -left-2 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Static Telemetry Mode
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-heading text-white mb-2">
          CapeChain Cryptographic Engine
        </h3>
        <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6 font-mono">
          High-performance static fallback active. Optimized for ultra-low power consumption and zero-GPU environments.
        </p>

        {onToggle3D && (
          <button
            onClick={onToggle3D}
            className="px-5 py-2.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-400/40 text-cyan-200 text-xs font-mono tracking-wider uppercase transition-all duration-200 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            Launch Interactive 3D Canvas
          </button>
        )}
      </div>

      {/* Decorative telemetry corners */}
      <div className="absolute top-4 left-4 font-mono text-[10px] text-cyan-500/60 uppercase">
        [ SYS::FALLBACK_RENDER_ENG_OK ]
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-cyan-500/60 uppercase">
        [ CAPECHAIN_CORE_V2.4 ]
      </div>
    </div>
  );
}

