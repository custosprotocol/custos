import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box } from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box>
      Custos
      <WalletMultiButton />
    </Box>
  );
}
