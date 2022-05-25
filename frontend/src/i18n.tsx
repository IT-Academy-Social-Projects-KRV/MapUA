import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'ua'],
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'path', 'cookie', 'htmlTag', 'subdomain'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    },
    react: {
      useSuspense: true
    },
    interpolation: {
      escapeValue: false
    },
    debug: true
  });

export default i18n;
