export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Software Engineering' | 'Artificial Intelligence' | 'Blockchain Engineering' | 'Digital Infrastructure' | 'Digital Product Innovation';
  status: 'Production' | 'Active Development' | 'Open Source Core' | 'Enterprise Pilot';
  problemSolved: string;
  overview: string;
  technicalArchitecture: {
    overview: string;
    throughput?: string;
    latency?: string;
    concurrency?: string;
    security?: string;
    diagramType?: 'microservices' | 'pipeline' | 'consensus' | 'mesh';
  };
  technologies: string[];
  features: string[];
  metrics: { label: string; value: string }[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  open_issues_count: number;
  license?: { name: string } | null;
  archived?: boolean;
  default_branch?: string;
}

export interface Pillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  iconName: string;
  capabilities: string[];
  architecturalHighlights: string[];
  systemSpecs: { label: string; value: string }[];
}

