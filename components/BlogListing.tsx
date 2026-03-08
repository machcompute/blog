"use client";

import { useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import type { PostMeta } from "@/lib/posts";

const PAGE_SIZES = [6, 9, 12];
const DEFAULT_SIZE = 6;

export default function BlogListing({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_SIZE);

  const filtered = useMemo(() => {
    if (!query.trim()) return posts;
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.categories.some((c) => c.toLowerCase().includes(q))
    );
  }, [posts, query]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const start = (safePage - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  function handleSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handleSizeChange(size: number) {
    setPageSize(size);
    setPage(1);
  }

  return (
    <>
      <div className="mt-8">
        <div className="relative max-w-md">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mc-gray/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search posts by title, tag, or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-mc-gray/15 bg-white text-sm text-mc-dark placeholder:text-mc-gray/40 focus:outline-none focus:border-mc-lavender/40 transition-colors"
          />
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-mc-gray">
          No posts found for &ldquo;{query}&rdquo;.
        </p>
      )}

      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-sm text-mc-gray">
            Show
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="px-3 py-1.5 rounded-full border border-mc-gray/15 bg-white text-sm text-mc-dark focus:outline-none focus:border-mc-lavender/40 transition-colors cursor-pointer"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-mc-gray">per page</span>
        </div>

        {totalPages > 1 && (
          <nav className="flex items-center gap-2">
            {safePage > 1 && (
              <button
                onClick={() => setPage(safePage - 1)}
                className="text-sm font-medium px-4 py-2 rounded-full border border-mc-gray/15 text-mc-gray hover:text-mc-dark hover:border-mc-mint/40 transition-colors"
              >
                Previous
              </button>
            )}
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`text-sm font-medium w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  p === safePage
                    ? "bg-mc-dark text-white"
                    : "text-mc-gray hover:text-mc-dark hover:bg-mc-dark/5"
                }`}
              >
                {p}
              </button>
            ))}
            {safePage < totalPages && (
              <button
                onClick={() => setPage(safePage + 1)}
                className="text-sm font-medium px-4 py-2 rounded-full border border-mc-gray/15 text-mc-gray hover:text-mc-dark hover:border-mc-mint/40 transition-colors"
              >
                Next
              </button>
            )}
          </nav>
        )}
      </div>
    </>
  );
}
