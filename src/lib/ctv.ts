import { getDb, newId, nowIso, type D1Database } from "@/lib/cloudflare";
import {
  DEFAULT_COMMISSION_VND,
  DEFAULT_DISCOUNT_PERCENT,
  generatePartnerToken,
  generatePublicNo,
  generateReferralCode,
  isDiscountPercent,
  isWellFormedCode,
  normalizeCode,
  periodOf,
  referralPrice,
  sha256Hex,
  type CtvProduct,
  type DiscountPercent,
} from "@/lib/ctv-core";

export type PartnerStatus = "active" | "paused" | "ended";
export type ReferralStatus = "pending" | "paid" | "void";

export type Partner = {
  id: string;
  public_no: string;
  code: string;
  nickname: string;
  contact: string | null;
  bank_name: string | null;
  bank_account_name: string | null;
  bank_account_no: string | null;
  status: PartnerStatus;
  discount_percent: DiscountPercent;
  commission_vnd: number;
  terms_accepted_at: string | null;
  note: string | null;
  created_at: string;
};

export type PartnerStats = Partner & {
  period_count: number;
  period_unpaid_vnd: number;
  total_count: number;
  total_unpaid_vnd: number;
};

export type Referral = {
  id: string;
  partner_id: string;
  product: string;
  paid_vnd: number;
  commission_vnd: number;
  status: ReferralStatus;
  period_key: string;
  created_at: string;
  paid_at: string | null;
  pay_ref: string | null;
};

const PARTNER_FIELDS = [
  "id",
  "public_no",
  "code",
  "nickname",
  "contact",
  "bank_name",
  "bank_account_name",
  "bank_account_no",
  "status",
  "discount_percent",
  "commission_vnd",
  "terms_accepted_at",
  "note",
  "created_at",
];
const PARTNER_COLUMNS = PARTNER_FIELDS.join(", ");
const PARTNER_COLUMNS_P = PARTNER_FIELDS.map((field) => `p.${field}`).join(", ");

function clean(value: unknown, max = 200): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed || null;
}

function isUniqueError(error: unknown) {
  return /UNIQUE|constraint/i.test(error instanceof Error ? error.message : String(error));
}

export type PartnerInput = {
  nickname?: unknown;
  contact?: unknown;
  bank_name?: unknown;
  bank_account_name?: unknown;
  bank_account_no?: unknown;
  discount_percent?: unknown;
  commission_vnd?: unknown;
  note?: unknown;
  terms_accepted?: unknown;
};

export async function createPartner(input: PartnerInput) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const nickname = clean(input.nickname, 80);
  if (!nickname) return { error: "nickname_required" as const };
  const percent = Number(input.discount_percent ?? DEFAULT_DISCOUNT_PERCENT);
  if (!isDiscountPercent(percent)) return { error: "bad_discount" as const };
  const commission = Number(input.commission_vnd ?? DEFAULT_COMMISSION_VND);
  if (!Number.isInteger(commission) || commission < 0 || commission > 10_000_000) {
    return { error: "bad_commission" as const };
  }

  for (let attempt = 0; attempt < 6; attempt += 1) {
    const token = generatePartnerToken();
    const timestamp = nowIso();
    const id = newId();
    const code = generateReferralCode();
    const publicNo = generatePublicNo();
    try {
      await db
        .prepare(
          `INSERT INTO ctv_partners (
             id, public_no, code, nickname, contact, bank_name, bank_account_name, bank_account_no,
             status, discount_percent, commission_vnd, token_hash, terms_accepted_at, note, created_at, updated_at
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?, ?)`,
        )
        .bind(
          id,
          publicNo,
          code,
          nickname,
          clean(input.contact),
          clean(input.bank_name, 80),
          clean(input.bank_account_name, 120),
          clean(input.bank_account_no, 40),
          percent,
          commission,
          await sha256Hex(token),
          input.terms_accepted ? timestamp : null,
          clean(input.note, 500),
          timestamp,
          timestamp,
        )
        .run();
      return { id, code, public_no: publicNo, token };
    } catch (error) {
      if (!isUniqueError(error)) {
        console.error("createPartner failed", error);
        return { error: "failed" as const };
      }
    }
  }
  return { error: "failed" as const };
}

export async function updatePartner(id: string, input: PartnerInput & { status?: unknown }) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const sets: string[] = [];
  const binds: unknown[] = [];
  const set = (column: string, value: unknown) => {
    sets.push(`${column} = ?`);
    binds.push(value);
  };
  if (input.nickname !== undefined) {
    const nickname = clean(input.nickname, 80);
    if (!nickname) return { error: "nickname_required" as const };
    set("nickname", nickname);
  }
  if (input.contact !== undefined) set("contact", clean(input.contact));
  if (input.bank_name !== undefined) set("bank_name", clean(input.bank_name, 80));
  if (input.bank_account_name !== undefined) set("bank_account_name", clean(input.bank_account_name, 120));
  if (input.bank_account_no !== undefined) set("bank_account_no", clean(input.bank_account_no, 40));
  if (input.note !== undefined) set("note", clean(input.note, 500));
  if (input.status !== undefined) {
    if (input.status !== "active" && input.status !== "paused" && input.status !== "ended") {
      return { error: "bad_status" as const };
    }
    set("status", input.status);
  }
  if (input.discount_percent !== undefined) {
    const percent = Number(input.discount_percent);
    if (!isDiscountPercent(percent)) return { error: "bad_discount" as const };
    set("discount_percent", percent);
  }
  if (input.commission_vnd !== undefined) {
    const commission = Number(input.commission_vnd);
    if (!Number.isInteger(commission) || commission < 0 || commission > 10_000_000) {
      return { error: "bad_commission" as const };
    }
    set("commission_vnd", commission);
  }
  if (input.terms_accepted !== undefined) set("terms_accepted_at", input.terms_accepted ? nowIso() : null);
  if (sets.length === 0) return { error: "nothing_to_update" as const };
  set("updated_at", nowIso());
  await db
    .prepare(`UPDATE ctv_partners SET ${sets.join(", ")} WHERE id = ?`)
    .bind(...binds, id)
    .run();
  return { ok: true as const };
}

/** Cấp lại link riêng. Link cũ hết hiệu lực ngay. */
export async function regeneratePartnerToken(id: string) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const token = generatePartnerToken();
  await db
    .prepare(`UPDATE ctv_partners SET token_hash = ?, updated_at = ? WHERE id = ?`)
    .bind(await sha256Hex(token), nowIso(), id)
    .run();
  return { token };
}

export async function listPartners(periodKey: string): Promise<PartnerStats[]> {
  const db = getDb();
  if (!db) return [];
  const { results } = await db
    .prepare(
      `SELECT ${PARTNER_COLUMNS_P},
         COALESCE((SELECT COUNT(*) FROM ctv_referrals r WHERE r.partner_id = p.id AND r.status != 'void' AND r.period_key = ?), 0) AS period_count,
         COALESCE((SELECT SUM(r.commission_vnd) FROM ctv_referrals r WHERE r.partner_id = p.id AND r.status = 'pending' AND r.period_key = ?), 0) AS period_unpaid_vnd,
         COALESCE((SELECT COUNT(*) FROM ctv_referrals r WHERE r.partner_id = p.id AND r.status != 'void'), 0) AS total_count,
         COALESCE((SELECT SUM(r.commission_vnd) FROM ctv_referrals r WHERE r.partner_id = p.id AND r.status = 'pending'), 0) AS total_unpaid_vnd
       FROM ctv_partners p
       ORDER BY p.created_at DESC`,
    )
    .bind(periodKey, periodKey)
    .all<PartnerStats>();
  return results ?? [];
}

export async function listReferrals(periodKey: string): Promise<(Referral & { nickname: string; public_no: string })[]> {
  const db = getDb();
  if (!db) return [];
  const { results } = await db
    .prepare(
      `SELECT r.id, r.partner_id, r.product, r.paid_vnd, r.commission_vnd, r.status, r.period_key,
              r.created_at, r.paid_at, r.pay_ref, p.nickname, p.public_no
       FROM ctv_referrals r JOIN ctv_partners p ON p.id = r.partner_id
       WHERE r.period_key = ? ORDER BY r.created_at DESC LIMIT 500`,
    )
    .bind(periodKey)
    .all<Referral & { nickname: string; public_no: string }>();
  return results ?? [];
}

/** Hoàn tiền: hủy hoa hồng (void), hoặc khôi phục nếu hủy nhầm. Không đụng đơn đã trả. */
export async function setReferralVoid(id: string, makeVoid: boolean) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const row = await db
    .prepare(`SELECT status FROM ctv_referrals WHERE id = ?`)
    .bind(id)
    .first<{ status: ReferralStatus }>();
  if (!row) return { error: "not_found" as const };
  if (row.status === "paid") return { error: "already_paid" as const };
  await db
    .prepare(`UPDATE ctv_referrals SET status = ? WHERE id = ?`)
    .bind(makeVoid ? "void" : "pending", id)
    .run();
  return { ok: true as const };
}

export type PayoutRow = {
  partner_id: string;
  public_no: string;
  nickname: string;
  bank_name: string | null;
  bank_account_name: string | null;
  bank_account_no: string | null;
  count: number;
  amount_vnd: number;
};

/** Mỗi CTV có bao nhiêu đơn chưa trả trong kỳ và tổng tiền hoa hồng. */
export async function payoutRows(periodKey: string): Promise<PayoutRow[]> {
  const db = getDb();
  if (!db) return [];
  const { results } = await db
    .prepare(
      `SELECT p.id AS partner_id, p.public_no, p.nickname, p.bank_name, p.bank_account_name, p.bank_account_no,
              COUNT(r.id) AS count, COALESCE(SUM(r.commission_vnd), 0) AS amount_vnd
       FROM ctv_referrals r JOIN ctv_partners p ON p.id = r.partner_id
       WHERE r.period_key = ? AND r.status = 'pending'
       GROUP BY p.id ORDER BY amount_vnd DESC`,
    )
    .bind(periodKey)
    .all<PayoutRow>();
  return results ?? [];
}

export async function markPeriodPaid(partnerId: string, periodKey: string, payRef: string | null) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  await db
    .prepare(
      `UPDATE ctv_referrals SET status = 'paid', paid_at = ?, pay_ref = ?
       WHERE partner_id = ? AND period_key = ? AND status = 'pending'`,
    )
    .bind(nowIso(), clean(payRef, 120), partnerId, periodKey)
    .run();
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Dùng bởi Worker của từng app (HMAC), không phải khách gọi trực tiếp.

export async function findActivePartnerByCode(db: D1Database, rawCode: unknown) {
  const code = normalizeCode(rawCode);
  if (!isWellFormedCode(code)) return null;
  return db
    .prepare(`SELECT ${PARTNER_COLUMNS} FROM ctv_partners WHERE code = ? AND status = 'active'`)
    .bind(code)
    .first<Partner>();
}

export async function validateCode(rawCode: unknown, product: CtvProduct) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const partner = await findActivePartnerByCode(db, rawCode);
  if (!partner) return { valid: false as const };
  const price = referralPrice(product, partner.discount_percent);
  return {
    valid: true as const,
    discountPercent: partner.discount_percent,
    listVnd: price.listVnd,
    discountVnd: price.discountVnd,
    payVnd: price.payVnd,
  };
}

export type RecordResult =
  | { status: "recorded" | "duplicate" }
  | { status: "invalid_code" | "user_already_used" | "amount_mismatch" | "unconfigured" | "failed" };

export async function recordReferral(input: {
  product: CtvProduct;
  orderRef: string;
  userRef: string;
  code: unknown;
  paidVnd: number;
}): Promise<RecordResult> {
  const db = getDb();
  if (!db) return { status: "unconfigured" };
  const existing = await db
    .prepare(`SELECT id FROM ctv_referrals WHERE product = ? AND order_ref = ?`)
    .bind(input.product, input.orderRef)
    .first();
  if (existing) return { status: "duplicate" };

  const partner = await findActivePartnerByCode(db, input.code);
  if (!partner) return { status: "invalid_code" };
  const price = referralPrice(input.product, partner.discount_percent);
  if (price.payVnd !== input.paidVnd) return { status: "amount_mismatch" };

  const usedBefore = await db
    .prepare(`SELECT id FROM ctv_referrals WHERE product = ? AND user_ref = ?`)
    .bind(input.product, input.userRef)
    .first();
  if (usedBefore) return { status: "user_already_used" };

  const now = new Date();
  try {
    await db
      .prepare(
        `INSERT INTO ctv_referrals (
           id, partner_id, code, product, order_ref, user_ref, list_price_vnd, paid_vnd, discount_vnd,
           commission_vnd, status, period_key, created_at
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?)`,
      )
      .bind(
        newId(),
        partner.id,
        partner.code,
        input.product,
        input.orderRef,
        input.userRef,
        price.listVnd,
        price.payVnd,
        price.discountVnd,
        partner.commission_vnd,
        periodOf(now).key,
        now.toISOString(),
      )
      .run();
    return { status: "recorded" };
  } catch (error) {
    if (isUniqueError(error)) return { status: "duplicate" };
    console.error("recordReferral failed", error);
    return { status: "failed" };
  }
}

// ---------------------------------------------------------------------------
// Công khai: bảng xếp hạng chỉ có số hiển thị và số đơn.

export type LeaderboardRow = { public_no: string; count: number };

export async function leaderboard(periodKey: string, limit = 50): Promise<LeaderboardRow[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const { results } = await db
      .prepare(
        `SELECT p.public_no AS public_no, COUNT(r.id) AS count, MAX(r.created_at) AS last_at
         FROM ctv_referrals r JOIN ctv_partners p ON p.id = r.partner_id
         WHERE r.period_key = ? AND r.status != 'void' AND p.status != 'ended'
         GROUP BY p.id ORDER BY count DESC, last_at ASC LIMIT ?`,
      )
      .bind(periodKey, limit)
      .all<LeaderboardRow>();
    return (results ?? []).map((row) => ({ public_no: row.public_no, count: Number(row.count) }));
  } catch (error) {
    // Bảng CTV chưa được tạo (chưa áp migration 0008): hiện bảng trống thay vì lỗi 500.
    console.error("leaderboard failed", error);
    return [];
  }
}

export async function partnerByToken(token: string) {
  const db = getDb();
  if (!db || !/^[A-HJKMNP-Z2-9]{24}$/.test(token)) return null;
  try {
    return await loadPartnerPortal(db, token);
  } catch (error) {
    console.error("partnerByToken failed", error);
    return null;
  }
}

async function loadPartnerPortal(db: D1Database, token: string) {
  const partner = await db
    .prepare(`SELECT ${PARTNER_COLUMNS} FROM ctv_partners WHERE token_hash = ? AND status != 'ended'`)
    .bind(await sha256Hex(token))
    .first<Partner>();
  if (!partner) return null;
  const { results } = await db
    .prepare(
      `SELECT id, partner_id, product, paid_vnd, commission_vnd, status, period_key, created_at, paid_at, pay_ref
       FROM ctv_referrals WHERE partner_id = ? ORDER BY created_at DESC LIMIT 200`,
    )
    .bind(partner.id)
    .all<Referral>();
  return { partner, referrals: results ?? [] };
}

// ---------------------------------------------------------------------------
// Đơn Worker không ghi nhận được: hiện ở /admin/ctv để anh xử lý.

export type RecordFailure = {
  id: string;
  product: CtvProduct;
  order_ref: string;
  user_ref: string;
  code: string;
  paid_vnd: number;
  reason: string;
  attempts: number;
  created_at: string;
  updated_at: string;
};

export async function upsertRecordFailure(input: {
  product: CtvProduct;
  orderRef: string;
  userRef: string;
  code: string;
  paidVnd: number;
  reason: string;
  attempts: number;
}) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const now = nowIso();
  try {
    await db
      .prepare(
        `INSERT INTO ctv_record_failures
           (id, product, order_ref, user_ref, code, paid_vnd, reason, attempts, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT (product, order_ref) DO UPDATE SET
           reason = excluded.reason, attempts = excluded.attempts, updated_at = excluded.updated_at`,
      )
      .bind(
        newId(),
        input.product,
        input.orderRef,
        input.userRef,
        input.code,
        input.paidVnd,
        input.reason,
        input.attempts,
        now,
        now,
      )
      .run();
    return { ok: true as const };
  } catch (error) {
    console.error("upsertRecordFailure failed", error);
    return { error: "failed" as const };
  }
}

/** Đơn đã ghi nhận được (hoặc đã có) thì xóa cảnh báo. Lỗi bảng thiếu bị bỏ qua. */
export async function clearRecordFailure(product: CtvProduct, orderRef: string) {
  const db = getDb();
  if (!db) return;
  try {
    await db
      .prepare(`DELETE FROM ctv_record_failures WHERE product = ? AND order_ref = ?`)
      .bind(product, orderRef)
      .run();
  } catch {}
}

export async function listRecordFailures(): Promise<RecordFailure[]> {
  const db = getDb();
  if (!db) return [];
  try {
    const { results } = await db
      .prepare(`SELECT * FROM ctv_record_failures ORDER BY updated_at DESC LIMIT 100`)
      .all<RecordFailure>();
    return results ?? [];
  } catch {
    return [];
  }
}

export async function dismissRecordFailure(id: string) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  await db.prepare(`DELETE FROM ctv_record_failures WHERE id = ?`).bind(id).run();
  return { ok: true as const };
}

/** Anh bấm "Thử ghi lại": chạy lại đúng luồng ghi nhận ở server. */
export async function retryRecordFailure(id: string) {
  const db = getDb();
  if (!db) return { error: "unconfigured" as const };
  const row = await db
    .prepare(`SELECT * FROM ctv_record_failures WHERE id = ?`)
    .bind(id)
    .first<RecordFailure>();
  if (!row) return { error: "not_found" as const };
  const result = await recordReferral({
    product: row.product,
    orderRef: row.order_ref,
    userRef: row.user_ref,
    code: row.code,
    paidVnd: row.paid_vnd,
  });
  if (result.status === "recorded" || result.status === "duplicate") {
    await clearRecordFailure(row.product, row.order_ref);
    return { status: result.status };
  }
  return { status: result.status };
}
