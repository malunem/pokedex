import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    customBrown: {
      200: "#ABAFB0",
      600: "#61481C",
    },
    customWhite: {
      default: "#FFFFFF",
      200: "#FCF8E8",
      600: "#9D9D9D",
    },
    customBlack: {
      default: "#000000",
      200: "#7F8487",
      600: "#454545",
    },
    pokemonBlue: "#0075BE",
  },
});

export default customTheme;
