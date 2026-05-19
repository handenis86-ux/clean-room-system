import type { CategoryFacet } from './types';
import { facets as authoredFacets } from './facets';

export type { CategoryFacet } from './types';

export const allFacets: CategoryFacet[] = authoredFacets;

export function getFacetsForCategory(categorySlug: string): CategoryFacet[] {
  return allFacets.filter((f) => f.parentCategory === categorySlug);
}

export function getFacet(
  categorySlug: string,
  facetSlug: string
): CategoryFacet | null {
  return (
    allFacets.find(
      (f) => f.parentCategory === categorySlug && f.slug === facetSlug
    ) ?? null
  );
}
