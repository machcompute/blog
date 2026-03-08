import { getAllPostMeta, getPostBySlug } from "@/lib/posts";
import TagPill from "@/components/TagPill";
import Prose from "@/components/Prose";
import TableOfContents from "@/components/TableOfContents";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPostMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        ...(post.image && {
          images: [post.image.startsWith("/") ? post.image : `/${post.image}`],
        }),
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  const hasToc = post.toc.length > 0;

  return (
    <article className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header — always centered */}
        <div className="max-w-3xl mx-auto">
          <time className="text-sm font-mono text-mc-gray">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-mc-dark">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <TagPill
                  key={tag}
                  label={tag}
                  href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                />
              ))}
            </div>
          )}
          {post.image && (
            <div className="relative w-full aspect-video mt-8 rounded-2xl overflow-hidden">
              <Image
                src={
                  post.image.startsWith("/") ? post.image : `/${post.image}`
                }
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
        </div>

        {/* Body — with optional sidebar TOC */}
        <div
          className={
            hasToc
              ? "mt-10 lg:grid lg:grid-cols-[1fr_220px] lg:gap-12 max-w-4xl mx-auto"
              : "max-w-3xl mx-auto"
          }
        >
          <div className="min-w-0">
            {/* Mobile TOC — shown before body on small screens */}
            {hasToc && (
              <div className="lg:hidden mb-10 p-6 rounded-2xl border border-mc-gray/15 bg-mc-dark/[0.02]">
                <TableOfContents items={post.toc} />
              </div>
            )}
            <Prose html={post.content} />
          </div>

          {/* Desktop TOC — sticky sidebar */}
          {hasToc && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={post.toc} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}
