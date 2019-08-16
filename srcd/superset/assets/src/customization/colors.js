/* eslint-disable sort-keys */

const rgba = color => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

// from current superset configuration
const mainColorSpecs = { r: 0, g: 122, b: 135, a: 1 };

// from current superset configuration
const palette = {
  rausch: '#ff5a5f',
  hackb: '#7b0051',
  kazan: rgba(mainColorSpecs),
  babu: '#00d1c1',
  lima: '#8ce071',
  beach: '#ffb400',
};

const colors = {
  mainSpecs: mainColorSpecs,
  main: rgba(mainColorSpecs),
  palette,
};

export default colors;
