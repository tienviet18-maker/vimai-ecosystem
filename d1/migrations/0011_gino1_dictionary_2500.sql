-- Gino 1 Seibi: the parts and terms dictionary grew from 800+ to 2,520 entries.
-- Rewrites only the "800" phrase inside the Gino 1 rows, so any other edits
-- made in the admin CMS stay. Safe to re-run: a second run changes nothing.

UPDATE product_translations SET
  description = REPLACE(REPLACE(REPLACE(description, '800語以上', '2500語以上'), 'hơn 800 mục', 'hơn 2.500 mục'), 'over 800 entries', 'over 2,500 entries'),
  long_description = REPLACE(REPLACE(REPLACE(long_description, '800語以上', '2500語以上'), 'hơn 800 mục', 'hơn 2.500 mục'), 'over 800 entries', 'over 2,500 entries'),
  features = REPLACE(REPLACE(REPLACE(features, '800語以上', '2500語以上'), 'hơn 800 mục', 'hơn 2.500 mục'), 'over 800 entries', 'over 2,500 entries'),
  seo_description = REPLACE(REPLACE(REPLACE(seo_description, '800語以上', '2500語以上'), 'hơn 800 mục', 'hơn 2.500 mục'), 'over 800 entries', 'over 2,500 entries')
WHERE product_id IN (SELECT id FROM products WHERE slug = 'gino1-seibi');

UPDATE faq_translations SET
  answer = REPLACE(REPLACE(REPLACE(answer, '800語以上', '2500語以上'), 'hơn 800 mục', 'hơn 2.500 mục'), 'over 800 entries', 'over 2,500 entries')
WHERE faq_id IN (
  SELECT id FROM faqs WHERE product_id IN (SELECT id FROM products WHERE slug = 'gino1-seibi')
);
