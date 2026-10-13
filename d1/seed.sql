-- Idempotent seed from src/lib/seed.ts. Safe to re-run.
PRAGMA foreign_keys = ON;
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000001', 'tokutei-taxi', 'launched',
      NULL, NULL, 'https://tokutei-taxi.vimai.jp',
      1, 1, '/images/products/tokutei_taxi.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000001-ja', '00000000-0000-0000-0000-000000000001', 'ja',
        'ViMai Tokutei Taxi', '特定技能1号（タクシー）の学習アプリ', '外国人が日本の特定技能1号・タクシー分野の試験勉強と演習を行うためのアプリです。CBT形式の練習、模擬問題、誤答の見直し、学習のヒント、日本語とベトナム語、振り仮名、解説を備えています。',
        '試験の合格を保証するものではありません。出題形式に慣れることと、間違えた箇所を見直すことを目的とした学習ツールです。', '日本でタクシー分野の特定技能1号を目指す外国人学習者。',
        '["CBT形式の練習","模擬問題","誤答の見直し","学習のヒント","日本語・ベトナム語","振り仮名","わかりやすい解説"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000001-vi', '00000000-0000-0000-0000-000000000001', 'vi',
        'ViMai Tokutei Taxi', 'Ứng dụng luyện thi 特定技能1号 – Taxi', 'Ứng dụng dành cho người nước ngoài học và luyện thi 特定技能1号 ngành Taxi tại Nhật. Có luyện CBT, câu hỏi mô phỏng, ôn lại câu sai, mẹo làm bài, hỗ trợ tiếng Nhật và tiếng Việt, Furigana và phần giải thích.',
        'Công cụ học tập để làm quen dạng đề và rà soát chỗ sai. Không cam kết đậu kỳ thi.', 'Người nước ngoài tại Nhật đang chuẩn bị thi 特定技能1号 ngành Taxi.',
        '["Luyện dạng CBT","Câu hỏi thi thử","Ôn lại câu sai","Mẹo làm bài","Hỗ trợ tiếng Nhật và tiếng Việt","Furigana","Giải thích rõ ràng"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000001-en', '00000000-0000-0000-0000-000000000001', 'en',
        'ViMai Tokutei Taxi', 'Study app for Specified Skilled Worker (i) Taxi', 'An app for foreigners studying and practicing for Japan’s Specified Skilled Worker (i) Taxi field. It includes CBT-style practice, mock questions, mistake review, study tips, Japanese and Vietnamese support, furigana, and explanations.',
        'A study tool for exam format and review. It does not guarantee a passing result.', 'Foreign residents in Japan preparing for Specified Skilled Worker (i) Taxi.',
        '["CBT-style practice","Mock questions","Mistake review","Study tips","Japanese and Vietnamese support","Furigana","Clear explanations"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000002', 'tokutei-transport', 'launched',
      NULL, NULL, 'https://tokutei-transport.vimai.jp',
      1, 2, '/images/products/tokutei_vantai.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000002-ja', '00000000-0000-0000-0000-000000000002', 'ja',
        'ViMai Tokutei Transport（特定技能1号・トラック）', '特定技能1号 自動車運送業分野（トラック）の試験対策アプリ', 'ClassNK（一般財団法人日本海事協会）が実施する「自動車運送業分野特定技能1号評価試験」のトラック区分に向けた試験対策アプリです。CBT形式の模擬試験を20回分収録しています。1回分は50問（学科の○×問題30問と、実技の3択問題20問）、試験時間は80分で、学科・実技それぞれ60%以上の正答で合格という本番と同じ基準で採点します。実技は運転の判断、荷の積み付け・固縛、危険予知（KYT）などで、図を使った問題も多くあります。問題は「トラック運転者をめざす人のための学習用テキスト」に沿って作っています。日本語の問題には振り仮名が付き、ベトナム語・英語の訳を切り替えて表示できます。試験によく出る用語510語の単語帳も付いています。',
        '問題は学習用テキストをもとにViMaiが作成したもので、実際の試験問題ではありません。ClassNKの公認・監修を受けたものではありません。学習を支えるツールであり、合格を保証するものではありません。', '日本でトラック運転者として働くために、特定技能1号（自動車運送業分野・トラック）の評価試験を受ける外国人、特にベトナム語や英語で解説を読みながら日本語の問題に慣れたい人。受け入れ企業や登録支援機関が学習内容を確認する際にもご覧ください。',
        '["CBT形式の模擬試験20回・1,000問","1回分：学科○×30問＋実技3択20問、80分、各60%以上で合格","実技は運転の判断、積み付け・固縛、危険予知（KYT）。図の問題も多数","日本語の問題に振り仮名、ベトナム語・英語の訳を表示可能","間違えるとその場で止まって解説を表示（VIPはAIが解説）","トラック用語510語の単語帳（最初の100語は無料）","VIP向け：問題ごとの解き方のヒントと試験のコツ","第1〜3回は無料"]',
        '特定技能1号 トラック 試験対策｜模擬試験20回・振り仮名付き', '自動車運送業分野特定技能1号評価試験（トラック）の対策アプリ。CBT形式の模擬試験20回（各50問・80分）、振り仮名、ベトナム語・英語訳、用語510語。第1〜3回は無料。'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000002-vi', '00000000-0000-0000-0000-000000000002', 'vi',
        'ViMai Tokutei Transport – Tokutei xe tải', 'Luyện thi kỹ năng đặc định 1 ngành vận tải ô tô, hạng mục xe tải (特定技能1号 トラック)', 'Ứng dụng web luyện thi Tokutei Ginou 1 ngành vận tải ô tô, hạng mục xe tải (自動車運送業分野特定技能1号評価試験 トラック), kỳ thi do ClassNK (日本海事協会) tổ chức. Có 20 đề thi thử dạng CBT, mỗi đề 50 câu: 30 câu lý thuyết ○× và 20 câu thực hành chọn 1 trong 3, làm trong 80 phút, đậu khi mỗi phần đúng từ 60%, giống cách chấm của kỳ thi thật. Phần thực hành gồm phán đoán khi lái xe, xếp và chằng buộc hàng, dự đoán nguy hiểm (KYT), nhiều câu có hình. Câu hỏi bám giáo trình 「トラック運転者をめざす人のための学習用テキスト」. Câu hỏi tiếng Nhật có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm sổ từ vựng 510 từ hay gặp trong đề.',
        'Câu hỏi do ViMai soạn dựa trên giáo trình; đây không phải đề thi thật và không được ClassNK bảo trợ. Công cụ học tập, không cam kết đậu kỳ thi.', 'Người Việt và người nước ngoài muốn làm tài xế xe tải tại Nhật, đang chuẩn bị thi kỹ năng đặc định 1 (Tokutei Ginou 1) ngành vận tải ô tô hạng mục xe tải, muốn làm quen đề tiếng Nhật có furigana và đọc giải thích bằng tiếng Việt.',
        '["20 đề thi thử dạng CBT, 1.000 câu","Mỗi đề: 30 câu ○× lý thuyết + 20 câu thực hành chọn 1 trong 3, 80 phút, mỗi phần từ 60% là đậu","Thực hành: phán đoán khi lái, xếp và chằng buộc hàng, dự đoán nguy hiểm (KYT), nhiều câu có hình","Tiếng Nhật có furigana, bật dịch tiếng Việt hoặc tiếng Anh","Chọn sai là dừng lại và giải thích ngay; VIP có thêm AI giải thích","Sổ từ vựng xe tải 510 từ (100 từ đầu miễn phí)","VIP: mẹo nhận ra đáp án cho từng câu và cẩm nang mẹo thi","Đề 1–3 miễn phí; VIP 3 tháng 500.000đ, thanh toán VietQR"]',
        'Luyện thi Tokutei xe tải (vận tải) – 20 đề thi thử CBT', 'Đề thi Tokutei Ginou 1 xe tải (特定技能1号 トラック): 20 đề thi thử CBT 50 câu, 80 phút, có furigana, dịch tiếng Việt và 510 từ vựng. Đề 1–3 miễn phí.'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000002-en', '00000000-0000-0000-0000-000000000002', 'en',
        'ViMai Tokutei Transport: Truck Driver', 'Tokutei Ginou (SSW i) automobile transport test practice, truck category', 'A study app for the Tokutei Ginou automobile transport test, truck category (自動車運送業分野特定技能1号評価試験 トラック, Specified Skilled Worker (i)), which is run by ClassNK (Nippon Kaiji Kyokai). It has 20 CBT-style mock exams of 50 questions each: 30 true/false (○×) theory questions and 20 three-choice practical questions, 80 minutes, and you pass with at least 60% in each part, the same rule as the real test. Practical questions cover driving judgement, loading and securing cargo and hazard prediction (KYT), many of them with pictures. Questions follow the truck driver study textbook (トラック運転者をめざす人のための学習用テキスト). Japanese questions have furigana, and Vietnamese and English translations can be turned on. A trucking vocabulary book of 510 words is included.',
        'Questions are written by ViMai, based on the study textbook. They are not real exam questions, and the app is not endorsed by ClassNK. A study tool; it does not guarantee a passing result.', 'Foreign learners who want to work as truck drivers in Japan and are preparing for the Specified Skilled Worker (i) automobile transport test (truck), especially those who want to get used to Japanese questions with furigana while reading explanations in Vietnamese or English.',
        '["20 CBT-style mock exams, 1,000 questions","Each exam: 30 true/false theory + 20 three-choice practical questions, 80 minutes, pass with 60% in each part","Practical: driving judgement, loading and securing cargo, hazard prediction (KYT), many with pictures","Furigana on Japanese text; Vietnamese or English translation on demand","A wrong answer stops and shows the explanation; VIP adds AI explanations","Trucking vocabulary book of 510 words (first 100 free)","For VIP: a tip for spotting the answer on every question, plus an exam tips guide","Exams 1–3 are free"]',
        'Tokutei Ginou Truck Driver Practice Tests (SSW i)', 'Practise for the Tokutei Ginou truck test (ClassNK): 20 CBT mock exams of 50 questions, furigana, Vietnamese and English translations. Exams 1–3 are free.'
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000003', 'seibi', 'development',
      NULL, NULL, 'https://seibi.vimai.jp',
      1, 3, '/images/products/sebishi_3kyu.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000003-ja', '00000000-0000-0000-0000-000000000003', 'ja',
        'ViMai Seibi', '3級自動車整備士の学習アプリ', '3級自動車整備士（Seibi 3kyu）を学ぶ人のためのアプリです。対象者、学習範囲、外国人学習者への配慮、段階的な学習、わかりやすい構成を中心に設計しています。',
        '学科試験の学習を整理するためのツールです。合格を保証するものではありません。', '3級自動車整備士の学科を学ぶ外国人および日本語学習者。',
        '["3級整備士の学習範囲に沿った構成","外国人学習者への配慮","段階的に進められる学習","学科の基礎を整理"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000003-vi', '00000000-0000-0000-0000-000000000003', 'vi',
        'ViMai Seibi', 'Ứng dụng học Seibi 3kyu (3級自動車整備士)', 'Ứng dụng học chứng chỉ Seibi 3kyu. Nêu rõ đối tượng, phạm vi học, hỗ trợ người nước ngoài, lộ trình có cấu trúc và điểm mạnh của sản phẩm.',
        'Công cụ sắp xếp kiến thức thi lý thuyết. Không cam kết đậu kỳ thi.', 'Người nước ngoài và người học tiếng Nhật đang ôn thi 3級自動車整備士.',
        '["Bám phạm vi Seibi 3kyu","Hỗ trợ người học nước ngoài","Học theo lộ trình có cấu trúc","Hệ thống kiến thức lý thuyết"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000003-en', '00000000-0000-0000-0000-000000000003', 'en',
        'ViMai Seibi', 'Study app for Seibi 3kyu (Class 3 automobile mechanic)', 'An app for studying Seibi 3kyu. It highlights the audience, curriculum scope, support for foreign learners, structured study, and the product’s strengths.',
        'A tool for organizing written-exam study. It does not guarantee a passing result.', 'Foreign learners and Japanese-language learners studying Class 3 automobile mechanic theory.',
        '["Curriculum aligned with Seibi 3kyu","Support for foreign learners","Structured learning path","Written-exam knowledge organized clearly"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000004', 'kids', 'development',
      NULL, NULL, 'https://kids.vimai.jp',
      0, 4, '/images/products/vimai_kids.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000004-ja', '00000000-0000-0000-0000-000000000004', 'ja',
        'ViMai Kids', '保護者向けに設計した子どもの学びアプリ', '子どもが文字、ひらがな、カタカナ、ベトナム語に触れ、練習モードで学べる教育アプリです。Apple Pencilに対応し、就学前の準備にも使えます。保護者が内容を把握しやすい設計です。',
        '家庭での学習を補助するアプリです。学校の成績や発達を保証するものではありません。', '就学前〜小学校低学年のお子さまを持つ保護者。',
        '["文字の練習","ひらがな・カタカナ","ベトナム語","練習モード","Apple Pencil対応","インタラクティブな学習","就学前の準備"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000004-vi', '00000000-0000-0000-0000-000000000004', 'vi',
        'ViMai Kids', 'Ứng dụng học cho trẻ, thiết kế cho phụ huynh', 'Ứng dụng giáo dục cho trẻ: chữ cái, Hiragana, Katakana, tiếng Việt, chế độ luyện tập, hỗ trợ Apple Pencil, học tương tác và chuẩn bị vào lớp. Giọng điệu dành cho phụ huynh theo dõi nội dung học của con.',
        'Hỗ trợ học tại nhà. Không cam kết kết quả học đường hay phát triển.', 'Phụ huynh có con ở độ tuổi mầm non đến đầu tiểu học.',
        '["Luyện chữ cái","Hiragana và Katakana","Tiếng Việt","Chế độ luyện tập","Hỗ trợ Apple Pencil","Học tương tác","Chuẩn bị vào lớp"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000004-en', '00000000-0000-0000-0000-000000000004', 'en',
        'ViMai Kids', 'A children’s learning app designed for parents', 'An educational app for children covering letters, hiragana, katakana, Vietnamese, practice modes, Apple Pencil support, interactive learning, and preschool preparation. Written for parents who want to see what their child is practicing.',
        'A home-learning aid. It does not promise school results or developmental outcomes.', 'Parents of children in preschool through early elementary years.',
        '["Letter practice","Hiragana and katakana","Vietnamese","Practice modes","Apple Pencil support","Interactive learning","Preschool preparation"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000005', 'maimai', 'development',
      NULL, NULL, 'https://maimai.vimai.jp',
      0, 5, '/images/products/maimai.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000005-ja', '00000000-0000-0000-0000-000000000005', 'ja',
        'Maimai', '自分の生活指標を記録するアプリ', '体重、水分、睡眠、栄養、活動、周期、その他の個人指標を記録するヘルスケア／ライフスタイル記録アプリです。医療行為ではなく、日々の記録のためのツールです。',
        '診断・治療・予防の効果を示すものではありません。体調や健康の結果を保証しません。必要に応じて専門家に相談してください。', '体重、睡眠、水分、栄養、活動、周期などを自分で記録したい人。',
        '["体重の記録","水分摂取の記録","睡眠の記録","栄養の記録","活動の記録","周期の記録","個人指標のカスタム"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000005-vi', '00000000-0000-0000-0000-000000000005', 'vi',
        'Maimai', 'Ghi nhận chỉ số sinh hoạt cá nhân', 'Ứng dụng theo dõi lối sống: cân nặng, nước, ngủ, dinh dưỡng, hoạt động, chu kỳ và các chỉ số cá nhân. Không phải công cụ y tế; chỉ dùng để ghi nhận hằng ngày.',
        'Không chẩn đoán, điều trị hay cam kết kết quả sức khỏe. Khi cần, hãy hỏi chuyên gia.', 'Người muốn tự ghi nhận cân nặng, giấc ngủ, nước, dinh dưỡng, hoạt động và chu kỳ.',
        '["Ghi nhận cân nặng","Ghi nhận lượng nước","Ghi nhận giấc ngủ","Ghi nhận dinh dưỡng","Ghi nhận hoạt động","Ghi nhận chu kỳ","Chỉ số cá nhân tùy chỉnh"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000005-en', '00000000-0000-0000-0000-000000000005', 'en',
        'Maimai', 'A personal health and lifestyle tracker', 'A lifestyle tracker for weight, water intake, sleep, nutrition, activity, cycle tracking, and other personal metrics. It is a daily log, not a medical device.',
        'It does not diagnose, treat, or promise health outcomes. Consult a professional when you need medical advice.', 'People who want to log weight, sleep, water, nutrition, activity, and cycle data themselves.',
        '["Weight logging","Water-intake logging","Sleep logging","Nutrition logging","Activity logging","Cycle tracking","Custom personal metrics"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000006', 'menkyo', 'beta',
      NULL, NULL, 'https://menkyo.vimai.jp',
      1, 6, '/images/products/vimai_menkyo.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000006-ja', '00000000-0000-0000-0000-000000000006', 'ja',
        'ViMai Menkyo（日本の運転免許・学科）', '日本の運転免許・学科試験の学習アプリ', '日本で運転免許の学科試験（仮免・本免）や外国免許からの切替に取り組む、ベトナム語・英語話者のための学習アプリ（スマートフォンアプリ）です。30の単元、約2,350問の練習問題（イラスト付きの問題も多数）、ViMaiが描いた標識・標示209点、危険予測イラスト107点、模擬試験60回分を収録しています。模擬試験は仮免20回（50問・30分・45問以上で合格）、本免20回（95問：正誤90問とイラスト問題5問・50分・100点中90点以上で合格）、外免切替20回（50問・30分・45問以上で合格）です。内容は最新の日本の交通法規（2026年の改正など）に合わせて更新します。アプリの表示言語はベトナム語と英語で、日本語表示はありません。',
        'ルールを理解し、合格し、自信を持って運転しよう。学習を支えるツールであり、試験の合格を保証するものではありません。', '日本で運転免許（仮免・本免）を教習所や試験場で取得する人、または外国免許を切り替える人のうち、ベトナム語・英語で学びたい在住者。雇用主や教習所の方が内容を把握する際にもご覧ください。',
        '["模擬試験60回（仮免・本免・外免切替 各20回）","最新の交通法規に対応（2026年の改正など）","約2,350問の練習問題（イラスト付き多数）","30の学習単元","ViMaiが描いた標識・標示209点","危険予測イラスト107点","すぐに解説が出る学習モードと、本番と同じ時間で解く試験モード","間違えた問題の間隔反復による復習と、分野別の練習"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000006-vi', '00000000-0000-0000-0000-000000000006', 'vi',
        'ViMai Menkyo – Bằng lái Nhật', 'Thi lý thuyết Karimen, Honmen và đổi bằng lái Nhật', 'Ứng dụng (điện thoại và web) giúp người Việt và người dùng tiếng Anh tại Nhật học và luyện thi lý thuyết bằng lái ô tô Nhật (学科試験). Có 30 bài học, khoảng 2.350 câu luyện tập (nhiều câu có hình), thư viện 209 biển báo và vạch kẻ đường do ViMai vẽ, 107 tranh tình huống nguy hiểm và 60 đề thi thử: 20 đề Karimen (仮免, 50 câu, 30 phút, đậu từ 45 câu), 20 đề Honmen (本免, 95 câu gồm 90 câu đúng/sai và 5 câu minh họa, 50 phút, đậu từ 90/100 điểm), 20 đề đổi bằng (外免切替, 50 câu, 30 phút, đậu từ 45 câu). Nội dung luôn cập nhật theo luật giao thông Nhật hiện hành, gồm các thay đổi năm 2026. Ngôn ngữ trong app: tiếng Việt và tiếng Anh.',
        'Hiểu luật. Đậu bằng. Tự tin cầm lái. Đây là công cụ học tập, không cam kết đậu kỳ thi.', 'Người Việt và người dùng tiếng Anh sống tại Nhật đang lấy bằng lái ô tô (Karimen, Honmen ở trường lái hoặc trung tâm sát hạch) hoặc đổi bằng nước ngoài sang bằng Nhật.',
        '["60 đề thi thử Karimen, Honmen, đổi bằng","Cập nhật theo luật giao thông Nhật mới nhất (2026)","Khoảng 2.350 câu, nhiều câu có hình","30 bài học lý thuyết","209 biển báo và vạch kẻ đường do ViMai vẽ","107 tranh tình huống nguy hiểm","Chế độ học giải thích ngay, chế độ thi tính giờ như thi thật","Ôn câu sai theo lịch lặp lại ngắt quãng, luyện theo chủ đề"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000006-en', '00000000-0000-0000-0000-000000000006', 'en',
        'ViMai Menkyo: Japan License', 'Japanese driving theory test practice: Karimen, Honmen, conversion', 'A mobile app for Vietnamese and English speakers in Japan learning for the Japanese driving-licence theory test (学科試験). It includes 30 lesson units, about 2,350 practice questions (many with pictures), a library of 209 road signs and markings drawn by ViMai, 107 hazard-scene illustrations, and 60 mock exams: 20 Karimen (仮免, 50 questions, 30 minutes, pass at 45), 20 Honmen (本免, 95 questions: 90 true/false plus 5 illustration questions, 50 minutes, pass at 90/100), and 20 licence conversion (外免切替, 50 questions, 30 minutes, pass at 45). Content is kept up to date with current Japanese traffic law, including the 2026 changes. The app is in Vietnamese and English.',
        'Know the rules. Pass the test. Drive with confidence. A study tool; it does not guarantee a passing result.', 'Vietnamese and English-speaking residents in Japan getting a Japanese driving licence (Karimen and Honmen at a driving school or test centre) or converting a foreign licence.',
        '["60 mock exams: Karimen, Honmen, conversion","Updated to current Japanese traffic law (2026)","About 2,350 questions, many with pictures","30 lesson units","209 road signs and markings drawn by ViMai","107 hazard-scene illustrations","Learning mode with instant explanations; exam mode timed like the real test","Mistake review with spaced repetition, plus topic practice"]',
        NULL, NULL
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000007', 'gino1-seibi', 'beta',
      NULL, NULL, 'https://gino1-seibi.vimai.jp',
      1, 7, '/images/products/gino1_seibi.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000007-ja', '00000000-0000-0000-0000-000000000007', 'ja',
        'ViMai Gino 1 Seibi（特定技能1号・自動車整備）', '特定技能1号 自動車整備分野の試験対策アプリ', 'JASPA（日本自動車整備振興会連合会）が実施する「特定技能1号評価試験 自動車整備分野」の試験対策Webアプリです。JASPAのサンプル問題と同じ形式の模擬試験を20回分収録しています。1回分は学科の○×問題30問と、実技の課題3つ（各課題は2択の問題3問）で、全部で780問です。アプリでは1回分を80分で通して解きます。実技ではマイクロメータやダイヤルゲージなどの読み取り、図を使った問題を練習できます。日本語の問題には振り仮名が付き、ベトナム語・英語の訳を表示できます。部品・用語辞典（2500語以上）は無料で引けます。',
        '問題はJASPAのサンプル問題と過去の3級自動車整備士試験の出題分野をもとにViMaiが書き直したもので、実際の試験問題ではありません。JASPAの公認・監修を受けたものではありません。学習を支えるツールであり、合格を保証するものではありません。', '特定技能1号（自動車整備分野）の評価試験を受ける外国人、特にベトナム語や英語で解説を読みながら日本語の問題に慣れたい人。受け入れ企業や登録支援機関が学習内容を確認する際にもご覧ください。',
        '["JASPAサンプル問題の形式に沿った模擬試験20回・780問","1回分：学科○×30問＋実技3課題（2択）、80分で通して解答","マイクロメータ・ダイヤルゲージなどの読み取りと図の問題","日本語の問題に振り仮名、ベトナム語・英語の訳を表示可能","間違えるとその場で止まって解説を表示（VIPはAIチューター付き）","部品・用語辞典 2500語以上（検索は無料）","VIP向けの試験のコツ","第1〜3回は無料"]',
        '特定技能1号 自動車整備 試験対策｜模擬試験20回・振り仮名付き', '特定技能1号評価試験（自動車整備分野）の試験対策アプリ。JASPAサンプル問題の形式に沿った模擬試験20回・780問（学科○×と実技2択）、振り仮名、ベトナム語・英語訳、部品・用語辞典。第1〜3回は無料。'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000007-vi', '00000000-0000-0000-0000-000000000007', 'vi',
        'ViMai Gino 1 Seibi – Tokutei bảo dưỡng ô tô', 'Luyện thi kỹ năng đặc định 1 ngành bảo dưỡng ô tô (特定技能1号 自動車整備)', 'Ứng dụng web luyện thi Tokutei Gino 1 ngành bảo dưỡng ô tô (特定技能1号評価試験 自動車整備分野), kỳ thi do JASPA tổ chức. Có 20 đề thi thử theo đúng dạng đề mẫu của JASPA: mỗi đề gồm 30 câu lý thuyết ○× (学科) và 3 bài thực hành (実技), mỗi bài 3 câu chọn 1 trong 2, tổng cộng 780 câu. Trong app, mỗi đề làm liền một lượt 80 phút. Phần thực hành luyện đọc hình vẽ và đọc số đo trên panme (micrometer), đồng hồ so (dial gauge) và các dụng cụ tương tự. Câu hỏi tiếng Nhật có furigana, bật được bản dịch tiếng Việt và tiếng Anh. Kèm từ điển phụ tùng và thuật ngữ hơn 2.500 mục, tra cứu miễn phí.',
        'Câu hỏi do ViMai viết lại dựa trên đề mẫu của JASPA và các chủ đề từng ra trong kỳ thi 3級 整備士; đây không phải đề thi thật và không được JASPA bảo trợ. Công cụ học tập, không cam kết đậu kỳ thi.', 'Người Việt và người nước ngoài đang chuẩn bị thi kỹ năng đặc định 1 (Tokutei Gino 1) ngành bảo dưỡng ô tô, muốn làm quen đề tiếng Nhật có furigana và đọc giải thích bằng tiếng Việt.',
        '["20 đề thi thử theo dạng đề mẫu JASPA, 780 câu","Mỗi đề: 30 câu ○× lý thuyết + 3 bài thực hành chọn 1 trong 2, làm liền 80 phút","Câu thực hành có hình, đọc số đo panme, đồng hồ so","Tiếng Nhật có furigana, bật dịch tiếng Việt hoặc tiếng Anh","Chọn sai là dừng lại và giải thích ngay; VIP có thêm gia sư AI","Từ điển phụ tùng và thuật ngữ hơn 2.500 mục, tra cứu miễn phí","Mẹo làm bài dành cho VIP","Đề 1–3 miễn phí; VIP 3 tháng 700.000đ, thanh toán VietQR"]',
        'Luyện thi Tokutei bảo dưỡng ô tô – 20 đề kỹ năng đặc định 1', 'Đề thi tokutei bảo dưỡng ô tô (特定技能1号 自動車整備): 20 đề thi thử theo dạng đề mẫu JASPA, 780 câu ○× và thực hành, có furigana và dịch tiếng Việt. Đề 1–3 miễn phí.'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000007-en', '00000000-0000-0000-0000-000000000007', 'en',
        'ViMai Gino 1 Seibi: Automobile Maintenance', 'Tokutei Ginou (SSW i) automobile maintenance test practice', 'A web app for practising the Tokutei Ginou automobile maintenance test (特定技能1号評価試験 自動車整備分野, Specified Skilled Worker (i)), which is run by JASPA. It has 20 mock exams in the JASPA sample format: each has 30 true/false (○×) theory questions (学科) and 3 practical tasks (実技) of 3 two-choice questions, 780 questions in total. In the app, each exam is taken in one 80-minute sitting. Practical questions use figures and gauge readings such as micrometers and dial gauges. Japanese questions have furigana, and Vietnamese and English translations can be turned on. A parts and terms dictionary with over 2,500 entries is free to search.',
        'Questions are written by ViMai, based on the JASPA sample exam and topics from past Class 3 mechanic (3級 整備士) exams. They are not real exam questions, and the app is not endorsed by JASPA. A study tool; it does not guarantee a passing result.', 'Foreign learners preparing for the Specified Skilled Worker (i) automobile maintenance test who want to get used to Japanese questions with furigana while reading explanations in Vietnamese or English.',
        '["20 mock exams in the JASPA sample format, 780 questions","Each exam: 30 true/false theory questions + 3 two-choice practical tasks, one 80-minute sitting","Practical questions with figures and micrometer and dial-gauge readings","Furigana on Japanese text; Vietnamese or English translation on demand","A wrong answer stops and shows the explanation; VIP adds an AI tutor","Parts and terms dictionary with over 2,500 entries, free to search","Exam tips for VIP members","Exams 1–3 are free"]',
        'Tokutei Ginou Automobile Maintenance Practice Tests (SSW i)', 'Practise for the Tokutei Ginou automobile maintenance test (JASPA): 20 mock exams, 780 true/false and practical questions, furigana, Vietnamese and English translations. Exams 1–3 are free.'
      );
INSERT OR IGNORE INTO products (
      id, slug, status, app_store_url, google_play_url, website_url, featured, sort_order,
      logo_url, published, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000008', 'vicare', 'available',
      NULL, NULL, 'https://vicare.vimai.jp',
      1, 8, '/images/products/vicare.png',
      1, strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now')
    );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000008-ja', '00000000-0000-0000-0000-000000000008', 'ja',
        'ViCare（日本での受診サポート）', '日本で病院にかかるベトナム人のための無料アプリ', '日本に住むベトナム人が安心して受診できるよう支える、ViMaiの無料・非営利アプリです。診察時の通訳（マイク、端末内の音声認識を優先）、病院の書類や薬袋のカメラ読み取り（端末内で処理）、症状から診療科を選ぶガイドと危険なサイン、診療科別にGoogleマップで医療機関を探す機能、119・110・#7119・#8000の伝え方、緊急医療情報・受診記録・服用中の薬を備えています。',
        '受診時のコミュニケーションを助ける参考情報のアプリで、医師の助言に代わるものではありません。内容はViCareチームが作成・確認しています。アカウント不要で、個人のデータは端末内だけに保存されます。', '日本で病院・クリニックを受診するベトナム人と、その受診を支える家族、会社、学校、支援機関の方。',
        '["診察通訳（マイク・数千の診察会話の例文）","書類・薬袋をカメラで読み取り（端末内）","症状から診療科の目安と危険なサイン","診療科別にGoogleマップで医療機関を検索","119・110・#7119・#8000の伝え方（住所を自動入力）","緊急医療情報・受診記録（医療費控除の集計）・服用中の薬","会話フレーズ、病気ガイド、手続き、医療用語辞典","無料・非営利、アカウント不要、データは端末内のみ"]',
        'ViCare｜ベトナム人の日本での受診をサポートする無料アプリ', 'ViCareは日本で病院にかかるベトナム人のための無料・非営利アプリ。診察時の通訳、書類・薬袋のカメラ読み取り、症状から診療科の案内、119番の伝え方。アカウント不要。'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000008-vi', '00000000-0000-0000-0000-000000000008', 'vi',
        'ViCare – Đi khám bệnh ở Nhật', 'App miễn phí giúp người Việt đi khám bệnh ở Nhật', 'ViCare là app miễn phí, phi lợi nhuận của ViMai, giúp người Việt tại Nhật đi khám bệnh: phiên dịch khi khám (micro, ưu tiên nhận dạng giọng nói trên máy), đọc giấy tờ bệnh viện và túi thuốc bằng camera (xử lý ngay trên điện thoại), “Tôi bị ốm” chọn đúng khoa kèm dấu hiệu nguy hiểm, tìm phòng khám theo khoa trên Google Maps, câu nói khi gọi 119, 110, #7119, #8000 và hồ sơ sức khoẻ (thông tin khẩn cấp, nhật ký khám, thuốc đang uống).',
        'Thông tin tham khảo và công cụ hỗ trợ giao tiếp khi đi khám, không thay thế lời khuyên của bác sĩ. Nội dung do đội ViCare biên soạn và kiểm tra. Không cần tài khoản; dữ liệu cá nhân chỉ lưu trên điện thoại.', 'Người Việt sống tại Nhật cần đi khám bệnh, và gia đình, công ty, trường học, nghiệp đoàn hỗ trợ họ.',
        '["Phiên dịch khi khám (micro, hàng nghìn câu bác sĩ – bệnh nhân)","Đọc giấy tờ và túi thuốc bằng camera, ngay trên máy","Tôi bị ốm: triệu chứng → khoa, dấu hiệu nguy hiểm","Tìm phòng khám theo khoa trên Google Maps","Gọi 119, 110, #7119, #8000: câu nói, tự điền địa chỉ","Thông tin khẩn cấp, nhật ký khám (tổng cho 医療費控除), thuốc đang uống","Câu giao tiếp, cẩm nang bệnh, thủ tục, từ điển y khoa","Miễn phí, phi lợi nhuận, không cần tài khoản"]',
        'ViCare – App đi khám bệnh ở Nhật cho người Việt (miễn phí)', 'ViCare giúp người Việt đi khám bệnh ở Nhật: phiên dịch khi khám, đọc giấy tờ và túi thuốc bằng camera, triệu chứng nên khám khoa nào, gọi 119. Miễn phí, không cần tài khoản.'
      );
INSERT OR IGNORE INTO product_translations (
        id, product_id, locale, name, tagline, description, long_description, target_audience, features,
        seo_title, seo_description
      ) VALUES (
        '00000000-0000-0000-0000-000000000008-en', '00000000-0000-0000-0000-000000000008', 'en',
        'ViCare: See a Doctor in Japan', 'A free app helping Vietnamese people see a doctor in Japan', 'ViCare is a free, non-profit ViMai app that helps Vietnamese people in Japan see a doctor: a doctor-visit interpreter (microphone, on-device speech recognition first), camera reading of hospital papers and medicine bags (processed on the phone), an “I feel sick” symptom-to-department guide with warning signs, clinic search by department on Google Maps, scripts for 119, 110, #7119 and #8000, and health records (emergency info, visit diary, current medicines).',
        'Reference information and a communication aid for doctor visits; it does not replace a doctor''s advice. Content is written and checked by the ViCare team. No account; personal data stays on your phone.', 'Vietnamese people living in Japan who need to see a doctor, and the family, employers, schools and support organisations who help them.',
        '["Doctor-visit interpreter (microphone, thousands of doctor–patient sentences)","Camera reading of papers and medicine bags, on the phone","I feel sick: symptoms → department, warning signs","Clinic search by department on Google Maps","119, 110, #7119, #8000 scripts with your address filled in","Emergency info, visit diary (totals for 医療費控除), current medicines","Phrasebook, illness guide, procedures, medical dictionary","Free, non-profit, no account"]',
        'ViCare – See a Doctor in Japan, Free App for Vietnamese', 'ViCare helps Vietnamese people see a doctor in Japan: a visit interpreter, camera reading of papers and medicine bags, which department to visit, 119 scripts. Free, no account.'
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
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-menkyo-1', '00000000-0000-0000-0000-000000000006', 5, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-menkyo-1-vi', 'faq-menkyo-1', 'vi',
       'ViMai Menkyo luyện thi những kỳ thi nào?', 'Thi lý thuyết bằng lái ô tô Nhật (学科試験): Karimen (仮免, 50 câu, 30 phút, đậu từ 45 câu), Honmen (本免, 95 câu gồm 90 câu đúng/sai và 5 câu minh họa, 50 phút, đậu từ 90/100 điểm) và đổi bằng nước ngoài (外免切替, 50 câu, 30 phút, đậu từ 45 câu). Mỗi loại có 20 đề, tổng cộng 60 đề.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-menkyo-1-en', 'faq-menkyo-1', 'en',
       'Which tests does ViMai Menkyo cover?', 'The Japanese driving-licence theory test (学科試験): Karimen (仮免, 50 questions, 30 minutes, pass at 45), Honmen (本免, 95 questions: 90 true/false plus 5 illustration questions, 50 minutes, pass at 90/100) and foreign licence conversion (外免切替, 50 questions, 30 minutes, pass at 45). There are 20 mock exams of each type, 60 in total.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-menkyo-1-ja', 'faq-menkyo-1', 'ja',
       'ViMai Menkyoはどの試験に対応していますか？', '日本の運転免許の学科試験です。仮免（50問・30分・45問以上で合格）、本免（95問：正誤90問とイラスト問題5問・50分・100点中90点以上で合格）、外免切替（50問・30分・45問以上で合格）の模擬試験を各20回、計60回収録しています。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-menkyo-2', '00000000-0000-0000-0000-000000000006', 6, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-menkyo-2-vi', 'faq-menkyo-2', 'vi',
       'App dùng ngôn ngữ nào?', 'App có tiếng Việt và tiếng Anh. Nội dung bám luật giao thông Nhật hiện hành và được giải thích bằng ngôn ngữ bạn chọn.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-menkyo-2-en', 'faq-menkyo-2', 'en',
       'Which languages does the app use?', 'The app is available in Vietnamese and English. It explains current Japanese traffic law in the language you choose.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-menkyo-2-ja', 'faq-menkyo-2', 'ja',
       'アプリは何語で使えますか？', 'アプリの表示言語はベトナム語と英語です。日本語の画面はありません。日本の交通法規の内容を、ベトナム語・英語話者向けに説明しています。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-menkyo-3', '00000000-0000-0000-0000-000000000006', 7, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-menkyo-3-vi', 'faq-menkyo-3', 'vi',
       'Dùng miễn phí được những gì?', 'Mỗi loại thi có 5 đề thi thử miễn phí. VIP mở toàn bộ 60 đề, cùng hệ thống giá với các app ViMai khác. Đăng nhập là tùy chọn; khi đăng nhập, tiến độ học được giữ trên mọi thiết bị.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-menkyo-3-en', 'faq-menkyo-3', 'en',
       'What can I use for free?', 'Five mock exams of each type are free. VIP unlocks all 60 and is bought inside the app with Apple payment, where Apple shows the price. Sign-in is optional; signing in keeps your progress on all your devices.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-menkyo-3-ja', 'faq-menkyo-3', 'ja',
       '無料でどこまで使えますか？', '模擬試験は種類ごとに5回分が無料です。VIPで60回分すべてが使えます。VIPはApp Storeのアプリ内でApple決済により購入し、価格はAppleが表示します。ログインは任意で、ログインすると学習の進み具合をすべての端末で引き継げます。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-gino1-1', '00000000-0000-0000-0000-000000000007', 8, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-1-vi', 'faq-gino1-1', 'vi',
       'ViMai Gino 1 Seibi luyện thi kỳ thi nào?', 'App luyện thi kỹ năng đặc định 1 ngành bảo dưỡng ô tô (特定技能1号評価試験 自動車整備分野), thường gọi là thi Tokutei bảo dưỡng ô tô hay Tokutei Seibi. Kỳ thi do JASPA tổ chức, thi trên máy tính (CBT) bằng tiếng Nhật có furigana.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-1-en', 'faq-gino1-1', 'en',
       'Which exam does ViMai Gino 1 Seibi prepare for?', 'The Tokutei Ginou (Specified Skilled Worker (i)) skills test for automobile maintenance (特定技能1号評価試験 自動車整備分野). The test is run by JASPA as a computer-based test (CBT) in Japanese, with furigana.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-1-ja', 'faq-gino1-1', 'ja',
       'ViMai Gino 1 Seibiはどの試験の対策アプリですか？', '「特定技能1号評価試験 自動車整備分野」の対策アプリです。試験はJASPA（日本自動車整備振興会連合会）が実施し、CBT方式で、日本語の問題には振り仮名が付きます。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-gino1-2', '00000000-0000-0000-0000-000000000007', 9, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-2-vi', 'faq-gino1-2', 'vi',
       'Đề thi gồm những phần nào, bao nhiêu điểm thì đậu?', 'Phần lý thuyết (学科) có 30 câu ○×, làm trong 60 phút, đậu khi đúng từ 65%. Phần thực hành (実技) có 3 bài (課題) gồm các câu chọn 1 trong 2, làm trong 20 phút, đậu khi đúng từ 60%. Phải đậu cả hai phần. Trong app, mỗi đề thi thử gồm 30 câu lý thuyết và 3 bài thực hành (mỗi bài 3 câu), làm liền một lượt 80 phút.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-2-en', 'faq-gino1-2', 'en',
       'What is the test format and the pass mark?', 'The theory part (学科) has 30 true/false questions in 60 minutes; you pass with 65% correct. The practical part (実技) has 3 tasks of two-choice questions in 20 minutes; you pass with 60% correct. You must pass both parts. In the app, each mock exam has the 30 theory questions and 3 practical tasks (3 questions each), taken in one 80-minute sitting.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-2-ja', 'faq-gino1-2', 'ja',
       '試験の形式と合格基準は？', '学科は○×問題30問・60分で、65%以上の正答で合格です。実技は3つの課題（2択の問題）・20分で、60%以上の正答で合格です。学科と実技の両方に合格する必要があります。アプリの模擬試験は、学科30問と実技3課題（各3問）を1回80分で通して解く形式です。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-gino1-3', '00000000-0000-0000-0000-000000000007', 10, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-3-vi', 'faq-gino1-3', 'vi',
       'Dùng miễn phí được những gì?', 'Đề 1–3 miễn phí. Từ điển phụ tùng và thuật ngữ (hơn 2.500 mục) tra cứu miễn phí: từ tiếng Nhật, cách đọc và nghĩa ngắn. VIP mở đề 4–20, giải thích chi tiết, hình và flashcard trong từ điển, mẹo làm bài và gia sư AI giải thích câu sai.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-3-en', 'faq-gino1-3', 'en',
       'What can I use for free?', 'Mock exams 1–3 are free. The parts and terms dictionary (over 2,500 entries) is free to search: the Japanese term, its reading and a short meaning. VIP unlocks exams 4–20, the dictionary''s detailed explanations, figures and flashcards, the exam tips and the AI tutor.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-3-ja', 'faq-gino1-3', 'ja',
       '無料でどこまで使えますか？', '模擬試験の第1〜3回は無料です。部品・用語辞典（2500語以上）は、単語・読み方・短い意味の検索が無料です。第4〜20回、辞典の詳しい解説・図・フラッシュカード、試験のコツ、AIチューターはVIPで使えます。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-gino1-4', '00000000-0000-0000-0000-000000000007', 11, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-4-vi', 'faq-gino1-4', 'vi',
       'VIP giá bao nhiêu?', 'Trên web, VIP 3 tháng giá 700.000đ, thanh toán bằng chuyển khoản VietQR. Nhập mã giới thiệu của cộng tác viên (CTV) ViMai được giảm 10%, 15% hoặc 20%.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-4-en', 'faq-gino1-4', 'en',
       'How much is VIP?', 'On the web, 3 months of VIP costs 700,000 VND, paid by VietQR bank transfer. A ViMai collaborator (CTV) referral code gives 10%, 15% or 20% off.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-4-ja', 'faq-gino1-4', 'ja',
       'VIPの料金はいくらですか？', 'Webでは3か月のVIPが700,000ドンで、VietQR（ベトナムの銀行振込）で支払います。ViMaiの紹介者（CTV）のコードを使うと10%・15%・20%の割引になります。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-gino1-5', '00000000-0000-0000-0000-000000000007', 12, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-5-vi', 'faq-gino1-5', 'vi',
       'Dùng trên thiết bị nào, ngôn ngữ gì?', 'Hiện app đang ở bản beta trên web: mở gino1-seibi.vimai.jp bằng trình duyệt trên điện thoại hoặc máy tính là dùng được, chưa có bản trên App Store hay Google Play. Giao diện app có tiếng Việt, tiếng Anh và tiếng Nhật.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-5-en', 'faq-gino1-5', 'en',
       'Which devices and languages are supported?', 'The app is a web app in beta: open gino1-seibi.vimai.jp in the browser on your phone or computer. There is no App Store or Google Play version yet. The app interface is available in Vietnamese, English and Japanese.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-5-ja', 'faq-gino1-5', 'ja',
       'どの端末・言語で使えますか？', '現在はベータ版のWebアプリで、スマートフォンやパソコンのブラウザから gino1-seibi.vimai.jp を開いて使います。App Store・Google Play版はまだありません。アプリの表示言語はベトナム語・英語・日本語です。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-gino1-6', '00000000-0000-0000-0000-000000000007', 13, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-6-vi', 'faq-gino1-6', 'vi',
       'Khác gì so với kỳ thi 3級 整備士 (thợ bảo dưỡng ô tô cấp 3)?', 'Đây là hai kỳ thi khác nhau. App này bám dạng đề của kỳ thi Tokutei Gino 1 ngành bảo dưỡng ô tô (lý thuyết ○× và thực hành chọn 1 trong 2). Câu hỏi có tham khảo các chủ đề từng ra trong kỳ thi 3級 整備士 nhưng app không phải để luyện riêng kỳ thi 3級, và câu hỏi không phải đề thi thật.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-6-en', 'faq-gino1-6', 'en',
       'How is this different from the Class 3 mechanic (3級 整備士) exam?', 'They are different exams. This app follows the format of the Tokutei Ginou automobile maintenance test (true/false theory and two-choice practical questions). Its questions draw on topics from past 3級 整備士 exams, but it is not a prep app for the 3級 exam itself, and the questions are not real past questions.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-gino1-6-ja', 'faq-gino1-6', 'ja',
       '3級自動車整備士試験とは何が違いますか？', '別の試験です。このアプリは特定技能1号評価試験（自動車整備分野）の形式（学科○×と実技2択）に合わせて作られています。問題は過去の3級自動車整備士試験の出題分野も参考にしていますが、3級整備士試験そのものの対策アプリではなく、実際の過去問でもありません。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-transport-1', '00000000-0000-0000-0000-000000000002', 14, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-1-vi', 'faq-transport-1', 'vi',
       'ViMai Tokutei Transport luyện thi kỳ thi nào?', 'App luyện thi kỹ năng đặc định 1 ngành vận tải ô tô, hạng mục xe tải (自動車運送業分野特定技能1号評価試験 トラック), thường gọi là thi Tokutei xe tải hay Tokutei vận tải. Kỳ thi do ClassNK (日本海事協会) tổ chức, thi trên máy tính (CBT) bằng tiếng Nhật.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-1-en', 'faq-transport-1', 'en',
       'Which exam does ViMai Tokutei Transport prepare for?', 'The Tokutei Ginou (Specified Skilled Worker (i)) skills test for automobile transport, truck category (自動車運送業分野特定技能1号評価試験 トラック). The test is run by ClassNK (Nippon Kaiji Kyokai) as a computer-based test (CBT) in Japanese.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-1-ja', 'faq-transport-1', 'ja',
       'ViMai Tokutei Transportはどの試験の対策アプリですか？', '「自動車運送業分野特定技能1号評価試験」のトラック区分の対策アプリです。試験はClassNK（一般財団法人日本海事協会）が実施し、CBT方式で行われます。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-transport-2', '00000000-0000-0000-0000-000000000002', 15, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-2-vi', 'faq-transport-2', 'vi',
       'Đề thi gồm những phần nào, bao nhiêu điểm thì đậu?', 'Mỗi đề có 50 câu: 30 câu lý thuyết ○× và 20 câu thực hành chọn 1 trong 3, làm trong 80 phút. Phải đúng từ 60% ở CẢ HAI phần (từ 18/30 câu lý thuyết và từ 12/20 câu thực hành); tổng điểm cao mà một phần dưới 60% vẫn trượt. Đề thi thử trong app có cùng cấu trúc và cách chấm này.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-2-en', 'faq-transport-2', 'en',
       'What is the test format and the pass mark?', 'Each test has 50 questions: 30 true/false theory questions and 20 three-choice practical questions, in 80 minutes. You need at least 60% in BOTH parts (18 of 30 theory and 12 of 20 practical); a high total with one part under 60% is still a fail. The app''s mock exams use the same structure and scoring.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-2-ja', 'faq-transport-2', 'ja',
       '試験の形式と合格基準は？', '全50問で、学科の○×問題30問と実技の3択問題20問を80分で解きます。学科・実技それぞれ60%以上（学科18問以上、実技12問以上）の正答で合格です。合計点が高くても、どちらかが60%未満なら不合格です。アプリの模擬試験も同じ構成と採点方法です。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-transport-3', '00000000-0000-0000-0000-000000000002', 16, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-3-vi', 'faq-transport-3', 'vi',
       'Dùng miễn phí được những gì?', 'Đề 1–3 miễn phí, có furigana và bản dịch, không cần tài khoản. Sổ từ vựng mở miễn phí 100 từ đầu, hướng dẫn kỳ thi và đăng ký thi ClassNK cũng miễn phí. VIP mở đề 4–20, đủ 510 từ vựng, mẹo nhận ra đáp án cho từng câu, cẩm nang mẹo thi và AI giải thích câu sai.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-3-en', 'faq-transport-3', 'en',
       'What can I use for free?', 'Mock exams 1–3 are free, with furigana and translations, and need no account. The first 100 words of the vocabulary book and the exam and ClassNK registration guides are free too. VIP unlocks exams 4–20, all 510 words, a tip for spotting the answer on every question, the exam tips guide and AI explanations of wrong answers.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-3-ja', 'faq-transport-3', 'ja',
       '無料でどこまで使えますか？', '模擬試験の第1〜3回は無料で、振り仮名と翻訳も使え、アカウント登録は不要です。単語帳の最初の100語、試験の案内とClassNKの申込ガイドも無料です。第4〜20回、単語帳の全510語、問題ごとの解き方のヒント、試験のコツ、AIによる誤答の解説はVIPで使えます。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-transport-4', '00000000-0000-0000-0000-000000000002', 17, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-4-vi', 'faq-transport-4', 'vi',
       'VIP giá bao nhiêu?', 'Trên web, VIP 3 tháng giá 500.000đ, thanh toán bằng chuyển khoản VietQR, VIP tự mở sau khi chuyển khoản. Nhập mã giới thiệu của cộng tác viên (CTV) ViMai được giảm 10%, 15% hoặc 20% (còn 450.000đ, 425.000đ hoặc 400.000đ). Mỗi gói VIP dùng tối đa 2 thiết bị.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-4-en', 'faq-transport-4', 'en',
       'How do I buy VIP?', 'VIP is bought inside the iOS app with Apple payment, and Apple shows the price. The App Store version is coming soon; the free exams can be tried on the web now.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-4-ja', 'faq-transport-4', 'ja',
       'VIPはどこで購入できますか？', 'VIPはiOSアプリ内でAppleの決済により購入します。価格はAppleの画面に表示されます。App Store版は近日公開予定で、無料の模擬試験は今すぐWebで試せます。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-transport-5', '00000000-0000-0000-0000-000000000002', 18, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-5-vi', 'faq-transport-5', 'vi',
       'Dùng trên thiết bị nào, ngôn ngữ gì?', 'App chạy trên trình duyệt: mở tokutei-transport.vimai.jp trên điện thoại (iPhone, Android) hoặc máy tính là làm được ngay, và có thể thêm ra màn hình chính như một ứng dụng. Giao diện app có tiếng Việt, tiếng Anh và tiếng Nhật.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-5-en', 'faq-transport-5', 'en',
       'Which devices and languages are supported?', 'The free exams run in the browser on iPhone, Android or a computer, and the web app can be added to the home screen. An iOS app is coming to the App Store. The app interface is available in Vietnamese, English and Japanese.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-5-ja', 'faq-transport-5', 'ja',
       'どの端末・言語で使えますか？', '無料の模擬試験は、iPhone・Android・パソコンのブラウザで使え、ホーム画面に追加することもできます。iOSアプリはApp Storeで近日公開予定です。アプリの表示言語はベトナム語・英語・日本語です。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-transport-6', '00000000-0000-0000-0000-000000000002', 19, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-6-vi', 'faq-transport-6', 'vi',
       'Câu hỏi trong app có phải đề thi thật không?', 'Không. Đề thi thử mô phỏng cấu trúc của kỳ thi (50 câu, 80 phút, mỗi phần từ 60%), còn câu hỏi do ViMai soạn bám giáo trình 「トラック運転者をめざす人のための学習用テキスト」, mỗi câu có giải thích. App không được ClassNK bảo trợ.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-6-en', 'faq-transport-6', 'en',
       'Are these real exam questions?', 'No. The mock exams follow the structure of the test (50 questions, 80 minutes, 60% in each part), and the questions are written by ViMai from the truck driver study textbook, each with an explanation. The app is not endorsed by ClassNK.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-6-ja', 'faq-transport-6', 'ja',
       '実際の試験問題ですか？', 'いいえ。模擬試験は本番の構成（50問・80分・各60%以上で合格）に合わせていますが、問題は「トラック運転者をめざす人のための学習用テキスト」をもとにViMaiが作成したもので、すべてに解説が付いています。ClassNKの公認・監修を受けたものではありません。');
INSERT OR IGNORE INTO faqs (id, product_id, sort_order, published, created_at, updated_at)
     VALUES ('faq-transport-7', '00000000-0000-0000-0000-000000000002', 20, 1,
     strftime('%Y-%m-%dT%H:%M:%fZ','now'), strftime('%Y-%m-%dT%H:%M:%fZ','now'));
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-7-vi', 'faq-transport-7', 'vi',
       'Tôi thi ngành Taxi thì dùng app nào?', 'Đề xe tải khác đề taxi. Nếu thi hạng mục taxi, hãy dùng ViMai Tokutei Taxi (tokutei-taxi.vimai.jp).');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-7-en', 'faq-transport-7', 'en',
       'I am taking the taxi test. Which app should I use?', 'The truck test is different from the taxi test. For the taxi category, use ViMai Tokutei Taxi.');
INSERT OR IGNORE INTO faq_translations (id, faq_id, locale, question, answer)
       VALUES ('faq-transport-7-ja', 'faq-transport-7', 'ja',
       'タクシーの試験を受ける場合は？', 'トラックとタクシーは別の試験です。タクシー区分を受ける場合は、ViMai Tokutei Taxiをご利用ください。');
