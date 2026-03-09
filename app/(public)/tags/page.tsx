import { getAllTags } from "@/lib/posts";
import SearchablePills from "@/components/SearchablePills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags",
};

export default function TagsPage() {
  const tags = getAllTags();

  const items = tags.map(({ tag, count }) => ({
    label: tag,
    count,
    href: `/tags/${encodeURIComponent(tag)}`,
  }));

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-mc-dark">
          Tags
        </h1>
        <p className="mt-4 text-lg text-mc-gray leading-relaxed max-w-2xl">
          Browse articles by topic.
        </p>
        <SearchablePills items={items} placeholder="Search tags..." />
      </div>
    </section>
  );
}
