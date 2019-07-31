import { getCategoricalSchemeRegistry } from '@superset-ui/color';
import srcdColors from './srcdColors';


function setupColors() {
  const categoricalSchemeRegistry = getCategoricalSchemeRegistry();
  [srcdColors].forEach((group) => {
    group.forEach((scheme) => {
      categoricalSchemeRegistry.registerValue(scheme.id, scheme);
    });
  });
}

export function customize() {
  setupColors();
}
