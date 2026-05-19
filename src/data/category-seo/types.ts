export interface CategorySeoSection {
  heading: string;
  /** May contain HTML: <p>, <ul>, <li>, <strong>, <a href>. */
  body: string;
}

export interface CategorySeoFaq {
  q: string;
  /** Plain text (HTML rendered as text in JSON-LD). */
  a: string;
}

export interface CategorySeoLink {
  label: string;
  href: string;
}

export interface CategorySeoContent {
  /** 80-120 words, rendered as first paragraph after hero. */
  intro: string;
  /** 3-5 H2 sections, 100-200 words each. */
  sections: CategorySeoSection[];
  /** 3-5 Q/A items, rendered as accordion + FAQPage JSON-LD. */
  faq: CategorySeoFaq[];
  /** 5-8 internal links, rendered as a 2-column list. */
  internalLinks: CategorySeoLink[];
}

export type CategorySeoMap = Record<string, CategorySeoContent>;
