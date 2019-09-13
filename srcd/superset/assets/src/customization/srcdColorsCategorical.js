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
      palette.royalLight,
      palette.royalLightDeep,
      palette.coralDeep,
      palette.coral,
      palette.coralLight,
      palette.coralLightDeep,
      palette.blueDeep,
      palette.lime,
      palette.limeLight,
      palette.blueLightDeep,
    ],
  },
  {
    id: 'srcdAll',
    label: 'source{d} all colors + middle gradient',
    colors: [
      palette.royalDeep,
      palette.royal,
      palette.royalMiddle,
      palette.royalLight,
      palette.royalLightDeep,
      palette.coralDeep,
      palette.coral,
      palette.coralMiddle,
      palette.coralLight,
      palette.coralLightDeep,
      palette.blueDeep,
      palette.lime,
      palette.limeMiddle,
      palette.limeLight,
      palette.blueLightDeep,
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
      palette.royal,
      palette.royalLightDeep,
    ],
  },
].map(s => new CategoricalScheme(s));
