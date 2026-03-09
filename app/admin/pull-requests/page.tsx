"use client";

import { useState, useEffect } from "react";
import type { PullRequest } from "@/lib/admin/types";
import PullRequestCard from "@/components/admin/PullRequestCard";

export default function PullRequestsPage() {
  const [prs, setPrs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  function loadPRs() {
    setLoading(true);
    fetch("/api/admin/pull-requests")
      .then((r) => r.json())
      .then((d) => {
        setPrs(d.pullRequests || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    loadPRs();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setCreating(true);
    setError("");
    try {
      const res = await fetch("/api/admin/pull-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTitle("");
      setBody("");
      loadPRs();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-mc-dark tracking-tight">
        Pull Requests
      </h1>

      {/* Create PR */}
      <div className="border border-mc-gray/15 rounded-2xl p-5">
        <h2 className="font-semibold text-mc-dark mb-4">Create Pull Request</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="PR title"
            className="w-full px-3 py-2 rounded-xl border border-mc-gray/20 text-sm text-mc-dark placeholder:text-mc-gray/50 focus:outline-none focus:border-mc-mint transition-colors"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Description (optional)"
            rows={3}
            className="w-full px-3 py-2 rounded-xl border border-mc-gray/20 text-sm text-mc-dark placeholder:text-mc-gray/50 focus:outline-none focus:border-mc-mint transition-colors resize-none"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={creating || !title.trim()}
            className="px-4 py-2 rounded-xl bg-mc-dark text-white text-sm font-medium hover:bg-mc-dark/85 transition-colors disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create PR"}
          </button>
        </form>
      </div>

      {/* PR List */}
      <div>
        <h2 className="font-semibold text-mc-dark mb-4">Open Pull Requests</h2>
        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-mc-gray/5 animate-pulse"
              />
            ))}
          </div>
        ) : prs.length === 0 ? (
          <p className="text-sm text-mc-gray">No open pull requests</p>
        ) : (
          <div className="space-y-3">
            {prs.map((pr) => (
              <PullRequestCard key={pr.number} pr={pr} onMerged={loadPRs} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
