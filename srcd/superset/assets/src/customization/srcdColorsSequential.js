
/* eslint-disable sort-keys */

import { SequentialScheme } from '@superset-ui/color';

import colors from './colors';

const palette = colors.palette;

export const defaultPalette = 'lime_white_royal';

// Sequential palettes use to be:
// - diverging palettes: having three different colors (or more, but keeping the
//   same hue in the colors being at the same side with respect to the midpoint).
//   On this palettes, the color in the center, represents the midpoint of the values.
// - not diverging palettes: having two colors (or more, but being a hue transition
//   between the first and the last).
export const scheme = [
  {
    id: 'lime_white_royal',
    label: 'lime/white/royal',
    isDiverging: true,
    colors: [palette.lime, 'white', palette.royal],
  },
  {
    id: 'royal_white',
    label: 'royal/white',
    isDiverging: false,
    colors: ['white', palette.royal],
  },
].map(s => new SequentialScheme(s));
