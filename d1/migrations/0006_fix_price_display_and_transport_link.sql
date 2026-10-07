-- 1) Transport's "Open product site" pointed at tokutei-truck.vimai.jp, which is
--    not attached to the Transport Pages project. The live site is
--    tokutei-transport.vimai.jp.
UPDATE products
SET website_url = 'https://tokutei-transport.vimai.jp',
    updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
WHERE slug = 'tokutei-transport'
  AND website_url = 'https://tokutei-truck.vimai.jp';

-- 2) English and Japanese readers do not know what "VND" / "ドン" amounts are
--    worth, so add a yen estimate (VND / 170, rounded to 10 yen, the same rule
--    the apps use). Display only: the prices customers pay do not change.
--    Safe to re-run: rows that already carry the yen figure are skipped.
UPDATE product_translations
SET features = REPLACE(REPLACE(REPLACE(REPLACE(features,
      '499,000 VND', '499,000 VND (about ¥2,940)'),
      '699,000 VND', '699,000 VND (about ¥4,110)'),
      '999,000 VND', '999,000 VND (about ¥5,880)'),
      '1,199,000 VND', '1,199,000 VND (about ¥7,050)')
WHERE locale = 'en'
  AND features LIKE '%VND%'
  AND features NOT LIKE '%2,940%';

UPDATE product_translations
SET features = REPLACE(REPLACE(REPLACE(REPLACE(features,
      '499,000ドン', '499,000ベトナムドン（約2,940円）'),
      '699,000ドン', '699,000ベトナムドン（約4,110円）'),
      '999,000ドン', '999,000ベトナムドン（約5,880円）'),
      '1,199,000ドン', '1,199,000ベトナムドン（約7,050円）')
WHERE locale = 'ja'
  AND features LIKE '%ドン%'
  AND features NOT LIKE '%2,940円%';
