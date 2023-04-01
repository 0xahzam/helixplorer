import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Helixplorer</title>
        <meta
          name="viewport"
          key="main"
          content="width=device-width, initial-scale=1.0"
        />

        <meta name="title" content="Helixplorer" />
        <meta
          name="description"
          content="A minimal beautiful wiki to visualize proteins in 3d and briefly read about them."
        />

        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:url"
          content="https://helixplorer.vercel.app/"
          key="og-url"
        />
        <meta property="og:title" content="Helixplorer" key="og-title" />
        <meta
          property="og:description"
          content="A minimal beautiful wiki to visualize proteins in 3d and briefly read about them."
          key="og-desc"
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/FKW2D82/Frame-39.png"
          key="og-image"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://helixplorer.vercel.app/"
          key="twt-url"
        />
        <meta property="twitter:title" content="Helixplorer" key="twt-title" />
        <meta
          property="twitter:description"
          content="A minimal beautiful wiki to visualize proteins in 3d and briefly read about them."
          key="twt-desc"
        />
        <meta
          property="twitter:image"
          content="https://i.ibb.co/FKW2D82/Frame-39.png"
          key="twt-img"
        />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}
