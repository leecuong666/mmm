import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

i18next
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    ns: [],
    defaultNS: undefined,

    resources: {
      en: {
        common: require('../assets/languages/english.json'),
      },
      vi: {
        common: require('../assets/languages/vietnamese.json'),
      },
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
