import type { Project } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'cape-core-mesh',
    title: 'CapeChain HyperMesh Gateway',
    tagline: 'High-Throughput Heterogeneous Blockchain Gateway & State Bridge',
    category: 'Blockchain Engineering',
    status: 'Production',
    featured: true,
    problemSolved:
      'Cross-chain enterprise settlements suffer from excessive transaction finality delays (often 15–45 minutes), fragile centralized relayer vulnerabilities, and prohibitive gas overhead across EVM and Solana ecosystems.',
    overview:
      'A non-custodial, high-throughput cryptographic gateway engineered in Rust and Go that verifies state proofs across disparate blockchain networks with sub-second optimistic finality and threshold signature consensus.',
    technicalArchitecture: {
      overview: 'Distributed validator federation running Tendermint-compatible consensus with zero-knowledge proof verification modules and automated gas relay balancing.',
      throughput: '12,500 tx/sec',
      latency: '820ms finality',
      concurrency: '32 parallel bridge workers',
      security: 'Threshold Ed25519 TSS with Slashing Safeguards',
      diagramType: 'consensus'
    },
    technologies: ['Rust', 'Go', 'Solidity', 'Zero-Knowledge Proofs', 'gRPC', 'Docker', 'Prometheus'],
    features: [
      'Zero-knowledge state verification across EVM and Solana',
      'Distributed threshold signature schemes (TSS) eliminating single points of failure',
      'Dynamic relayer gas auctioning for 48% fee reduction',
      'Real-time cryptographic audit trail and Prometheus telemetry'
    ],
    metrics: [
      { label: 'Settlement Latency', value: '820ms' },
      { label: 'Cross-Chain Volume Protected', value: '$42M+' },
      { label: 'Uptime', value: '99.995%' }
    ],
    repoUrl: 'https://github.com/capechainlabs/hypermesh-gateway',
    liveUrl: 'https://gateway.capechainlabs.io',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'nexus-agent-lattice',
    title: 'Nexus Cognitive Agent Lattice',
    tagline: 'Autonomous Multi-Agent Orchestration Engine with Directed Acyclic Task Graphs',
    category: 'Artificial Intelligence',
    status: 'Production',
    featured: true,
    problemSolved:
      'Enterprise workflow automation with foundational LLMs frequently fails due to hallucinated dependencies, lack of verifiable tool execution bounds, context degradation, and runaway API latency.',
    overview:
      'An enterprise-grade multi-agent runtime that coordinates specialized autonomous agents executing complex analytical and operational workflows using DAG topological planning, state isolation, and deterministic guardrail monitors.',
    technicalArchitecture: {
      overview: 'Asynchronous event-driven orchestrator written in Python and Rust, backed by Redis cluster for hot state cache and Qdrant for semantic long-term episodic memory vectors.',
      throughput: '3,200 agent steps/min',
      latency: '45ms graph scheduling overhead',
      concurrency: '500 concurrent agent swarms',
      security: 'Sandboxed WASM runtime for arbitrary tool code',
      diagramType: 'pipeline'
    },
    technologies: ['Python 3.12', 'Rust', 'LangGraph', 'Qdrant Vector DB', 'Redis', 'FastAPI', 'OpenTelemetry'],
    features: [
      'Topologically sorted task dependency resolver with automatic error recovery',
      'Isolated memory buffers preventing prompt leakage across tenant boundaries',
      'Dynamic tool arbitration with cryptographically signed execution tokens',
      'Human-in-the-loop verification hooks with sub-millisecond state serialization'
    ],
    metrics: [
      { label: 'Task Completion Rate', value: '99.2%' },
      { label: 'Average Step Latency', value: '142ms' },
      { label: 'Tool Dispatch Reliability', value: '99.98%' }
    ],
    repoUrl: 'https://github.com/capechainlabs/nexus-agent-lattice',
    liveUrl: 'https://nexus.capechainlabs.io',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'aether-telemetry-bus',
    title: 'Aether Distributed Event Fabric',
    tagline: 'Ultra-Low Latency Streaming Telemetry & Distributed Message Fabric',
    category: 'Digital Infrastructure',
    status: 'Production',
    featured: true,
    problemSolved:
      'Modern IoT and fintech backends crumble when ingest traffic spikes into the millions of packets per second, causing cascading buffer bloat, unmonitored backpressure, and data packet loss.',
    overview:
      'A ultra-low overhead telemetry ingest engine engineered in C++20 and Rust that captures, validates, and routes millions of structured telemetry events per second across multi-region edge nodes.',
    technicalArchitecture: {
      overview: 'Zero-copy ring buffer architecture utilizing io_uring and eBPF kernel bypass, streaming directly to partitioned Apache Kafka topics and ClickHouse columnar storage.',
      throughput: '2.4M msgs/sec per cluster node',
      latency: '< 1.8ms p99',
      concurrency: '100k persistent TLS sockets',
      security: 'Mutual TLS (mTLS) with SPIFFE/SPIRE hardware tokens',
      diagramType: 'mesh'
    },
    technologies: ['C++20', 'Rust', 'eBPF', 'io_uring', 'ClickHouse', 'Apache Kafka', 'Grafana'],
    features: [
      'Zero-copy memory ring buffer preventing GC pauses and heap fragmentation',
      'Dynamic kernel filtering with programmable eBPF bytecode probes',
      'Automatic failover to geo-replicated fallback regions with zero data loss',
      'Built-in real-time anomaly detection using online streaming histograms'
    ],
    metrics: [
      { label: 'Ingest Rate', value: '2.4M msg/s' },
      { label: 'Ingest Latency (p99)', value: '1.4ms' },
      { label: 'CPU Utilization Under Load', value: '< 28%' }
    ],
    repoUrl: 'https://github.com/capechainlabs/aether-event-fabric',
    liveUrl: 'https://aether.capechainlabs.io',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'strata-core-erp',
    title: 'Strata Enterprise Core Engine',
    tagline: 'Event-Sourced Enterprise Resource Planning Architecture with CQRS',
    category: 'Software Engineering',
    status: 'Enterprise Pilot',
    featured: false,
    problemSolved:
      'Legacy monolithic ERP systems suffer from data reconciliation discrepancies, brittle database locks during batch reconciliations, and slow month-end audit calculations.',
    overview:
      'A modular, event-sourced enterprise system built on CQRS (Command Query Responsibility Segregation) principles, offering immutable audit logs, sub-millisecond query read models, and automated compliance verification.',
    technicalArchitecture: {
      overview: 'Microservices architecture coordinated via gRPC over HTTP/2, utilizing PostgreSQL for event sourcing and Elasticsearch for instant distributed read projection queries.',
      throughput: '45,000 queries/sec',
      latency: '< 8ms query response',
      concurrency: '15,000 simultaneous enterprise users',
      security: 'Role-Based & Attribute-Based Access Control (RBAC/ABAC)',
      diagramType: 'microservices'
    },
    technologies: ['TypeScript', 'Node.js', 'Go', 'PostgreSQL', 'Elasticsearch', 'Docker', 'Kubernetes'],
    features: [
      'Immutable cryptographic event store enabling retroactive point-in-time state reconstruction',
      'Separation of transactional writes from read projections for linear horizontal scalability',
      'Automated financial ledger validation with double-entry cryptographic checks',
      'Fine-grained tenant data residency partitioning compliant with SOC2 and GDPR'
    ],
    metrics: [
      { label: 'Query Response', value: '7.8ms' },
      { label: 'Audit Reconciliation', value: '100% Deterministic' },
      { label: 'Event Throughput', value: '50k ev/s' }
    ],
    repoUrl: 'https://github.com/capechainlabs/strata-enterprise-core',
    liveUrl: 'https://strata.capechainlabs.io',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'vortex-visual-engine',
    title: 'Vortex Spatial Web Platform',
    tagline: 'Next-Generation Real-Time WebGL & 3D Interactive Spatial Visualization',
    category: 'Digital Product Innovation',
    status: 'Active Development',
    featured: false,
    problemSolved:
      'Complex architectural and industrial CAD models cannot be visualized smoothly in web browsers without huge file sizes, stuttering frame rates, and mobile device crashes.',
    overview:
      'A high-performance WebGL 2.0 visualization engine that renders millions of parametric polygons in real time at 60 FPS across both desktop and mobile devices using progressive level-of-detail and compute shaders.',
    technicalArchitecture: {
      overview: 'Custom WebGL/WebGPU pipeline featuring octree spatial indexing, GPU mesh instancing, and asynchronous streaming binary geometry loaders.',
      throughput: '60 FPS stable',
      latency: '< 16.6ms frame time',
      concurrency: 'Multi-threaded Web Workers for geometry decompression',
      security: 'Client-side sandboxed rendering with zero external asset dependencies',
      diagramType: 'pipeline'
    },
    technologies: ['TypeScript', 'WebGL 2.0', 'Three.js', 'WebGPU', 'GLSL Shaders', 'Web Workers', 'WebAssembly'],
    features: [
      'Dynamic LOD (Level-of-Detail) mesh decimation preserving visual fidelity',
      'Custom procedural PBR (Physically Based Rendering) lighting and environment reflections',
      'Low memory footprint: runs at 60 FPS on mid-tier mobile browsers',
      'Touch and mouse interactive spatial navigation with smooth spherical camera constraints'
    ],
    metrics: [
      { label: 'Rendering Frame Rate', value: '60 FPS' },
      { label: 'Geometry Load Time', value: '< 450ms' },
      { label: 'Draw Call Reduction', value: '88%' }
    ],
    repoUrl: 'https://github.com/capechainlabs/vortex-spatial-engine',
    liveUrl: 'https://vortex.capechainlabs.io',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80'
  }
];
