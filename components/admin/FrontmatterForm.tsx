"use client";

import { useState } from "react";
import type { FrontmatterValues } from "@/lib/admin/types";

function ChipInput({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");

  function add() {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput("");
  }

  return (
    <div>
      <label className="block text-xs font-medium text-mc-dark/60 mb-1.5">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-1.5 p-2 border border-mc-gray/20 rounded-xl min-h-[2.5rem]">
        {values.map((v) => (
          <span
            key={v}
            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-mc-lavender/15 text-mc-dark/70"
          >
            {v}
            <button
              type="button"
              onClick={() => onChange(values.filter((x) => x !== v))}
              className="text-mc-dark/40 hover:text-mc-dark"
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          onBlur={add}
          placeholder={`Add ${label.toLowerCase()}...`}
          className="flex-1 min-w-[8rem] text-sm bg-transparent outline-none placeholder:text-mc-gray/40"
        />
      </div>
    </div>
  );
}

export default function FrontmatterForm({
  values,
  onChange,
  existingImages,
}: {
  values: FrontmatterValues;
  onChange: (v: FrontmatterValues) => void;
  existingImages: string[];
}) {
  function set<K extends keyof FrontmatterValues>(
    key: K,
    value: FrontmatterValues[K]
  ) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="border border-mc-gray/15 rounded-2xl p-5 space-y-4 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-mc-dark/60 mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={values.title}
            onChange={(e) => set("title", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-mc-gray/20 text-sm text-mc-dark focus:outline-none focus:border-mc-mint transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-mc-dark/60 mb-1.5">
            Date
          </label>
          <input
            type="date"
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-mc-gray/20 text-sm text-mc-dark focus:outline-none focus:border-mc-mint transition-colors"
          />
        </div>

        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-mc-dark/60 mb-1.5">
              Image
            </label>
            <select
              value={values.image}
              onChange={(e) => set("image", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-mc-gray/20 text-sm text-mc-dark focus:outline-none focus:border-mc-mint transition-colors bg-white"
            >
              <option value="">No image</option>
              {existingImages.map((img) => (
                <option key={img} value={img}>
                  {img}
                </option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 pb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={values.draft}
              onChange={(e) => set("draft", e.target.checked)}
              className="w-4 h-4 rounded accent-mc-mint"
            />
            <span className="text-sm text-mc-dark font-medium">Draft</span>
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-mc-dark/60 mb-1.5">
            Description
          </label>
          <textarea
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-xl border border-mc-gray/20 text-sm text-mc-dark focus:outline-none focus:border-mc-mint transition-colors resize-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ChipInput
          label="Tags"
          values={values.tags}
          onChange={(v) => set("tags", v)}
        />
        <ChipInput
          label="Categories"
          values={values.categories}
          onChange={(v) => set("categories", v)}
        />
        <ChipInput
          label="Series"
          values={values.series}
          onChange={(v) => set("series", v)}
        />
      </div>
    </div>
  );
}
