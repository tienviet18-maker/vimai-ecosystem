/**
 * Content types for the ViCare pages. Pure TypeScript, no `@/` imports, so
 * tests can load the content files directly with Node.
 */

export type VicareLocale = "vi" | "en" | "ja";

export type QA = { question: string; answer: string };

/** One block of a guide or of the product page. Every field is optional except the heading. */
export type ContentSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Numbered steps, rendered as an ordered list. */
  steps?: Array<{ title: string; body: string }>;
  /** A simple table (first column is the row header). */
  table?: { head: string[]; rows: string[][] };
  /** Short highlighted note under the section (warning or tip). */
  note?: string;
};

export type VicareGuide = {
  slug: string;
  /** H1 on the page. */
  title: string;
  /** <title> (the layout appends " | ViMai"). Keep under ~60 characters. */
  seoTitle: string;
  /** Meta description, 110–160 characters. */
  description: string;
  /** Short line for cards and the guide list. */
  summary: string;
  lead: string;
  sections: ContentSection[];
  faqs: QA[];
  /** How ViCare helps with this topic (shown in the call-to-action box). */
  appHelp: string;
  /** Slugs of related guides. */
  related: string[];
};

export type VicareFeature = {
  key:
    | "interpreter"
    | "scanner"
    | "sick"
    | "clinics"
    | "emergency"
    | "health"
    | "phrasebook"
    | "diseases"
    | "procedures"
    | "dictionary"
    | "search";
  title: string;
  body: string;
};

export type VicarePageCopy = {
  seoTitle: string;
  description: string;
  name: string;
  tagline: string;
  lead: string;
  badges: string[];
  webCta: string;
  webNote: string;
  storeTitle: string;
  appStoreSoon: string;
  googlePlaySoon: string;
  storeNote: string;
  guidesCta: string;
  signatureEyebrow: string;
  signatureTitle: string;
  signature: VicareFeature[];
  featuresTitle: string;
  featuresLead: string;
  features: VicareFeature[];
  flowTitle: string;
  flowLead: string;
  flow: Array<{ title: string; body: string }>;
  webAppTitle: string;
  webAppLead: string;
  webAppHead: [string, string, string];
  webAppRows: Array<[string, string, string]>;
  webAppNote: string;
  privacyTitle: string;
  privacyPoints: string[];
  privacyLink: string;
  guidesTitle: string;
  guidesLead: string;
  faqTitle: string;
  faqs: QA[];
  disclaimerTitle: string;
  disclaimer: string;
  ecosystemTitle: string;
  ecosystemLead: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbProducts: string;
  guideCtaTitle: string;
  guideCtaButton: string;
  relatedTitle: string;
  tocTitle: string;
  guideFaqTitle: string;
  guideDisclaimer: string;
  updatedLabel: string;
};

export type VicarePrivacyCopy = {
  title: string;
  seoTitle: string;
  description: string;
  updated: string;
  intro: string;
  sections: ContentSection[];
  contactLead: string;
};
