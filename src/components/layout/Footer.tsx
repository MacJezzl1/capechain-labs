import { Terminal, Shield, GitBranch, ArrowUpRight, Cpu } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#02040b] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-400/40 p-1 flex items-center justify-center">
                <img src="/capechain-logo.png" alt="CapeChain Labs" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                CapeChain <span className="text-cyan-400 font-mono text-xs uppercase px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">LABS</span>
              </span>
            </div>

            <p className="font-heading font-medium text-slate-200 text-sm leading-relaxed max-w-sm">
              "CapeChain Labs is where ambitious ideas become intelligent technology."
            </p>

            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
              We design, develop and engineer complete digital products and intelligent technology infrastructure across enterprise software, autonomous AI, blockchain protocols, and multi-region cloud meshes.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-cyan-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Global Infrastructure: Active
              </span>
            </div>
          </div>

          {/* Pillars Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs text-white uppercase tracking-wider font-bold">
              Engineering Pillars
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#capabilities" className="hover:text-cyan-300 transition-colors">
                  01 // Software Engineering & Distributed Backends
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-300 transition-colors">
                  02 // Artificial Intelligence & Multi-Agent Swarms
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-300 transition-colors">
                  03 // Blockchain Engineering & ZK State Bridges
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-300 transition-colors">
                  04 // Digital Infrastructure & Kernel-Bypass Fabrics
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-cyan-300 transition-colors">
                  05 // Digital Product Innovation & Spatial WebGL
                </a>
              </li>
            </ul>
          </div>

          {/* Systems & Verification */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs text-white uppercase tracking-wider font-bold">
              Verified Technical Portals
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="#engineering-showcase"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GitHub Repository Telemetry</span>
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Production Architectural Specs</span>
                </a>
              </li>
              <li>
                <a
                  href="#philosophy"
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verified Engineering Standards</span>
                </a>
              </li>
            </ul>

            <div className="pt-4">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400 leading-normal">
                All benchmark numbers and architecture parameters reflect verified production testing datasets.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Integrity */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} CapeChain Labs. All systems engineered with precision.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Security Architecture</span>
            <span>&bull;</span>
            <span>Open Source Licenses</span>
            <span>&bull;</span>
            <span>Deterministic Audits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

