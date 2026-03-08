"use client";

import Link from "next/link";
import { useState } from "react";

interface Item {
  label: string;
  count: number;
  href: string;
}

interface SearchablePillsProps {
  items: Item[];
  placeholder: string;
}

export default function SearchablePills({
  items,
  placeholder,
}: SearchablePillsProps) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  return (
    <>
      <div className="mt-8 max-w-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 rounded-full border border-mc-gray/15 bg-white text-sm text-mc-dark placeholder:text-mc-gray/50 focus:outline-none focus:border-mc-lavender/40 transition-colors"
        />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {filtered.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm font-medium px-4 py-2 rounded-full bg-mc-lavender/15 text-mc-dark/70 hover:bg-mc-lavender/25 transition-colors"
          >
            {item.label} ({item.count})
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-mc-gray">No results found.</p>
        )}
      </div>
    </>
  );
}
