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
      <MenuButton as={Button} h="5vh" fontSize={{base: '3vw', '2xl': "1vw"}} rightIcon={<ChevronDownIcon />}>
        {language.toUpperCase()}
      </MenuButton>
      <MenuList maxH="5vh">
        {languages.map((lng) => (
          <MenuItem
            id={lng}
            key={lng}
            value={lng}
            className="select-language"
            fontSize={{base: '3vw', '2xl': "1vw"}}
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
