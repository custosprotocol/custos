import React from "react";
import {
  Box,
  Heading,
  Flex,
  Text,
  HStack,
  VStack,
  Image,
  Center,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";

function TopHeader() {
  return (
    <VStack spacing={3.5} pt={10}>
      <Heading letterSpacing={"0.495em"} fontWeight="medium">
        CUSTOS PROTOCOL
      </Heading>
      <HStack pt={5} spacing={8}>
        <Box>
          <Image src="twitter.png" h="15px" alt="Twitter" />
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

function DelegateBox() {
  const { publicKey } = useWallet();
  return (
    <Flex
      w="37vw"
      align={"center"}
      justify="center"
      background={"rgba(0, 0, 0, 0.6)"}
      direction={"column"}
      borderWidth="0.5px"
      borderColor={"white"}
      borderRadius="lg"
      p={9}
      sx={{
        backdropFilter: "blur(27.5px)",
      }}
    >
      <Flex w={"full"} align={"center"} justify="space-between">
        <Text color={"white"} fontWeight="black" fontSize={"14px"}>
          Cold Wallet Connected :
        </Text>
        <Text color={"white"} textAlign="center">
          {publicKey?.toString().slice(0, 10)}
        </Text>
      </Flex>
      <HStack pt={4} spacing={16}>
        <Box>
          <Text color="white" fontSize={"lg"}>
            Wallet
          </Text>
        </Box>
        <Box>
          <Text color="white" fontSize={"lg"}>
            Token
          </Text>
        </Box>
      </HStack>
      <Box bg="#0f0f0f" borderRadius={"full"} padding={3}>
        <Text
          color={"white"}
          fontSize="sm"
          fontWeight={"light"}
          textAlign="center"
        >
          Entrust tokens to wallet of your choice
        </Text>
      </Box>
    </Flex>
  );
}

function Main() {
  return (
    <Flex direction={"column"} color="white" h="100vh">
      <TopHeader />
    </Flex>
  );
}

export default Main;
