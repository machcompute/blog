"use client";

import { useState } from "react";
import type { PullRequest } from "@/lib/admin/types";

export default function PullRequestCard({
  pr,
  onMerged,
}: {
  pr: PullRequest;
  onMerged?: () => void;
}) {
  const [merging, setMerging] = useState(false);
  const [error, setError] = useState("");

  async function handleMerge() {
    setMerging(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/pull-requests/${pr.number}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mergeMethod: "squash" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onMerged?.();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setMerging(false);
    }
  }

  return (
    <div className="border border-mc-gray/15 rounded-2xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-mc-dark truncate">{pr.title}</h3>
          <p className="text-xs text-mc-gray mt-1">
            #{pr.number} &middot; {pr.headRef} &rarr; {pr.baseRef} &middot;{" "}
            {new Date(pr.createdAt).toLocaleDateString()}
          </p>
          {pr.body && (
            <p className="text-sm text-mc-gray mt-2 line-clamp-2">{pr.body}</p>
          )}
        </div>
        <button
          onClick={handleMerge}
          disabled={merging}
          className="shrink-0 px-4 py-2 rounded-xl bg-mc-mint text-mc-dark text-sm font-medium hover:bg-mc-mint/80 transition-colors disabled:opacity-50"
        >
          {merging ? "Merging..." : "Merge"}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
