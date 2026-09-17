import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { getAuthSecret } from "@/lib/cloudflare";
import { hashPassword, verifyPassword } from "@/lib/password";
import { assertSameOrigin } from "@/lib/origin";
import {
  SESSION_COOKIE,
  readSession,
  signSession as signSessionToken,
  sessionCookieOptions,
  type SessionUser,
} from "@/lib/session-token";

export {
  hashPassword,
  verifyPassword,
  assertSameOrigin,
  SESSION_COOKIE,
  readSession,
  sessionCookieOptions,
};
export type { SessionUser };

function hydrateAuthSecret() {
  if (!process.env.AUTH_SECRET) {
    const secret = getAuthSecret();
    if (secret) process.env.AUTH_SECRET = secret;
  }
}

export async function signSession(user: SessionUser) {
  hydrateAuthSecret();
  return signSessionToken(user);
}

export async function getSessionFromCookies(): Promise<SessionUser | null> {
  hydrateAuthSecret();
  const store = await cookies();
  return readSession(store.get(SESSION_COOKIE)?.value);
}

export function applySessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  return response;
}

export function getSessionTokenFromRequest(request: NextRequest) {
  return request.cookies.get(SESSION_COOKIE)?.value;
}
