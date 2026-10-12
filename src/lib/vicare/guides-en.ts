import type { VicareGuide } from "./types.ts";

/** English guides for /en/products/vicare/<slug>. Same slugs as the Vietnamese ones. */
export const GUIDES_EN: VicareGuide[] = [
  {
    slug: "di-kham-benh-o-nhat",
    title: "How to see a doctor in Japan: a step-by-step guide for foreigners",
    seoTitle: "How to See a Doctor in Japan: What to Bring, Step by Step",
    description:
      "Seeing a doctor in Japan as a foreigner: clinic or hospital, what to bring, and each step from reception and the questionnaire to payment and the pharmacy.",
    summary: "Where to go, what to bring, and every step from reception to the pharmacy.",
    lead:
      "Your first clinic visit in Japan can be confusing: where to go, what to bring and what to say. This guide walks through a typical visit to a neighbourhood clinic (クリニック) so you can prepare.",
    sections: [
      {
        id: "where",
        heading: "Local clinic or big hospital?",
        paragraphs: [
          "For everyday problems such as a cold, fever, stomach ache or rash, start at a local clinic (クリニック, 診療所 or 医院). Clinics are usually organised by department: internal medicine (内科), paediatrics (小児科), ENT (耳鼻咽喉科), dermatology (皮膚科) and so on.",
          "Large hospitals (大学病院, 総合病院) are for serious illness or specialist tests. If you go to a large hospital without a referral letter (紹介状) from a clinic, you may have to pay an extra fee on top of the consultation. Start at a clinic; the doctor will refer you when needed.",
          "It helps to have a regular local doctor (かかりつけ医) who knows your history.",
        ],
      },
      {
        id: "bring",
        heading: "What to bring",
        bullets: [
          "Proof of health insurance: your My Number card registered as a health insurance card (マイナ保険証), or a valid 資格確認書 / insurance card. Without it you may have to pay the full cost first.",
          "Your residence card (在留カード).",
          "Your medicine notebook (お薬手帳) if you have one, or photos of the medicines you take.",
          "Cash: many small clinics accept cash only.",
          "A note of your symptoms: when they started, your temperature, any medicine you took.",
          "For children: the local child medical subsidy card (if any) and the maternal and child health handbook (母子手帳).",
        ],
      },
      {
        id: "steps",
        heading: "A visit, step by step",
        steps: [
          {
            title: "Reception (受付)",
            body: "Say 「初診です」 (shoshin desu – it is my first visit) and hand over your insurance. Many clinics require an appointment (予約制); call or check the clinic's website.",
          },
          {
            title: "Questionnaire (問診票)",
            body: "Fill in your symptoms, history, allergies, current medicines and whether you might be pregnant. If you cannot read it, ask: 「書き方を教えてください」 (kakikata o oshiete kudasai).",
          },
          {
            title: "Waiting and basic checks",
            body: "Staff may take your temperature or blood pressure. Go in when your name is called.",
          },
          {
            title: "Consultation (診察)",
            body: "The doctor asks questions, examines you and explains. Ask them to slow down or write things down. Before leaving, ask the diagnosis, whether to come back, and when to return immediately.",
          },
          {
            title: "Payment (会計)",
            body: "Pay your share (usually 30% with insurance). Keep the receipt (領収書) for your year-end tax deduction.",
          },
          {
            title: "Pharmacy (薬局)",
            body: "If you are prescribed medicine, take the prescription (処方箋) to a pharmacy. It is valid for 4 days including the day it was issued. The pharmacist explains the directions and gives you a medicine bag (薬袋).",
          },
        ],
      },
      {
        id: "hours",
        heading: "Opening hours and holidays",
        paragraphs: [
          "Many clinics close for lunch, on Sundays and public holidays, and on one afternoon a week. Check the consultation hours (診療時間) before you go. Out of hours, most areas run a night and holiday clinic (休日夜間急患センター); see your city's website.",
          "For an emergency such as difficulty breathing, severe chest pain or unconsciousness, do not wait: call 119.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I see a doctor without insurance?",
        answer:
          "Yes, but you pay the full cost. Foreign residents staying in Japan for more than 3 months are generally required to join public health insurance. If you forgot your insurance, some clinics let you pay first and refund you when you bring it later; ask at reception.",
      },
      {
        question: "Should I bring someone who speaks Japanese?",
        answer:
          "If you can, yes, especially for serious illness or when you must sign a consent form. If you go alone, prepare a note of your symptoms in Japanese and use a tool such as ViCare.",
      },
      {
        question: "How long is a prescription valid?",
        answer: "An outside prescription (処方箋) is valid for 4 days including the day of issue. After that you need a new one from the doctor.",
      },
    ],
    appHelp:
      "With ViCare you can find the right department from your symptoms, search for that department nearby on Google Maps, show your emergency info in Japanese at reception, use the interpreter in the consultation and read your medicine bag with the camera.",
    related: ["tim-phong-kham-o-nhat", "phien-dich-kham-benh-tieng-nhat", "bao-hiem-y-te-nhat"],
  },
  {
    slug: "phien-dich-kham-benh-tieng-nhat",
    title: "Medical interpreting in Japan: getting help and phrases for the doctor",
    seoTitle: "Medical Interpreter in Japan: Phrases to Use at the Doctor",
    description:
      "Not fluent in Japanese at the doctor? Ways to get a medical interpreter in Japan, Japanese phrases to describe symptoms, what doctors ask, and tips to avoid misunderstandings.",
    summary: "Ways to get language help, symptom phrases and what doctors ask.",
    lead:
      "Misunderstanding the doctor can mean taking medicine the wrong way or missing a follow-up. Here are the ways to get language help in Japan, the Japanese you will need and tips for clear communication.",
    sections: [
      {
        id: "help",
        heading: "Ways to get language help",
        bullets: [
          "Ask the hospital in advance whether it has medical interpreters (医療通訳) or phone/video interpreting. Some hospitals that accept foreign patients offer this.",
          "Bring a family member, friend or someone from your company or support organisation who speaks Japanese, especially for serious illness, childbirth or surgery.",
          "The AMDA International Medical Information Center (AMDA国際医療情報センター) gives phone advice in several languages on where to get care and how the system works. Check its official site for languages and hours.",
          "Prefectural and city international associations (国際交流協会) often offer multilingual consultation and may introduce interpreters.",
          "Use a tool such as ViCare for common phrases, and always confirm anything important with the doctor.",
        ],
      },
      {
        id: "symptoms",
        heading: "Japanese phrases for your symptoms",
        table: {
          head: ["Japanese", "Reading", "Meaning"],
          rows: [
            ["熱があります。", "ねつがあります。", "I have a fever."],
            ["頭が痛いです。", "あたまがいたいです。", "I have a headache."],
            ["お腹が痛いです。", "おなかがいたいです。", "I have a stomach ache."],
            ["咳が出ます。", "せきがでます。", "I have a cough."],
            ["吐き気がします。", "はきけがします。", "I feel sick (nauseous)."],
            ["3日前からです。", "みっかまえからです。", "It started 3 days ago."],
            ["薬のアレルギーがあります。", "くすりのアレルギーがあります。", "I am allergic to a medicine."],
            ["今、飲んでいる薬があります。", "いま、のんでいるくすりがあります。", "I am taking medicine now."],
            ["妊娠しています。", "にんしんしています。", "I am pregnant."],
          ],
        },
      },
      {
        id: "ask",
        heading: "Phrases to help you understand",
        table: {
          head: ["Japanese", "Reading", "Meaning"],
          rows: [
            ["日本語が少ししかわかりません。", "にほんごがすこししかわかりません。", "I only understand a little Japanese."],
            ["ゆっくり話してください。", "ゆっくりはなしてください。", "Please speak slowly."],
            ["紙に書いてください。", "かみにかいてください。", "Please write it down."],
            ["もう一度お願いします。", "もういちどおねがいします。", "Once more, please."],
            ["やさしい日本語でお願いします。", "やさしいにほんごでおねがいします。", "Please use easy Japanese."],
          ],
        },
      },
      {
        id: "doctor",
        heading: "What the doctor often asks",
        table: {
          head: ["Japanese", "Reading", "Meaning"],
          rows: [
            ["どうしましたか。", "どうしましたか。", "What seems to be the problem?"],
            ["いつからですか。", "いつからですか。", "Since when?"],
            ["どこが痛いですか。", "どこがいたいですか。", "Where does it hurt?"],
            ["熱は何度ですか。", "ねつはなんどですか。", "What is your temperature?"],
            ["アレルギーはありますか。", "アレルギーはありますか。", "Do you have any allergies?"],
            ["様子を見てください。", "ようすをみてください。", "Let's wait and see how it goes."],
          ],
        },
      },
      {
        id: "tips",
        heading: "Tips for clear communication",
        bullets: [
          "Write down your symptoms, when they started, your temperature and any medicine taken before you go.",
          "Always double-check numbers: tablets, times a day, number of days, the follow-up date.",
          "Before leaving, ask for the diagnosis, when to come back at once, and whether you need time off work or school.",
          "Do not nod if you do not understand. Saying 「わかりません」 (I don't understand) is fine.",
        ],
        note: "For surgery, childbirth or important consent forms, have a medical interpreter or a fluent Japanese speaker with you.",
      },
    ],
    faqs: [
      {
        question: "Can I use machine translation at the doctor?",
        answer:
          "For simple sentences, yes, but machine translation can get medical terms and numbers wrong. Confirm anything important with the doctor, for example by asking them to write it down.",
      },
      {
        question: "Is medical interpreting free?",
        answer: "It depends on the hospital and service: some are free, some charge. Ask when you book.",
      },
      {
        question: "Does ViCare translate any sentence?",
        answer:
          "No. ViCare matches what the doctor says against thousands of common clinic sentences. A sentence that is not in the phrase bank is clearly marked so you can ask the doctor to repeat it or write it down.",
      },
    ],
    appHelp:
      "ViCare's interpreter listens to the doctor through the microphone and shows the Vietnamese meaning from thousands of clinic sentences, flags numbers to check, and has buttons to ask the doctor to slow down or write it down. The doctor sees a consent request in Japanese first; the app never records audio.",
    related: ["di-kham-benh-o-nhat", "doc-tui-thuoc-nhat", "goi-119-o-nhat"],
  },
  {
    slug: "goi-119-o-nhat",
    title: "How to call 119 in Japan: ambulance and emergency numbers",
    seoTitle: "How to Call 119 in Japan: What to Say, #7119, #8000, 110",
    description:
      "Calling an ambulance in Japan: what to say on 119 in Japanese, when to call 119, when to use #7119, #8000 or 110, and what to prepare while you wait.",
    summary: "What to say on 119 and when to use #7119, #8000 and 110.",
    lead:
      "In an emergency, a few simple Japanese phrases and a written address help the ambulance reach you faster. Here are Japan's national emergency numbers and what to say.",
    sections: [
      {
        id: "numbers",
        heading: "Emergency numbers to remember",
        table: {
          head: ["Number", "Use it for", "Notes"],
          rows: [
            ["119", "Ambulance and fire", "Free, 24 hours, from mobile or landline."],
            ["110", "Police: traffic accidents, theft, threats", "Free, 24 hours."],
            ["#7119", "Unsure whether you need an ambulance or should go to hospital now", "Emergency advice line; not available in every prefecture. If it does not connect and it is urgent, call 119."],
            ["#8000", "A sick child in the evening or on holidays", "Prefectural child health phone advice; hours vary by area."],
          ],
        },
      },
      {
        id: "when",
        heading: "When to call 119 at once",
        bullets: [
          "Unconscious, not responding, or a seizure that does not stop.",
          "Difficulty breathing, or sudden severe chest or back pain.",
          "Sudden drooping face, weakness or numbness on one side, or slurred speech.",
          "A sudden, severe headache unlike any before.",
          "Heavy bleeding that will not stop, large burns, or a serious accident.",
          "A severe allergic reaction: facial swelling or difficulty breathing after food or medicine.",
        ],
        note: "If it looks dangerous, do not hesitate: call 119. The ambulance itself is free; hospital treatment is charged as usual.",
      },
      {
        id: "say",
        heading: "What to say on 119",
        steps: [
          {
            title: "The operator asks: 「火事ですか、救急ですか」",
            body: "(Kaji desu ka, kyūkyū desu ka? – Fire or ambulance?) Answer: 「救急です」 (kyūkyū desu – Ambulance).",
          },
          {
            title: "Address: 「住所は〇〇です」",
            body: "(Jūsho wa ... desu). Read your address in Japanese from a note. If you are outside, give the nearest building, shop or crossing.",
          },
          {
            title: "What happened",
            body: "For example: 「30歳の男性が倒れて、意識がありません」 (A 30-year-old man has collapsed and is unconscious).",
          },
          {
            title: "Your name and phone number",
            body: "Keep your phone free so they can call back. If you cannot speak Japanese, say 「ベトナム語」 (Vietnamese) or 「英語」 (English): many fire departments offer three-way phone interpreting.",
          },
        ],
      },
      {
        id: "keywords",
        heading: "Japanese keywords for an emergency call",
        paragraphs: [
          "If you cannot manage full sentences, say the key words clearly, then read out your address. Do not hang up until the operator tells you to.",
        ],
        table: {
          head: ["Japanese", "Reading", "Meaning"],
          rows: [
            ["救急車をお願いします", "きゅうきゅうしゃをおねがいします", "Please send an ambulance"],
            ["意識がありません", "いしきがありません", "They are unconscious"],
            ["息ができません", "いきができません", "Cannot breathe"],
            ["胸が痛いです", "むねがいたいです", "Chest pain"],
            ["血が止まりません", "ちがとまりません", "The bleeding will not stop"],
            ["子どもがけいれんしています", "こどもがけいれんしています", "A child is having a seizure"],
            ["日本語がわかりません", "にほんごがわかりません", "I don't understand Japanese"],
          ],
        },
      },
      {
        id: "prepare",
        heading: "While you wait for the ambulance",
        bullets: [
          "Insurance, residence card, medicine notebook (お薬手帳) or current medicines, money and shoes.",
          "Unlock the door and turn on the lights; if someone else is there, ask them to meet the ambulance outside.",
          "Note when it happened and what you did (medicine taken, first aid given).",
          "Keep your home address written in Japanese somewhere easy to see, such as on the fridge.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does calling 119 cost money?",
        answer: "The call and the public ambulance are free. Hospital consultation, tests and treatment are charged as usual under your insurance.",
      },
      {
        question: "Does #7119 work everywhere?",
        answer: "No. #7119 is only available in prefectures and cities that run it. Others may have a different advice line; in an emergency, call 119 directly.",
      },
      {
        question: "When should I call #8000?",
        answer:
          "When your child is unwell in the evening or on a holiday and you are unsure whether to go now or wait until morning. Hours are set by each prefecture. If the child has difficulty breathing, a seizure or is very drowsy, call 119.",
      },
    ],
    appHelp:
      "ViCare's Emergency screen shows what to say on 119 in Japanese with your saved address filled in, plus 110, #7119 and #8000. Your emergency info (allergies, conditions, contact) appears in Japanese to show paramedics.",
    related: ["di-kham-benh-o-nhat", "tim-phong-kham-o-nhat", "phien-dich-kham-benh-tieng-nhat"],
  },
  {
    slug: "doc-tui-thuoc-nhat",
    title: "How to read a Japanese medicine bag (薬袋): 食前, 食後, 食間, 頓服",
    seoTitle: "Reading a Japanese Medicine Bag: 食前, 食後, 食間, 頓服",
    description:
      "What the words on a Japanese medicine bag (薬袋) mean: 食前, 食後, 食間, 頓服, 1日3回, 1回1錠, 日分 and more, with readings, English meanings and safety tips.",
    summary: "What the words on the bag mean and how to take medicine safely.",
    lead:
      "Japanese medicine bags print the directions in Japanese, often in kanji. Misreading one word such as 食間 can mean taking a medicine at the wrong time. These are the most common terms.",
    sections: [
      {
        id: "timing",
        heading: "When to take it",
        table: {
          head: ["On the bag", "Reading", "Meaning"],
          rows: [
            ["食前", "しょくぜん", "Before a meal, usually about 30 minutes before"],
            ["食後", "しょくご", "After a meal, usually within about 30 minutes"],
            ["食間", "しょっかん", "Between meals (about 2 hours after eating), not during a meal"],
            ["食直前 / 食直後", "しょくちょくぜん / しょくちょくご", "Right before / right after a meal"],
            ["起床時", "きしょうじ", "On waking up"],
            ["就寝前", "しゅうしんまえ", "Before going to bed"],
            ["頓服", "とんぷく", "Only when needed (for pain, fever…), not at fixed times"],
            ["〇時間ごと", "〇じかんごと", "Every ○ hours"],
          ],
        },
      },
      {
        id: "dose",
        heading: "How often, how much, how many days",
        table: {
          head: ["On the bag", "Reading", "Meaning"],
          rows: [
            ["1日3回", "いちにちさんかい", "3 times a day"],
            ["毎食後", "まいしょくご", "After every meal (breakfast, lunch, dinner)"],
            ["朝・昼・夕", "あさ・ひる・ゆう", "Morning · noon · evening"],
            ["1回1錠", "いっかいいちじょう", "1 tablet each time"],
            ["錠 / カプセル / 包", "じょう / カプセル / ほう", "Tablet / capsule / sachet (powder)"],
            ["〇日分", "〇にちぶん", "Enough for ○ days"],
            ["飲み切ってください", "のみきってください", "Finish the whole course, even if you feel better"],
          ],
        },
      },
      {
        id: "types",
        heading: "Types of medicine",
        table: {
          head: ["On the bag", "Reading", "Meaning"],
          rows: [
            ["内服薬", "ないふくやく", "Oral medicine"],
            ["外用薬", "がいようやく", "External use (cream, patch, drops)"],
            ["塗り薬", "ぬりぐすり", "Ointment or cream"],
            ["貼り薬 / 湿布", "はりぐすり / しっぷ", "Patch / compress"],
            ["点眼薬 / 目薬", "てんがんやく / めぐすり", "Eye drops"],
            ["坐薬", "ざやく", "Suppository"],
          ],
        },
      },
      {
        id: "safety",
        heading: "Safety tips",
        bullets: [
          "Read the drug information sheet (薬剤情報提供書) the pharmacy gives you: it often shows a photo of each tablet and its main purpose.",
          "Bring your medicine notebook (お薬手帳) to every visit and pharmacy so they know what you take.",
          "Do not share medicine, and do not stop antibiotics before the course is finished.",
          "Missed a dose? Do not take a double dose; ask the pharmacist.",
          "Tell the doctor and pharmacist if you are pregnant, breastfeeding or taking other medicine, including medicine brought from abroad.",
        ],
        note: "If unsure, ask the pharmacist: 「飲み方をもう一度教えてください」 (Please explain how to take it once more).",
      },
    ],
    faqs: [
      {
        question: "Does 食間 mean during a meal?",
        answer: "No. 食間 means between meals, usually about 2 hours after eating, when the stomach is fairly empty.",
      },
      {
        question: "The bag says 1日3回 but not before or after meals. What now?",
        answer: "Do not guess. Ask the pharmacist which times to take it.",
      },
      {
        question: "How often can I take a 頓服 medicine?",
        answer:
          "Only when you have the symptom written on the bag (for example a fever above 38.5°C). The bag usually states the minimum gap between doses and the daily maximum; if not, ask the pharmacist.",
      },
    ],
    appHelp:
      "Photograph the bag and ViCare reads the Japanese on your phone and turns it into a morning–noon–evening–bedtime schedule. Uncertain parts stay as the original text with a prompt to ask the pharmacist. The app does not look up drug names or effects.",
    related: ["phien-dich-kham-benh-tieng-nhat", "di-kham-benh-o-nhat", "khai-giam-thue-chi-phi-y-te"],
  },
  {
    slug: "bao-hiem-y-te-nhat",
    title: "Japanese health insurance: the 30% co-pay, 高額療養費 and 労災",
    seoTitle: "Japan Health Insurance: 30% Co-pay, 高額療養費, 労災",
    description:
      "Health insurance in Japan for foreign residents: National Health Insurance or employee insurance, the 30% co-pay by age, the 高額療養費 monthly cap, 労災 and sick pay.",
    summary: "Who must join, the 30% co-pay, the monthly cap and work injuries.",
    lead:
      "With public health insurance you normally pay only part of your medical costs in Japan. This guide explains the types of insurance, your share, the monthly cost cap and what happens if you are hurt at work.",
    sections: [
      {
        id: "types",
        heading: "The two main types",
        bullets: [
          "Employee health insurance (健康保険, often called 社会保険): for full-time employees; the employer pays half the premium. You join through your company.",
          "National Health Insurance (国民健康保険): for students, the self-employed and others not covered at work. Join at your city or ward office.",
          "Foreign residents with a residence card staying more than 3 months are generally required to join one of them.",
        ],
      },
      {
        id: "copay",
        heading: "Your share (自己負担) by age",
        table: {
          head: ["Age", "You pay", "Notes"],
          rows: [
            ["Before elementary school", "20%", "Many municipalities add subsidies; some make children's care free."],
            ["From elementary school to 69", "30%", "The usual rate for workers and students."],
            ["70–74", "20%", "30% for those with working-level income."],
            ["75 and over", "10%", "20% or 30% depending on income."],
          ],
        },
        paragraphs: [
          "Example: if the total bill is ¥5,000, someone paying 30% pays ¥1,500 at the counter; insurance covers the rest.",
          "Not covered: general health check-ups, most voluntary vaccinations, cosmetic treatment and optional extras such as a private room.",
        ],
      },
      {
        id: "cap",
        heading: "The monthly cap: 高額療養費",
        paragraphs: [
          "If what you pay in one calendar month (the 1st to the last day) exceeds a ceiling, insurance refunds the excess. The ceiling depends on age and income.",
          "With a マイナ保険証 or a ceiling certificate (限度額適用認定証), you only pay up to the ceiling at the counter. If you paid more, claim the refund from your insurer (your company's health insurance society or the city office).",
        ],
        note: "Going into hospital or having surgery? Ask about 高額療養費 beforehand so you do not have to pay a large sum up front.",
      },
      {
        id: "rosai",
        heading: "Hurt at work: 労災",
        paragraphs: [
          "Injury or illness caused by work, or an accident on the way to or from work, is covered by workers' accident insurance (労災保険), not ordinary health insurance. Part-time and foreign workers are covered too.",
          "Tell your employer at once and tell the hospital it is 労災. At hospitals designated for 労災, workers usually pay nothing.",
        ],
      },
      {
        id: "sickpay",
        heading: "Off work through illness: 傷病手当金",
        paragraphs: [
          "Members of employee health insurance (健康保険) who cannot work because of illness or injury outside work may receive sick pay: from the 4th day off (after 3 consecutive days), about two-thirds of the standard daily wage, for up to 1 year and 6 months in total. National Health Insurance generally has no such benefit.",
        ],
      },
    ],
    faqs: [
      {
        question: "I am a student. How much do I pay?",
        answer: "Students join National Health Insurance and normally pay 30% of covered medical costs.",
      },
      {
        question: "I was hurt at work. Should I use my health insurance card?",
        answer: "No. Work injuries use 労災保険. If you used your health insurance by mistake, tell the hospital and your employer quickly so it can be switched to 労災.",
      },
      {
        question: "Is 高額療養費 calculated per year or per month?",
        answer: "Per calendar month, from the 1st to the last day. Over the whole year, medical costs may also reduce your income tax through 医療費控除.",
      },
    ],
    appHelp:
      "ViCare's Insurance & procedures section has more than 40 articles on insurance, costs and refunds, family, work and emergencies, each with steps, what to bring and official sources. The visit diary records your costs by month and year.",
    related: ["khai-giam-thue-chi-phi-y-te", "di-kham-benh-o-nhat", "tim-phong-kham-o-nhat"],
  },
  {
    slug: "tim-phong-kham-o-nhat",
    title: "Finding a clinic in Japan: which department, and English or Vietnamese support",
    seoTitle: "Find an English-Speaking Clinic in Japan; Which Department",
    description:
      "Which department to visit in Japan for your symptoms, how to find a clinic nearby on Google Maps, how to find English- or Vietnamese-speaking care, and phrases to book by phone.",
    summary: "A symptom–department table, where to search, and finding language support.",
    lead:
      "In Japan, patients usually choose the department and walk into a clinic themselves. Choosing the right one first saves time. This guide helps you pick a department and find a place to go.",
    sections: [
      {
        id: "department",
        heading: "Which department for which symptoms?",
        table: {
          head: ["Symptoms", "Department", "Reading"],
          rows: [
            ["Fever, cough, cold, stomach ache, diarrhoea (adults)", "内科", "naika"],
            ["A sick child", "小児科", "shōnika"],
            ["Ear pain, blocked nose, sinusitis, sore throat, dizziness", "耳鼻咽喉科 (耳鼻科)", "jibiinkōka (jibika)"],
            ["Red, itchy eyes, blurred vision", "眼科", "ganka"],
            ["Rash, hives, acne, minor burns", "皮膚科", "hifuka"],
            ["Back or joint pain, sprains, suspected fractures", "整形外科", "seikeigeka"],
            ["Periods, gynaecology, pregnancy", "産婦人科 / 婦人科", "sanfujinka / fujinka"],
            ["Toothache, bleeding gums", "歯科", "shika"],
            ["Painful urination, blood in urine", "泌尿器科", "hinyōkika"],
            ["Insomnia, anxiety, long-lasting low mood", "心療内科 / 精神科", "shinryōnaika / seishinka"],
            ["A wound that needs stitches", "外科", "geka"],
          ],
        },
        note: "For reference only. If unsure, go to internal medicine (内科) or phone the clinic. Danger signs: call 119.",
      },
      {
        id: "nearby",
        heading: "Finding a clinic near you",
        bullets: [
          "Google Maps: search the department in Japanese with 近く (nearby), for example 「内科 近く」 or 「小児科 近く」. Check hours, closed days and reviews.",
          "医療情報ネット (ナビイ), the Ministry of Health's nationwide search: filter by area, department, hours and supported languages.",
          "Your city's website: night and holiday clinics (休日夜間急患センター).",
          "Ask colleagues, your company, school or support organisation where they go.",
        ],
      },
      {
        id: "language",
        heading: "Finding English or Vietnamese support",
        paragraphs: [
          "Clinics with Vietnamese-speaking staff are rare; English support is easier to find, especially in big cities. These sources help:",
        ],
        bullets: [
          "医療情報ネット (ナビイ): search by the foreign languages facilities have registered.",
          "The Japan National Tourism Organization (JNTO) list of medical institutions that accept foreign patients.",
          "AMDA International Medical Information Center: phone advice in several languages on where to get care.",
          "Prefectural and city international associations (国際交流協会).",
        ],
        note: "Language information is self-reported by facilities and can change; phone to confirm before you go.",
      },
      {
        id: "booking",
        heading: "Phrases for booking by phone",
        table: {
          head: ["Japanese", "Reading", "Meaning"],
          rows: [
            ["診察の予約をしたいです。", "しんさつのよやくをしたいです。", "I would like to book an appointment."],
            ["初めてです。", "はじめてです。", "It is my first visit."],
            ["今日、診てもらえますか。", "きょう、みてもらえますか。", "Can I be seen today?"],
            ["予約なしで行ってもいいですか。", "よやくなしでいってもいいですか。", "May I come without an appointment?"],
            ["ベトナム語か英語は大丈夫ですか。", "ベトナムごかえいごはだいじょうぶですか。", "Is Vietnamese or English OK?"],
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Is there a list of Vietnamese-speaking clinics?",
        answer:
          "There is no complete official list. Use the language search of 医療情報ネット, ask AMDA or an international association, and phone to confirm first.",
      },
      {
        question: "Can I be seen without an appointment?",
        answer: "Many clinics accept walk-ins, but some are appointment-only (予約制). Check the website or call first.",
      },
      {
        question: "My child has a fever at night. Where do I go?",
        answer: "Call #8000 for advice, or go to your area's night clinic. If the child has difficulty breathing, a seizure or is very drowsy, call 119.",
      },
    ],
    appHelp:
      "In ViCare, “I feel sick” suggests a department from your symptoms. “Nearby clinics” lets you choose one of 14 departments and opens Google Maps near you, with the Japanese name on the signboard and phrases for calling.",
    related: ["di-kham-benh-o-nhat", "goi-119-o-nhat", "phien-dich-kham-benh-tieng-nhat"],
  },
  {
    slug: "khai-giam-thue-chi-phi-y-te",
    title: "Medical expense deduction (医療費控除) in Japan, explained",
    seoTitle: "Medical Expense Deduction in Japan (医療費控除) Explained",
    description:
      "Japan's medical expense deduction (医療費控除) for foreign residents: who can claim, how it is calculated, which costs count, what to prepare and how to file a tax return for a refund.",
    summary: "Who qualifies, the calculation, what counts and how to file.",
    lead:
      "If you and your family spend a lot on medical care in a year, you may reduce your income tax through 医療費控除. Employees whose company does the year-end adjustment (年末調整) still have to claim this themselves.",
    sections: [
      {
        id: "eligibility",
        heading: "Who can claim?",
        paragraphs: [
          "It is calculated per calendar year (1 January – 31 December). If the medical costs you paid for yourself and family members who share your household finances (生計を一にする) exceed ¥100,000, you can claim. If your total income is under ¥2 million, the threshold is 5% of your income instead.",
        ],
      },
      {
        id: "calculation",
        heading: "How it is calculated",
        paragraphs: [
          "Deduction = (total paid − amounts reimbursed by insurance, 高額療養費, etc.) − ¥100,000 (or 5% of income). The maximum is ¥2 million.",
          "Example: your household paid ¥250,000 in the year with no reimbursement: ¥250,000 − ¥100,000 = ¥150,000 is deducted from taxable income. The refund depends on your tax rate, and next year's resident tax also goes down.",
        ],
      },
      {
        id: "what-counts",
        heading: "What counts and what does not",
        table: {
          head: ["Counts", "Does not count"],
          rows: [
            ["Consultation, treatment, hospital stays", "General health check-ups (unless an illness is found and treated)"],
            ["Prescribed medicine from a pharmacy", "Supplements and vitamins for prevention"],
            ["Over-the-counter medicine used for treatment", "Cosmetic surgery"],
            ["Train and bus fares to get treatment", "Petrol and parking when you drive yourself"],
            ["Taxis when public transport is not possible", "Taxis when you could take a train or bus"],
            ["Ordinary dental treatment", "Orthodontics purely for appearance"],
          ],
        },
      },
      {
        id: "filing",
        heading: "Preparing and filing",
        steps: [
          {
            title: "Keep receipts all year",
            body: "Keep every clinic and pharmacy receipt (領収書) and note your fares to medical visits.",
          },
          {
            title: "Prepare the statement (医療費控除の明細書)",
            body: "List costs by patient and by provider. You do not attach the receipts, but you must keep them for 5 years in case the tax office asks.",
          },
          {
            title: "File a tax return (確定申告)",
            body: "The usual period is roughly mid-February to mid-March of the following year. A refund-only return can be filed from January and up to 5 years later. File via e-Tax, by post or at the tax office (税務署).",
          },
        ],
        note: "There is an alternative scheme for over-the-counter medicine (セルフメディケーション税制). You cannot use both in the same year; choose the better one.",
      },
    ],
    faqs: [
      {
        question: "My employer did the year-end adjustment. Do I still need to file?",
        answer: "Yes. The year-end adjustment (年末調整) does not include 医療費控除; you must file a tax return to claim it.",
      },
      {
        question: "Can I include my spouse's and children's costs?",
        answer: "Yes, if they share your household finances (生計を一にする). It usually pays for the higher earner to claim.",
      },
      {
        question: "I forgot to claim last year. Is it too late?",
        answer: "You can file a refund return (還付申告) within 5 years from 1 January of the year after the costs were paid.",
      },
    ],
    appHelp:
      "ViCare's visit diary records what you paid at the clinic and the pharmacy for each visit (photograph a receipt and the form opens with the date and amount), adds up yearly totals and lets you copy them as text or CSV for your 医療費控除 statement.",
    related: ["bao-hiem-y-te-nhat", "di-kham-benh-o-nhat", "doc-tui-thuoc-nhat"],
  },
];
