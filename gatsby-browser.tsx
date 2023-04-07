/* eslint-disable import/prefer-default-export */

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import customTheme from "./src/style/theme";

// Don't use export default syntax because it will break gatsby build
export const wrapPageElement = ({ element }: { element: JSX.Element }) => (
  <ChakraProvider theme={customTheme}>{element}</ChakraProvider>
);
