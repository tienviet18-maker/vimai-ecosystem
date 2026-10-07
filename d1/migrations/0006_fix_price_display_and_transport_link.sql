-- Transport's "Open product site" pointed at tokutei-truck.vimai.jp, which is
-- not attached to the Transport Pages project. The live site is
-- tokutei-transport.vimai.jp. Safe to re-run.
UPDATE products
SET website_url = 'https://tokutei-transport.vimai.jp',
    updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
WHERE slug = 'tokutei-transport'
  AND website_url = 'https://tokutei-truck.vimai.jp';
