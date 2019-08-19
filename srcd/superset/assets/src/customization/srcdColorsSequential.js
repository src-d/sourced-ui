/* eslint-disable sort-keys */

import { SequentialScheme } from '@superset-ui/color';

export const defaultPalette = 'blue_white_yellow';

// Sequential palettes use to be:
// - diverging palettes: having three different colors (or more, but keeping the
//   same hue in the colors being at the same side with respect to the midpoint).
//   On this palettes, the color in the center, represents the midpoint of the values.
// - not diverging palettes: having two colors (or more, but being a hue transition
//   between the first and the last).
export const scheme = [
  /* Example
  {
    id: 'blue_white_yellow',
    label: 'blue/white/yellow',
    isDiverging: true,
    colors: ['blue', 'white', 'yellow'],
  },
  {
    id: 'kazan_white',
    label: 'kazan/white',
    isDiverging: false,
    colors: ['white', palette.kazan],
  },
  */
].map(s => new SequentialScheme(s));
