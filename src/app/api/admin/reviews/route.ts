import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";
import { updateReview } from "@/lib/reviews";
import { assertSameOrigin } from "@/lib/session";
import type { ReviewStatus } from "@/types";

export const runtime = "edge";

export async function PATCH(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    id?: string;
    status?: ReviewStatus;
    featured?: boolean;
    body?: string;
  };
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const result = await updateReview({
    id: body.id,
    status: body.status,
    featured: body.featured,
    body: body.body,
    moderated_by: user.id,
  });
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

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
