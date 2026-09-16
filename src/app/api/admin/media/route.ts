import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";
import { uploadMediaFile } from "@/lib/storage";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  const folder = String(form.get("folder") ?? "general");
  const result = await uploadMediaFile(file, folder);
  if (result.error && result.status !== 200) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  await writeAudit("image uploaded", "media", result.asset?.id, { folder });
  return NextResponse.json({ ok: true, url: result.url, asset: result.asset });
}

export async function DELETE(request: NextRequest) {
  const { user, supabase, configured } = await requireAdmin();
  if (!configured || !user || !supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = (await request.json()) as { id?: string };
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await writeAudit("image deleted", "media", id);
  return NextResponse.json({ ok: true });
}
