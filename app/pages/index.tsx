import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box } from "@chakra-ui/react";
import Wallet from "@/components/Wallet";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import "@fontsource/poppins";
import Section from "@/components/Section";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <>
      <Head>
        <title>Custos Protocol | Delegate your cold wallet</title>
        <meta name="description" content="Custos protocol" />
        <meta property="og:description" content="Custos protocol" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Custos Protocol | Protect your cold wallet"
        />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@CustosProtocol" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
      </Head>
      <Box w="100vw" h="100%" bg="#0f0f0f">
        <Nav />
        <Main />
        <Section />
        <Footer />
      </Box>
    </>
  );
}
