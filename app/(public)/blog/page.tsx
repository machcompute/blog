import { getAllPostMeta } from "@/lib/posts";
import BlogListing from "@/components/BlogListing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts = getAllPostMeta();

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-mc-dark">
          Blog
        </h1>
        <p className="mt-4 text-lg text-mc-gray leading-relaxed max-w-2xl">
          Articles on AI/ML, algorithms, data structures, and programming.
        </p>
        <BlogListing posts={posts} />
      </div>
    </section>
  );
}
