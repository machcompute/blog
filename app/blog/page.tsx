import { getPaginatedPosts } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import Pagination from "@/components/Pagination";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

const VALID_SIZES = [6, 9, 12];
const DEFAULT_SIZE = 6;

interface Props {
  searchParams: Promise<{ page?: string; size?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageStr, size: sizeStr } = await searchParams;

  const rawSize = Number(sizeStr) || DEFAULT_SIZE;
  const pageSize = VALID_SIZES.includes(rawSize) ? rawSize : DEFAULT_SIZE;
  const page = Math.max(1, Number(pageStr) || 1);

  const { posts, totalPages } = getPaginatedPosts(page, pageSize);

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-mc-dark">
          Blog
        </h1>
        <p className="mt-4 text-lg text-mc-gray leading-relaxed max-w-2xl">
          Articles on AI/ML, algorithms, data structures, and programming.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/blog"
          pageSize={pageSize}
        />
      </div>
    </section>
  );
}
