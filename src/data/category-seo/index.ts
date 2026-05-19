import type { CategorySeoContent, CategorySeoMap } from './types';
import { consumables } from './consumables';
import { disinfectants } from './disinfectants';
import { ppeAccessories } from './ppe-accessories';
import { tinmanPart1 } from './tinman-1';
import { tinmanPart2 } from './tinman-2';

export type { CategorySeoContent, CategorySeoMap } from './types';

const all: CategorySeoMap = {
  ...consumables,
  ...disinfectants,
  ...ppeAccessories,
  ...tinmanPart1,
  ...tinmanPart2,
};

export function getCategorySeoContent(
  slug: string
): CategorySeoContent | null {
  return all[slug] ?? null;
}
