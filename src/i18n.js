import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from './locales/en.json'
import deTranslation from './locales/de.json'
import trTranslation from './locales/tr.json'

const resources = {
  en: {
     translation:enTranslation
  },
  tr: {
    translation: trTranslation
  },
  de: {
    translation:deTranslation  
  },
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;