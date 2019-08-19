import {
  getCategoricalSchemeRegistry,
  getSequentialSchemeRegistry,
} from '@superset-ui/color';

import {
  defaultPalette as srcdCategoricalDefault,
  scheme as srcdCategoricalPalettes,
} from './srcdColorsCategorical';
import {
  defaultPalette as srcdSequentialDefault,
  scheme as srcdSequentialPalettes,
} from './srcdColorsSequential';

export const defaultScheme = 'SUPERSET_DEFAULT';

function setupPalette(palettes, colorRegistry, defaultKey) {
  [palettes].forEach((group) => {
    group.forEach((scheme) => {
      colorRegistry.registerValue(scheme.id, scheme);
    });
  });

  colorRegistry.setDefaultKey(defaultScheme);
  colorRegistry.registerValue(defaultScheme, colorRegistry.get(defaultKey));
}

export function customize() {
  setupPalette(srcdCategoricalPalettes, getCategoricalSchemeRegistry(), srcdCategoricalDefault);
  setupPalette(srcdSequentialPalettes, getSequentialSchemeRegistry(), srcdSequentialDefault);
}
