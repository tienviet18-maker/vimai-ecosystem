# ViMai Ecosystem

Production website for [https://vimai.jp](https://vimai.jp) — education and technology products for Tokutei certification, auto mechanic exam prep, children's learning, and health tracking.

## Stack

- Next.js App Router (pinned to 15.5.2 for `@cloudflare/next-on-pages`)
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

`@cloudflare/next-on-pages` currently requires Next.js `<= 15.5.2`.

## Footer

`© 2026 ViMai. All Rights Reserved.`
