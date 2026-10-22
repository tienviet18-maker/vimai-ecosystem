import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

// Baseline security headers. public/_headers covers static assets; Cloudflare Pages does
// not apply _headers to Function (SSR / API) responses, so the same set is sent from here
// too. Keep both lists identical (tests/security-headers.test.ts). No CSP yet: it needs
// testing against inline JSON-LD, the Cloudflare beacon and next-intl.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

if (process.env.NODE_ENV === "development") {
  try {
    const { setupDevPlatform } = await import("@cloudflare/next-on-pages/next-dev");
    await setupDevPlatform();
  } catch {
    /* next build / machines without wrangler bindings still compile */
  }
}

export default withNextIntl(nextConfig);
