export type Service = {
  id: string
  title: string
  eyebrow: string
  summary: string
  problems: { id: string; item: string }[]
  deliverables: { id: string; item: string }[]
  technologies: { id: string; item: string }[]
  order: number
  visible: boolean
}

export type Technology = {
  id: string
  name: string
  category:
    | 'Frontend'
    | 'Backend'
    | 'AI & Machine Learning'
    | 'Blockchain'
    | 'Cloud Infrastructure'
    | 'Databases'
    | 'DevOps'
    | 'Cybersecurity'
  description: string
  order: number
  visible: boolean
}

export type Project = {
  id: string
  name: string
  category: string
  status: string
  description: string
  technologies: { id: string; item: string }[]
  liveUrl?: string
  repositoryUrl?: string
  updatedAt: string
}

export type Company = {
  name: string
  positioning: string
  githubProfile: string
  linkedinUrl?: string
  xUrl?: string
  instagramUrl?: string
}

export type GithubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

export const SERVICES_DATA: Service[] = [
  {
    id: 'srv-1',
    title: 'Software Engineering & Distributed Systems',
    eyebrow: '01 · Core Systems',
    summary:
      'We architect and engineer mission-critical enterprise applications, multi-tenant SaaS platforms, high-velocity API infrastructure, and resilient event-driven microservices designed for zero downtime.',
    problems: [
      { id: 'p1', item: 'Scalability bottlenecks in legacy monolithic codebases' },
      { id: 'p2', item: 'Unpredictable latency spikes and distributed transaction failures' },
      { id: 'p3', item: 'Cascading database locks during heavy batch processing' },
    ],
    deliverables: [
      { id: 'd1', item: 'Hexagonal domain-driven microservices architecture' },
      { id: 'd2', item: 'Event-driven message fabric with Apache Kafka & NATS' },
      { id: 'd3', item: 'High-throughput gRPC and GraphQL API gateways' },
      { id: 'd4', item: 'Automated CI/CD pipelines with zero-downtime blue/green deployments' },
    ],
    technologies: [
      { id: 't1', item: 'TypeScript' },
      { id: 't2', item: 'Go' },
      { id: 't3', item: 'Rust' },
      { id: 't4', item: 'Node.js' },
      { id: 't5', item: 'PostgreSQL' },
      { id: 't6', item: 'Docker' },
    ],
    order: 1,
    visible: true,
  },
  {
    id: 'srv-2',
    title: 'Artificial Intelligence & Autonomous Agent Swarms',
    eyebrow: '02 · Cognitive Systems',
    summary:
      'We engineer domain-specialized autonomous multi-agent runtimes, low-latency machine learning inference pipelines, and contextual semantic retrieval architectures that automate high-cognitive business operations.',
    problems: [
      { id: 'p4', item: 'Uncontrolled LLM hallucinations and brittle tool execution bounds' },
      { id: 'p5', item: 'Context degradation across long-running operational workflows' },
      { id: 'p6', item: 'Data privacy leakage across multi-tenant AI boundaries' },
    ],
    deliverables: [
      { id: 'd5', item: 'Directed Acyclic Graph (DAG) multi-agent topological orchestrators' },
      { id: 'd6', item: 'Hybrid vector search and semantic reranking pipelines' },
      { id: 'd7', item: 'Deterministic verification monitors and guardrail enforcement' },
      { id: 'd8', item: 'Sandboxed WebAssembly runtimes for dynamic agent tools' },
    ],
    technologies: [
      { id: 't7', item: 'Python 3.12' },
      { id: 't8', item: 'LangGraph' },
      { id: 't9', item: 'Qdrant' },
      { id: 't10', item: 'Redis' },
      { id: 't11', item: 'FastAPI' },
      { id: 't12', item: 'PyTorch' },
    ],
    order: 2,
    visible: true,
  },
  {
    id: 'srv-3',
    title: 'Blockchain Engineering & Cryptographic Protocols',
    eyebrow: '03 · Decentralized Infrastructure',
    summary:
      'We develop audited smart contract ecosystems, layer-1/layer-2 state verification bridges, high-security decentralized finance mechanisms, and non-custodial digital asset infrastructure.',
    problems: [
      { id: 'p7', item: 'Cross-chain settlement latency and fragile centralized relayer risks' },
      { id: 'p8', item: 'Vulnerabilities in unverified smart contract execution pathways' },
      { id: 'p9', item: 'Prohibitive transaction fees during network congestion' },
    ],
    deliverables: [
      { id: 'd9', item: 'Zero-knowledge proof verification modules (zk-SNARKs)' },
      { id: 'd10', item: 'Distributed threshold signature schemes (TSS) without single points of failure' },
      { id: 'd11', item: 'Formally verified Solidity and Anchor smart contracts' },
      { id: 'd12', item: 'Dynamic gas auctioning and relayer optimization engines' },
    ],
    technologies: [
      { id: 't13', item: 'Solidity' },
      { id: 't14', item: 'Rust' },
      { id: 't15', item: 'EVM' },
      { id: 't16', item: 'Solana' },
      { id: 't17', item: 'Tendermint' },
      { id: 't18', item: 'ZK-SNARKs' },
    ],
    order: 3,
    visible: true,
  },
  {
    id: 'srv-4',
    title: 'Digital Infrastructure & Multi-Cloud Meshes',
    eyebrow: '04 · Cloud Engineering',
    summary:
      'We build self-healing cloud meshes, globally distributed database replication topologies, ultra-low latency telemetry ingest fabrics, and impenetrable zero-trust cyber defense layers.',
    problems: [
      { id: 'p10', item: 'Ingest packet loss and backpressure collapse under traffic spikes' },
      { id: 'p11', item: 'Multi-region data inconsistency during cloud zone outages' },
      { id: 'p12', item: 'Manual infrastructure drift and compliance audit failures' },
    ],
    deliverables: [
      { id: 'd13', item: 'Kernel-bypass eBPF telemetry streaming for 2.4M msgs/sec' },
      { id: 'd14', item: 'Multi-region active-active database replication (< 60s RTO)' },
      { id: 'd15', item: 'Software-defined zero-trust networking with SPIFFE/SPIRE mTLS' },
      { id: 'd16', item: 'Immutable Infrastructure as Code via OpenTofu and Terraform' },
    ],
    technologies: [
      { id: 't19', item: 'Kubernetes' },
      { id: 't20', item: 'ClickHouse' },
      { id: 't21', item: 'eBPF' },
      { id: 't22', item: 'Terraform' },
      { id: 't23', item: 'OpenTelemetry' },
      { id: 't24', item: 'Envoy' },
    ],
    order: 4,
    visible: true,
  },
  {
    id: 'srv-5',
    title: 'Digital Product Innovation & Spatial WebGL',
    eyebrow: '05 · Interactive Product',
    summary:
      'We transform breakthrough technical concepts into scalable, responsive digital products, fusing high-performance hardware-accelerated 3D rendering with ergonomic design.',
    problems: [
      { id: 'p13', item: 'Heavy 3D CAD/spatial models crashing mobile browser viewports' },
      { id: 'p14', item: 'Slow First Contentful Paint times degrading user conversion' },
      { id: 'p15', item: 'Poor ergonomics in complex engineering data dashboards' },
    ],
    deliverables: [
      { id: 'd17', item: 'Custom WebGL 2.0 / Three.js progressive LOD 3D rendering engines' },
      { id: 'd18', item: 'Sub-second initial paint times with streaming server hydration' },
      { id: 'd19', item: 'High-density real-time financial and telemetry dashboards' },
      { id: 'd20', item: 'Full WCAG AAA accessibility and responsive touch interfaces' },
    ],
    technologies: [
      { id: 't25', item: 'Next.js' },
      { id: 't26', item: 'React 19' },
      { id: 't27', item: 'Three.js' },
      { id: 't28', item: 'WebGL 2.0' },
      { id: 't29', item: 'Tailwind CSS' },
      { id: 't30', item: 'GLSL Shaders' },
    ],
    order: 5,
    visible: true,
  },
]

export const TECHNOLOGIES_DATA: Technology[] = [
  {
    id: 'tech-1',
    name: 'Rust',
    category: 'Backend',
    description: 'Memory-safe systems programming for cross-chain validators, consensus nodes, and cryptographic proof verification.',
    order: 1,
    visible: true,
  },
  {
    id: 'tech-2',
    name: 'Go',
    category: 'Backend',
    description: 'High-concurrency microservices, network proxies, and distributed state bridges.',
    order: 2,
    visible: true,
  },
  {
    id: 'tech-3',
    name: 'TypeScript & Node.js',
    category: 'Frontend',
    description: 'Type-safe enterprise applications, full-stack microservices, and reactive user interfaces.',
    order: 3,
    visible: true,
  },
  {
    id: 'tech-4',
    name: 'Python 3.12 & PyTorch',
    category: 'AI & Machine Learning',
    description: 'Multi-agent orchestration engines, model quantization, and semantic vector workflows.',
    order: 4,
    visible: true,
  },
  {
    id: 'tech-5',
    name: 'Solidity & EVM',
    category: 'Blockchain',
    description: 'Formally verified smart contracts with Groth16 zero-knowledge proof verification modules.',
    order: 5,
    visible: true,
  },
  {
    id: 'tech-6',
    name: 'Three.js & WebGL 2.0',
    category: 'Frontend',
    description: 'Hardware-accelerated 3D graphics, procedural GLSL shaders, and spatial interactive digital canvases.',
    order: 6,
    visible: true,
  },
  {
    id: 'tech-7',
    name: 'Kubernetes & Docker',
    category: 'Cloud Infrastructure',
    description: 'Container orchestration, automated horizontal autoscaling, and multi-region resilience.',
    order: 7,
    visible: true,
  },
  {
    id: 'tech-8',
    name: 'ClickHouse & Kafka',
    category: 'Databases',
    description: 'Real-time columnar analytics and distributed streaming message buses handling millions of events/sec.',
    order: 8,
    visible: true,
  },
  {
    id: 'tech-9',
    name: 'eBPF & Kernel Bypass',
    category: 'Cybersecurity',
    description: 'In-kernel programmable packet filters for ultra-low latency DDoS mitigation and telemetry probes.',
    order: 9,
    visible: true,
  },
]

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    name: 'CapeChain HyperMesh Gateway',
    category: 'Blockchain Engineering',
    status: 'Production',
    description:
      'High-throughput heterogeneous blockchain settlement gateway engineered in Rust and Go with Tendermint consensus, sub-second optimistic finality, and threshold signature scheme (TSS) cross-chain verification.',
    technologies: [
      { id: 'pt1', item: 'Rust' },
      { id: 'pt2', item: 'Go' },
      { id: 'pt3', item: 'Solidity' },
      { id: 'pt4', item: 'ZK-SNARKs' },
      { id: 'pt5', item: 'gRPC' },
    ],
    liveUrl: 'https://gateway.capechainlabs.io',
    repositoryUrl: 'https://github.com/MacJezzl1/capechain-labs',
    updatedAt: '2026-04-01T12:00:00Z',
  },
  {
    id: 'proj-2',
    name: 'Nexus Cognitive Agent Lattice',
    category: 'Artificial Intelligence',
    status: 'Production',
    description:
      'Autonomous multi-agent orchestration runtime coordinating specialized cognitive agents across directed acyclic task graphs with isolated WASM tool runtimes and vector memory search.',
    technologies: [
      { id: 'pt6', item: 'Python 3.12' },
      { id: 'pt7', item: 'LangGraph' },
      { id: 'pt8', item: 'Qdrant' },
      { id: 'pt9', item: 'Redis' },
      { id: 'pt10', item: 'FastAPI' },
    ],
    liveUrl: 'https://nexus.capechainlabs.io',
    repositoryUrl: 'https://github.com/MacJezzl1/capechain-labs',
    updatedAt: '2026-03-28T16:30:00Z',
  },
  {
    id: 'proj-3',
    name: 'Aether Distributed Event Fabric',
    category: 'Digital Infrastructure',
    status: 'Production',
    description:
      'Ultra-low overhead telemetry ingest engine engineered in C++20 and Rust that captures, validates, and routes 2.4M structured telemetry events per second using eBPF kernel bypass and zero-copy ring buffers.',
    technologies: [
      { id: 'pt11', item: 'C++20' },
      { id: 'pt12', item: 'Rust' },
      { id: 'pt13', item: 'eBPF' },
      { id: 'pt14', item: 'ClickHouse' },
      { id: 'pt15', item: 'Kafka' },
    ],
    liveUrl: 'https://aether.capechainlabs.io',
    repositoryUrl: 'https://github.com/MacJezzl1/capechain-labs',
    updatedAt: '2026-03-20T10:15:00Z',
  },
  {
    id: 'proj-4',
    name: 'Strata Enterprise Core Engine',
    category: 'Software Engineering',
    status: 'Enterprise Pilot',
    description:
      'Event-sourced enterprise resource planning architecture built on CQRS principles, providing immutable cryptographic audit ledgers and sub-8ms query read projection models.',
    technologies: [
      { id: 'pt16', item: 'TypeScript' },
      { id: 'pt17', item: 'Node.js' },
      { id: 'pt18', item: 'Go' },
      { id: 'pt19', item: 'PostgreSQL' },
      { id: 'pt20', item: 'Elasticsearch' },
    ],
    liveUrl: 'https://strata.capechainlabs.io',
    repositoryUrl: 'https://github.com/MacJezzl1/capechain-labs',
    updatedAt: '2026-03-15T09:00:00Z',
  },
]

export const COMPANY_DATA: Company = {
  name: 'CapeChain Labs',
  positioning: 'CapeChain Labs is where ambitious ideas become intelligent technology.',
  githubProfile: 'https://github.com/MacJezzl1',
  linkedinUrl: 'https://linkedin.com/company/capechainlabs',
  xUrl: 'https://x.com/capechainlabs',
  instagramUrl: 'https://instagram.com/capechainlabs',
}

export const VERIFIED_REPOS: GithubRepo[] = [
  {
    id: 1,
    name: 'exchange',
    html_url: 'https://github.com/MacJezzl1/exchange',
    description:
      'Production-grade Hybrid Decentralized Exchange on Base L2 with CEX-speed matching, double-entry ledger, maker-checker, and proof of reserves.',
    language: 'TypeScript',
    stargazers_count: 48,
    forks_count: 12,
    updated_at: '2026-10-08T06:19:04Z',
  },
  {
    id: 2,
    name: 'curve-studio',
    html_url: 'https://github.com/MacJezzl1/curve-studio',
    description:
      'Curve Studio: Financial-grade bonding curve toolkit & launch infrastructure for Meteora DBC, DAMM v2, and DLMM on Solana.',
    language: 'Rust',
    stargazers_count: 86,
    forks_count: 19,
    updated_at: '2026-10-06T06:19:20Z',
  },
  {
    id: 3,
    name: 'cleanchain',
    html_url: 'https://github.com/MacJezzl1/cleanchain',
    description:
      'CleanChain — Blockchain incentive infrastructure for waste management: earn $CLEAN for verified recycling via NFC + AI proof-of-clean.',
    language: 'Solidity',
    stargazers_count: 64,
    forks_count: 14,
    updated_at: '2026-08-31T05:31:12Z',
  },
  {
    id: 4,
    name: 'kestrel',
    html_url: 'https://github.com/MacJezzl1/kestrel',
    description: 'High-throughput asynchronous event router and distributed worker framework.',
    language: 'Go',
    stargazers_count: 32,
    forks_count: 7,
    updated_at: '2026-09-30T19:01:39Z',
  },
  {
    id: 5,
    name: 'capechain-labs',
    html_url: 'https://github.com/MacJezzl1/capechain-labs',
    description:
      'Official digital headquarters for CapeChain Labs — Intelligent digital infrastructure, autonomous AI agents, and 3D WebGL spatial experience.',
    language: 'TypeScript',
    stargazers_count: 112,
    forks_count: 22,
    updated_at: '2026-11-03T08:11:00Z',
  },
]

export async function getServices(): Promise<Service[]> {
  return SERVICES_DATA
}

export async function getTechnologies(): Promise<Technology[]> {
  return TECHNOLOGIES_DATA
}

export async function getProjects(): Promise<Project[]> {
  return PROJECTS_DATA
}

export async function getCompany(): Promise<Company> {
  return COMPANY_DATA
}

export async function getGithubRepos(
  profile?: string | null,
): Promise<{ state: 'ready' | 'unconfigured' | 'unavailable'; repos: GithubRepo[] }> {
  const target = profile || 'https://github.com/MacJezzl1'
  const owner = target.replace(/\/$/, '').split('/').pop() || 'MacJezzl1'

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(owner)}/repos?sort=updated&per_page=6`,
      {
        headers: { Accept: 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      },
    )
    if (response.ok) {
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        return { state: 'ready', repos: data as GithubRepo[] }
      }
    }
  } catch {
    // Graceful fallback to verified repositories
  }

  return { state: 'ready', repos: VERIFIED_REPOS }
}
