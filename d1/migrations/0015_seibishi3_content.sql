-- ViMai Seibishi 3kyu (slug `seibi`, kept so /products/seibi does not move)
-- gets its real hub page: vi/en/ja texts, SEO title/description and FAQs,
-- and the new canonical site https://seibishi3.vimai.jp (owner, 2026-10-14;
-- replaces the never-used seibi.vimai.jp). Status stays 'development'.
-- Idempotent and safe to re-run:
--   * website_url changes only while it is empty or still seibi.vimai.jp;
--   * translation rows are overwritten only while their description still
--     holds the old placeholder text from 0002 / seed.sql (matched on the
--     description, not the name, so a row whose name was already renamed in
--     admin is still filled), so other admin CMS edits are kept;
--   * FAQs use INSERT OR IGNORE.
-- en/ja texts never quote VND or VietQR (src/lib/store-policy.ts).
-- Mirrors src/lib/seed.ts and d1/seed.sql.
PRAGMA foreign_keys = ON;

UPDATE products
SET website_url = 'https://seibishi3.vimai.jp',
    updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')
WHERE slug = 'seibi'
  AND (website_url IS NULL OR website_url = '' OR website_url = 'https://seibi.vimai.jp');

UPDATE product_translations
SET name = 'ViMai Seibishi 3kyu',
    tagline = '3級自動車整備士 登録試験（学科）の対策アプリ',
    description = 'JASPA（日本自動車整備振興会連合会）が実施する3級自動車整備士 登録試験の学科対策Webアプリです。試験は3級シャシ、3級ガソリン・エンジン、3級ジーゼル・エンジンの3種類に分かれ、それぞれ別に受験します。どれも4択問題30問・60分で、70%（21問）以上の正答で合格です。アプリには3種類それぞれ20回分、合計60回・1,800問の模擬試験を収録しています。日本語の問題には振り仮名が付き（表示の切り替え可）、必要なときにベトナム語・英語の訳を表示できます。部品・用語辞典（2,520語）は無料で引けます。',
    long_description = '問題は3級の出題範囲と過去の出題テーマをもとにViMaiが作成したもので、図も描き直しています。実際の試験問題ではなく、JASPAの公認・監修を受けたものでもありません。法令の問題は現行の保安基準・細目告示で確認しています。学習を支えるツールであり、合格を保証するものではありません。',
    target_audience = '日本で働きながら3級自動車整備士の登録試験（学科）を受ける外国人、特にベトナム語や英語で解説を読みながら日本語の問題に慣れたい人。受け入れ企業や整備工場が学習内容を確認する際にもご覧ください。',
    features = '["シャシ・ガソリン・ジーゼルの3種類×20回、模擬試験60回・1,800問","1回分：4択30問・60分、70%（21問）以上で合格という本番と同じ基準","日本語の問題に振り仮名（表示切り替え可）、ベトナム語・英語の訳を表示可能","正解すると次の問題へ自動で進み、間違えるとその場で止まって解説を表示（VIPはAIの解説付き）","法令の問題は現行の保安基準・細目告示で確認","部品・用語辞典2,520語（検索は無料、詳しい解説とフラッシュカードはVIP）","「4択問題の読み方のコツ」：問題の種類の見分け方と一部の手がかりは無料、残りと問題ごとのヒントはVIP","各科目の第1〜3回（計9回）は無料"]',
    seo_title = '3級自動車整備士 学科 対策｜模擬試験60回・1,800問・振り仮名付き',
    seo_description = '3級自動車整備士 登録試験（シャシ・ガソリン・ジーゼル）の学科対策アプリ。模擬試験60回・1,800問（4択30問・60分）、振り仮名、ベトナム語・英語訳、部品・用語辞典。各科目の第1〜3回は無料。'
WHERE locale = 'ja'
  AND product_id = (SELECT id FROM products WHERE slug = 'seibi')
  AND instr(description, '外国人学習者への配慮、段階的な学習') > 0;

UPDATE product_translations
SET name = 'ViMai Seibishi 3kyu – Luyện thi 3級 自動車整備士',
    tagline = 'Luyện thi lý thuyết thợ bảo dưỡng ô tô cấp 3 (3級自動車整備士 学科)',
    description = 'Ứng dụng web luyện thi lý thuyết (学科) kỳ thi 3級自動車整備士 登録試験 (thợ bảo dưỡng ô tô cấp 3), kỳ thi do JASPA tổ chức. Kỳ thi chia thành 3 môn, thi riêng từng môn: 3級シャシ (khung gầm), 3級ガソリン・エンジン (động cơ xăng) và 3級ジーゼル・エンジン (động cơ diesel). Mỗi môn có 30 câu trắc nghiệm 4 lựa chọn, làm trong 60 phút, đậu khi đúng từ 70% (21/30 câu). App có 20 đề thi thử cho mỗi môn, tổng cộng 60 đề, 1.800 câu. Câu hỏi tiếng Nhật có furigana (bật/tắt được), cần thì bật bản dịch tiếng Việt hoặc tiếng Anh. Kèm từ điển phụ tùng và thuật ngữ 2.520 mục, tra cứu miễn phí.',
    long_description = 'Câu hỏi do ViMai soạn dựa trên phạm vi giáo trình 3級 và các chủ đề từng ra trong đề thi, hình được vẽ lại. Đây không phải đề thi thật và không được JASPA bảo trợ. Câu hỏi về luật đã được đối chiếu với 保安基準 và 細目告示 hiện hành. Công cụ học tập, không cam kết đậu kỳ thi.',
    target_audience = 'Người Việt đang làm việc hoặc học nghề bảo dưỡng ô tô tại Nhật, chuẩn bị thi lý thuyết 3級自動車整備士, muốn làm quen đề tiếng Nhật có furigana và đọc giải thích bằng tiếng Việt.',
    features = '["3 môn (khung gầm, động cơ xăng, động cơ diesel) × 20 đề: 60 đề thi thử, 1.800 câu","Mỗi đề: 30 câu 4 lựa chọn, 60 phút, đúng từ 70% (21/30) là đậu, giống kỳ thi thật","Tiếng Nhật có furigana (bật/tắt được), bật dịch tiếng Việt hoặc tiếng Anh","Chọn đúng là tự sang câu tiếp; chọn sai là dừng lại và giải thích ngay; VIP có thêm AI giải thích","Câu hỏi về luật được đối chiếu với 保安基準 và 細目告示 hiện hành","Từ điển phụ tùng và thuật ngữ 2.520 mục, tra cứu miễn phí (giải thích chi tiết và flashcard dành cho VIP)","Bí kíp đọc đề 4 lựa chọn: cách nhận kiểu câu và một số dấu hiệu miễn phí; phần còn lại và mẹo từng câu dành cho VIP","Đề 1–3 của mỗi môn miễn phí (9 đề); VIP 3 tháng 700.000đ, thanh toán VietQR"]',
    seo_title = 'Luyện thi 3級 自動車整備士 – 60 đề thi thử lý thuyết',
    seo_description = 'Đề thi 3級自動車整備士 (bảo dưỡng ô tô cấp 3): 60 đề thi thử khung gầm, xăng, diesel, 1.800 câu 4 lựa chọn, có furigana, dịch tiếng Việt. Đề 1–3 mỗi môn miễn phí.'
WHERE locale = 'vi'
  AND product_id = (SELECT id FROM products WHERE slug = 'seibi')
  AND instr(description, 'Nêu rõ đối tượng, phạm vi học') > 0;

UPDATE product_translations
SET name = 'ViMai Seibishi 3kyu',
    tagline = 'Class 3 automobile mechanic (3級自動車整備士) written exam practice',
    description = 'A web app for practising the written part (学科) of the Class 3 automobile mechanic registration exam (3級自動車整備士 登録試験), which is run by JASPA. The exam has three subjects, each taken separately: 3級シャシ (chassis), 3級ガソリン・エンジン (gasoline engine) and 3級ジーゼル・エンジン (diesel engine). Each paper has 30 four-choice questions in 60 minutes, and you pass with 70% correct (21 of 30). The app has 20 mock papers for each subject: 60 papers and 1,800 questions in total. Japanese questions have furigana, which you can turn on or off, and Vietnamese and English translations can be shown when you need them. A parts and terms dictionary with 2,520 entries is free to search.',
    long_description = 'Questions are written by ViMai from the Class 3 syllabus and topics of past exams, and figures are redrawn. They are not real exam questions, and the app is not endorsed by JASPA. Law questions are checked against the current safety standards (保安基準 and 細目告示). A study tool; it does not guarantee a passing result.',
    target_audience = 'Foreign workers and trainees in Japan preparing for the Class 3 automobile mechanic written exam, especially those who want to get used to Japanese questions with furigana while reading explanations in Vietnamese or English.',
    features = '["Three subjects (chassis, gasoline engine, diesel engine) × 20 papers: 60 mock papers, 1,800 questions","Each paper: 30 four-choice questions, 60 minutes, pass with 70% (21 of 30), as in the real exam","Furigana on Japanese text (on/off); Vietnamese or English translation on demand","A correct answer moves on by itself; a wrong answer stops and shows the explanation; VIP adds AI explanations","Law questions checked against the current 保安基準 and 細目告示","Parts and terms dictionary with 2,520 entries, free to search (details and flashcards for VIP)","Tips for reading four-choice questions: question types and some cues are free; the rest and per-question tips are for VIP","Papers 1–3 of each subject are free (9 papers)"]',
    seo_title = 'Class 3 Automobile Mechanic Exam Practice (3級整備士)',
    seo_description = 'Class 3 automobile mechanic written exam (JASPA) practice: 60 mock papers, 1,800 four-choice questions (chassis, gasoline, diesel), furigana. Papers 1–3 free.'
WHERE locale = 'en'
  AND product_id = (SELECT id FROM products WHERE slug = 'seibi')
  AND instr(description, 'It highlights the audience, curriculum scope') > 0;

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-seibi3-1', (SELECT id FROM products WHERE slug = 'seibi'), 21, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-1-vi', 'faq-seibi3-1', 'vi', 'ViMai Seibishi 3kyu luyện thi kỳ thi nào?', 'App luyện phần thi lý thuyết (学科) của kỳ thi 3級自動車整備士 登録試験 (thợ bảo dưỡng ô tô cấp 3), kỳ thi do JASPA tổ chức. Kỳ thi có 3 môn: 3級シャシ (khung gầm), 3級ガソリン・エンジン (động cơ xăng) và 3級ジーゼル・エンジン (động cơ diesel); app có đề cho cả 3 môn. Đây là kỳ thi khác với kỳ thi Tokutei Gino 1 ngành bảo dưỡng ô tô; nếu thi Tokutei, hãy dùng ViMai Gino 1 Seibi.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-1-en', 'faq-seibi3-1', 'en', 'Which exam does ViMai Seibishi 3kyu prepare for?', 'The written part (学科) of the Class 3 automobile mechanic registration exam (3級自動車整備士 登録試験), run by JASPA. The exam has three subjects: 3級シャシ (chassis), 3級ガソリン・エンジン (gasoline engine) and 3級ジーゼル・エンジン (diesel engine), and the app has mock papers for all three. It is a different exam from the Tokutei Ginou automobile maintenance test; for that test, use ViMai Gino 1 Seibi.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-1-ja', 'faq-seibi3-1', 'ja', 'ViMai Seibishi 3kyuはどの試験の対策アプリですか？', 'JASPA（日本自動車整備振興会連合会）が実施する3級自動車整備士 登録試験の学科（筆記）の対策アプリです。試験は3級シャシ、3級ガソリン・エンジン、3級ジーゼル・エンジンの3種類で、アプリには3種類すべての模擬試験があります。特定技能1号評価試験（自動車整備分野）とは別の試験で、そちらを受ける場合はViMai Gino 1 Seibiをご利用ください。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-seibi3-2', (SELECT id FROM products WHERE slug = 'seibi'), 22, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-2-vi', 'faq-seibi3-2', 'vi', 'Đề thi gồm bao nhiêu câu, bao nhiêu điểm thì đậu?', 'Mỗi môn thi riêng. Mỗi môn có 30 câu trắc nghiệm 4 lựa chọn, làm trong 60 phút, đậu khi đúng từ 70% (từ 21/30 câu). Đề thi thử trong app có cùng số câu, thời gian và cách chấm này.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-2-en', 'faq-seibi3-2', 'en', 'What is the exam format and the pass mark?', 'Each of the three subjects is taken separately. Each paper has 30 four-choice questions in 60 minutes, and you pass with 70% correct (21 of 30). The app''s mock papers use the same number of questions, time and pass mark.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-2-ja', 'faq-seibi3-2', 'ja', '試験の形式と合格基準は？', '3種類の試験はそれぞれ別に受験します。どれも4択問題30問・60分で、70%（21問）以上の正答で合格です。アプリの模擬試験も同じ問題数・時間・合格基準で採点します。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-seibi3-3', (SELECT id FROM products WHERE slug = 'seibi'), 23, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-3-vi', 'faq-seibi3-3', 'vi', 'Dùng miễn phí được những gì?', 'Đề 1–3 của mỗi môn miễn phí (tổng 9 đề), có furigana và bản dịch. Từ điển phụ tùng và thuật ngữ 2.520 mục tra cứu miễn phí. Bí kíp đọc đề 4 lựa chọn có phần miễn phí: cách nhận ra kiểu câu và một số dấu hiệu (chỉ phần chữ). VIP mở đề 4–20 của mỗi môn, giải thích chi tiết và flashcard trong từ điển, phần còn lại của bí kíp, mẹo cho từng câu và AI giải thích câu sai. VIP 3 tháng giá 700.000đ, thanh toán bằng chuyển khoản VietQR.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-3-en', 'faq-seibi3-3', 'en', 'What can I use for free?', 'Papers 1–3 of each subject (9 papers in all) are free, with furigana and translations. The parts and terms dictionary (2,520 entries) is free to search. In the tips for reading four-choice questions, the question types and some cues are free (text only). VIP unlocks papers 4–20 of each subject, the dictionary''s detailed explanations and flashcards, the rest of the tips, a tip on every question and AI explanations of wrong answers.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-3-ja', 'faq-seibi3-3', 'ja', '無料でどこまで使えますか？', '各科目の第1〜3回（計9回）の模擬試験は無料で、振り仮名と翻訳も使えます。部品・用語辞典（2,520語）の検索も無料です。「4択問題の読み方のコツ」は、問題の種類の見分け方と一部の手がかり（文章のみ）が無料です。各科目の第4〜20回、辞典の詳しい解説とフラッシュカード、コツの残りの部分、問題ごとのヒント、AIによる誤答の解説はVIPで使えます。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-seibi3-4', (SELECT id FROM products WHERE slug = 'seibi'), 24, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-4-vi', 'faq-seibi3-4', 'vi', 'Câu hỏi trong app có phải đề thi thật không?', 'Không. Đề thi thử mô phỏng dạng đề thật (30 câu 4 lựa chọn, 60 phút, đúng từ 70% là đậu), còn câu hỏi do ViMai soạn dựa trên phạm vi giáo trình 3級 và các chủ đề từng ra trong đề thi; hình được vẽ lại. Câu hỏi về luật được đối chiếu với 保安基準 và 細目告示 hiện hành. App không được JASPA bảo trợ và không cam kết đậu kỳ thi.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-4-en', 'faq-seibi3-4', 'en', 'Are these real exam questions?', 'No. The mock papers follow the real format (30 four-choice questions, 60 minutes, pass with 70%), but the questions are written by ViMai from the Class 3 syllabus and topics of past exams, and figures are redrawn. Law questions are checked against the current 保安基準 and 細目告示. The app is not endorsed by JASPA and does not guarantee a pass.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-4-ja', 'faq-seibi3-4', 'ja', '実際の試験問題ですか？', 'いいえ。模擬試験は本番の形式（4択30問・60分・70%以上で合格）に合わせていますが、問題は3級の出題範囲と過去の出題テーマをもとにViMaiが作成したもので、図も描き直しています。法令の問題は現行の保安基準・細目告示で確認しています。JASPAの公認・監修を受けたものではなく、合格を保証するものでもありません。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-seibi3-5', (SELECT id FROM products WHERE slug = 'seibi'), 25, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-5-vi', 'faq-seibi3-5', 'vi', 'Từ năm 2027 có kỳ thi mới 三級（総合）, app còn dùng được không?', 'Dự kiến từ năm 2027 sẽ có kỳ thi mới 三級（総合）, kỳ thi lý thuyết đầu tiên từ tháng 3/2027. Các kỳ thi 3 môn hiện tại vẫn tiếp tục thêm khoảng 2 năm. Kiến thức cốt lõi về cơ bản giống nhau nên ôn bằng app vẫn có ích, nhưng dạng đề và lịch thi có thể thay đổi. Trước khi đăng ký thi, hãy xem thông báo mới nhất của JASPA.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-5-en', 'faq-seibi3-5', 'en', 'Can I use the app for the new 三級（総合） exam from 2027?', 'A new 三級（総合） (Class 3, general) exam is planned from 2027, with the first written exam from March 2027. The current three-subject exams are expected to continue for about two more years. The core knowledge is the same, so studying with the app still helps, but the format and dates may change. Always check the latest JASPA notices before you apply.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-5-ja', 'faq-seibi3-5', 'ja', '2027年からの三級（総合）の試験でも使えますか？', '2027年から新しい「三級（総合）」の試験が始まる予定で、最初の学科試験は2027年3月からとされています。現在の3種類の試験も、しばらく（約2年）は続く予定です。基本となる知識は同じなので、このアプリでの学習は役に立ちますが、出題の形式や日程は変わる可能性があります。受験の前に、必ずJASPAの最新のお知らせを確認してください。');

INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
VALUES ('faq-seibi3-6', (SELECT id FROM products WHERE slug = 'seibi'), 26, 1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-6-vi', 'faq-seibi3-6', 'vi', 'Dùng trên thiết bị nào, ngôn ngữ gì?', 'App chạy trên trình duyệt (web app): mở seibishi3.vimai.jp trên điện thoại hoặc máy tính là dùng được ngay, có thể thêm ra màn hình chính như một ứng dụng. Hiện chưa có bản trên App Store hay Google Play. Giao diện app có tiếng Việt, tiếng Anh và tiếng Nhật.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-6-en', 'faq-seibi3-6', 'en', 'Which devices and languages are supported?', 'It is a web app: open seibishi3.vimai.jp in the browser on your phone or computer, and you can add it to the home screen. There is no App Store or Google Play version yet. The app interface is available in Vietnamese, English and Japanese.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
VALUES ('faq-seibi3-6-ja', 'faq-seibi3-6', 'ja', 'どの端末・言語で使えますか？', 'Webアプリです。スマートフォンやパソコンのブラウザで seibishi3.vimai.jp を開けばすぐに使え、ホーム画面に追加することもできます。App Store・Google Play版はまだありません。アプリの表示言語はベトナム語・英語・日本語です。');
