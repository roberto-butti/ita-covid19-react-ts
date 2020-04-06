import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import common_it from "./translations/it/common.json";
import common_en from "./translations/en/common.json";


// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: common_en
  },
  it: {
    translation: common_it
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    //lng: "en",
    //fallbackLng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });


let optionsLang = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true
};
i18n
  .use(LanguageDetector)
  .init({
    detection: optionsLang
  });

export default i18n;
