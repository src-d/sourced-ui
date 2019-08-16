/* eslint-disable sort-keys */

import { CategoricalScheme } from '@superset-ui/color';

export const defaultPalette = 'bnbColors';

export const scheme = [
  /* Example
  {
    id: 'bnbColors',
    label: 'main colors',
    colors: [
      palette.rausch,
      palette.hackb,
      palette.kazan,
    ],
  },
  {
    id: 'bnbDuo',
    label: 'two colors palette',
    colors: [
      palette.rausch,
      palette.hackb,
    ],
  },
  */
].map(s => new CategoricalScheme(s));
