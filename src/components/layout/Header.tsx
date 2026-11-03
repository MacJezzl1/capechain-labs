import { useState } from 'react';
import { Menu, X, Terminal, ArrowUpRight, Cpu } from 'lucide-react';

export function Header({ onOpenContact }: { onOpenContact: () => void }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#030712]/90 backdrop-blur-xl border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-400/40 p-1 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <img
                src="/capechain-logo.png"
                alt="CapeChain Labs"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-white tracking-tight flex items-center gap-1">
                CapeChain <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/90 border border-cyan-500/30">LABS</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                Intelligent Digital Infrastructure
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#nexus-3d"
              className="text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors uppercase tracking-wider"
            >
              3D Nexus
            </a>
            <a
              href="#capabilities"
              className="text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors uppercase tracking-wider"
            >
              Pillars
            </a>
            <a
              href="#projects"
              className="text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors uppercase tracking-wider"
            >
              Projects
            </a>
            <a
              href="#engineering-showcase"
              className="text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors uppercase tracking-wider flex items-center gap-1"
            >
              <span>GitHub Showcase</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </a>
            <a
              href="#philosophy"
              className="text-xs font-mono text-slate-300 hover:text-cyan-300 transition-colors uppercase tracking-wider"
            >
              Philosophy
            </a>
          </nav>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono tracking-wider uppercase shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Engage Engineering</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#nexus-3d"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-xs font-mono text-slate-300 hover:text-cyan-300 uppercase"
          >
            3D Digital Experience
          </a>
          <a
            href="#capabilities"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-xs font-mono text-slate-300 hover:text-cyan-300 uppercase"
          >
            Core Pillars
          </a>
          <a
            href="#projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-xs font-mono text-slate-300 hover:text-cyan-300 uppercase"
          >
            Built With Intelligence (Projects)
          </a>
          <a
            href="#engineering-showcase"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-xs font-mono text-slate-300 hover:text-cyan-300 uppercase"
          >
            GitHub Engineering Showcase
          </a>
          <a
            href="#philosophy"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-xs font-mono text-slate-300 hover:text-cyan-300 uppercase"
          >
            Brand Philosophy
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono uppercase text-center"
            >
              Engage Engineering
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

