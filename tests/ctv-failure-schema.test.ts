import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("bảng ctv_record_failures có trong migration 0009 và schema.sql", () => {
  const migration = readFileSync("d1/migrations/0009_ctv_record_failures.sql", "utf8");
  const schema = readFileSync("d1/schema.sql", "utf8");
  for (const sql of [migration, schema]) {
    assert.match(sql, /CREATE TABLE IF NOT EXISTS ctv_record_failures/);
    assert.match(sql, /UNIQUE \(product, order_ref\)/);
  }
});

test("route báo lỗi của Worker dùng chữ ký ops", () => {
  const route = readFileSync("src/app/api/ops/referral/failure/route.ts", "utf8");
  assert.match(route, /readSignedOpsRequest/);
});
