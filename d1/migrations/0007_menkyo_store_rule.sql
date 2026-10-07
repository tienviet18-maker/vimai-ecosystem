-- Menkyo EN/JA: no web wording or pricing; VIP is bought with Apple payment. Safe to re-run.
UPDATE product_translations SET description = replace(description, '（スマートフォン・Web）です', '（スマートフォンアプリ）です') WHERE locale = 'ja' AND product_id = (SELECT id FROM products WHERE slug = 'menkyo');
UPDATE product_translations SET description = replace(description, 'An app (mobile and web) for Vietnamese', 'A mobile app for Vietnamese') WHERE locale = 'en' AND product_id = (SELECT id FROM products WHERE slug = 'menkyo');
UPDATE faq_translations SET answer = replace(answer, '料金体系は他のViMaiアプリと同じです。ログインは任意で', 'VIPはApp Storeのアプリ内でApple決済により購入し、価格はAppleが表示します。ログインは任意で') WHERE faq_id = 'faq-menkyo-3' AND locale = 'ja';
UPDATE faq_translations SET answer = replace(answer, 'VIP unlocks all 60, on the same pricing system as the other ViMai apps. Sign-in', 'VIP unlocks all 60 and is bought inside the app with Apple payment, where Apple shows the price. Sign-in') WHERE faq_id = 'faq-menkyo-3' AND locale = 'en';
