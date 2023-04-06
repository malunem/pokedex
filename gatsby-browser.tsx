import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import customTheme from "./src/style/theme";
import Layout from "./src/components/layout/layout";

const wrapPageElement = ({ element }: { element: JSX.Element }) => (
  <ChakraProvider theme={customTheme}>
    <Layout>{element}</Layout>
  </ChakraProvider>
);

export default wrapPageElement;
