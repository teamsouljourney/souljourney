import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import deTranslation from "./locales/de.json";
import trTranslation from "./locales/tr.json";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const resources = {
  en: { translation: enTranslation },
  tr: { translation: trTranslation },
  de: { translation: deTranslation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  // debug: true,
  interpolation: {
    escapeValue: false,
  },
});


i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});

i18n
  .use(HttpApi)  
  .use(LanguageDetector)  
  .use(initReactI18next)  
  .init({
    supportedLngs: ["en", "tr", "de"],  
    fallbackLng: "en",  
    detection: {
      order: ["localStorage", "cookie", "navigator"],  
      caches: ["localStorage", "cookie"],  
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",  
    },
    interpolation: {
      escapeValue: false,  
    },
  });
export default i18n;
