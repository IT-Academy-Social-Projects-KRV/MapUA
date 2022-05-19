import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
// import translationEn from './locales/en/translation.json';
// import translationUa from './locales/ua/translation.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // resources: {
    //   en: {
    //     translations: translationEn
    //   },
    //   ua: {
    //     translations: translationUa
    //   }
    // },
    // ns: ['translations'],
    // defaultNS: 'translations',
    supportedLngs: ['en', 'ua'],
    fallbackLng: 'en',
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    react: { useSuspense: false }
  });

i18n.languages = ['en', 'ua'];

export default i18n;
