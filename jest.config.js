module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
  },
  moduleNameMapper: {
    "gatsby-plugin-react-i18next/(.*)":
      "<rootDir>/__mocks__/gatsby-plugin-react-i18next.js",
    "@chakra-ui/react/(.*)": "<rootDir>/__mocks__/chakra-ui-react.js",
    "@chakra-ui/icons/(.*)": "<rootDir>/__mocks__/chakra-ui-icons.js",
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/file-mock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testPathIgnorePatterns: [
    "node_modules",
    "\\.cache",
    "<rootDir>.*/public",
    "cypress",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)",
  ],
  globals: {
    __PATH_PREFIX__: "",
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  testEnvironmentOptions: {
    url: "http://localhost",
  },
  setupFiles: ["<rootDir>/loadershim.js"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/setup-test-env.js",
  ],
};
