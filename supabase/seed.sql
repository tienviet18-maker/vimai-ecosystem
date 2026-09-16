-- Optional seed. Product copy also ships in src/lib/seed.ts for local preview
-- before Supabase is connected.

insert into public.products (
  id, slug, status, featured, sort_order, logo_url, published
) values
  ('00000000-0000-0000-0000-000000000001', 'tokutei-taxi', 'coming_soon', true, 1, '/images/products/tokutei_taxi.png', true),
  ('00000000-0000-0000-0000-000000000002', 'tokutei-transport', 'coming_soon', true, 2, '/images/products/tokutei_vantai.png', true),
  ('00000000-0000-0000-0000-000000000003', 'seibi', 'development', true, 3, '/images/products/sebishi_3kyu.png', true),
  ('00000000-0000-0000-0000-000000000004', 'kids', 'development', false, 4, '/images/products/vimai_kids.jpg', true),
  ('00000000-0000-0000-0000-000000000005', 'maimai', 'development', false, 5, '/images/products/maimai.jpg', true)
on conflict (id) do nothing;

insert into public.product_translations (product_id, locale, name, tagline, description, features)
values
  ('00000000-0000-0000-0000-000000000001', 'ja', 'ViMai Tokutei Taxi', '特定技能（タクシー）試験対策アプリ', '日本の特定技能「自動車運送業（タクシー）」分野の試験対策アプリケーションです。模擬試験を通じて、合格に必要な知識を効率よく学習できます。', '["特定技能タクシー分野に特化した模擬試験","本番形式に近い出題と解説"]'),
  ('00000000-0000-0000-0000-000000000001', 'vi', 'ViMai Tokutei Taxi', 'Luyện thi Tokutei Gino ngành Taxi tại Nhật Bản', 'Ứng dụng luyện thi chứng chỉ kỹ năng đặc định (Tokutei Gino) lĩnh vực vận tải / tài xế taxi tại Nhật Bản. Bao gồm đề thi thử mô phỏng kỳ thi thật.', '["Đề thi thử chuyên biệt cho ngành Taxi","Câu hỏi sát định dạng kỳ thi và phần giải thích"]'),
  ('00000000-0000-0000-0000-000000000001', 'en', 'ViMai Tokutei Taxi', 'Tokutei Gino taxi exam preparation', 'An exam-prep application for Japan''s Specified Skilled Worker (Tokutei Gino) certification in the taxi / automobile transport field. Includes mock exams.', '["Mock exams tailored to the taxi field","Exam-style questions with explanations"]')
on conflict (product_id, locale) do nothing;
