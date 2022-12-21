import { extendTheme } from "@chakra-ui/react";

import vars from '../styles/_var.module.scss';

const theme = extendTheme({
  colors: {
    custom: {
      primary: {
        /**
         * 500 - Base state
         * 600 - Hover state
         * 700 - Active state
        */

        500: vars.primaryBtn,
        600: vars.primaryBtnHover,
        700: vars.primaryBtnActive,
      },
      secondary: {
        500: vars.secondaryBtn,
        600: vars.secondaryBtnHover,
        700: vars.secondaryBtnActive,
      },
    },
  },
});

export default theme;