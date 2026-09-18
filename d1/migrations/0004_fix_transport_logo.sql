-- Point ViMai Transport at the clean tokutei_vantai.png logo.
PRAGMA foreign_keys = ON;

UPDATE products
SET
  logo_url = '/images/products/tokutei_vantai.png',
  icon_url = '/images/products/tokutei_vantai.png',
  hero_image_url = '/images/products/tokutei_vantai.png',
  og_image_url = '/images/products/tokutei_vantai.png',
  updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
WHERE slug = 'tokutei-transport'
   OR id = '00000000-0000-0000-0000-000000000002';
