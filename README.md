# ViMai Ecosystem

Production website for [https://vimai.jp](https://vimai.jp) — education and technology products for Tokutei certification, auto mechanic exam prep, children's learning, and health tracking.

## Stack

- Next.js App Router (pinned to the latest patched 15.5.x; see below)
- Cloudflare Pages project `vimai-ecosystem`
- Cloudflare D1 (CMS) + R2 (media)
- Tailwind CSS + shadcn/ui
- next-intl: Vietnamese (default), English, Japanese

The public site works without D1 by falling back to `src/lib/seed.ts`. Bind D1/R2 and set `AUTH_SECRET` to enable CMS writes, contact intake, media uploads, and admin login.

## Local development

```bash
cp .env.example .env.local
npm install
npx wrangler d1 execute vimai-cms --local --file=d1/schema.sql
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Vietnamese is the default locale (`/`). English is `/en`, Japanese is `/ja`.

## Cloudflare Pages

Do **not** deploy to Vercel or Netlify.

Dashboard settings:

- Framework preset: None
- Build command: `npx @cloudflare/next-on-pages`
- Build output directory: `.vercel/output/static`
- Compatibility flags: `nodejs_compat`
- Bindings: D1 `DB` → `vimai-cms`, R2 `MEDIA` → `vimai-media`

`@cloudflare/next-on-pages` (deprecated upstream) declares a peer range of Next.js `<= 15.5.2`. That release predates the React Server Components RCE fix (CVE-2025-55182 / CVE-2025-66478) and later security releases, so `package.json` pins the latest patched 15.5.x and uses an npm `overrides` entry to satisfy the adapter's peer range. Stay on the 15.5 line; longer term, migrate off next-on-pages (Cloudflare points to vinext / OpenNext).

## Footer

`© 2026 ViMai. All Rights Reserved.`
