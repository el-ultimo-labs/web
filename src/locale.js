import i18next from 'i18next';

import cs from '../locale/cs.yaml';
import en from '../locale/en.yaml';
import nl from '../locale/nl.yaml';

const resources = { cs, en, nl };

i18next.init({
  fallbackLng: 'en',
  defaultNS: 'uwave',
  resources,
  interpolation: {
    // Prevent double-escapes: React already escapes things for us
    escapeValue: false
  }
});

export default function createLocale(language) {
  const locale = i18next.cloneInstance({ lng: language });

  locale.availableLanguages = Object.keys(resources);

  return locale;
}
