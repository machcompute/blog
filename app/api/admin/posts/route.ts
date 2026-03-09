import { NextRequest, NextResponse } from "next/server";
import { listPosts, createPost } from "@/lib/admin/github";
import { requireAuth, AuthError } from "@/lib/admin/auth";

export async function GET(request: NextRequest) {
  try {
    requireAuth(request.cookies);
    const posts = await listPosts();
    return NextResponse.json({ posts });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    requireAuth(request.cookies);
    const { filename, content, message } = await request.json();
    if (!filename || !content) {
      return NextResponse.json(
        { error: "filename and content are required" },
        { status: 400 }
      );
    }
    const result = await createPost(filename, content, message);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const msg = (e as Error).message;
    const status = msg.includes("422") ? 409 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
