import type { Faq, Locale, Product } from "@/types";

export const seedProducts: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    slug: "tokutei-taxi",
    status: "coming_soon",
    app_store_url: null,
    google_play_url: null,
    website_url: null,
    featured: true,
    sort_order: 1,
    logo_url: "/images/products/tokutei_taxi.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Tokutei Taxi",
        tagline: "特定技能（タクシー）試験対策アプリ",
        description:
          "日本の特定技能「自動車運送業（タクシー）」分野の試験対策アプリケーションです。模擬試験を通じて、合格に必要な知識を効率よく学習できます。",
        features: [
          "特定技能タクシー分野に特化した模擬試験",
          "本番形式に近い出題と解説",
          "学習進度の確認（CMS更新予定）",
          "日本語・ベトナム語での学習サポート（CMS更新予定）",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Tokutei Taxi",
        tagline: "Luyện thi Tokutei Gino ngành Taxi tại Nhật Bản",
        description:
          "Ứng dụng luyện thi chứng chỉ kỹ năng đặc định (Tokutei Gino) lĩnh vực vận tải / tài xế taxi tại Nhật Bản. Bao gồm đề thi thử mô phỏng kỳ thi thật.",
        features: [
          "Đề thi thử chuyên biệt cho ngành Taxi",
          "Câu hỏi sát định dạng kỳ thi và phần giải thích",
          "Theo dõi tiến độ học tập (cần cập nhật CMS)",
          "Hỗ trợ học bằng tiếng Việt và tiếng Nhật (cần cập nhật CMS)",
        ],
      },
      {
        locale: "en",
        name: "ViMai Tokutei Taxi",
        tagline: "Tokutei Gino taxi exam preparation",
        description:
          "An exam-prep application for Japan's Specified Skilled Worker (Tokutei Gino) certification in the taxi / automobile transport field. Includes mock exams.",
        features: [
          "Mock exams tailored to the taxi field",
          "Exam-style questions with explanations",
          "Learning progress tracking [CMS update]",
          "Japanese and Vietnamese study support [CMS update]",
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
    website_url: null,
    featured: true,
    sort_order: 2,
    logo_url: "/images/products/tokutei_vantai.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Transport",
        tagline: "特定技能（自動車運送業）試験対策アプリ",
        description:
          "特定技能「自動車運送業」分野の試験対策アプリケーションです。運送・ドライバー業務に必要な基礎知識を、模擬試験形式で学習します。",
        features: [
          "自動車運送業分野に特化した学習コンテンツ",
          "模擬試験と復習機能（CMS更新予定）",
          "現場で使う専門用語の確認（CMS更新予定）",
          "スキマ時間で続けられるモバイル学習",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Transport",
        tagline: "Luyện thi Tokutei Gino ngành Vận tải tại Nhật Bản",
        description:
          "Ứng dụng luyện thi Tokutei Gino lĩnh vực vận tải (自動車運送業). Giúp người học nắm kiến thức nền tảng cho công việc tài xế / vận tải tại Nhật Bản.",
        features: [
          "Nội dung học chuyên biệt cho ngành vận tải",
          "Thi thử và ôn tập (cần cập nhật CMS)",
          "Thuật ngữ chuyên ngành thực tế (cần cập nhật CMS)",
          "Học trên điện thoại, phù hợp thời gian rảnh",
        ],
      },
      {
        locale: "en",
        name: "ViMai Transport",
        tagline: "Tokutei Gino transport exam preparation",
        description:
          "A Tokutei Gino application for Japan's automobile transport field. Learners prepare with mock exams covering the knowledge required for transport and driving work.",
        features: [
          "Study content focused on automobile transport",
          "Mock exams and review tools [CMS update]",
          "On-the-job terminology practice [CMS update]",
          "Mobile-first study for short sessions",
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
    website_url: null,
    featured: true,
    sort_order: 3,
    logo_url: "/images/products/sebishi_3kyu.png",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Seibi",
        tagline: "3級自動車整備士 試験対策",
        description:
          "3級自動車整備士試験の対策アプリケーションです。学科試験に必要な基礎知識を、問題演習を中心に効率よく学べます。",
        features: [
          "3級自動車整備士の学科対策",
          "分野別の問題演習（CMS更新予定）",
          "弱点の可視化（CMS更新予定）",
          "整備現場で使う知識の整理",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Seibi",
        tagline: "Luyện thi Sebishi 3kyu ngành Ô tô tại Nhật Bản",
        description:
          "Ứng dụng luyện thi chứng chỉ thợ sửa chữa ô tô cấp 3 (3級自動車整備士). Tập trung vào phần thi lý thuyết với ngân hàng câu hỏi luyện tập.",
        features: [
          "Luyện thi lý thuyết 3級自動車整備士",
          "Bài tập theo từng chuyên đề (cần cập nhật CMS)",
          "Nhìn rõ phần kiến thức còn yếu (cần cập nhật CMS)",
          "Hệ thống lại kiến thức dùng trong xưởng",
        ],
      },
      {
        locale: "en",
        name: "ViMai Seibi",
        tagline: "Class 3 automobile mechanic exam prep",
        description:
          "An exam-prep application for Japan's Class 3 Automobile Mechanic (3級自動車整備士) certification. Built around practice questions for the written exam.",
        features: [
          "Class 3 mechanic written-exam preparation",
          "Practice by topic [CMS update]",
          "Weak-area tracking [CMS update]",
          "Workshop-oriented knowledge review",
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
    website_url: null,
    featured: false,
    sort_order: 4,
    logo_url: "/images/products/vimai_kids.jpg",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "ViMai Kids",
        tagline: "子ども向けの学びアプリ",
        description:
          "算数ゲームなどを通じて、子どもが楽しく学べる教育アプリケーションです。保護者が学習時間や内容を管理できる仕組みを備えています。",
        features: [
          "算数などのインタラクティブな学習ゲーム",
          "保護者による管理機能",
          "年齢に合わせた学習（CMS更新予定）",
          "短時間でも続けやすい設計",
        ],
      },
      {
        locale: "vi",
        name: "ViMai Kids",
        tagline: "Ứng dụng giáo dục tương tác cho trẻ em",
        description:
          "Ứng dụng giáo dục tương tác dành cho trẻ em, với trò chơi toán học và cơ chế kiểm soát dành cho phụ huynh.",
        features: [
          "Trò chơi học tập tương tác, tập trung vào toán",
          "Công cụ kiểm soát dành cho phụ huynh",
          "Nội dung theo độ tuổi (cần cập nhật CMS)",
          "Thiết kế học ngắn, dễ duy trì mỗi ngày",
        ],
      },
      {
        locale: "en",
        name: "ViMai Kids",
        tagline: "Interactive learning for children",
        description:
          "An interactive educational application for children featuring math games and parent control mechanisms.",
        features: [
          "Interactive learning games with a math focus",
          "Parent control tools",
          "Age-appropriate content [CMS update]",
          "Short sessions designed for daily use",
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
    website_url: null,
    featured: false,
    sort_order: 5,
    logo_url: "/images/products/maimai.jpg",
    published: true,
    translations: [
      {
        locale: "ja",
        name: "Maimai",
        tagline: "健康・栄養・カロリー記録",
        description:
          "健康、栄養、カロリーを記録するアプリケーションです。日々の指標をカスタムして、自分に合ったペースで体調管理を続けられます。",
        features: [
          "カロリーと栄養の記録",
          "カスタム可能な日常トラッキング指標",
          "健康習慣の可視化（CMS更新予定）",
          "シンプルで続けやすい入力画面",
        ],
      },
      {
        locale: "vi",
        name: "Maimai",
        tagline: "Theo dõi sức khỏe, dinh dưỡng và calories",
        description:
          "Ứng dụng theo dõi sức khỏe, dinh dưỡng và calories với các chỉ số ghi nhận hằng ngày có thể tùy chỉnh.",
        features: [
          "Ghi nhận calories và dinh dưỡng",
          "Chỉ số theo dõi hằng ngày tùy chỉnh",
          "Nhìn rõ thói quen sức khỏe (cần cập nhật CMS)",
          "Giao diện nhập liệu đơn giản, dễ duy trì",
        ],
      },
      {
        locale: "en",
        name: "Maimai",
        tagline: "Health, nutrition, and calorie tracking",
        description:
          "A health, nutrition, and calorie-tracking application with custom daily tracking metrics.",
        features: [
          "Calorie and nutrition logging",
          "Custom daily tracking metrics",
          "Habit visibility [CMS update]",
          "Simple input designed for consistency",
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
];

export function localizeProduct(product: Product, locale: Locale) {
  const translation =
    product.translations.find((item) => item.locale === locale) ??
    product.translations.find((item) => item.locale === "ja") ??
    product.translations[0];

  return {
    ...product,
    name: translation?.name ?? product.slug,
    tagline: translation?.tagline ?? "",
    description: translation?.description ?? "",
    features: translation?.features ?? [],
  };
}
