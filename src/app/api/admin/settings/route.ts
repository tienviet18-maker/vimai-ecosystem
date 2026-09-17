import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, writeAudit } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { assertSameOrigin } from "@/lib/origin";
import { getSiteSettings, upsertSiteSettings } from "@/lib/settings";

export const runtime = "edge";

const SEO_KEYS = [
  "seo_title",
  "seo_description",
  "seo_canonical",
  "og_title",
  "og_description",
  "og_image_url",
  "robots",
] as const;

export async function GET() {
  const { user, configured } = await requireAdmin();
  if (!configured || !user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!can(user.role, "settings") && !can(user.role, "seo")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
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
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as Record<string, string> | null;
  if (!body) return NextResponse.json({ error: "invalid" }, { status: 400 });

  let payload = body;
  if (can(user.role, "settings")) {
    payload = body;
  } else if (can(user.role, "seo")) {
    payload = Object.fromEntries(
      Object.entries(body).filter(([key]) => SEO_KEYS.includes(key as (typeof SEO_KEYS)[number])),
    );
  } else {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const result = await upsertSiteSettings(payload);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  await writeAudit("settings updated", "settings", undefined, { keys: Object.keys(payload) }, user.id);
  return NextResponse.json({ ok: true });
}
