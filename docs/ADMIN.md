# Admin CMS

URL: `https://vimai.jp/admin` (later `https://admin.vimai.jp` on the same Pages project)

1. In Cloudflare Dashboard → Pages → `vimai-ecosystem` → Settings → Bindings:
   - D1: binding name `DB`, database `vimai-cms`
   - R2: binding name `MEDIA`, bucket `vimai-media`
2. Apply schema: `npx wrangler d1 execute vimai-cms --remote --file=d1/schema.sql`
3. Pages secrets: `AUTH_SECRET` (at least 32 random characters), plus `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD` for the first login only.
4. Sign in at `/admin/login` with the bootstrap email/password. That creates the first hashed admin row. **Remove bootstrap secrets after first login.**

## Phone workflow — product screenshot

1. Open `https://vimai.jp/admin`
2. Login
3. Products → select product
4. Screenshots / Media → Upload from this device
5. Choose an image (camera or library)
6. Add alt text
7. Optionally Set as hero
8. Save
9. Public site reads D1 + R2. No GitHub commit.

## Auth notes

Passwords are PBKDF2-SHA-256 hashes in D1. Sessions are signed cookies (7 days). Credentials are never in source.
