import {
  getCategoricalSchemeRegistry,
  getSequentialSchemeRegistry,
} from '@superset-ui/color';

const defaultScheme = 'SUPERSET_DEFAULT';

const srcdCategoricalDefault = 'bnbColors';
const srcdSequentialDefault = 'blue_white_yellow';

function setupPalette(colorRegistry, defaultKey) {
  colorRegistry.setDefaultKey(defaultScheme);
  colorRegistry.registerValue(defaultScheme, colorRegistry.get(defaultKey));
}

export function customize() {
  setupPalette(getCategoricalSchemeRegistry(), srcdCategoricalDefault);
  setupPalette(getSequentialSchemeRegistry(), srcdSequentialDefault);
}
