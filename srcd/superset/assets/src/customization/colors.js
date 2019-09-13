/* eslint-disable sort-keys */

const rgba = color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

// source{d} royal (#8719cb)
const mainColorSpecs = { r: 135, g: 25, b: 203, a: 1 };

const palette = {
  royalDeep: '#591085',
  royalMiddle: '#7015a8',
  royal: rgba(mainColorSpecs),
  royalLightDeep: '#a438e7',
  royalLight: '#bc6ded',

  coralDeep: '#d66600',
  coralMiddle: '#e5770a',
  coral: '#f68b0c',
  coralLightDeep: '#f89c30',
  coralLight: '#f9ae56',

  limeDeep: '#006853',
  limeMiddle: '#008168',
  lime: '#009b7c',
  limeLightDeep: '#00b491',
  limeLight: '#00c8a1',

  vanila: '#d024c6',
  vanilaLight: '#e981e3',

  navy: '#195dca',
  navyLight: '#8fb5f1',

  gray: '#6d6e71',
  grayLight: '#c6c7c8',
};

const colors = {
  mainSpecs: mainColorSpecs,
  main: rgba(mainColorSpecs),
  palette,
};

export default colors;
