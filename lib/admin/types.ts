export interface AdminPost {
  slug: string;
  filename: string;
  title: string;
  date: string;
  description: string;
  draft: boolean;
  image: string;
  tags: string[];
  categories: string[];
  series: string[];
  sha: string;
}

export interface PostContent {
  filename: string;
  content: string;
  sha: string;
}

export interface GitHubImage {
  name: string;
  path: string;
  url: string;
  sha: string;
  size: number;
}

export interface PullRequest {
  number: number;
  title: string;
  body: string;
  state: string;
  createdAt: string;
  headRef: string;
  baseRef: string;
  mergeable: boolean;
  url: string;
}

export interface FrontmatterValues {
  title: string;
  date: string;
  description: string;
  draft: boolean;
  image: string;
  tags: string[];
  categories: string[];
  series: string[];
}
