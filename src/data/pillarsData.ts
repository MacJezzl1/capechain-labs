import type { Pillar } from '../types';

export const PILLARS_DATA: Pillar[] = [
  {
    id: 'software-engineering',
    number: '01',
    title: 'Software Engineering',
    subtitle: 'Mission-Critical Systems & High-Throughput Backends',
    description: 'We architect and build distributed enterprise applications, cloud-native SaaS platforms, and resilient backend pipelines designed for zero downtime and multi-region scale.',
    badge: 'Core Systems',
    iconName: 'Terminal',
    capabilities: [
      'Enterprise applications & microservices',
      'Scalable multi-tenant SaaS platforms',
      'Custom high-performance software engines',
      'Complex backend event-driven architectures',
      'High-velocity API infrastructure & gateways'
    ],
    architecturalHighlights: [
      'Event-driven asynchronous messaging with Apache Kafka & NATS',
      'Domain-Driven Design (DDD) with clean hexagonal architecture',
      'Automated CI/CD pipelines with zero-downtime blue/green rollouts',
      'Strict type safety and memory-efficient concurrency models'
    ],
    systemSpecs: [
      { label: 'Latency Benchmark', value: '< 12ms p99' },
      { label: 'Availability Target', value: '99.99%' },
      { label: 'Architecture', value: 'Cloud-Native Distributed' }
    ]
  },
  {
    id: 'artificial-intelligence',
    number: '02',
    title: 'Artificial Intelligence',
    subtitle: 'Autonomous Agent Networks & Predictive Intelligence',
    description: 'We develop domain-specialized AI agent architectures, machine learning inference pipelines, and neural retrieval systems that automate high-cognitive business operations.',
    badge: 'Cognitive Engine',
    iconName: 'Cpu',
    capabilities: [
      'Autonomous multi-agent orchestration systems',
      'Domain-adapted machine learning solutions',
      'Intelligent workflow automation & synthesis',
      'AI-powered operational business platforms',
      'High-throughput vector search & data-driven apps'
    ],
    architecturalHighlights: [
      'Context-aware LLM tool routing with stateful graph memory',
      'Hybrid semantic vector retrieval with reranking pipelines',
      'Edge & local model quantization for low-latency inference',
      'Deterministic verification and safety guardrails'
    ],
    systemSpecs: [
      { label: 'Inference Velocity', value: 'Sub-50ms token stream' },
      { label: 'Context Windows', value: 'Up to 2M tokens' },
      { label: 'Guardrail Enforcement', value: '100% Deterministic' }
    ]
  },
  {
    id: 'blockchain-engineering',
    number: '03',
    title: 'Blockchain Engineering',
    subtitle: 'Decentralized Protocols, Smart Contracts & Web3 Infrastructure',
    description: 'We engineer audited smart contract ecosystems, layer-1/layer-2 protocol integrations, high-security decentralized finance (DeFi) engines, and cryptographic digital asset architectures.',
    badge: 'Cryptographic Protocols',
    iconName: 'Layers',
    capabilities: [
      'Bespoke blockchain networks & rollup nodes',
      'Formally verified smart contracts & protocols',
      'Institutional Web3 infrastructure & RPC nodes',
      'Decentralized finance (DeFi) trading mechanisms',
      'Secure digital asset & tokenization platforms'
    ],
    architecturalHighlights: [
      'Multi-sig custodial security and threshold signature schemes',
      'Zero-knowledge proof (zk-SNARKs) verification pipelines',
      'Gas-optimized contract design with invariant testing suites',
      'Cross-chain state bridges and atomic swap protocols'
    ],
    systemSpecs: [
      { label: 'Security Verification', value: 'Formal Verification + Fuzzing' },
      { label: 'Network Compatibility', value: 'EVM / Solana / Substrate' },
      { label: 'Settlement Speed', value: 'Near-instant Finality' }
    ]
  },
  {
    id: 'digital-infrastructure',
    number: '04',
    title: 'Digital Infrastructure',
    subtitle: 'Global Cloud Meshes, Database Engineering & Security',
    description: 'We build self-healing cloud architectures, multi-region distributed databases, enterprise connectivity fabrics, and impenetrable cyber defense layers.',
    badge: 'Infrastructure',
    iconName: 'Server',
    capabilities: [
      'Hyperscale multi-cloud system orchestration',
      'Globally distributed scalable architectures',
      'Advanced database engineering & sharding',
      'Enterprise API integrations & message buses',
      'Zero-trust security & compliance infrastructure'
    ],
    architecturalHighlights: [
      'Kubernetes operator-based workload autoscaling',
      'Multi-region active-active database replication',
      'Software-defined networking (SDN) and automated mutual TLS',
      'Immutable infrastructure as code (IaC) via Terraform & OpenTofu'
    ],
    systemSpecs: [
      { label: 'Throughput', value: '100k+ req/sec burst' },
      { label: 'Security Standard', value: 'Zero-Trust Architecture' },
      { label: 'Recovery Time (RTO)', value: '< 60 seconds' }
    ]
  },
  {
    id: 'digital-product-innovation',
    number: '05',
    title: 'Digital Product Innovation',
    subtitle: 'Full-Lifecycle Product Engineering & Interactive Experiences',
    description: 'We transform groundbreaking ideas into scalable digital products, combining technical precision with human-centric ergonomics and real-time interactive capabilities.',
    badge: 'Product Engineering',
    iconName: 'Boxes',
    capabilities: [
      'Full-lifecycle digital product development',
      'High-performance web applications & PWAs',
      'Immersive WebGL & 3D interactive experiences',
      'Enterprise transaction & e-commerce systems',
      'Complete end-to-end digital transformation'
    ],
    architecturalHighlights: [
      'Optimized client-side state engines with reactive streaming',
      'Hardware-accelerated 3D rendering with WebGL / Three.js',
      'Sub-second first contentful paint with modern hydration',
      'Comprehensive telemetry, telemetry heatmaps & telemetry logging'
    ],
    systemSpecs: [
      { label: 'Core Web Vitals', value: '98+ Performance Score' },
      { label: 'Interaction Latency', value: '< 16ms frame budget' },
      { label: 'Client Platforms', value: 'Web / Mobile / Embedded' }
    ]
  }
];
