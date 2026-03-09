import "server-only";
import type { AdminPost, PostContent, GitHubImage, PullRequest } from "./types";
import matter from "gray-matter";

const API = "https://api.github.com";

function env(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`${key} is not set`);
  return v;
}

function validateSlug(slug: string): string {
  if (!/^[a-z0-9][a-z0-9\-]*$/.test(slug)) {
    throw new Error("Invalid slug");
  }
  return slug;
}

function validateFilename(name: string): string {
  if (!/^[a-zA-Z0-9_\-]+\.[a-z0-9]{2,5}$/.test(name)) {
    throw new Error("Invalid filename");
  }
  return name;
}

function repo() {
  return env("GITHUB_REPO");
}
function branch() {
  return env("GITHUB_BRANCH");
}

async function gh(endpoint: string, options?: RequestInit): Promise<Response> {
  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${env("GITHUB_TOKEN")}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options?.headers,
    },
    cache: "no-store",
  });
  return res;
}

// --- Posts ---

export async function listPosts(): Promise<AdminPost[]> {
  const res = await gh(
    `/repos/${repo()}/contents/content/blog?ref=${branch()}`
  );
  if (!res.ok) throw new Error(`GitHub: ${res.status} ${await res.text()}`);

  const files: Array<{
    name: string;
    sha: string;
    download_url: string;
    content?: string;
    encoding?: string;
  }> = await res.json();

  const posts: AdminPost[] = [];

  for (const file of files) {
    if (!file.name.endsWith(".md")) continue;

    let raw: string;
    if (file.content && file.encoding === "base64") {
      raw = Buffer.from(file.content, "base64").toString("utf-8");
    } else {
      const r = await fetch(file.download_url, { cache: "no-store" });
      raw = await r.text();
    }

    const { data } = matter(raw);
    posts.push({
      slug: file.name.replace(/\.md$/, ""),
      filename: file.name,
      title: data.title || file.name,
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      description: data.description || "",
      draft: data.draft ?? false,
      image: data.image || "",
      tags: data.tags || [],
      categories: data.categories || [],
      series: data.series || [],
      sha: file.sha,
    });
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPost(slug: string): Promise<PostContent> {
  const filename = `${validateSlug(slug)}.md`;
  const res = await gh(
    `/repos/${repo()}/contents/content/blog/${filename}?ref=${branch()}`
  );
  if (!res.ok) throw new Error(`GitHub: ${res.status} ${await res.text()}`);

  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");

  return { filename: data.name, content, sha: data.sha };
}

export async function updatePost(
  slug: string,
  content: string,
  sha: string,
  message?: string
): Promise<{ sha: string }> {
  const filename = `${validateSlug(slug)}.md`;
  const res = await gh(
    `/repos/${repo()}/contents/content/blog/${filename}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message || `Update ${filename}`,
        content: Buffer.from(content).toString("base64"),
        sha,
        branch: branch(),
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub: ${res.status} ${err}`);
  }
  const data = await res.json();
  return { sha: data.content.sha };
}

export async function createPost(
  filename: string,
  content: string,
  message?: string
): Promise<{ sha: string; slug: string }> {
  if (!filename.endsWith(".md")) filename += ".md";
  validateFilename(filename);

  const res = await gh(
    `/repos/${repo()}/contents/content/blog/${filename}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message || `Create ${filename}`,
        content: Buffer.from(content).toString("base64"),
        branch: branch(),
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub: ${res.status} ${err}`);
  }
  const data = await res.json();
  return { sha: data.content.sha, slug: filename.replace(/\.md$/, "") };
}

// --- Images ---

export async function listImages(): Promise<GitHubImage[]> {
  const res = await gh(
    `/repos/${repo()}/contents/public/res/images?ref=${branch()}`
  );
  if (!res.ok) throw new Error(`GitHub: ${res.status} ${await res.text()}`);

  const files: Array<{
    name: string;
    path: string;
    sha: string;
    size: number;
  }> = await res.json();

  return files.map((f) => ({
    name: f.name,
    path: f.path,
    url: `/res/images/${f.name}`,
    sha: f.sha,
    size: f.size,
  }));
}

export async function uploadImage(
  filename: string,
  base64Content: string,
  message?: string
): Promise<{ url: string; sha: string }> {
  validateFilename(filename);
  const res = await gh(
    `/repos/${repo()}/contents/public/res/images/${filename}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message || `Upload image ${filename}`,
        content: base64Content,
        branch: branch(),
      }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub: ${res.status} ${err}`);
  }
  const data = await res.json();
  return { url: `/res/images/${filename}`, sha: data.content.sha };
}

// --- Pull Requests ---

export async function listPullRequests(): Promise<PullRequest[]> {
  const res = await gh(`/repos/${repo()}/pulls?state=open`);
  if (!res.ok) throw new Error(`GitHub: ${res.status} ${await res.text()}`);

  const prs: Array<{
    number: number;
    title: string;
    body: string;
    state: string;
    created_at: string;
    head: { ref: string };
    base: { ref: string };
    mergeable: boolean | null;
    html_url: string;
  }> = await res.json();

  return prs.map((pr) => ({
    number: pr.number,
    title: pr.title,
    body: pr.body || "",
    state: pr.state,
    createdAt: pr.created_at,
    headRef: pr.head.ref,
    baseRef: pr.base.ref,
    mergeable: pr.mergeable ?? false,
    url: pr.html_url,
  }));
}

export async function createPullRequest(
  title: string,
  body?: string
): Promise<PullRequest> {
  const res = await gh(`/repos/${repo()}/pulls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      body: body || "",
      head: branch(),
      base: "main",
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub: ${res.status} ${err}`);
  }
  const pr = await res.json();
  return {
    number: pr.number,
    title: pr.title,
    body: pr.body || "",
    state: pr.state,
    createdAt: pr.created_at,
    headRef: pr.head.ref,
    baseRef: pr.base.ref,
    mergeable: pr.mergeable ?? false,
    url: pr.html_url,
  };
}

export async function mergePullRequest(
  number: number,
  method: "merge" | "squash" | "rebase" = "squash"
): Promise<{ merged: boolean; sha: string }> {
  const res = await gh(`/repos/${repo()}/pulls/${number}/merge`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ merge_method: method }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub: ${res.status} ${err}`);
  }
  const data = await res.json();
  return { merged: data.merged, sha: data.sha };
}
