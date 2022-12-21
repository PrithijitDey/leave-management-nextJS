import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import AuthContextProvider from "../shared/context/AuthContext";

import theme from '../styles/theme';
import "../styles/style.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
