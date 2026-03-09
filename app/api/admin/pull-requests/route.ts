import { NextRequest, NextResponse } from "next/server";
import { listPullRequests, createPullRequest } from "@/lib/admin/github";
import { requireAuth, AuthError } from "@/lib/admin/auth";

export async function GET(request: NextRequest) {
  try {
    requireAuth(request.cookies);
    const pullRequests = await listPullRequests();
    return NextResponse.json({ pullRequests });
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
    const { title, body } = await request.json();
    if (!title) {
      return NextResponse.json(
        { error: "title is required" },
        { status: 400 }
      );
    }
    const pr = await createPullRequest(title, body);
    return NextResponse.json(pr, { status: 201 });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 }
    );
  }
}
