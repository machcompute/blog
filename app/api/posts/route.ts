import { getAllPostMeta } from "@/lib/posts";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPostMeta().map((post) => ({
    title: post.title,
    slug: "blog/" + post.slug,
    description: post.description,
    date: new Date(post.date).toISOString().split("T")[0],
    tags: post.tags,
    readingTime: post.readingTime,
  }));

  return NextResponse.json(posts);
}
