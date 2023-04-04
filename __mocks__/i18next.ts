import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init(
  {
    // supportedLngs: ["en", "fr"],
    fallbackLng: "en",
    // debug: true,
    resources: {
      en: { hello: "hello" },
      fr: { hello: "salut" },
    },
  },
  () => {
    return "hi";
  }
);

export default i18n;
