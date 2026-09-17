import { NextRequest, NextResponse } from "next/server";
import { authorizeAdmin } from "@/lib/admin-api";
import { getAuditLogs } from "@/lib/auth";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const auth = await authorizeAdmin(request, "audit");
  if ("response" in auth) return auth.response;
  const limit = Number(new URL(request.url).searchParams.get("limit") ?? 100);
  const logs = await getAuditLogs(Math.min(Math.max(limit, 1), 200));
  return NextResponse.json({ logs });
}
