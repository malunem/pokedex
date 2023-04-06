import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brown: {
      200: "#E4C988",
      600: "#61481C"
    },
    white: {
      default: "#FFFFFF",
      200: "#FCF8E8",
      600: "#9D9D9D"
    },
    black: {
      default: "#000000",
      200: "#7F8487",
      600: "#454545"
    },
    pokemonBlue: "#0075BE"
  }
});

export default customTheme