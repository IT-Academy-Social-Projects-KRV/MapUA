import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
// import translationEn from '../public/locales/en/translation.json';
// import translationUa from '../public/locales/ua/translation.json';

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    // resources: {
    //   en: {
    //     translation: translationEn
    //   },
    //   ua: {
    //     translation: translationUa
    //   }
    // },

    supportedLngs: ['en', 'ua'],
    fallbackLng: 'en',
    // ns: ['translation'],
    // defaultNS: 'translation',

    detection: {
      order: ['localStorage', 'path', 'cookie', 'htmlTag', 'subdomain'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    },
    // frontend/public/locales/en/translation.json
    react: {
      useSuspense: true
    },
    debug: true
  });

i18n.languages = ['en', 'ua'];

export default i18n;
