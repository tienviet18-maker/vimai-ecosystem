import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { writeAudit } from "@/lib/auth";
import { createPartner, regeneratePartnerToken, updatePartner, type PartnerInput } from "@/lib/ctv";

export const runtime = "edge";

const ERROR_STATUS: Record<string, number> = { unconfigured: 503, failed: 500 };

function fail(error: string) {
  return NextResponse.json({ error }, { status: ERROR_STATUS[error] ?? 400 });
}

function privateLink(request: NextRequest, token: string) {
  return `${request.nextUrl.origin}/ctv/${token}`;
}

export async function POST(request: NextRequest) {
  const auth = await authorizeAdmin(request, "ctv", { mutate: true });
  if ("response" in auth) return auth.response;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const result = await createPartner(body);
  if ("error" in result && result.error) return fail(result.error);
  if (!("id" in result) || !result.id) return fail("failed");
  await writeAudit("ctv created", "ctv_partner", result.id, { public_no: result.public_no });
  // Link riêng chỉ hiện đúng một lần ở đây.
  return NextResponse.json({
    ok: true,
    id: result.id,
    code: result.code,
    public_no: result.public_no,
    link: privateLink(request, result.token),
  });
}

export async function PATCH(request: NextRequest) {
  const auth = await authorizeAdmin(request, "ctv", { mutate: true });
  if ("response" in auth) return auth.response;
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const id = body.id;
  if (typeof id !== "string" || !id) return fail("missing_id");

  if (body.regenerate_link === true) {
    const result = await regeneratePartnerToken(id);
    if ("error" in result && result.error) return fail(result.error);
    if (!("token" in result) || !result.token) return fail("failed");
    await writeAudit("ctv link regenerated", "ctv_partner", id);
    return NextResponse.json({ ok: true, link: privateLink(request, result.token) });
  }

  const result = await updatePartner(id, body as PartnerInput & { status?: unknown });
  if ("error" in result && result.error) return fail(result.error);
  await writeAudit("ctv updated", "ctv_partner", id, {
    fields: Object.keys(body).filter((key) => key !== "id"),
  });
  return NextResponse.json({ ok: true });
}
