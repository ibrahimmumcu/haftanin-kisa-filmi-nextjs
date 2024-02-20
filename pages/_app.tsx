import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleAnalytics } from "@next/third-parties/google";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics gaId="G-0VNC19RPP5" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
