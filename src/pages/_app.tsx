import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link href="./favicon.png" rel="shortcut icon" />
        <meta charSet="UTF-8" />
        <title>blog.ntngu</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
