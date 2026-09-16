import { NextRequest, NextResponse } from "next/server";
import { getMediaObject } from "@/lib/storage";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ key: string[] }> },
) {
  const { key } = await context.params;
  const objectKey = key.join("/");
  if (!objectKey || objectKey.includes("..")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const object = await getMediaObject(objectKey);
  if (!object) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const headers = new Headers();
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  if (object.httpMetadata?.contentType) {
    headers.set("Content-Type", object.httpMetadata.contentType);
  }
  if (object.size) headers.set("Content-Length", String(object.size));

  return new NextResponse(object.body, { status: 200, headers });
}
