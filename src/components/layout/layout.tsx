import {
  Box,
  Flex,
  IconButton,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "gatsby-plugin-react-i18next";
import React from "react";
import { IconPokeball } from "@tabler/icons-react";
import LanguageSelector from "../language-selector/language-selector";
import Search from "../searchbar/searchbar";

interface LayoutProps {
  children: React.ReactNode;
}

const isBrowser = typeof window !== "undefined";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = isBrowser
    ? useBreakpointValue({
        base: true,
        lg: false,
        ssr: true,
      })
    : true;

  return (
    <>
      <Flex
        as="header"
        w="100%"
        h="7vh"
        px={4}
        mb={4}
        className="main-header"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Link to="/">
          <IconButton
            id="home"
            aria-label="home-button"
            icon={<IconPokeball />}
          />
        </Link>
        <Spacer />
        <Text
          fontSize={{ base: "2xl", lg: "4xl" }}
          color="pokemonBlue"
          fontWeight="black"
        >
          Pokédex
        </Text>
        <Spacer />
        {isMobile && <Search />}
        <LanguageSelector />
      </Flex>
      <Box as="main" px="5" pb="5" minHeight="90vh">
        {!isMobile && <Search />}
        {children}
      </Box>
    </>
  );
};

export default Layout;
