import { getAllTags, getPostsByTag } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `Posts tagged "${decoded}"`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  if (posts.length === 0) notFound();

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-mc-dark">
          Tag: {decoded}
        </h1>
        <p className="mt-4 text-lg text-mc-gray leading-relaxed">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
