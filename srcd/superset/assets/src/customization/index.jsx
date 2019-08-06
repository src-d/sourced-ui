import { getCategoricalSchemeRegistry } from '@superset-ui/color';
import srcdColors from './srcdColors';

export const defaultScheme = 'SUPERSET_DEFAULT';

const srcdPaletteId = 'srcdMain';

function setupColors() {
  const categoricalSchemeRegistry = getCategoricalSchemeRegistry();
  [srcdColors].forEach((group) => {
    group.forEach((scheme) => {
      categoricalSchemeRegistry.registerValue(scheme.id, scheme);
      if (scheme.id === srcdPaletteId) {
        categoricalSchemeRegistry.registerValue(defaultScheme, scheme);
      }
    });
  });

  categoricalSchemeRegistry.setDefaultKey(defaultScheme);
}

export function customize() {
  setupColors();
}
