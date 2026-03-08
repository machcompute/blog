import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full flex flex-col p-6 rounded-2xl border border-mc-gray/15 bg-white hover:border-mc-mint/40 transition-colors">
        {post.image && (
          <div className="relative w-full aspect-video mb-4 rounded-xl overflow-hidden">
            <Image
              src={post.image.startsWith("/") ? post.image : `/${post.image}`}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-mc-gray font-mono">
          <time>{formatDate(post.date)}</time>
          <span className="text-mc-gray/30">/</span>
          <span>{post.readingTime} min</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-mc-dark leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-mc-gray leading-relaxed line-clamp-2 flex-1">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-mc-lavender/15 text-mc-dark/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
