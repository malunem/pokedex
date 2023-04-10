import {
  Box,
  Flex,
  IconButton,
  Switch,
  Text,
  useBreakpointValue,
  useColorMode,
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
  const { toggleColorMode } = useColorMode();

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
        h={{ base: "7vh", "2xl": "10vh" }}
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
            h="5vh"
            w="5vh"
            icon={<IconPokeball size="80%" />}
          />
        </Link>
        <Switch
          onChange={toggleColorMode}
          size={{ base: "md", md: "lg" }}
          colorScheme="whiteAlpha"
          mx={2}
          aria-label="switch-color-mode"
        />
        <Text
          as="h1"
          fontSize={{ base: "2xl", lg: "5vh" }}
          color="pokemonBlue"
          fontWeight="black"
          mx="auto"
        >
          Pokédex
        </Text>
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
