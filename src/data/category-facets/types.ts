import type { ProductFilters } from '../product-filters';

/**
 * A "facet" is a static sub-page of a category that pre-applies a filter
 * combination, for SEO long-tail. URL: /catalog/[category]/filter/[facet]
 *
 * Example: /catalog/perchatki-zashchitnye/filter/sterile renders only
 * sterile gloves with its own H1, meta and intro text targeting "стерильные
 * нитриловые перчатки cleanroom".
 */
export interface CategoryFacet {
  /** URL segment, e.g. 'sterile', 'gmp-ab', 'sporicide', 'brand-contec'. */
  slug: string;
  /** Parent category slug, e.g. 'perchatki-zashchitnye'. */
  parentCategory: string;
  /** H1 on the facet page. */
  h1: string;
  /** <title> for SEO. */
  metaTitle: string;
  /** <meta name="description"> for SEO, max ~160 chars. */
  metaDescription: string;
  /** 80-120 words rendered as intro paragraph after the hero. */
  intro: string;
  /** Filter to auto-apply when rendering products. */
  filter: Partial<{
    sterile: boolean;
    gmpClasses: ProductFilters['gmpClasses'];
    isoClasses: ProductFilters['isoClasses'];
    brand: string;
  }>;
  /** Optional 1-3 H2 sections rendered below the product grid. */
  sections?: Array<{
    heading: string;
    /** May contain HTML <p>, <ul>, <li>, <strong>, <a>. */
    body: string;
  }>;
  /** Optional FAQ items, rendered + emitted as FAQPage JSON-LD. */
  faq?: Array<{ q: string; a: string }>;
}
