"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import matter from "gray-matter";
import type { FrontmatterValues } from "@/lib/admin/types";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import FrontmatterForm from "@/components/admin/FrontmatterForm";
import ImageUploader from "@/components/admin/ImageUploader";

const PostEditor = dynamic(() => import("@/components/admin/PostEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-2xl bg-mc-gray/5 animate-pulse" />
  ),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function NewPostPage() {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);

  const today = new Date().toISOString().split("T")[0];
  const [frontmatter, setFrontmatter] = useState<FrontmatterValues>({
    title: "",
    date: today,
    description: "",
    draft: true,
    image: "",
    tags: [],
    categories: [],
    series: [],
  });
  const [filename, setFilename] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/admin/images")
      .then((r) => r.json())
      .then((d) => setImages((d.images || []).map((i: { url: string }) => i.url)))
      .catch(() => {});
  }, []);

  const handleFrontmatterChange = useCallback((fm: FrontmatterValues) => {
    setFrontmatter(fm);
    if (!filename || filename === slugify(frontmatter.title)) {
      setFilename(slugify(fm.title));
    }
  }, [filename, frontmatter.title]);

  async function handleCreate() {
    if (!filename.trim()) {
      setError("Filename is required");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const markdown = editorRef.current?.getMarkdown() || "";
      const fullContent = matter.stringify(markdown, frontmatter);
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: filename.endsWith(".md") ? filename : `${filename}.md`,
          content: fullContent,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/admin/posts/${data.slug}`);
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-mc-dark tracking-tight">
        New Post
      </h1>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-mc-dark/60 mb-1.5">
          Filename (slug)
        </label>
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="my-new-post"
            className="flex-1 px-3 py-2 rounded-xl border border-mc-gray/20 text-sm text-mc-dark focus:outline-none focus:border-mc-mint transition-colors"
          />
          <span className="text-sm text-mc-gray">.md</span>
        </div>
      </div>

      <FrontmatterForm
        values={frontmatter}
        onChange={handleFrontmatterChange}
        existingImages={images}
      />

      <PostEditor
        ref={editorRef}
        initialMarkdown=""
        imageAutocompleteSuggestions={images}
      />

      <details className="border border-mc-gray/15 rounded-2xl">
        <summary className="px-5 py-3 text-sm font-medium text-mc-dark cursor-pointer">
          Upload Image
        </summary>
        <div className="px-5 pb-5">
          <ImageUploader
            onUploaded={(url) => setImages((prev) => [...prev, url])}
          />
        </div>
      </details>

      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          disabled={saving || !filename.trim()}
          className="px-6 py-3 rounded-xl bg-mc-dark text-white font-medium hover:bg-mc-dark/85 transition-colors disabled:opacity-50"
        >
          {saving ? "Creating..." : "Create Post"}
        </button>
      </div>
    </div>
  );
}
