import { NextRequest, NextResponse } from "next/server";
import { listImages, uploadImage } from "@/lib/admin/github";
import { requireAuth, AuthError } from "@/lib/admin/auth";

export async function GET(request: NextRequest) {
  try {
    requireAuth(request.cookies);
    const images = await listImages();
    return NextResponse.json({ images });
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
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const customName = formData.get("filename") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "file is required" },
        { status: 400 }
      );
    }

    const filename = customName || file.name;
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    const result = await uploadImage(filename, base64);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    if (e instanceof AuthError) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const msg = (e as Error).message;
    const status = msg.includes("422") ? 409 : 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
