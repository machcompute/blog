import { getAllCategories } from "@/lib/posts";
import SearchablePills from "@/components/SearchablePills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  const items = categories.map(({ category, count }) => ({
    label: category,
    count,
    href: `/categories/${encodeURIComponent(category)}`,
  }));

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-mc-dark">
          Categories
        </h1>
        <p className="mt-4 text-lg text-mc-gray leading-relaxed max-w-2xl">
          Browse articles by category.
        </p>
        <SearchablePills items={items} placeholder="Search categories..." />
      </div>
    </section>
  );
}
