import { useState } from 'react';
import {
  Server,
  Cpu,
  Layers,
  Shield,
  Activity,
  ArrowDown,
  ArrowRight,
  Database,
  Terminal,
  Network
} from 'lucide-react';

interface ArchitectureTier {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  latency: string;
  protocol: string;
  description: string;
  components: string[];
}

const TIERS: ArchitectureTier[] = [
  {
    id: 'edge',
    name: 'Zero-Trust Ingress & Edge Proxy',
    subtitle: 'Global Anycast Routing Layer',
    badge: 'Layer 1: Boundary',
    latency: '< 1.8ms',
    protocol: 'HTTP/3, gRPC-Web, QUIC',
    description: 'Hardware-accelerated edge termination with programmable eBPF packet filters and automatic DDOS mitigation.',
    components: ['SPIFFE / SPIRE mTLS', 'Envoy Gateway', 'Dynamic Rate Limiter', 'WAF Filter Engine']
  },
  {
    id: 'ai-mesh',
    name: 'Cognitive Multi-Agent Lattice',
    subtitle: 'Autonomous Orchestration & Tool Routing',
    badge: 'Layer 2: Intelligence',
    latency: '45ms step scheduling',
    protocol: 'gRPC over TLS 1.3',
    description: 'Topological DAG planner with isolated WASM runtimes dispatching verified tools and vector memory queries.',
    components: ['LangGraph State Engine', 'Qdrant Vector Cluster', 'Deterministic Guardrails', 'WASM Code Sandbox']
  },
  {
    id: 'event-fabric',
    name: 'Aether Distributed Streaming Bus',
    subtitle: 'High-Velocity Telemetry & Messaging',
    badge: 'Layer 3: Event Stream',
    latency: 'Sub-millisecond write',
    protocol: 'Zero-Copy Ring Buffer',
    description: 'Kernel-bypass messaging fabric capable of ingesting 2.4 million events per second with zero garbage collection overhead.',
    components: ['Apache Kafka Partitioning', 'io_uring Buffer', 'ClickHouse Columnar Store', 'OpenTelemetry Tracing']
  },
  {
    id: 'cryptographic-consensus',
    name: 'HyperMesh Cryptographic Settlement',
    subtitle: 'Decentralized Consensus & Cross-Chain Gateway',
    badge: 'Layer 4: Truth & Ledger',
    latency: '820ms finality',
    protocol: 'Tendermint BFT + ZK-SNARKs',
    description: 'Formally verified state verification bridge using threshold signatures (TSS) and zero-knowledge validity proofs.',
    components: ['Ed25519 TSS Cluster', 'Groth16 Verifier', 'Solidity & Rust Adapters', 'Slashing Engine']
  },
  {
    id: 'cloud-persistence',
    name: 'Multi-Cloud Distributed Mesh',
    subtitle: 'Immutable Ledger & Geo-Replicated Stores',
    badge: 'Layer 5: Foundation',
    latency: 'Multi-Region Active-Active',
    protocol: 'Raft Consensus Replication',
    description: 'Self-healing Kubernetes clusters spanning hybrid clouds with automated disaster recovery and zero downtime.',
    components: ['Geo-Distributed CockroachDB', 'Automated K8s Operators', 'Terraform OpenTofu IaC', 'SOC2 / ISO 27001 Controls']
  }
];

export function ArchitecturalDiagram() {
  const [activeTierId, setActiveTierId] = useState<string>('edge');
  const activeTier = TIERS.find((t) => t.id === activeTierId) || TIERS[0];

  return (
    <section className="relative py-28 bg-[#040916] border-t border-cyan-500/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              Technical Visual Storytelling
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
              Enterprise System <span className="text-gradient-cyan">Architecture</span>
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-2xl font-sans">
              An interactive blueprint of our distributed stack. Click any tier below to inspect protocols, throughput bottlenecks solved, and component boundaries.
            </p>
          </div>

          <div className="text-xs font-mono text-cyan-400/80 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800">
            SYSTEM_STATUS: [ ALL_TIERS_NOMINAL ]
          </div>
        </div>

        {/* Interactive Diagram Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stack Tiers */}
          <div className="lg:col-span-7 space-y-3.5">
            {TIERS.map((tier, idx) => {
              const isSelected = activeTierId === tier.id;

              return (
                <div key={tier.id} className="relative">
                  <button
                    onClick={() => setActiveTierId(tier.id)}
                    className={`w-full p-4 sm:p-5 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)] translate-x-2'
                        : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                          {tier.badge}
                        </div>
                        <div
                          className={`font-heading font-bold text-sm sm:text-base leading-snug ${
                            isSelected ? 'text-white' : 'text-slate-300'
                          }`}
                        >
                          {tier.name}
                        </div>
                        <div className="font-mono text-xs text-slate-500">
                          {tier.protocol}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-[10px] font-mono text-slate-500">LATENCY</div>
                      <div className="text-xs font-mono font-bold text-cyan-300">
                        {tier.latency}
                      </div>
                    </div>
                  </button>

                  {/* Flow connector line */}
                  {idx < TIERS.length - 1 && (
                    <div className="h-2 w-0.5 bg-cyan-500/20 mx-auto my-0.5" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Tier Blueprint Specification */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/40 relative space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
                  {activeTier.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active Telemetry
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  {activeTier.name}
                </h3>
                <p className="font-mono text-xs text-cyan-300 mt-1">
                  {activeTier.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mt-4">
                  {activeTier.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <div>
                  <div className="text-[10px] font-mono text-slate-500">BENCHMARK LATENCY</div>
                  <div className="text-xs font-mono font-bold text-cyan-300 mt-0.5">
                    {activeTier.latency}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500">PRIMARY PROTOCOL</div>
                  <div className="text-xs font-mono font-bold text-slate-200 mt-0.5 truncate">
                    {activeTier.protocol}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 font-semibold">
                  Modular Architectural Subsystems:
                </div>
                <div className="space-y-2">
                  {activeTier.components.map((comp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-xs font-mono text-slate-200"
                    >
                      <Terminal className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

