import {
  CTV_PRODUCTS,
  DEFAULT_DISCOUNT_PERCENT,
  DISCOUNT_PERCENTS,
  isCtvProduct,
  referralPrice,
  type CtvProduct,
} from "./ctv-core.ts";

/** Product slug on vimai.jp -> product key used by the referral program. */
const SLUG_TO_PRODUCT: Record<string, CtvProduct> = {
  "tokutei-taxi": "taxi",
  "tokutei-transport": "transport",
  menkyo: "menkyo",
};

export function ctvProductForSlug(slug: string): CtvProduct | null {
  const key = SLUG_TO_PRODUCT[slug] ?? slug;
  return isCtvProduct(key) ? key : null;
}

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString("vi-VN").replace(/,/g, ".")}đ`;
}

/** Price table shown in the editor, from the single source of truth (ctv-core). */
export function priceSummary(product: CtvProduct) {
  return {
    listVnd: CTV_PRODUCTS[product].listVnd,
    referral: DISCOUNT_PERCENTS.map((percent) => ({
      percent,
      payVnd: referralPrice(product, percent).payVnd,
    })),
  };
}

/** Vietnamese feature lines for the web payment (VIP 3 months, VietQR, referral). */
export function buildPriceLines(product: CtvProduct): string[] {
  const { listVnd } = priceSummary(product);
  return [
    `VIP 3 tháng: ${formatVnd(listVnd)}, thanh toán VietQR, tự kích hoạt sau 1–2 phút`,
    "Dùng trên tối đa 2 thiết bị với cùng một tài khoản",
    `Có mã giới thiệu: nhập mã được giảm 10–20% (mặc định ${DEFAULT_DISCOUNT_PERCENT}%)`,
  ];
}

// A line is a price/payment line when it quotes a VND amount, VietQR, a
// referral code or the 2-device rule. Those are exactly the lines we regenerate.
const PRICE_LINE = /\d[.,]?\d{3}\s?(đ|VND|₫)|VietQR|mã giới thiệu|2 thiết bị|hai thiết bị/i;

/** Drops old price/payment lines and puts the current ones first. Idempotent. */
export function applyPriceLines(features: string[], product: CtvProduct): string[] {
  const rest = features.map((line) => line.trim()).filter((line) => line && !PRICE_LINE.test(line));
  return [...buildPriceLines(product), ...rest];
}
