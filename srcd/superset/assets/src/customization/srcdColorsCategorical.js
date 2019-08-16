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
      palette.royal,
      palette.royalDeep,
      palette.royalLight,
      palette.royalLightDeep,
      palette.lime,
      palette.blueDeep,
      palette.limeLight,
      palette.blueLightDeep,
      palette.coral,
      palette.coralDeep,
      palette.coralLight,
      palette.coralLightDeep,
    ],
  },
  {
    id: 'srcdAll',
    label: 'source{d} all colors + middle gradient',
    colors: [
      palette.royal,
      palette.royalMiddle,
      palette.royalDeep,
      palette.royalLight,
      palette.royalLightDeep,
      palette.lime,
      palette.limeMiddle,
      palette.blueDeep,
      palette.limeLight,
      palette.blueLightDeep,
      palette.coral,
      palette.coralMiddle,
      palette.coralDeep,
      palette.coralLight,
      palette.coralLightDeep,
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
      palette.royal,
      palette.lime,
      palette.coral,
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
      palette.royalDeep,
    ],
  },
].map(s => new CategoricalScheme(s));
