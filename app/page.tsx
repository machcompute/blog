import Link from "next/link";
import { getAllPostMeta } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";

export default function Home() {
  const posts = getAllPostMeta();
  const featured = posts[0];
  const latest = posts.slice(1, 7);

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 lg:pt-32 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-mc-dark">
                Ideas At{" "}
                <span className="text-mc-lavender">Mach</span>{" "}
                <span className="text-mc-mint">Speed</span>
              </h1>
              <p className="mt-6 text-lg text-mc-gray leading-relaxed max-w-lg">
                Exploring algorithms, AI, systems programming, and the craft of
                building things that are fast, elegant, and actually work.
              </p>
              <Link
                href="/blog"
                className="mt-8 inline-flex items-center px-6 py-3 rounded-full bg-mc-dark text-white font-medium text-sm hover:bg-mc-dark/85 transition-colors"
              >
                Browse Articles
              </Link>
            </div>
            <div className="flex-1 w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                aria-hidden="true"
              >
                <path
                  d="M0 400 Q0 0 400 0 L400 400 Z"
                  fill="#98DFAF"
                  opacity="0.35"
                  className="geo-a"
                />
                <circle cx="160" cy="160" r="110" fill="#B8B3E9" opacity="0.5" className="geo-b" />
                <rect
                  x="260"
                  y="260"
                  width="80"
                  height="80"
                  rx="16"
                  fill="#2E282A"
                  className="geo-c"
                />
                <rect
                  x="80"
                  y="310"
                  width="36"
                  height="36"
                  rx="4"
                  fill="#DEEFB7"
                  transform="rotate(45 98 328)"
                  className="geo-d"
                />
                <circle
                  cx="320"
                  cy="120"
                  r="40"
                  fill="none"
                  stroke="#8A8D91"
                  strokeWidth="6"
                  opacity="0.3"
                  className="geo-e"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="bg-mc-dark/[0.02]">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
            <h2 className="text-3xl sm:text-4xl font-bold text-mc-dark tracking-tight">
              Featured
            </h2>
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-8 block rounded-2xl border border-mc-gray/15 bg-white p-8 sm:p-10 hover:border-mc-mint/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-sm text-mc-gray font-mono">
                    <time>
                      {new Date(featured.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span className="text-mc-gray/30">/</span>
                    <span>{featured.readingTime} min read</span>
                  </div>
                  <h3 className="mt-3 text-2xl sm:text-3xl font-bold text-mc-dark leading-snug tracking-tight">
                    {featured.title}
                  </h3>
                  <p className="mt-3 text-mc-gray leading-relaxed line-clamp-3 max-w-2xl">
                    {featured.description}
                  </p>
                  {featured.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {featured.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-mc-lavender/15 text-mc-dark/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="shrink-0 text-sm font-medium text-mc-mint opacity-0 group-hover:opacity-100 transition-opacity">
                  Read &rarr;
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-mc-dark tracking-tight">
              Latest
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-mc-gray hover:text-mc-dark transition-colors"
            >
              All Posts &rarr;
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
