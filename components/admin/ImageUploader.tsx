"use client";

import { useState, useRef, useCallback } from "react";

export default function ImageUploader({
  onUploaded,
}: {
  onUploaded?: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setMessage("");
      const fd = new FormData();
      fd.append("file", file);

      try {
        const res = await fetch("/api/admin/images", {
          method: "POST",
          body: fd,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setMessage(`Uploaded: ${data.url}`);
        onUploaded?.(data.url);
      } catch (e) {
        setMessage(`Error: ${(e as Error).message}`);
      } finally {
        setUploading(false);
      }
    },
    [onUploaded]
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
        dragOver
          ? "border-mc-mint bg-mc-mint/5"
          : "border-mc-gray/20 hover:border-mc-gray/40"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      <p className="text-sm text-mc-gray mb-3">
        {uploading ? "Uploading..." : "Drag and drop an image or"}
      </p>
      {!uploading && (
        <button
          onClick={() => inputRef.current?.click()}
          className="px-4 py-2 rounded-xl bg-mc-dark text-white text-sm font-medium hover:bg-mc-dark/85 transition-colors"
        >
          Choose File
        </button>
      )}
      {message && (
        <p
          className={`mt-3 text-xs ${
            message.startsWith("Error") ? "text-red-500" : "text-mc-mint"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
