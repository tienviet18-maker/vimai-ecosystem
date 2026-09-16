import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";
import { assertSameOrigin } from "@/lib/session";
import { getSiteSettings, upsertSiteSettings } from "@/lib/settings";

export const runtime = "edge";

export async function GET() {
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await getSiteSettings();
  return NextResponse.json({ settings });
}

export async function POST(request: NextRequest) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as Record<string, string> | null;
  if (!body) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const result = await upsertSiteSettings(body);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  await writeAudit("settings updated", "settings");
  return NextResponse.json({ ok: true });
}
