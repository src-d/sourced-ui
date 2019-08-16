/* eslint-disable sort-keys */

const rgba = color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

// source{d} royal (#8719cb)
const mainColorSpecs = { r: 135, g: 25, b: 203, a: 1 };

const palette = {
  royal: rgba(mainColorSpecs),
  royalMiddle: '#651Ab1',
  royalDeep: '#400d9a',
  royalLight: '#e1c5f2',
  royalLightDeep: '#cfc2e6',

  lime: '#00b491',
  limeMiddle: '#0e949f',
  blueDeep: '#0174b0',
  limeLight: '#bfece3',
  blueLightDeep: '#bfdceb',

  coral: '#f89c30',
  coralMiddle: '#f37a4a',
  coralDeep: '#f15f5f',
  coralLight: '#fde6cb',
  coralLightDeep: '#fbd7d7',

  vanila: '#d024c6',
  vanilaLight: '#f3c8f1',

  navy: '#195dca',
  navyLight: '#48B9FE',

  sky: '#29bff2',
  skyLight: '#c9effc',

  gray: '#6d6e71',
  grayLight: '#c9c9c9',
};

const colors = {
  mainSpecs: mainColorSpecs,
  main: rgba(mainColorSpecs),
  palette,
};

export default colors;
