import mockI18n from "i18next";
import { initReactI18next } from "react-i18next";

mockI18n.use(initReactI18next).init(
  {
    fallbackLng: "en",
    resources: {
      en: { },
      fr: { },
    },
  },
  () => "mock test"
);

export default mockI18n;
