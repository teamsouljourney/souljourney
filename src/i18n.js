import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from './locales/en.json'
import deTranslation from './locales/de.json'
import trTranslation from './locales/tr.json'

const resources = {
  en: { translation: enTranslation },
  tr: { translation: trTranslation },
  de: { translation: deTranslation },
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language") || "en", // default
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });
  // Dil değiştiğinde localStorage'a kaydet
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

export default i18n;