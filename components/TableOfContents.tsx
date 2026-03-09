"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/posts";

interface TableOfContentsProps {
  items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  // Build numbering labels matching the CSS counters (Roman for h2, Alpha for h3)
  const toRoman = (n: number): string => {
    const numerals: [number, string][] = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
    ];
    let result = "";
    for (const [value, symbol] of numerals) {
      while (n >= value) { result += symbol; n -= value; }
    }
    return result;
  };

  let h2Count = 0;
  let h3Count = 0;
  const labeledItems = items.map((item) => {
    if (item.level === 2) {
      h2Count++;
      h3Count = 0;
      return { ...item, label: `${toRoman(h2Count)}. ` };
    }
    h3Count++;
    return { ...item, label: `${String.fromCharCode(64 + h3Count)}. ` };
  });

  return (
    <nav>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-mc-gray/50 mb-4">
        On this page
      </h4>
      <ul className="space-y-1.5">
        {labeledItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm leading-snug transition-colors ${
                item.level === 3 ? "pl-4" : ""
              } ${
                activeId === item.id
                  ? "text-mc-dark font-medium"
                  : "text-mc-gray/60 hover:text-mc-dark"
              }`}
            >
              {item.label}{item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
