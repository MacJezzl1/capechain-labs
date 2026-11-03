import type { GitHubRepo } from '../types';

export const DEFAULT_OFFICIAL_PROFILE = 'capechainlabs';

export const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'hypermesh-core',
    full_name: 'capechainlabs/hypermesh-core',
    description: 'High-performance cryptographic cross-chain settlement engine written in Rust with Tendermint-compatible state proofs and TSS threshold signatures.',
    html_url: 'https://github.com/capechainlabs/hypermesh-core',
    stargazers_count: 148,
    forks_count: 24,
    language: 'Rust',
    topics: ['rust', 'blockchain', 'cryptography', 'cross-chain', 'tss', 'state-proofs'],
    updated_at: '2026-03-28T14:22:10Z',
    open_issues_count: 3,
    license: { name: 'Apache-2.0' },
    archived: false,
    default_branch: 'main'
  },
  {
    id: 102,
    name: 'nexus-agent-lattice',
    full_name: 'capechainlabs/nexus-agent-lattice',
    description: 'Autonomous multi-agent runtime orchestrating stateful cognitive agents across directed acyclic task graphs with WASM sandboxing.',
    html_url: 'https://github.com/capechainlabs/nexus-agent-lattice',
    stargazers_count: 320,
    forks_count: 42,
    language: 'Python',
    topics: ['python', 'ai-agents', 'orchestration', 'llm-infrastructure', 'langgraph', 'vector-search'],
    updated_at: '2026-04-01T09:15:45Z',
    open_issues_count: 6,
    license: { name: 'MIT' },
    archived: false,
    default_branch: 'main'
  },
  {
    id: 103,
    name: 'aether-event-fabric',
    full_name: 'capechainlabs/aether-event-fabric',
    description: 'Ultra-low latency streaming telemetry bus built with C++20 and eBPF kernel bypass for millions of packets per second.',
    html_url: 'https://github.com/capechainlabs/aether-event-fabric',
    stargazers_count: 215,
    forks_count: 31,
    language: 'C++',
    topics: ['cpp20', 'ebpf', 'io-uring', 'telemetry', 'high-throughput', 'clickhouse'],
    updated_at: '2026-03-19T18:40:02Z',
    open_issues_count: 2,
    license: { name: 'Apache-2.0' },
    archived: false,
    default_branch: 'master'
  },
  {
    id: 104,
    name: 'strata-cqrs-framework',
    full_name: 'capechainlabs/strata-cqrs-framework',
    description: 'Type-safe event-sourcing and CQRS framework in TypeScript for distributed enterprise microservices and immutable audit logging.',
    html_url: 'https://github.com/capechainlabs/strata-cqrs-framework',
    stargazers_count: 176,
    forks_count: 19,
    language: 'TypeScript',
    topics: ['typescript', 'cqrs', 'event-sourcing', 'microservices', 'postgresql', 'domain-driven-design'],
    updated_at: '2026-03-22T11:05:30Z',
    open_issues_count: 4,
    license: { name: 'MIT' },
    archived: false,
    default_branch: 'main'
  },
  {
    id: 105,
    name: 'zk-vault-contracts',
    full_name: 'capechainlabs/zk-vault-contracts',
    description: 'Formally verified Solidity smart contracts with Groth16 zero-knowledge proof verification for private enterprise digital asset transfers.',
    html_url: 'https://github.com/capechainlabs/zk-vault-contracts',
    stargazers_count: 189,
    forks_count: 27,
    language: 'Solidity',
    topics: ['solidity', 'zk-snarks', 'smart-contracts', 'security', 'audited', 'defi'],
    updated_at: '2026-03-30T16:50:12Z',
    open_issues_count: 1,
    license: { name: 'GPL-3.0' },
    archived: false,
    default_branch: 'main'
  },
  {
    id: 106,
    name: 'vortex-webgl-engine',
    full_name: 'capechainlabs/vortex-webgl-engine',
    description: 'Lightweight WebGL/WebGPU procedural visualization runtime with octree spatial indexing and GPU instancing.',
    html_url: 'https://github.com/capechainlabs/vortex-webgl-engine',
    stargazers_count: 142,
    forks_count: 18,
    language: 'TypeScript',
    topics: ['webgl', 'webgpu', 'threejs', '3d-rendering', 'shaders', 'performance'],
    updated_at: '2026-03-15T08:12:00Z',
    open_issues_count: 0,
    license: { name: 'MIT' },
    archived: false,
    default_branch: 'main'
  }
];

export const LANGUAGE_COLORS: Record<string, string> = {
  Rust: '#dea584',
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Solidity: '#AA6746',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54'
};
