import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { deleteMedia, listMedia, updateMedia, uploadMediaFile } from "@/lib/storage";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const auth = await authorizeAdmin(request, "media");
  if ("response" in auth) return auth.response;
  const { searchParams } = new URL(request.url);
  const assets = await listMedia({
    q: searchParams.get("q") ?? undefined,
    folder: searchParams.get("folder") ?? undefined,
    productId: searchParams.get("product_id") ?? undefined,
  });
  return NextResponse.json({ assets });
}

export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request, "media", { mutate: true });
  if ("response" in auth) return auth.response;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  const result = await uploadMediaFile(file, {
    folder: String(form.get("folder") ?? "general"),
    altText: String(form.get("alt_text") ?? ""),
    caption: String(form.get("caption") ?? ""),
    productId: String(form.get("product_id") || "") || null,
    articleId: String(form.get("article_id") || "") || null,
    replaceId: String(form.get("replace_id") || "") || null,
  });
  if (result.error && result.status !== 200) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true, url: result.url, asset: result.asset });
}

export async function PATCH(request: NextRequest) {
  const auth = await authorizeAdmin(request, "media", { mutate: true });
  if ("response" in auth) return auth.response;
  const body = (await request.json().catch(() => null)) as {
    id?: string;
    filename?: string;
    alt_text?: string;
    caption?: string;
    folder?: string;
    product_id?: string | null;
    article_id?: string | null;
    featured?: boolean;
    sort_order?: number;
  } | null;
  if (!body?.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const result = await updateMedia({ ...body, id: body.id });
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  await writeAudit("image updated", "media", body.id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const auth = await authorizeAdmin(request, "media", { mutate: true });
  if ("response" in auth) return auth.response;
  const { id } = (await request.json()) as { id?: string };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const result = await deleteMedia(id);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  await writeAudit("image deleted", "media", id);
  return NextResponse.json({ ok: true });
}
