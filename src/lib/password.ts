const encoder = new TextEncoder();

function toB64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromB64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function pbkdf2(password: string, salt: Uint8Array, iterations = 100000) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations },
    key,
    256,
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt);
  return `pbkdf2:100000:${toB64Url(salt)}:${toB64Url(hash)}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [scheme, iter, saltB64, hashB64] = stored.split(":");
  if (scheme !== "pbkdf2" || !saltB64 || !hashB64) return false;
  const iterations = Number(iter);
  if (!Number.isFinite(iterations) || iterations < 10000) return false;
  const salt = fromB64Url(saltB64);
  const expected = fromB64Url(hashB64);
  const actual = await pbkdf2(password, salt, iterations);
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i += 1) diff |= actual[i] ^ expected[i];
  return diff === 0;
}

/** Minimum length for new or changed admin passwords. Existing hashes are unaffected. */
export const ADMIN_PASSWORD_MIN_LENGTH = 12;

/**
 * A valid PBKDF2 hash of a random, discarded password. Login verifies against it when the
 * email is unknown so that "no such user" costs the same time as "wrong password".
 */
export const DUMMY_PASSWORD_HASH =
  "pbkdf2:100000:BCjlEpIxOeLdBJlAtMsvJQ:GFPH-YjcSYlQJW3EiLs7jxz7hmg76cB_bZDpxFzazDk";

/**
 * Constant-time string comparison. Both sides are hashed first, so neither the content nor
 * the length of the secret leaks through timing.
 */
export async function timingSafeEqualString(a: string, b: string) {
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(a)),
    crypto.subtle.digest("SHA-256", encoder.encode(b)),
  ]);
  const x = new Uint8Array(ha);
  const y = new Uint8Array(hb);
  let diff = 0;
  for (let i = 0; i < x.length; i += 1) diff |= x[i] ^ y[i];
  return diff === 0;
}
