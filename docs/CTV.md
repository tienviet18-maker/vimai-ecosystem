# CTV referral program (step 1)

Collaborators (CTV) promote the ViMai apps on the web. Each CTV has one referral code that works in every app that sells VIP. A customer who enters the code pays a discounted VietQR amount; the CTV earns a flat commission per successful order. Payout is done by hand every half month.

## Rules (decided by the project owner, 2026-10-08)

- List prices (3-month VIP): Taxi 500,000 đ, Transport 500,000 đ, Menkyo 700,000 đ. Defined in `src/lib/ctv-core.ts` (`CTV_PRODUCTS`).
- Discount per CTV: 10%, 15% (default) or 20%. All results are whole thousands of VND (tested).
- Commission per successful order: set per CTV, default 100,000 đ.
- Web only, VND only. The iOS app has no referral code (Apple In-App Purchase, full price).
- One use per user per product. A repeated `orderRef` is idempotent.
- Periods are half months in Vietnam time: `YYYY-MM-1` (1st to 15th) and `YYYY-MM-2` (16th to month end).

## Admin

`/admin/ctv` (SUPER_ADMIN only, permission `ctv`): create a CTV (code, public number and a private link are generated), pause or end a CTV, change discount and commission, regenerate the private link, see the half-month payout table, download the bank-transfer CSV, mark a CTV as paid, void an order when the customer is refunded.

## Public pages

- `/duatop` shows rank, public number (for example `A17`) and order count per period, plus the previous period's final result. No names. `noindex`.
- `/ctv/<secret>` is the CTV's private page (own code, orders, unpaid commission). The secret is shown once at creation; only its SHA-256 is stored.

## Server API for the app Workers

Both calls are signed. Header `x-ops-timestamp` is Unix seconds (5 minute window) and `x-ops-signature` is the hex HMAC-SHA256 of `${timestamp}.${rawBody}` with the Pages secret `OPS_HMAC_SECRET` (at least 32 characters). `signOpsBody` in `src/lib/ctv-core.ts` is the reference implementation.

`POST /api/ops/referral/validate`

```json
{ "code": "K7QX3M", "product": "menkyo" }
```

Returns `{ "valid": true, "discountPercent": 15, "listVnd": 700000, "discountVnd": 105000, "payVnd": 595000 }` or `{ "valid": false }`.

`POST /api/ops/referral/record` (call after VIP is granted and the amount matched)

```json
{ "product": "menkyo", "orderRef": "<payment id>", "userRef": "<uid>", "code": "K7QX3M", "paidVnd": 595000 }
```

Returns `{ "result": "recorded" }` or `{ "result": "duplicate" }` (HTTP 200). Other results are HTTP 409: `invalid_code`, `user_already_used`, `amount_mismatch`. Never returns internal error text.

## Deploy

1. `npx wrangler d1 execute vimai-cms --remote --file=d1/migrations/0008_ctv_referral.sql`
2. Pages secret `OPS_HMAC_SECRET` (`wrangler pages secret put OPS_HMAC_SECRET`), 32 or more random characters. Share the same value with each app Worker as a Worker secret.
3. Deploy the Pages project. Nothing is visible to customers until the app Workers call the two endpoints and the apps show the code field.

## Not in this step

Wiring the app Workers (the discounted payment amount in the payment code, `VIP_AMOUNTS`), the "Nhập mã giới thiệu" button in the apps, income and expense tracking.
