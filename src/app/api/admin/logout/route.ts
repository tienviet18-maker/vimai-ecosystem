import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";
import { assertSameOrigin, clearSessionCookie } from "@/lib/session";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  const { user } = await requireAdmin();
  if (user) await writeAudit("logout", "admin", user.id);
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response);
  return response;
}
