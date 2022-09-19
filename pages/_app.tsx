import "../styles/globals.css";
import type { AppProps } from "next/app";

import withReactContent from "sweetalert2-react-content";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
