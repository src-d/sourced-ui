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
      palette.royal,
      palette.royalLightDeep,
      palette.royalLight,
      palette.coralDeep,
      palette.coral,
      palette.coralLightDeep,
      palette.coralLight,
      palette.limeDeep,
      palette.lime,
      palette.limeLightDeep,
      palette.limeLight,
    ],
  },
  {
    id: 'srcdAll',
    label: 'source{d} all colors + middle gradient',
    colors: [
      palette.royalDeep,
      palette.royalMiddle,
      palette.royal,
      palette.royalLightDeep,
      palette.royalLight,
      palette.coralDeep,
      palette.coralMiddle,
      palette.coral,
      palette.coralLightDeep,
      palette.coralLight,
      palette.limeDeep,
      palette.limeMiddle,
      palette.lime,
      palette.limeLightDeep,
      palette.limeLight,
      palette.vanila,
      palette.vanilaLight,
      palette.navy,
      palette.navyLight,
      palette.sky,
      palette.skyLight,
      palette.gray,
      palette.grayLight,
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
      palette.sky,
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
