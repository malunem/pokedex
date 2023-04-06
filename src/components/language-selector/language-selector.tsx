import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useI18next } from "gatsby-plugin-react-i18next";
import React from "react";

export interface LanguageSelectorProps {
  languages: string[];
}

const LanguageSelector = () => {
  const { languages, changeLanguage, language } = useI18next();
  return (
    <Menu id="language-selector" aria-label="languages">
      <MenuButton
        as={Button}
        // maxW="50px"
        // bgColor="blue"
        rightIcon={<ChevronDownIcon />}
      >
        {language.toUpperCase() }
      </MenuButton>
      <MenuList maxW="100px">
        {languages.map((lng) => (
          <MenuItem
            id={lng}
            key={lng}
            value={lng}
            onClick={() => {
              changeLanguage(lng);
            }}
          >
            {lng.toUpperCase()}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
