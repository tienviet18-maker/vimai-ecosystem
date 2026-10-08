-- Admin CMS: RBAC, categories, pages, auth events. Additive only.
PRAGMA foreign_keys = ON;

ALTER TABLE admin_users ADD COLUMN role TEXT NOT NULL DEFAULT 'EDITOR';
ALTER TABLE admin_users ADD COLUMN status TEXT NOT NULL DEFAULT 'ACTIVE';
ALTER TABLE admin_users ADD COLUMN updated_at TEXT;

ALTER TABLE faqs ADD COLUMN category TEXT;
ALTER TABLE contact_messages ADD COLUMN read_at TEXT;

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS category_translations (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  UNIQUE (category_id, locale)
);

CREATE TABLE IF NOT EXISTS cms_pages (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  published INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS cms_page_translations (
  id TEXT PRIMARY KEY,
  page_id TEXT NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  seo_title TEXT,
  seo_description TEXT,
  UNIQUE (page_id, locale)
);

CREATE TABLE IF NOT EXISTS auth_events (
  id TEXT PRIMARY KEY,
  ip TEXT NOT NULL,
  email TEXT,
  action TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_auth_events_ip_created ON auth_events (ip, created_at);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages (status, created_at);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users (email);

UPDATE products SET website_url = 'https://tokutei-taxi.vimai.jp'
  WHERE slug = 'tokutei-taxi' AND (website_url IS NULL OR website_url = '');
UPDATE products SET website_url = 'https://tokutei-transport.vimai.jp'
  WHERE slug = 'tokutei-transport' AND (website_url IS NULL OR website_url = '');
UPDATE products SET website_url = 'https://seibi.vimai.jp'
  WHERE slug = 'seibi' AND (website_url IS NULL OR website_url = '');
UPDATE products SET website_url = 'https://kids.vimai.jp'
  WHERE slug = 'kids' AND (website_url IS NULL OR website_url = '');
UPDATE products SET website_url = 'https://maimai.vimai.jp'
  WHERE slug = 'maimai' AND (website_url IS NULL OR website_url = '');
