import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  HStack,
  VStack,
  Image,
  Center,
  Link,
} from "@chakra-ui/react";
import DelegateBox from "./DelegateBox";
import { getAllTokens } from "../solana/index";
import { useWallet } from "@solana/wallet-adapter-react";

function TopHeader() {
  return (
    <VStack spacing={3.5} pt={10}>
      <Heading letterSpacing={"0.495em"} fontWeight="medium">
        CUSTOS PROTOCOL
      </Heading>
      <HStack pt={5} spacing={8}>
        <Box>
          <Link href="https://twitter.com/custosprotocol" isExternal>
            <Image src="twitter.png" h="15px" alt="Twitter" />
          </Link>
        </Box>
        <Box>
          <Image src="discord.png" h="15px" alt="Discord" />
        </Box>
        <Box>
          <Image src="github.png" h="15px" alt="Github" />
        </Box>
      </HStack>
      <Box pt={10} display="flex" alignItems="center">
        <Text mr={1} fontWeight={"bold"} fontSize="4xl" color="#8A8787">
          a delegation protocol to{" "}
        </Text>
        <Text fontWeight={"bold"} fontSize="4xl" color="white">
          keep your Assets safe
        </Text>
      </Box>
      <Box pb={8}>
        <Center w="33vw">
          <Text align="center" fontSize={"lg"} color="white">
            Securely delegate your Solana assets without compromising your cold
            wallet&apos;s security
          </Text>
        </Center>
      </Box>
      <DelegateBox />
    </VStack>
  );
}

function Main() {
  return (
    <Flex direction={"column"} bg="#0f0f0f" color="white" h="100vh">
      <TopHeader />
    </Flex>
  );
}

export default Main;
