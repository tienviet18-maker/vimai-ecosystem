-- CTV (cộng tác viên) referral program, step 1: partners and the referral ledger.
-- Prices live in src/lib/ctv-core.ts. Money is whole VND. Safe to re-run.

CREATE TABLE IF NOT EXISTS ctv_partners (
  id TEXT PRIMARY KEY,
  public_no TEXT NOT NULL UNIQUE,            -- shown on /duatop, e.g. A17
  code TEXT NOT NULL UNIQUE,                 -- code customers type, 6 chars
  nickname TEXT NOT NULL,                    -- only the owner sees this
  contact TEXT,
  bank_name TEXT,
  bank_account_name TEXT,
  bank_account_no TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'ended')),
  discount_percent INTEGER NOT NULL DEFAULT 15 CHECK (discount_percent IN (10, 15, 20)),
  commission_vnd INTEGER NOT NULL DEFAULT 100000 CHECK (commission_vnd >= 0),
  token_hash TEXT NOT NULL UNIQUE,           -- sha256 of the secret in the partner's private link
  terms_accepted_at TEXT,
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ctv_referrals (
  id TEXT PRIMARY KEY,
  partner_id TEXT NOT NULL REFERENCES ctv_partners(id),
  code TEXT NOT NULL,
  product TEXT NOT NULL,                     -- taxi | transport | menkyo
  order_ref TEXT NOT NULL,                   -- payment id from the app Worker (idempotency)
  user_ref TEXT NOT NULL,                    -- app user id, one use per product
  list_price_vnd INTEGER NOT NULL,
  paid_vnd INTEGER NOT NULL,
  discount_vnd INTEGER NOT NULL,
  commission_vnd INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'void')),
  period_key TEXT NOT NULL,                  -- e.g. 2026-10-1 (1st to 15th), 2026-10-2 (16th to end)
  created_at TEXT NOT NULL,
  paid_at TEXT,
  pay_ref TEXT,
  note TEXT,
  UNIQUE (product, order_ref),
  UNIQUE (product, user_ref)
);

CREATE INDEX IF NOT EXISTS idx_ctv_referrals_partner ON ctv_referrals (partner_id, status);
CREATE INDEX IF NOT EXISTS idx_ctv_referrals_period ON ctv_referrals (period_key, status);
