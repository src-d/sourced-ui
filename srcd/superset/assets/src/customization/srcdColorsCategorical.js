/* eslint-disable sort-keys */

import { CategoricalScheme } from '@superset-ui/color';

import colors from './colors';

const palette = colors.palette;

export const defaultPalette = 'srcdMain';

export const scheme = [
  {
    id: 'srcdMain',
    label: 'source{d} main colors',
    colors: [
      palette.royalDeep,
      palette.coralDeep,
      palette.limeDeep,
      palette.royal,
      palette.coral,
      palette.lime,
      palette.royalLightDeep,
      palette.coralLightDeep,
      palette.limeLightDeep,
      palette.royalLight,
      palette.coralLight,
      palette.limeLight,
    ],
  },
  {
    id: 'srcdAll',
    label: 'source{d} all colors + middle gradient',
    colors: [
      palette.royalDeep,
      palette.coralDeep,
      palette.limeDeep,
      palette.vanila,
      palette.navy,
      palette.gray,
      palette.royalMiddle,
      palette.coralMiddle,
      palette.limeMiddle,
      palette.vanilaLight,
      palette.navyLight,
      palette.grayLight,
      palette.royal,
      palette.coral,
      palette.lime,
      palette.royalLightDeep,
      palette.coralLightDeep,
      palette.limeLightDeep,
      palette.royalLight,
      palette.coralLight,
      palette.limeLight,
    ],
  },
  {
    id: 'srcdSix',
    label: 'source{d} six colors',
    colors: [
      palette.royalDeep,
      palette.coralMiddle,
      palette.lime,
      palette.vanila,
      palette.navy,
      palette.gray,
    ],
  },
  {
    id: 'srcdDuo',
    label: 'source{d} two colors',
    colors: [
      palette.royalMiddle,
      palette.royalLight,
    ],
  },
].map(s => new CategoricalScheme(s));
