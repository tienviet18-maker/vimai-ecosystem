-- Idempotent seed from src/lib/seed.ts. Safe to re-run.
PRAGMA foreign_keys = ON;
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000001', 'tokutei-taxi', 'coming_soon',
      NULL, NULL, NULL,
      1, 1, '/images/products/tokutei_taxi.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000001-ja', '00000000-0000-0000-0000-000000000001', 'ja',
        'ViMai Tokutei Taxi', '特定技能（タクシー）試験対策アプリ', '日本の特定技能「自動車運送業（タクシー）」分野の試験対策アプリケーションです。模擬試験を通じて、合格に必要な知識を効率よく学習できます。',
        '["特定技能タクシー分野に特化した模擬試験","本番形式に近い出題と解説","学習進度の確認（CMS更新予定）","日本語・ベトナム語での学習サポート（CMS更新予定）"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000001-vi', '00000000-0000-0000-0000-000000000001', 'vi',
        'ViMai Tokutei Taxi', 'Luyện thi Tokutei Gino ngành Taxi tại Nhật Bản', 'Ứng dụng luyện thi chứng chỉ kỹ năng đặc định (Tokutei Gino) lĩnh vực vận tải / tài xế taxi tại Nhật Bản. Bao gồm đề thi thử mô phỏng kỳ thi thật.',
        '["Đề thi thử chuyên biệt cho ngành Taxi","Câu hỏi sát định dạng kỳ thi và phần giải thích","Theo dõi tiến độ học tập (cần cập nhật CMS)","Hỗ trợ học bằng tiếng Việt và tiếng Nhật (cần cập nhật CMS)"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000001-en', '00000000-0000-0000-0000-000000000001', 'en',
        'ViMai Tokutei Taxi', 'Tokutei Gino taxi exam preparation', 'An exam-prep application for Japan''s Specified Skilled Worker (Tokutei Gino) certification in the taxi / automobile transport field. Includes mock exams.',
        '["Mock exams tailored to the taxi field","Exam-style questions with explanations","Learning progress tracking [CMS update]","Japanese and Vietnamese study support [CMS update]"]'
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000002', 'tokutei-transport', 'coming_soon',
      NULL, NULL, NULL,
      1, 2, '/images/products/tokutei_vantai.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000002-ja', '00000000-0000-0000-0000-000000000002', 'ja',
        'ViMai Transport', '特定技能（自動車運送業）試験対策アプリ', '特定技能「自動車運送業」分野の試験対策アプリケーションです。運送・ドライバー業務に必要な基礎知識を、模擬試験形式で学習します。',
        '["自動車運送業分野に特化した学習コンテンツ","模擬試験と復習機能（CMS更新予定）","現場で使う専門用語の確認（CMS更新予定）","スキマ時間で続けられるモバイル学習"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000002-vi', '00000000-0000-0000-0000-000000000002', 'vi',
        'ViMai Transport', 'Luyện thi Tokutei Gino ngành Vận tải tại Nhật Bản', 'Ứng dụng luyện thi Tokutei Gino lĩnh vực vận tải (自動車運送業). Giúp người học nắm kiến thức nền tảng cho công việc tài xế / vận tải tại Nhật Bản.',
        '["Nội dung học chuyên biệt cho ngành vận tải","Thi thử và ôn tập (cần cập nhật CMS)","Thuật ngữ chuyên ngành thực tế (cần cập nhật CMS)","Học trên điện thoại, phù hợp thời gian rảnh"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000002-en', '00000000-0000-0000-0000-000000000002', 'en',
        'ViMai Transport', 'Tokutei Gino transport exam preparation', 'A Tokutei Gino application for Japan''s automobile transport field. Learners prepare with mock exams covering the knowledge required for transport and driving work.',
        '["Study content focused on automobile transport","Mock exams and review tools [CMS update]","On-the-job terminology practice [CMS update]","Mobile-first study for short sessions"]'
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000003', 'seibi', 'development',
      NULL, NULL, NULL,
      1, 3, '/images/products/sebishi_3kyu.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000003-ja', '00000000-0000-0000-0000-000000000003', 'ja',
        'ViMai Seibi', '3級自動車整備士 試験対策', '3級自動車整備士試験の対策アプリケーションです。学科試験に必要な基礎知識を、問題演習を中心に効率よく学べます。',
        '["3級自動車整備士の学科対策","分野別の問題演習（CMS更新予定）","弱点の可視化（CMS更新予定）","整備現場で使う知識の整理"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000003-vi', '00000000-0000-0000-0000-000000000003', 'vi',
        'ViMai Seibi', 'Luyện thi Sebishi 3kyu ngành Ô tô tại Nhật Bản', 'Ứng dụng luyện thi chứng chỉ thợ sửa chữa ô tô cấp 3 (3級自動車整備士). Tập trung vào phần thi lý thuyết với ngân hàng câu hỏi luyện tập.',
        '["Luyện thi lý thuyết 3級自動車整備士","Bài tập theo từng chuyên đề (cần cập nhật CMS)","Nhìn rõ phần kiến thức còn yếu (cần cập nhật CMS)","Hệ thống lại kiến thức dùng trong xưởng"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000003-en', '00000000-0000-0000-0000-000000000003', 'en',
        'ViMai Seibi', 'Class 3 automobile mechanic exam prep', 'An exam-prep application for Japan''s Class 3 Automobile Mechanic (3級自動車整備士) certification. Built around practice questions for the written exam.',
        '["Class 3 mechanic written-exam preparation","Practice by topic [CMS update]","Weak-area tracking [CMS update]","Workshop-oriented knowledge review"]'
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000004', 'kids', 'development',
      NULL, NULL, NULL,
      0, 4, '/images/products/vimai_kids.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000004-ja', '00000000-0000-0000-0000-000000000004', 'ja',
        'ViMai Kids', '子ども向けの学びアプリ', '算数ゲームなどを通じて、子どもが楽しく学べる教育アプリケーションです。保護者が学習時間や内容を管理できる仕組みを備えています。',
        '["算数などのインタラクティブな学習ゲーム","保護者による管理機能","年齢に合わせた学習（CMS更新予定）","短時間でも続けやすい設計"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000004-vi', '00000000-0000-0000-0000-000000000004', 'vi',
        'ViMai Kids', 'Ứng dụng giáo dục tương tác cho trẻ em', 'Ứng dụng giáo dục tương tác dành cho trẻ em, với trò chơi toán học và cơ chế kiểm soát dành cho phụ huynh.',
        '["Trò chơi học tập tương tác, tập trung vào toán","Công cụ kiểm soát dành cho phụ huynh","Nội dung theo độ tuổi (cần cập nhật CMS)","Thiết kế học ngắn, dễ duy trì mỗi ngày"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000004-en', '00000000-0000-0000-0000-000000000004', 'en',
        'ViMai Kids', 'Interactive learning for children', 'An interactive educational application for children featuring math games and parent control mechanisms.',
        '["Interactive learning games with a math focus","Parent control tools","Age-appropriate content [CMS update]","Short sessions designed for daily use"]'
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000005', 'maimai', 'development',
      NULL, NULL, NULL,
      0, 5, '/images/products/maimai.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000005-ja', '00000000-0000-0000-0000-000000000005', 'ja',
        'Maimai', '健康・栄養・カロリー記録', '健康、栄養、カロリーを記録するアプリケーションです。日々の指標をカスタムして、自分に合ったペースで体調管理を続けられます。',
        '["カロリーと栄養の記録","カスタム可能な日常トラッキング指標","健康習慣の可視化（CMS更新予定）","シンプルで続けやすい入力画面"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000005-vi', '00000000-0000-0000-0000-000000000005', 'vi',
        'Maimai', 'Theo dõi sức khỏe, dinh dưỡng và calories', 'Ứng dụng theo dõi sức khỏe, dinh dưỡng và calories với các chỉ số ghi nhận hằng ngày có thể tùy chỉnh.',
        '["Ghi nhận calories và dinh dưỡng","Chỉ số theo dõi hằng ngày tùy chỉnh","Nhìn rõ thói quen sức khỏe (cần cập nhật CMS)","Giao diện nhập liệu đơn giản, dễ duy trì"]'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, features
      ) VALUES (
        '00000000-0000-0000-0000-000000000005-en', '00000000-0000-0000-0000-000000000005', 'en',
        'Maimai', 'Health, nutrition, and calorie tracking', 'A health, nutrition, and calorie-tracking application with custom daily tracking metrics.',
        '["Calorie and nutrition logging","Custom daily tracking metrics","Habit visibility [CMS update]","Simple input designed for consistency"]'
      );
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-1', '00000000-0000-0000-0000-000000000001', 1, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-1-vi', 'faq-1', 'vi',
       'ViMai Tokutei Taxi ôn thi chứng chỉ nào?', 'Ứng dụng phục vụ luyện thi chứng chỉ kỹ năng đặc định (Tokutei Gino) lĩnh vực vận tải / taxi tại Nhật Bản, với các đề thi thử.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-1-en', 'faq-1', 'en',
       'Which exam does Tokutei Taxi cover?', 'It is built for Japan''s Specified Skilled Worker (Tokutei Gino) taxi / automobile transport certification, with mock exams.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-1-ja', 'faq-1', 'ja',
       'Tokutei Taxiはどのような試験に対応していますか？', '日本の特定技能「自動車運送業（タクシー）」分野の試験対策を目的としています。模擬試験を中心に学習できます。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-2', NULL, 2, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-2-vi', 'faq-2', 'vi',
       'Tải ứng dụng ở đâu?', 'Ứng dụng đã phát hành sẽ có nút App Store / Google Play trên trang sản phẩm. Sản phẩm chưa ra mắt được đánh dấu sắp ra mắt.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-2-en', 'faq-2', 'en',
       'Where can I download the apps?', 'Released apps are linked from each product page via App Store / Google Play. Products still in preparation are labeled coming soon.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-2-ja', 'faq-2', 'ja',
       'アプリはどこからダウンロードできますか？', '公開中のアプリは各製品ページのApp Store / Google Playボタンから案内します。準備中の製品は「近日公開」と表示されます。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-3', NULL, 3, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-3-vi', 'faq-3', 'vi',
       'Hệ sinh thái hỗ trợ ngôn ngữ nào?', 'Website hỗ trợ tiếng Nhật, tiếng Việt và tiếng Anh. Ngôn ngữ trong từng ứng dụng có thể khác nhau (cần cập nhật CMS).');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-3-en', 'faq-3', 'en',
       'Which languages are supported?', 'This website is available in Japanese, Vietnamese, and English. In-app language support varies by product [CMS update].');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-3-ja', 'faq-3', 'ja',
       '対応言語は何ですか？', '本サイトは日本語・ベトナム語・英語に対応しています。各アプリの対応言語は製品によって異なります（CMS更新予定）。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-4', '00000000-0000-0000-0000-000000000004', 4, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-4-vi', 'faq-4', 'vi',
       'Kiểm soát phụ huynh trên ViMai Kids là gì?', 'Phụ huynh có thể theo dõi và giới hạn thời gian cũng như nội dung học của trẻ. Chi tiết sẽ được cập nhật khi ứng dụng phát hành.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-4-en', 'faq-4', 'en',
       'What parent controls does ViMai Kids include?', 'Parents can monitor and manage study time and content. Detailed controls will be listed on the product page at launch.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-4-ja', 'faq-4', 'ja',
       'ViMai Kidsの保護者管理とは何ですか？', '保護者がお子さまの学習時間や利用内容を把握・管理できる仕組みです。詳細な項目は公開時に製品ページで案内します。');
