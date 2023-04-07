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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
    ssr: true,
  });

  return (
    <>
      <Flex
        as="header"
        w="100%"
        h="75px"
        px={4}
        mb={10}
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
          fontSize={{ base: "2xl", lg: "5xl" }}
          color="pokemonBlue"
          fontWeight="black"
        >
          Pokédex
        </Text>
        <Spacer />
        {isMobile && <Search />}
        <LanguageSelector />
      </Flex>
      <Box as="main" px="5" pb="10">
        {!isMobile && <Search />}
        {children}
      </Box>
    </>
  );
};

export default Layout;
