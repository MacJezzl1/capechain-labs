import { useState } from 'react';
import { X, Send, Cpu, CheckCircle2 } from 'lucide-react';

export function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    pillar: 'Software Engineering',
    throughputTarget: '< 10k req/s',
    projectScope: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#081020] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.3)] overflow-hidden my-8">
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-white text-base">
              Architectural Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-heading text-white">
                Engineering Request Transmitted
              </h4>
              <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto leading-relaxed">
                Your technical specifications have been received by CapeChain Labs engineering team. An architectural lead will review your throughput targets and respond promptly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold font-mono text-xs uppercase"
              >
                Close Channel
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-slate-400 font-sans">
                Direct engagement for mission-critical digital products, high-throughput systems, autonomous AI agents, and cryptographic networks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    NAME / ENGINEERING LEAD *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Alex Vance"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@enterprise.io"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    TARGET DOMAIN *
                  </label>
                  <select
                    value={formData.pillar}
                    onChange={(e) => setFormData({ ...formData, pillar: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Blockchain Engineering">Blockchain Engineering</option>
                    <option value="Digital Infrastructure">Digital Infrastructure</option>
                    <option value="Digital Product Innovation">Digital Product Innovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    ESTIMATED THROUGHPUT / SCALE
                  </label>
                  <select
                    value={formData.throughputTarget}
                    onChange={(e) => setFormData({ ...formData, throughputTarget: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="< 10k req/s">&lt; 10,000 req/s</option>
                    <option value="10k - 100k req/s">10k – 100k req/s</option>
                    <option value="100k+ req/s">100k+ req/s (Hyperscale)</option>
                    <option value="Multi-Agent Swarm">Multi-Agent Swarm Workload</option>
                    <option value="Cryptographic Protocol">Cryptographic Protocol / ZK</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  PROJECT SPECIFICATION & ARCHITECTURAL SCOPE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.projectScope}
                  onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                  placeholder="Summarize your system requirements, latency constraints, database bottlenecks, or algorithmic targets..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Technical Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

