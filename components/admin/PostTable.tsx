"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { AdminPost } from "@/lib/admin/types";
import StatusBadge from "./StatusBadge";

export default function PostTable() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/admin/posts", { signal: ac.signal })
      .then((r) => r.json())
      .then((d) => {
        setPosts(d.posts || []);
        setLoading(false);
      })
      .catch(() => {});
    return () => ac.abort();
  }, []);

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-14 rounded-xl bg-mc-gray/5 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="flex-1 max-w-sm px-4 py-2 rounded-xl border border-mc-gray/20 bg-white text-sm text-mc-dark placeholder:text-mc-gray/50 focus:outline-none focus:border-mc-mint transition-colors"
        />
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 rounded-xl bg-mc-dark text-white text-sm font-medium hover:bg-mc-dark/85 transition-colors"
        >
          New Post
        </Link>
      </div>

      <div className="border border-mc-gray/15 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-mc-dark/[0.02]">
              <th className="text-left font-semibold text-mc-dark px-5 py-3">
                Title
              </th>
              <th className="text-left font-semibold text-mc-dark px-5 py-3 hidden sm:table-cell">
                Date
              </th>
              <th className="text-left font-semibold text-mc-dark px-5 py-3 hidden md:table-cell">
                Tags
              </th>
              <th className="text-left font-semibold text-mc-dark px-5 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr
                key={post.slug}
                className="border-t border-mc-gray/10 hover:bg-mc-mint/5 transition-colors"
              >
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="font-medium text-mc-dark hover:text-mc-lavender transition-colors"
                  >
                    {post.title}
                  </Link>
                </td>
                <td className="px-5 py-3 text-mc-gray hidden sm:table-cell">
                  {post.date}
                </td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-mc-lavender/15 text-mc-dark/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <StatusBadge draft={post.draft} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-mc-gray"
                >
                  No posts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
