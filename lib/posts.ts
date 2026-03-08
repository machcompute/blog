import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const POSTS_PER_PAGE = 5;

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
  categories: string[];
  series: string[];
  readingTime: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface Post extends PostMeta {
  content: string;
  toc: TocItem[];
}

function normalizeArray(value: unknown): string[] {
  if (!value) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) {
    return value
      .filter((v) => v != null && v !== "")
      .map((v) => String(v).replace(/^#/, ""));
  }
  return [];
}

function slugFromFilename(filename: string): string {
  return filename
    .replace(/\.md$/, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parsePost(filename: string): PostMeta | null {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  if (data.draft) return null;

  return {
    slug: slugFromFilename(filename),
    title: data.title || "",
    description: data.description || "",
    date: data.date ? String(data.date) : "",
    image: data.image || "",
    tags: normalizeArray(data.tags),
    categories: normalizeArray(data.categories),
    series: normalizeArray(data.series),
    readingTime: estimateReadingTime(content),
  };
}

export function getAllPostMeta(): PostMeta[] {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"));

  const posts = files
    .map((f) => parsePost(f))
    .filter((p): p is PostMeta => p !== null);

  posts.sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return db - da;
  });

  return posts;
}

async function renderMarkdown(rawMarkdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-light",
      defaultLang: "plaintext",
    })
    .use(rehypeStringify)
    .process(rawMarkdown);

  let html = String(result);

  // Rewrite internal links from old Hugo domain to relative paths
  html = html.replace(
    /https?:\/\/blog\.machcomputing\.com\//g,
    "/blog/"
  );

  return html;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const filename = files.find((f) => slugFromFilename(f) === slug);

  if (!filename) {
    throw new Error(`Post not found: ${slug}`);
  }

  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(raw);

  if (data.draft) {
    throw new Error(`Post not found: ${slug}`);
  }

  const content = await renderMarkdown(rawContent);

  // Extract TOC from rendered HTML
  const toc: TocItem[] = [];
  const headingRegex = /<h([2-3])\s+id="([^"]+)"[^>]*>(.*?)<\/h[2-3]>/gi;
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    toc.push({
      level: Number(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""),
    });
  }

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date ? String(data.date) : "",
    image: data.image || "",
    tags: normalizeArray(data.tags),
    categories: normalizeArray(data.categories),
    series: normalizeArray(data.series),
    readingTime: estimateReadingTime(rawContent),
    content,
    toc,
  };
}

export function getPaginatedPosts(
  page: number,
  pageSize: number = POSTS_PER_PAGE
): {
  posts: PostMeta[];
  totalPages: number;
  pageSize: number;
} {
  const allPosts = getAllPostMeta();
  const totalPages = Math.ceil(allPosts.length / pageSize);
  const start = (page - 1) * pageSize;
  const posts = allPosts.slice(start, start + pageSize);

  return { posts, totalPages, pageSize };
}

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPostMeta();
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      const key = tag.toLowerCase();
      tagMap.set(key, (tagMap.get(key) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllCategories(): { category: string; count: number }[] {
  const posts = getAllPostMeta();
  const catMap = new Map<string, number>();

  for (const post of posts) {
    for (const cat of post.categories) {
      const key = cat.toLowerCase();
      catMap.set(key, (catMap.get(key) || 0) + 1);
    }
  }

  return Array.from(catMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostMeta().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPostMeta().filter((p) =>
    p.categories.some((c) => c.toLowerCase() === category.toLowerCase())
  );
}
