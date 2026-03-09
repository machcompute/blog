import { NextRequest, NextResponse } from "next/server";
import { getPost, updatePost } from "@/lib/admin/github";
import { requireAuth, AuthError } from "@/lib/admin/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    requireAuth(request.cookies);
    const { slug } = await params;
    const post = await getPost(slug);
    return NextResponse.json(post);
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const msg = (e as Error).message;
    const status = msg.includes("404") ? 404 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    requireAuth(request.cookies);
    const { slug } = await params;
    const { content, sha, message } = await request.json();
    if (!content || !sha) {
      return NextResponse.json(
        { error: "content and sha are required" },
        { status: 400 }
      );
    }
    const result = await updatePost(slug, content, sha, message);
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const msg = (e as Error).message;
    const status = msg.includes("409") ? 409 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
