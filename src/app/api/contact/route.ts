import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  const { error } = await supabase.from("contact_messages").insert({
    name: String(body.name).slice(0, 200),
    email: String(body.email).slice(0, 200),
    subject: body.subject ? String(body.subject).slice(0, 200) : null,
    message: String(body.message).slice(0, 5000),
    locale: body.locale ? String(body.locale).slice(0, 8) : null,
    status: "new",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
