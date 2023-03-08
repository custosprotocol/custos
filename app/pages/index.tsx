import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Box } from "@chakra-ui/react";
import Wallet from "@/components/Wallet";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import "@fontsource/poppins";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box w="100vw" h="100%" bg="#0f0f0f ">
      <Nav />
      <Main />
      <Footer />
    </Box>
  );
}
