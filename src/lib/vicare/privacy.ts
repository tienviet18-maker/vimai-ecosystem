import type { VicareLocale, VicarePrivacyCopy } from "./types.ts";

/**
 * ViCare privacy policy (/products/vicare/privacy), the URL given to App Store
 * Connect and Google Play. Matches the app as built: no account, no server,
 * no analytics or ads SDK, data in shared_preferences on the phone, OCR with
 * on-device ML Kit, speech through the OS recogniser (on-device first; the OS
 * may fall back to Apple's or Google's service), no location permission.
 */
export const VICARE_PRIVACY: Record<VicareLocale, VicarePrivacyCopy> = {
  vi: {
    title: "Chính sách quyền riêng tư của ViCare",
    seoTitle: "Chính sách quyền riêng tư – ViCare",
    description:
      "ViCare không thu thập dữ liệu cá nhân: không tài khoản, không máy chủ, không quảng cáo hay thống kê. Dữ liệu sức khoẻ chỉ lưu trên điện thoại; camera và micro xử lý trên máy.",
    updated: "Có hiệu lực từ ngày 12 tháng 10 năm 2026.",
    intro:
      "Chính sách này áp dụng cho ứng dụng ViCare trên iOS và Android và bản web của ViCare (gọi chung là “ViCare”), do dự án phần mềm độc lập ViMai phát triển. Tóm tắt: ViCare không thu thập dữ liệu cá nhân của bạn. Mọi thứ bạn nhập chỉ nằm trên thiết bị của bạn.",
    sections: [
      {
        id: "collect",
        heading: "1. Dữ liệu chúng tôi thu thập",
        paragraphs: [
          "Không có. ViCare không có tài khoản, không có máy chủ lưu dữ liệu người dùng và không gửi dữ liệu bạn nhập cho ViMai hay bên thứ ba.",
          "ViCare không dùng công cụ quảng cáo, công cụ thống kê (analytics), công cụ báo lỗi hay theo dõi người dùng, và không theo dõi bạn qua các ứng dụng hoặc trang web khác.",
        ],
      },
      {
        id: "device",
        heading: "2. Dữ liệu lưu trên thiết bị của bạn",
        paragraphs: [
          "Những gì bạn nhập được lưu trong bộ nhớ riêng của ứng dụng trên điện thoại (trên web: trong bộ nhớ của trình duyệt): thông tin khẩn cấp (họ tên, ngày sinh, nhóm máu, dị ứng, bệnh nền, địa chỉ, phòng khám quen, người liên hệ), nhật ký khám và chi phí, thuốc đang uống, câu và từ đã đánh dấu, lịch sử tìm kiếm và cài đặt.",
          "ViMai không đọc được các dữ liệu này. ViCare không tự sao lưu lên máy chủ. Bản sao lưu của hệ điều hành (iCloud hoặc Google) có thể chứa dữ liệu ứng dụng tuỳ theo cài đặt sao lưu của chính bạn; việc này do Apple hoặc Google xử lý theo chính sách của họ.",
          "Khi bạn dùng “Sao chép bản sao lưu” hoặc “Sao chép nhật ký”, nội dung được đưa vào bộ nhớ tạm (clipboard) để bạn tự dán vào nơi bạn chọn.",
        ],
      },
      {
        id: "camera",
        heading: "3. Camera và ảnh",
        paragraphs: [
          "ViCare chỉ dùng camera hoặc ảnh bạn chọn khi bạn dùng chức năng đọc giấy tờ và túi thuốc. Chữ tiếng Nhật được nhận dạng ngay trên điện thoại bằng bộ đọc chữ chạy trên máy. Ảnh không được tải lên và ViCare không lưu ảnh; chỉ phần chữ bạn chọn lưu (ví dụ cách dùng thuốc, số tiền trên hoá đơn) được ghi vào dữ liệu trên máy.",
        ],
      },
      {
        id: "microphone",
        heading: "4. Micro và nhận dạng giọng nói",
        paragraphs: [
          "ViCare chỉ dùng micro khi bạn bấm nói trong chức năng phiên dịch. Giọng nói được chuyển thành chữ bằng bộ nhận dạng giọng nói của hệ điều hành, ưu tiên chạy ngay trên máy. Nếu điện thoại chưa có gói ngôn ngữ để nhận dạng trên máy (ví dụ tiếng Việt trên một số iPhone), hệ điều hành có thể gửi âm thanh tới dịch vụ nhận dạng của Apple (iOS) hoặc Google (Android) để chuyển thành chữ, theo chính sách quyền riêng tư của Apple hoặc Google.",
          "ViCare không ghi âm và không lưu âm thanh. Chữ nhận dạng được chỉ được lưu khi bạn chọn “Lưu vào nhật ký”.",
        ],
      },
      {
        id: "location",
        heading: "5. Vị trí, cuộc gọi và liên kết ngoài",
        paragraphs: [
          "ViCare không xin quyền truy cập vị trí. Khi bạn tìm phòng khám, ViCare mở Google Maps với từ khoá tìm kiếm (ví dụ tên khoa); Google Maps có thể dùng vị trí của bạn theo cài đặt và chính sách của Google.",
          "Nút gọi điện mở ứng dụng Điện thoại với số đã điền sẵn; ViCare không thực hiện cuộc gọi thay bạn và không ghi lại cuộc gọi.",
          "Liên kết tới trang chính thức (cơ quan nhà nước, tổ chức y tế) và trang ViMai mở trong trình duyệt. Liên kết tới trang ViMai chỉ gắn nhãn utm (tên ứng dụng, tên nút) để đếm tổng lượt bấm, không kèm thông tin cá nhân.",
        ],
      },
      {
        id: "notifications",
        heading: "6. Thông báo",
        paragraphs: [
          "Nếu ViCare hiện nhắc nhở (ví dụ lịch tái khám), nhắc nhở được tạo ngay trên điện thoại, không qua máy chủ.",
        ],
      },
      {
        id: "delete",
        heading: "7. Xoá dữ liệu",
        bullets: [
          "Trong app: Cài đặt › Xoá toàn bộ dữ liệu. Việc này không thể hoàn tác nếu bạn chưa tự sao lưu.",
          "Gỡ cài đặt ViCare cũng xoá dữ liệu của app khỏi điện thoại.",
          "Bản web: xoá dữ liệu trang web của ViCare trong cài đặt trình duyệt.",
        ],
      },
      {
        id: "children",
        heading: "8. Trẻ em",
        paragraphs: [
          "ViCare không thu thập dữ liệu của bất kỳ ai, kể cả trẻ em. Khi ghi thông tin sức khoẻ của con, cha mẹ nên tự quản lý thiết bị và dữ liệu đó.",
        ],
      },
      {
        id: "medical",
        heading: "9. Lưu ý y tế",
        paragraphs: [
          "ViCare là thông tin tham khảo và công cụ hỗ trợ giao tiếp, không phải chẩn đoán hay lời khuyên điều trị. Nội dung y khoa do ViCare biên soạn để tham khảo, chưa được bác sĩ duyệt và có thể còn sai. Khi nguy cấp, gọi 119.",
        ],
      },
      {
        id: "changes",
        heading: "10. Thay đổi chính sách",
        paragraphs: [
          "Nếu ViCare thay đổi cách xử lý dữ liệu (ví dụ thêm chức năng cần gửi dữ liệu), chúng tôi sẽ cập nhật trang này trước và ghi rõ ngày hiệu lực.",
        ],
      },
    ],
    contactLead: "Câu hỏi về quyền riêng tư của ViCare, xin gửi tới",
  },

  en: {
    title: "ViCare privacy policy",
    seoTitle: "ViCare Privacy Policy",
    description:
      "ViCare collects no personal data: no account, no server, no ads or analytics. Health records stay on your phone; the camera and microphone are processed on the device.",
    updated: "Effective 12 October 2026.",
    intro:
      "This policy covers the ViCare app for iOS and Android and the ViCare web version (together, “ViCare”), developed by the independent software project ViMai. In short: ViCare does not collect your personal data. Everything you enter stays on your device.",
    sections: [
      {
        id: "collect",
        heading: "1. Data we collect",
        paragraphs: [
          "None. ViCare has no accounts, no server that stores user data, and does not send what you enter to ViMai or to any third party.",
          "ViCare contains no advertising, analytics, crash-reporting or tracking tools, and does not track you across other apps or websites.",
        ],
      },
      {
        id: "device",
        heading: "2. Data stored on your device",
        paragraphs: [
          "What you enter is stored in the app's private storage on your phone (on the web: in your browser's storage): emergency info (name, date of birth, blood type, allergies, conditions, address, regular clinic, emergency contact), your visit diary and costs, current medicines, starred phrases and words, recent searches and settings.",
          "ViMai cannot read this data. ViCare makes no server backup. Your operating system's backup (iCloud or Google) may include app data depending on your own backup settings; that is handled by Apple or Google under their policies.",
          "When you use “Copy backup” or “Copy your visit diary”, the content is placed on the clipboard for you to paste wherever you choose.",
        ],
      },
      {
        id: "camera",
        heading: "3. Camera and photos",
        paragraphs: [
          "ViCare uses the camera, or a photo you pick, only when you use the document and medicine-bag reader. Japanese text is recognised on the phone by an on-device text reader. Photos are not uploaded and ViCare does not keep them; only the text you choose to save (such as dosing directions or the amount on a receipt) is stored on the device.",
        ],
      },
      {
        id: "microphone",
        heading: "4. Microphone and speech recognition",
        paragraphs: [
          "ViCare uses the microphone only when you tap to speak in the interpreter. Speech is turned into text by the operating system's speech recogniser, on the device whenever possible. If the phone has no on-device language pack (for example Vietnamese on some iPhones), the operating system may send the audio to Apple's (iOS) or Google's (Android) recognition service, under Apple's or Google's privacy policy.",
          "ViCare never records or stores audio. Recognised text is saved only if you choose “Save to diary”.",
        ],
      },
      {
        id: "location",
        heading: "5. Location, calls and external links",
        paragraphs: [
          "ViCare does not request location access. When you look for a clinic, ViCare opens Google Maps with a search term (such as a department name); Google Maps may use your location under Google's settings and policy.",
          "Call buttons open your Phone app with the number filled in; ViCare does not place or record calls.",
          "Links to official sites (government offices, medical organisations) and to ViMai open in your browser. Links to ViMai carry only utm tags (app and button name) for total click counts, never personal data.",
        ],
      },
      {
        id: "notifications",
        heading: "6. Notifications",
        paragraphs: ["If ViCare shows reminders (for example a follow-up visit), they are created on the phone, not through a server."],
      },
      {
        id: "delete",
        heading: "7. Deleting your data",
        bullets: [
          "In the app: Settings › Delete all data. This cannot be undone unless you made your own backup.",
          "Uninstalling ViCare also removes its data from the phone.",
          "Web version: clear the ViCare site data in your browser settings.",
        ],
      },
      {
        id: "children",
        heading: "8. Children",
        paragraphs: [
          "ViCare collects no data from anyone, including children. Parents recording a child's health information should manage that device and data themselves.",
        ],
      },
      {
        id: "medical",
        heading: "9. Medical disclaimer",
        paragraphs: [
          "ViCare is reference information and a communication aid, not a diagnosis or treatment advice. Medical content is written by ViCare for reference, has not been reviewed by a doctor, and may contain errors. In an emergency, call 119.",
        ],
      },
      {
        id: "changes",
        heading: "10. Changes",
        paragraphs: [
          "If ViCare ever changes how it handles data (for example a feature that needs to send data), we will update this page first and state the effective date.",
        ],
      },
    ],
    contactLead: "For questions about ViCare and privacy, contact",
  },

  ja: {
    title: "ViCare プライバシーポリシー",
    seoTitle: "ViCare プライバシーポリシー",
    description:
      "ViCareは個人データを収集しません。アカウント、サーバー、広告、解析ツールはなく、健康の記録は端末内だけに保存されます。カメラとマイクは端末内で処理します。",
    updated: "2026年10月12日施行。",
    intro:
      "本ポリシーは、独立したソフトウェアプロジェクトViMaiが開発するiOS・Android向けアプリViCareおよびViCareのWeb版（以下「ViCare」）に適用されます。要約：ViCareは利用者の個人データを収集しません。入力した内容はすべて利用者の端末の中にとどまります。",
    sections: [
      {
        id: "collect",
        heading: "1. 収集するデータ",
        paragraphs: [
          "ありません。ViCareにはアカウントも、利用者のデータを保存するサーバーもなく、入力された内容をViMaiや第三者に送信しません。",
          "広告、解析（アナリティクス）、クラッシュレポート、トラッキングのツールは組み込んでおらず、他社のアプリやウェブサイトをまたいだ追跡も行いません。",
        ],
      },
      {
        id: "device",
        heading: "2. 端末に保存されるデータ",
        paragraphs: [
          "入力した内容は、スマートフォン上のアプリ専用の領域（Web版ではブラウザのストレージ）に保存されます：緊急医療情報（氏名、生年月日、血液型、アレルギー、持病、住所、かかりつけ医、緊急連絡先）、受診記録と費用、服用中の薬、お気に入りのフレーズと用語、検索履歴、設定。",
          "ViMaiはこれらのデータを読むことができません。ViCareはサーバーへのバックアップを行いません。OSのバックアップ（iCloudまたはGoogle）には、利用者自身のバックアップ設定によりアプリのデータが含まれることがあり、AppleまたはGoogleがそれぞれのポリシーに基づいて取り扱います。",
          "「バックアップをコピー」「受診記録をコピー」を使うと、内容がクリップボードにコピーされ、利用者が選んだ場所に貼り付けられます。",
        ],
      },
      {
        id: "camera",
        heading: "3. カメラと写真",
        paragraphs: [
          "カメラまたは選択した写真は、書類・薬袋の読み取り機能を使うときだけ利用します。日本語の文字は端末内で動作する文字認識で読み取ります。画像はアップロードせず、ViCareは画像を保存しません。利用者が保存を選んだ文字（薬の飲み方、領収書の金額など）だけが端末内に記録されます。",
        ],
      },
      {
        id: "microphone",
        heading: "4. マイクと音声認識",
        paragraphs: [
          "マイクは、通訳機能で話すボタンを押したときだけ利用します。音声はOSの音声認識で文字に変換し、可能な限り端末内で処理します。端末に音声認識用の言語データがない場合（一部のiPhoneでのベトナム語など）、OSが音声をApple（iOS）またはGoogle（Android）の認識サービスに送信して文字に変換することがあり、その場合はApple・Googleのプライバシーポリシーが適用されます。",
          "ViCareは録音せず、音声を保存しません。認識した文字は「記録に保存」を選んだ場合にだけ保存されます。",
        ],
      },
      {
        id: "location",
        heading: "5. 位置情報、電話、外部リンク",
        paragraphs: [
          "ViCareは位置情報へのアクセスを求めません。医療機関を探すときは、検索語（診療科名など）を指定してGoogleマップを開きます。Googleマップは、Googleの設定とポリシーに基づいて位置情報を使うことがあります。",
          "電話ボタンは番号を入力した状態で電話アプリを開きます。ViCareが発信したり通話を記録したりすることはありません。",
          "公的機関や医療関係団体の公式サイト、ViMaiのページへのリンクはブラウザで開きます。ViMaiへのリンクには集計用のutm（アプリ名・ボタン名）だけを付け、個人情報は含みません。",
        ],
      },
      {
        id: "notifications",
        heading: "6. 通知",
        paragraphs: ["ViCareがリマインダー（次回の受診予定など）を表示する場合、端末内で作成され、サーバーを経由しません。"],
      },
      {
        id: "delete",
        heading: "7. データの削除",
        bullets: [
          "アプリ内：設定 › すべてのデータを削除。自分でバックアップしていない場合、元に戻せません。",
          "ViCareをアンインストールすると、アプリのデータも端末から削除されます。",
          "Web版：ブラウザの設定でViCareのサイトデータを削除します。",
        ],
      },
      {
        id: "children",
        heading: "8. 子ども",
        paragraphs: ["ViCareは子どもを含め、誰のデータも収集しません。子どもの健康情報を記録する場合は、保護者が端末とデータを管理してください。"],
      },
      {
        id: "medical",
        heading: "9. 医療に関する注意",
        paragraphs: [
          "ViCareは参考情報とコミュニケーションの支援を目的としたもので、診断や治療の助言ではありません。医療情報はViCareが参考用に作成したもので、医師の確認は受けておらず、誤りを含む可能性があります。緊急時は119番へ。",
        ],
      },
      {
        id: "changes",
        heading: "10. 変更",
        paragraphs: ["データの取り扱いを変更する場合（データの送信が必要な機能を追加する場合など）は、事前にこのページを更新し、施行日を明記します。"],
      },
    ],
    contactLead: "ViCareのプライバシーに関するお問い合わせ：",
  },
};
