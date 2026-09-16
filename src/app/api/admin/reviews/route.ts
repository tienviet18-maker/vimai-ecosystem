import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";
import type { ReviewStatus } from "@/types";

export const runtime = "edge";

export async function PATCH(request: NextRequest) {
  const { user, supabase, configured } = await requireAdmin();
  if (!configured || !user || !supabase) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    id?: string;
    status?: ReviewStatus;
    featured?: boolean;
    body?: string;
  };
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const patch: Record<string, unknown> = {
    moderated_at: new Date().toISOString(),
    moderated_by: user.id,
  };
  if (body.status) patch.status = body.status;
  if (typeof body.featured === "boolean") patch.featured = body.featured;
  if (typeof body.body === "string") patch.body = body.body.slice(0, 2000);

  const { error } = await supabase.from("reviews").update(patch).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await writeAudit(
    body.status === "approved"
      ? "review approved"
      : body.status === "rejected"
        ? "review rejected"
        : "review updated",
    "review",
    body.id,
  );
  return NextResponse.json({ ok: true });
}
