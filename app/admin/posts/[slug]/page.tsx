"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import matter from "gray-matter";
import type { FrontmatterValues } from "@/lib/admin/types";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import FrontmatterForm from "@/components/admin/FrontmatterForm";
import SaveBar from "@/components/admin/SaveBar";
import ImageUploader from "@/components/admin/ImageUploader";

const PostEditor = dynamic(() => import("@/components/admin/PostEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-2xl bg-mc-gray/5 animate-pulse" />
  ),
});

const DEFAULT_FM: FrontmatterValues = {
  title: "",
  date: "",
  description: "",
  draft: false,
  image: "",
  tags: [],
  categories: [],
  series: [],
};

export default function EditPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const editorRef = useRef<MDXEditorMethods>(null);

  const [frontmatter, setFrontmatter] = useState<FrontmatterValues>(DEFAULT_FM);
  const [initialMarkdown, setInitialMarkdown] = useState<string | null>(null);
  const [sha, setSha] = useState("");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const ac = new AbortController();
    Promise.all([
      fetch(`/api/admin/posts/${slug}`, { signal: ac.signal }).then((r) =>
        r.json()
      ),
      fetch("/api/admin/images", { signal: ac.signal }).then((r) => r.json()),
    ])
      .then(([postData, imgData]) => {
        const { data, content } = matter(postData.content);
        setFrontmatter({
          title: data.title || "",
          date: data.date
            ? new Date(data.date).toISOString().split("T")[0]
            : "",
          description: data.description || "",
          draft: data.draft ?? false,
          image: data.image || "",
          tags: data.tags || [],
          categories: data.categories || [],
          series: data.series || [],
        });
        setInitialMarkdown(content);
        setSha(postData.sha);
        setImages(
          (imgData.images || []).map(
            (i: { url: string }) => i.url
          )
        );
      })
      .catch(() => {});
    return () => ac.abort();
  }, [slug]);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (dirty) e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dirty]);

  const handleFrontmatterChange = useCallback((fm: FrontmatterValues) => {
    setFrontmatter(fm);
    setDirty(true);
  }, []);

  const handleEditorChange = useCallback(() => {
    setDirty(true);
  }, []);

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const markdown = editorRef.current?.getMarkdown() || "";
      const fullContent = matter.stringify(markdown, frontmatter);
      const res = await fetch(`/api/admin/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: fullContent, sha }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSha(data.sha);
      setDirty(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function handleDiscard() {
    window.location.reload();
  }

  if (initialMarkdown === null) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 rounded-xl bg-mc-gray/5 animate-pulse" />
        <div className="h-40 rounded-2xl bg-mc-gray/5 animate-pulse" />
        <div className="h-[400px] rounded-2xl bg-mc-gray/5 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-mc-dark tracking-tight">
        Edit Post
      </h1>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      <FrontmatterForm
        values={frontmatter}
        onChange={handleFrontmatterChange}
        existingImages={images}
      />

      <PostEditor
        ref={editorRef}
        initialMarkdown={initialMarkdown}
        onChange={handleEditorChange}
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

      <SaveBar
        dirty={dirty}
        saving={saving}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  );
}
