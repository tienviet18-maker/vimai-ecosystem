import type { Faq, Locale, Product } from "@/types";
import { resolveProductSite, toOptimizedImage } from "@/lib/product-sites";

export const seedProducts: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "tokutei-taxi",
    status: "coming_soon",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://tokutei-taxi.vimai.jp",
    featured: true,
    sort_order: 1,
    logo_url: "/images/products/tokutei_taxi.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Tokutei Taxi",
        tagline: "特定技能1号（タクシー）の学習アプリ",
        description:
          "外国人が日本の特定技能1号・タクシー分野の試験勉強と演習を行うためのアプリです。CBT形式の練習、模擬問題、誤答の見直し、学習のヒント、日本語とベトナム語、振り仮名、解説を備えています。",
        long_description:
          "試験の合格を保証するものではありません。出題形式に慣れることと、間違えた箇所を見直すことを目的とした学習ツールです。",
        target_audience:
          "日本でタクシー分野の特定技能1号を目指す外国人学習者。",
        features: [
          "CBT形式の練習",
          "模擬問題",
          "誤答の見直し",
          "学習のヒント",
          "日本語・ベトナム語",
          "振り仮名",
          "わかりやすい解説",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Tokutei Taxi",
        tagline: "Ứng dụng luyện thi 特定技能1号 – Taxi",
        description:
          "Ứng dụng dành cho người nước ngoài học và luyện thi 特定技能1号 ngành Taxi tại Nhật. Có luyện CBT, câu hỏi mô phỏng, ôn lại câu sai, mẹo làm bài, hỗ trợ tiếng Nhật và tiếng Việt, Furigana và phần giải thích.",
        long_description:
          "Công cụ học tập để làm quen dạng đề và rà soát chỗ sai. Không cam kết đậu kỳ thi.",
        target_audience:
          "Người nước ngoài tại Nhật đang chuẩn bị thi 特定技能1号 ngành Taxi.",
        features: [
          "Luyện dạng CBT",
          "Câu hỏi thi thử",
          "Ôn lại câu sai",
          "Mẹo làm bài",
          "Hỗ trợ tiếng Nhật và tiếng Việt",
          "Furigana",
          "Giải thích rõ ràng",
        ],
      },
      {
        locale: "en",
        name: "ViMai Tokutei Taxi",
        tagline: "Study app for Specified Skilled Worker (i) Taxi",
        description:
          "An app for foreigners studying and practicing for Japan’s Specified Skilled Worker (i) Taxi field. It includes CBT-style practice, mock questions, mistake review, study tips, Japanese and Vietnamese support, furigana, and explanations.",
        long_description:
          "A study tool for exam format and review. It does not guarantee a passing result.",
        target_audience:
          "Foreign residents in Japan preparing for Specified Skilled Worker (i) Taxi.",
        features: [
          "CBT-style practice",
          "Mock questions",
          "Mistake review",
          "Study tips",
          "Japanese and Vietnamese support",
          "Furigana",
          "Clear explanations",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    slug: "tokutei-transport",
    status: "coming_soon",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://tokutei-truck.vimai.jp",
    featured: true,
    sort_order: 2,
    logo_url: "/images/products/tokutei_vantai.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Transport",
        tagline: "特定技能（自動車運送・トラック）の学習アプリ",
        description:
          "特定技能の運送・トラック分野に取り組む外国人向けの学習アプリです。対象者、学習の目的、模擬試験、日本語サポート、振り仮名、わかりやすい解説、日本での就労の方向性を整理して学べます。",
        long_description:
          "試験や就労の結果を保証するものではありません。学習範囲と出題形式を把握するためのツールです。",
        target_audience:
          "日本の特定技能・自動車運送業（トラック等）を目指す外国人学習者。",
        features: [
          "運送分野の学習目的が明確",
          "模擬試験",
          "日本語サポート",
          "振り仮名",
          "わかりやすい解説",
          "日本での就労に向けた方向づけ",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Transport",
        tagline: "Ứng dụng luyện thi 特定技能 ngành vận tải / xe tải",
        description:
          "Ứng dụng cho người học lĩnh vực 特定技能 vận tải / xe tải. Nêu rõ đối tượng, mục đích học, đề thi thử, hỗ trợ tiếng Nhật, Furigana, giải thích dễ hiểu và định hướng nghề nghiệp tại Nhật.",
        long_description:
          "Công cụ nắm phạm vi học và dạng đề. Không cam kết kết quả thi hay việc làm.",
        target_audience:
          "Người nước ngoài chuẩn bị thi và làm việc trong ngành vận tải / xe tải tại Nhật.",
        features: [
          "Mục tiêu học rõ ràng theo ngành vận tải",
          "Đề thi thử",
          "Hỗ trợ tiếng Nhật",
          "Furigana",
          "Giải thích dễ hiểu",
          "Định hướng nghề nghiệp tại Nhật",
        ],
      },
      {
        locale: "en",
        name: "ViMai Transport",
        tagline: "Study app for Specified Skilled Worker transport / trucking",
        description:
          "An app for foreigners studying the Specified Skilled Worker transport and trucking field. It highlights the audience, study purpose, practice exams, Japanese support, furigana, clear explanations, and career orientation in Japan.",
        long_description:
          "A tool for understanding the study scope and exam format. It does not guarantee exam or employment outcomes.",
        target_audience:
          "Foreign learners preparing for Specified Skilled Worker automobile transport / trucking in Japan.",
        features: [
          "Clear study purpose for transport work",
          "Practice exams",
          "Japanese-language support",
          "Furigana",
          "Clear explanations",
          "Career orientation in Japan",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    slug: "seibi",
    status: "development",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://seibi.vimai.jp",
    featured: true,
    sort_order: 3,
    logo_url: "/images/products/sebishi_3kyu.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Seibi",
        tagline: "3級自動車整備士の学習アプリ",
        description:
          "3級自動車整備士（Seibi 3kyu）を学ぶ人のためのアプリです。対象者、学習範囲、外国人学習者への配慮、段階的な学習、わかりやすい構成を中心に設計しています。",
        long_description:
          "学科試験の学習を整理するためのツールです。合格を保証するものではありません。",
        target_audience:
          "3級自動車整備士の学科を学ぶ外国人および日本語学習者。",
        features: [
          "3級整備士の学習範囲に沿った構成",
          "外国人学習者への配慮",
          "段階的に進められる学習",
          "学科の基礎を整理",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Seibi",
        tagline: "Ứng dụng học Seibi 3kyu (3級自動車整備士)",
        description:
          "Ứng dụng học chứng chỉ Seibi 3kyu. Nêu rõ đối tượng, phạm vi học, hỗ trợ người nước ngoài, lộ trình có cấu trúc và điểm mạnh của sản phẩm.",
        long_description:
          "Công cụ sắp xếp kiến thức thi lý thuyết. Không cam kết đậu kỳ thi.",
        target_audience:
          "Người nước ngoài và người học tiếng Nhật đang ôn thi 3級自動車整備士.",
        features: [
          "Bám phạm vi Seibi 3kyu",
          "Hỗ trợ người học nước ngoài",
          "Học theo lộ trình có cấu trúc",
          "Hệ thống kiến thức lý thuyết",
        ],
      },
      {
        locale: "en",
        name: "ViMai Seibi",
        tagline: "Study app for Seibi 3kyu (Class 3 automobile mechanic)",
        description:
          "An app for studying Seibi 3kyu. It highlights the audience, curriculum scope, support for foreign learners, structured study, and the product’s strengths.",
        long_description:
          "A tool for organizing written-exam study. It does not guarantee a passing result.",
        target_audience:
          "Foreign learners and Japanese-language learners studying Class 3 automobile mechanic theory.",
        features: [
          "Curriculum aligned with Seibi 3kyu",
          "Support for foreign learners",
          "Structured learning path",
          "Written-exam knowledge organized clearly",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    slug: "kids",
    status: "development",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://kids.vimai.jp",
    featured: false,
    sort_order: 4,
    logo_url: "/images/products/vimai_kids.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Kids",
        tagline: "保護者向けに設計した子どもの学びアプリ",
        description:
          "子どもが文字、ひらがな、カタカナ、ベトナム語に触れ、練習モードで学べる教育アプリです。Apple Pencilに対応し、就学前の準備にも使えます。保護者が内容を把握しやすい設計です。",
        long_description:
          "家庭での学習を補助するアプリです。学校の成績や発達を保証するものではありません。",
        target_audience:
          "就学前〜小学校低学年のお子さまを持つ保護者。",
        features: [
          "文字の練習",
          "ひらがな・カタカナ",
          "ベトナム語",
          "練習モード",
          "Apple Pencil対応",
          "インタラクティブな学習",
          "就学前の準備",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Kids",
        tagline: "Ứng dụng học cho trẻ, thiết kế cho phụ huynh",
        description:
          "Ứng dụng giáo dục cho trẻ: chữ cái, Hiragana, Katakana, tiếng Việt, chế độ luyện tập, hỗ trợ Apple Pencil, học tương tác và chuẩn bị vào lớp. Giọng điệu dành cho phụ huynh theo dõi nội dung học của con.",
        long_description:
          "Hỗ trợ học tại nhà. Không cam kết kết quả học đường hay phát triển.",
        target_audience:
          "Phụ huynh có con ở độ tuổi mầm non đến đầu tiểu học.",
        features: [
          "Luyện chữ cái",
          "Hiragana và Katakana",
          "Tiếng Việt",
          "Chế độ luyện tập",
          "Hỗ trợ Apple Pencil",
          "Học tương tác",
          "Chuẩn bị vào lớp",
        ],
      },
      {
        locale: "en",
        name: "ViMai Kids",
        tagline: "A children’s learning app designed for parents",
        description:
          "An educational app for children covering letters, hiragana, katakana, Vietnamese, practice modes, Apple Pencil support, interactive learning, and preschool preparation. Written for parents who want to see what their child is practicing.",
        long_description:
          "A home-learning aid. It does not promise school results or developmental outcomes.",
        target_audience:
          "Parents of children in preschool through early elementary years.",
        features: [
          "Letter practice",
          "Hiragana and katakana",
          "Vietnamese",
          "Practice modes",
          "Apple Pencil support",
          "Interactive learning",
          "Preschool preparation",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    slug: "maimai",
    status: "development",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://maimai.vimai.jp",
    featured: false,
    sort_order: 5,
    logo_url: "/images/products/maimai.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "Maimai",
        tagline: "自分の生活指標を記録するアプリ",
        description:
          "体重、水分、睡眠、栄養、活動、周期、その他の個人指標を記録するヘルスケア／ライフスタイル記録アプリです。医療行為ではなく、日々の記録のためのツールです。",
        long_description:
          "診断・治療・予防の効果を示すものではありません。体調や健康の結果を保証しません。必要に応じて専門家に相談してください。",
        target_audience:
          "体重、睡眠、水分、栄養、活動、周期などを自分で記録したい人。",
        features: [
          "体重の記録",
          "水分摂取の記録",
          "睡眠の記録",
          "栄養の記録",
          "活動の記録",
          "周期の記録",
          "個人指標のカスタム",
        ],
      },
      {
        locale: "vi",
        name: "Maimai",
        tagline: "Ghi nhận chỉ số sinh hoạt cá nhân",
        description:
          "Ứng dụng theo dõi lối sống: cân nặng, nước, ngủ, dinh dưỡng, hoạt động, chu kỳ và các chỉ số cá nhân. Không phải công cụ y tế; chỉ dùng để ghi nhận hằng ngày.",
        long_description:
          "Không chẩn đoán, điều trị hay cam kết kết quả sức khỏe. Khi cần, hãy hỏi chuyên gia.",
        target_audience:
          "Người muốn tự ghi nhận cân nặng, giấc ngủ, nước, dinh dưỡng, hoạt động và chu kỳ.",
        features: [
          "Ghi nhận cân nặng",
          "Ghi nhận lượng nước",
          "Ghi nhận giấc ngủ",
          "Ghi nhận dinh dưỡng",
          "Ghi nhận hoạt động",
          "Ghi nhận chu kỳ",
          "Chỉ số cá nhân tùy chỉnh",
        ],
      },
      {
        locale: "en",
        name: "Maimai",
        tagline: "A personal health and lifestyle tracker",
        description:
          "A lifestyle tracker for weight, water intake, sleep, nutrition, activity, cycle tracking, and other personal metrics. It is a daily log, not a medical device.",
        long_description:
          "It does not diagnose, treat, or promise health outcomes. Consult a professional when you need medical advice.",
        target_audience:
          "People who want to log weight, sleep, water, nutrition, activity, and cycle data themselves.",
        features: [
          "Weight logging",
          "Water-intake logging",
          "Sleep logging",
          "Nutrition logging",
          "Activity logging",
          "Cycle tracking",
          "Custom personal metrics",
        ],
      },
    ],
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    slug: "menkyo",
    status: "beta",
    app_store_url: null,
    google_play_url: null,
    website_url: "https://menkyo.vimai.jp",
    featured: true,
    sort_order: 6,
    logo_url: "/images/products/vimai_menkyo.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Menkyo（日本の運転免許・学科）",
        tagline: "日本の運転免許・学科試験の学習アプリ",
        description:
          "日本で運転免許の学科試験（仮免・本免）や外国免許からの切替に取り組む、ベトナム語・英語話者のための学習アプリ（スマートフォン・Web）です。30の単元、約2,350問の練習問題（イラスト付きの問題も多数）、ViMaiが描いた標識・標示209点、危険予測イラスト107点、模擬試験60回分を収録しています。模擬試験は仮免20回（50問・30分・45問以上で合格）、本免20回（95問：正誤90問とイラスト問題5問・50分・100点中90点以上で合格）、外免切替20回（50問・30分・45問以上で合格）です。内容は最新の日本の交通法規（2026年の改正など）に合わせて更新します。アプリの表示言語はベトナム語と英語で、日本語表示はありません。",
        long_description:
          "ルールを理解し、合格し、自信を持って運転しよう。学習を支えるツールであり、試験の合格を保証するものではありません。",
        target_audience:
          "日本で運転免許（仮免・本免）を教習所や試験場で取得する人、または外国免許を切り替える人のうち、ベトナム語・英語で学びたい在住者。雇用主や教習所の方が内容を把握する際にもご覧ください。",
        features: [
          "模擬試験60回（仮免・本免・外免切替 各20回）",
          "最新の交通法規に対応（2026年の改正など）",
          "約2,350問の練習問題（イラスト付き多数）",
          "30の学習単元",
          "ViMaiが描いた標識・標示209点",
          "危険予測イラスト107点",
          "すぐに解説が出る学習モードと、本番と同じ時間で解く試験モード",
          "間違えた問題の間隔反復による復習と、分野別の練習",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Menkyo – Bằng lái Nhật",
        tagline: "Thi lý thuyết Karimen, Honmen và đổi bằng lái Nhật",
        description:
          "Ứng dụng (điện thoại và web) giúp người Việt và người dùng tiếng Anh tại Nhật học và luyện thi lý thuyết bằng lái ô tô Nhật (学科試験). Có 30 bài học, khoảng 2.350 câu luyện tập (nhiều câu có hình), thư viện 209 biển báo và vạch kẻ đường do ViMai vẽ, 107 tranh tình huống nguy hiểm và 60 đề thi thử: 20 đề Karimen (仮免, 50 câu, 30 phút, đậu từ 45 câu), 20 đề Honmen (本免, 95 câu gồm 90 câu đúng/sai và 5 câu minh họa, 50 phút, đậu từ 90/100 điểm), 20 đề đổi bằng (外免切替, 50 câu, 30 phút, đậu từ 45 câu). Nội dung luôn cập nhật theo luật giao thông Nhật hiện hành, gồm các thay đổi năm 2026. Ngôn ngữ trong app: tiếng Việt và tiếng Anh.",
        long_description:
          "Hiểu luật. Đậu bằng. Tự tin cầm lái. Đây là công cụ học tập, không cam kết đậu kỳ thi.",
        target_audience:
          "Người Việt và người dùng tiếng Anh sống tại Nhật đang lấy bằng lái ô tô (Karimen, Honmen ở trường lái hoặc trung tâm sát hạch) hoặc đổi bằng nước ngoài sang bằng Nhật.",
        features: [
          "60 đề thi thử Karimen, Honmen, đổi bằng",
          "Cập nhật theo luật giao thông Nhật mới nhất (2026)",
          "Khoảng 2.350 câu, nhiều câu có hình",
          "30 bài học lý thuyết",
          "209 biển báo và vạch kẻ đường do ViMai vẽ",
          "107 tranh tình huống nguy hiểm",
          "Chế độ học giải thích ngay, chế độ thi tính giờ như thi thật",
          "Ôn câu sai theo lịch lặp lại ngắt quãng, luyện theo chủ đề",
        ],
      },
      {
        locale: "en",
        name: "ViMai Menkyo: Japan License",
        tagline: "Japanese driving theory test practice: Karimen, Honmen, conversion",
        description:
          "An app (mobile and web) for Vietnamese and English speakers in Japan learning for the Japanese driving-licence theory test (学科試験). It includes 30 lesson units, about 2,350 practice questions (many with pictures), a library of 209 road signs and markings drawn by ViMai, 107 hazard-scene illustrations, and 60 mock exams: 20 Karimen (仮免, 50 questions, 30 minutes, pass at 45), 20 Honmen (本免, 95 questions: 90 true/false plus 5 illustration questions, 50 minutes, pass at 90/100), and 20 licence conversion (外免切替, 50 questions, 30 minutes, pass at 45). Content is kept up to date with current Japanese traffic law, including the 2026 changes. The app is in Vietnamese and English.",
        long_description:
          "Know the rules. Pass the test. Drive with confidence. A study tool; it does not guarantee a passing result.",
        target_audience:
          "Vietnamese and English-speaking residents in Japan getting a Japanese driving licence (Karimen and Honmen at a driving school or test centre) or converting a foreign licence.",
        features: [
          "60 mock exams: Karimen, Honmen, conversion",
          "Updated to current Japanese traffic law (2026)",
          "About 2,350 questions, many with pictures",
          "30 lesson units",
          "209 road signs and markings drawn by ViMai",
          "107 hazard-scene illustrations",
          "Learning mode with instant explanations; exam mode timed like the real test",
          "Mistake review with spaced repetition, plus topic practice",
        ],
      },
    ],
  },
];

export const seedFaqs: Array<
  Omit<Faq, "question" | "answer"> & {
    product_slug: string | null;
    translations: Record<Locale, { question: string; answer: string }>;
  }
> = [
  {
    id: "faq-1",
    product_id: "00000000-0000-0000-0000-000000000001",
    product_slug: "tokutei-taxi",
    sort_order: 1,
    published: true,
    translations: {
      ja: {
        question: "Tokutei Taxiはどのような試験に対応していますか？",
        answer:
          "日本の特定技能「自動車運送業（タクシー）」分野の試験対策を目的としています。模擬試験を中心に学習できます。",
      },
      vi: {
        question: "ViMai Tokutei Taxi ôn thi chứng chỉ nào?",
        answer:
          "Ứng dụng phục vụ luyện thi chứng chỉ kỹ năng đặc định (Tokutei Gino) lĩnh vực vận tải / taxi tại Nhật Bản, với các đề thi thử.",
      },
      en: {
        question: "Which exam does Tokutei Taxi cover?",
        answer:
          "It is built for Japan's Specified Skilled Worker (Tokutei Gino) taxi / automobile transport certification, with mock exams.",
      },
    },
  },
  {
    id: "faq-2",
    product_id: null,
    product_slug: null,
    sort_order: 2,
    published: true,
    translations: {
      ja: {
        question: "アプリはどこからダウンロードできますか？",
        answer:
          "公開中のアプリは各製品ページのApp Store / Google Playボタンから案内します。準備中の製品は「近日公開」と表示されます。",
      },
      vi: {
        question: "Tải ứng dụng ở đâu?",
        answer:
          "Ứng dụng đã phát hành sẽ có nút App Store / Google Play trên trang sản phẩm. Sản phẩm chưa ra mắt được đánh dấu sắp ra mắt.",
      },
      en: {
        question: "Where can I download the apps?",
        answer:
          "Released apps are linked from each product page via App Store / Google Play. Products still in preparation are labeled coming soon.",
      },
    },
  },
  {
    id: "faq-3",
    product_id: null,
    product_slug: null,
    sort_order: 3,
    published: true,
    translations: {
      ja: {
        question: "対応言語は何ですか？",
        answer:
          "本サイトは日本語・ベトナム語・英語に対応しています。各アプリの対応言語は製品によって異なります（CMS更新予定）。",
      },
      vi: {
        question: "Hệ sinh thái hỗ trợ ngôn ngữ nào?",
        answer:
          "Website hỗ trợ tiếng Nhật, tiếng Việt và tiếng Anh. Ngôn ngữ trong từng ứng dụng có thể khác nhau (cần cập nhật CMS).",
      },
      en: {
        question: "Which languages are supported?",
        answer:
          "This website is available in Japanese, Vietnamese, and English. In-app language support varies by product [CMS update].",
      },
    },
  },
  {
    id: "faq-4",
    product_id: "00000000-0000-0000-0000-000000000004",
    product_slug: "kids",
    sort_order: 4,
    published: true,
    translations: {
      ja: {
        question: "ViMai Kidsの保護者管理とは何ですか？",
        answer:
          "保護者がお子さまの学習時間や利用内容を把握・管理できる仕組みです。詳細な項目は公開時に製品ページで案内します。",
      },
      vi: {
        question: "Kiểm soát phụ huynh trên ViMai Kids là gì?",
        answer:
          "Phụ huynh có thể theo dõi và giới hạn thời gian cũng như nội dung học của trẻ. Chi tiết sẽ được cập nhật khi ứng dụng phát hành.",
      },
      en: {
        question: "What parent controls does ViMai Kids include?",
        answer:
          "Parents can monitor and manage study time and content. Detailed controls will be listed on the product page at launch.",
      },
    },
  },
  {
    id: "faq-menkyo-1",
    product_id: "00000000-0000-0000-0000-000000000006",
    product_slug: "menkyo",
    sort_order: 5,
    published: true,
    translations: {
      ja: {
        question: "ViMai Menkyoはどの試験に対応していますか？",
        answer:
          "日本の運転免許の学科試験です。仮免（50問・30分・45問以上で合格）、本免（95問：正誤90問とイラスト問題5問・50分・100点中90点以上で合格）、外免切替（50問・30分・45問以上で合格）の模擬試験を各20回、計60回収録しています。",
      },
      vi: {
        question: "ViMai Menkyo luyện thi những kỳ thi nào?",
        answer:
          "Thi lý thuyết bằng lái ô tô Nhật (学科試験): Karimen (仮免, 50 câu, 30 phút, đậu từ 45 câu), Honmen (本免, 95 câu gồm 90 câu đúng/sai và 5 câu minh họa, 50 phút, đậu từ 90/100 điểm) và đổi bằng nước ngoài (外免切替, 50 câu, 30 phút, đậu từ 45 câu). Mỗi loại có 20 đề, tổng cộng 60 đề.",
      },
      en: {
        question: "Which tests does ViMai Menkyo cover?",
        answer:
          "The Japanese driving-licence theory test (学科試験): Karimen (仮免, 50 questions, 30 minutes, pass at 45), Honmen (本免, 95 questions: 90 true/false plus 5 illustration questions, 50 minutes, pass at 90/100) and foreign licence conversion (外免切替, 50 questions, 30 minutes, pass at 45). There are 20 mock exams of each type, 60 in total.",
      },
    },
  },
  {
    id: "faq-menkyo-2",
    product_id: "00000000-0000-0000-0000-000000000006",
    product_slug: "menkyo",
    sort_order: 6,
    published: true,
    translations: {
      ja: {
        question: "アプリは何語で使えますか？",
        answer:
          "アプリの表示言語はベトナム語と英語です。日本語の画面はありません。日本の交通法規の内容を、ベトナム語・英語話者向けに説明しています。",
      },
      vi: {
        question: "App dùng ngôn ngữ nào?",
        answer:
          "App có tiếng Việt và tiếng Anh. Nội dung bám luật giao thông Nhật hiện hành và được giải thích bằng ngôn ngữ bạn chọn.",
      },
      en: {
        question: "Which languages does the app use?",
        answer:
          "The app is available in Vietnamese and English. It explains current Japanese traffic law in the language you choose.",
      },
    },
  },
  {
    id: "faq-menkyo-3",
    product_id: "00000000-0000-0000-0000-000000000006",
    product_slug: "menkyo",
    sort_order: 7,
    published: true,
    translations: {
      ja: {
        question: "無料でどこまで使えますか？",
        answer:
          "模擬試験は種類ごとに5回分が無料です。VIPで60回分すべてが使えます。料金体系は他のViMaiアプリと同じです。ログインは任意で、ログインすると学習の進み具合をすべての端末で引き継げます。",
      },
      vi: {
        question: "Dùng miễn phí được những gì?",
        answer:
          "Mỗi loại thi có 5 đề thi thử miễn phí. VIP mở toàn bộ 60 đề, cùng hệ thống giá với các app ViMai khác. Đăng nhập là tùy chọn; khi đăng nhập, tiến độ học được giữ trên mọi thiết bị.",
      },
      en: {
        question: "What can I use for free?",
        answer:
          "Five mock exams of each type are free. VIP unlocks all 60, on the same pricing system as the other ViMai apps. Sign-in is optional; signing in keeps your progress on all your devices.",
      },
    },
  },
];

export function localizeProduct(product: Product, locale: Locale) {
  const translation =
    product.translations.find((item) => item.locale === locale) ??
    product.translations.find((item) => item.locale === "vi") ??
    product.translations[0];

  return {
    ...product,
    website_url: resolveProductSite(product.slug, product.website_url),
    logo_url: toOptimizedImage(product.logo_url),
    icon_url: toOptimizedImage(product.icon_url),
    hero_image_url: toOptimizedImage(product.hero_image_url),
    name: translation?.name ?? product.slug,
    tagline: translation?.tagline ?? "",
    description: translation?.description ?? "",
    long_description: translation?.long_description,
    features: translation?.features ?? [],
    target_audience: translation?.target_audience ?? product.target_audience,
  };
}
