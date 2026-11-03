import { Activity, ShieldCheck, Cpu, Database, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

export function TelemetryBar() {
  const [blockHeight, setBlockHeight] = useState(14892040);
  const [activeNodes, setActiveNodes] = useState(128);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockHeight((h) => h + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#02050e] border-b border-cyan-500/20 py-1.5 px-4 text-[11px] font-mono text-slate-400 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <div className="flex items-center gap-6 whitespace-nowrap">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="font-bold">CAPECHAIN NET: ONLINE</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">CONSENSUS HEIGHT:</span>
            <span className="text-slate-200">#{blockHeight.toLocaleString()}</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">P99 INGRESS LATENCY:</span>
            <span className="text-emerald-400 font-semibold">1.4ms</span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">DISTRIBUTED CLUSTERS:</span>
            <span className="text-cyan-300">{activeNodes} Active Shards</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-500 whitespace-nowrap">
          <span className="text-[10px] uppercase tracking-wider text-cyan-400/80">
            TLS 1.3 // POST-QUANTUM VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
}

