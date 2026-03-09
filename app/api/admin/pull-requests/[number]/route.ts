import { NextRequest, NextResponse } from "next/server";
import { mergePullRequest } from "@/lib/admin/github";
import { requireAuth, AuthError } from "@/lib/admin/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  try {
    requireAuth(request.cookies);
    const { number } = await params;
    const body = await request.json().catch(() => ({}));
    const method = body.mergeMethod || "squash";
    const result = await mergePullRequest(parseInt(number, 10), method);
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const msg = (e as Error).message;
    const status = msg.includes("409") || msg.includes("405") ? 409 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
