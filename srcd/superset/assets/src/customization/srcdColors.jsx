/* eslint-disable sort-keys */

import { CategoricalScheme } from '@superset-ui/color';

const royal = '#8719cb';
const royalMiddle = '#651Ab1';
const royalDeep = '#400d9a';
const royalLight  = '#e1c5f2';
const royalLightDeep = '#cfc2e6';
const lime = '#00b491';
const limeMiddle = '#0e949f';
const blueDeep = '#0174b0';
const limeLight  = '#bfece3';
const blueLightDeep = '#bfdceb';
const coral = '#f89c30';
const coralMiddle = '#f37a4a';
const coralDeep = '#f15f5f';
const coralLight  = '#fde6cb';
const coralLightDeep = '#fbd7d7';
const vanila = '#d024c6';
const vanilaLight  = '#f3c8f1';
const navy = '#195dca';
const navyLight  = '#48B9FE';
const sky = '#29bff2';
const skyLight  = '#c9effc';
const gray = '#6d6e71';
const grayLight  = '#c9c9c9';

const schemes = [
  {
    id: 'srcdMain',
    label: 'source{d} main colors',
    colors: [
      royal,
      royalDeep,
      royalLight,
      royalLightDeep,
      lime,
      blueDeep,
      limeLight,
      blueLightDeep,
      coral,
      coralDeep,
      coralLight,
      coralLightDeep,
    ],
  },
  {
    id: 'srcdAll',
    label: 'source{d} all colors + middle gradient',
    colors: [
      royal,
      royalMiddle,
      royalDeep,
      royalLight,
      royalLightDeep,
      lime,
      limeMiddle,
      blueDeep,
      limeLight,
      blueLightDeep,
      coral,
      coralMiddle,
      coralDeep,
      coralLight,
      coralLightDeep,
      vanila,
      vanilaLight,
      navy,
      navyLight,
      sky,
      skyLight,
      gray,
      grayLight,
    ],
  },
  {
    id: 'srcdOpaques',
    label: 'source{d} opaque colors',
    colors: [
      royal,
      lime,
      coral,
      vanila,
      navy,
      sky,
    ],
  },
  {
    id: 'srcdRoyal',
    label: 'source{d} royal duo',
    colors: [
      royal,
      royalDeep,
    ],
  },
].map(s => new CategoricalScheme(s));

export default schemes;
