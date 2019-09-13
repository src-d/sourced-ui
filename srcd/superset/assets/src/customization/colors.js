/* eslint-disable sort-keys */

const rgba = color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

// source{d} royal (#8719cb)
const mainColorSpecs = { r: 135, g: 25, b: 203, a: 1 };

const palette = {
  royalDeep: '#591085',
  royal: '#7015a8',
  royalMiddle: rgba(mainColorSpecs),
  royalLight: '#a438e7',
  royalLightDeep: '#bc6ded',

  coralDeep: '#d66600',
  coral: '#e5770a',
  coralMiddle: '#f68b0c',
  coralLight: '#f89c30',
  coralLightDeep: '#f9ae56',

  blueDeep: '#006853',
  lime: '#008168',
  limeMiddle: '#009b7c',
  limeLight: '#00b491',
  blueLightDeep: '#00c8a1',

  vanila: '#d024c6',
  vanilaLight: '#e981e3',

  navy: '#195dca',
  navyLight: '#8fb5f1',

  sky: '#29bff2',
  skyLight: '#c9effc',

  gray: '#6d6e71',
  grayLight: '#c6c7c8',
};

const colors = {
  mainSpecs: mainColorSpecs,
  main: rgba(mainColorSpecs),
  palette,
};

export default colors;
