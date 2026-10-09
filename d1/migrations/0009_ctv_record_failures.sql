-- Đơn dùng mã CTV mà Worker của app không ghi nhận được vào vimai.jp sau nhiều lần thử.
-- Worker báo qua /api/ops/referral/failure; ghi nhận thành công về sau thì dòng tự xóa.
CREATE TABLE IF NOT EXISTS ctv_record_failures (
  id TEXT PRIMARY KEY,
  product TEXT NOT NULL,
  order_ref TEXT NOT NULL,
  user_ref TEXT NOT NULL,
  code TEXT NOT NULL,
  paid_vnd INTEGER NOT NULL,
  reason TEXT NOT NULL,                      -- rejected | unreachable
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE (product, order_ref)
);
