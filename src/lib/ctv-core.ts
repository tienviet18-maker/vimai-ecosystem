/**
 * Pure helpers for the CTV (collaborator) referral program. No database or
 * framework imports, so they can be unit-tested with `node --test`.
 */

/** Gói 3 tháng, giá gốc (VND). Quyết định của chủ dự án 2026-10-08. */
export const CTV_PRODUCTS = {
  taxi: { listVnd: 500_000 },
  transport: { listVnd: 500_000 },
  menkyo: { listVnd: 700_000 },
} as const;

export type CtvProduct = keyof typeof CTV_PRODUCTS;

export const DISCOUNT_PERCENTS = [10, 15, 20] as const;
export type DiscountPercent = (typeof DISCOUNT_PERCENTS)[number];

export const DEFAULT_DISCOUNT_PERCENT: DiscountPercent = 15;
export const DEFAULT_COMMISSION_VND = 100_000;

export function isCtvProduct(value: unknown): value is CtvProduct {
  return typeof value === "string" && Object.hasOwn(CTV_PRODUCTS, value);
}

export function isDiscountPercent(value: unknown): value is DiscountPercent {
  return DISCOUNT_PERCENTS.includes(value as DiscountPercent);
}

export type ReferralPrice = {
  listVnd: number;
  discountVnd: number;
  payVnd: number;
};

/** Số tiền khách trả sau khi giảm. Luôn là số nguyên, tròn nghìn với giá gốc hiện tại. */
export function referralPrice(product: CtvProduct, percent: DiscountPercent): ReferralPrice {
  const listVnd = CTV_PRODUCTS[product].listVnd;
  const discountVnd = (listVnd * percent) / 100;
  if (!Number.isInteger(discountVnd)) {
    throw new Error("discount is not a whole number of VND");
  }
  return { listVnd, discountVnd, payVnd: listVnd - discountVnd };
}

// Không có I, L, O, 0, 1 để tránh nhầm khi đọc hoặc gõ.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function randomIndexes(count: number, size: number): number[] {
  const out: number[] = [];
  const limit = 256 - (256 % size);
  while (out.length < count) {
    const bytes = new Uint8Array(count * 2);
    crypto.getRandomValues(bytes);
    for (const byte of bytes) {
      if (byte < limit) out.push(byte % size);
      if (out.length === count) break;
    }
  }
  return out;
}

function randomString(length: number): string {
  return randomIndexes(length, CODE_ALPHABET.length)
    .map((index) => CODE_ALPHABET[index])
    .join("");
}

/** Mã khách nhập, 6 ký tự ngẫu nhiên. */
export function generateReferralCode(): string {
  return randomString(6);
}

/** Mã bí mật trong link riêng của CTV, 24 ký tự (khoảng 120 bit). */
export function generatePartnerToken(): string {
  return randomString(24);
}

/** Số hiển thị công khai trên /duatop, ví dụ A17. */
export function generatePublicNo(): string {
  const letters = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const letter = letters[randomIndexes(1, letters.length)[0]];
  const digits = 10 + randomIndexes(1, 90)[0];
  return `${letter}${digits}`;
}

export function normalizeCode(value: unknown): string {
  return typeof value === "string" ? value.trim().toUpperCase().replace(/[\s-]/g, "") : "";
}

export function isWellFormedCode(code: string): boolean {
  return /^[A-HJKMNP-Z2-9]{6}$/.test(code);
}

export async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ---------------------------------------------------------------------------
// Kỳ thanh toán: nửa tháng theo giờ Việt Nam (UTC+7). Kỳ 1 là ngày 1-15, kỳ 2 là 16-hết tháng.

export type Period = { key: string; start: string; end: string };

const VN_OFFSET_MS = 7 * 60 * 60 * 1000;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function periodOf(date: Date): Period {
  const vn = new Date(date.getTime() + VN_OFFSET_MS);
  const year = vn.getUTCFullYear();
  const month = vn.getUTCMonth() + 1;
  const half = vn.getUTCDate() <= 15 ? 1 : 2;
  return periodFromKey(`${year}-${pad2(month)}-${half}`)!;
}

export function periodFromKey(key: string): Period | null {
  const match = /^(\d{4})-(\d{2})-([12])$/.exec(key);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) return null;
  const half = Number(match[3]);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const startDay = half === 1 ? 1 : 16;
  const endDay = half === 1 ? 15 : lastDay;
  return {
    key,
    start: `${year}-${pad2(month)}-${pad2(startDay)}`,
    end: `${year}-${pad2(month)}-${pad2(endDay)}`,
  };
}

export function previousPeriod(period: Period): Period {
  const [year, month, half] = period.key.split("-").map(Number);
  if (half === 2) return periodFromKey(`${year}-${pad2(month)}-1`)!;
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  return periodFromKey(`${prevYear}-${pad2(prevMonth)}-2`)!;
}

// ---------------------------------------------------------------------------
// Chữ ký HMAC cho lời gọi từ Worker của từng app tới /api/ops/*.

const MAX_SKEW_SECONDS = 300;

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> | null {
  if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2 !== 0) return null;
  const out = new Uint8Array(new ArrayBuffer(hex.length / 2));
  for (let i = 0; i < out.length; i += 1) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

async function hmacKey(secret: string, usage: "sign" | "verify") {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage],
  );
}

/** Chữ ký hex của `${timestamp}.${body}`. Phía Worker của app cũng tính đúng công thức này. */
export async function signOpsBody(secret: string, timestamp: string, body: string): Promise<string> {
  const key = await hmacKey(secret, "sign");
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${timestamp}.${body}`));
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** So sánh chữ ký bằng `subtle.verify` (hằng thời gian). */
export async function verifyOpsSignature(
  secret: string,
  timestamp: string | null,
  signature: string | null,
  body: string,
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<boolean> {
  if (!secret || !timestamp || !signature) return false;
  const ts = Number(timestamp);
  if (!Number.isInteger(ts) || Math.abs(nowSeconds - ts) > MAX_SKEW_SECONDS) return false;
  const bytes = hexToBytes(signature);
  if (!bytes) return false;
  const key = await hmacKey(secret, "verify");
  return crypto.subtle.verify("HMAC", key, bytes, new TextEncoder().encode(`${timestamp}.${body}`));
}

// ---------------------------------------------------------------------------
// CSV chuyển khoản.

function csvCell(value: string | number): string {
  const text = String(value);
  // Chống chèn công thức khi mở bằng Excel.
  const safe = typeof value === "string" && /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function toCsv(rows: Array<Array<string | number>>): string {
  return `﻿${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}\r\n`;
}
