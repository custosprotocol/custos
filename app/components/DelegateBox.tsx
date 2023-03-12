import { getAllTokens } from "@/solana";
import { Flex, Text, HStack, Box, Button, Input } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import TokenTab from "./TokenTab";
import WalletTab from "./WalletTab";

function DelegateBox() {
  const { publicKey } = useWallet();

  // useEffect(() => {
  //   if (publicKey !== null || publicKey !== undefined) {
  //     (async () => {
  //       try {
  //         const data = await getAllTokens(publicKey);
  //       } catch (error) {
  //         console.log("SOMETHING ERROR", error);
  //       }
  //     })();
  //   }
  // }, []);

  const [activeTab, setActiveTab] = useState(0);

  const Tabs = [
    {
      title: "Wallet",
      component: <WalletTab />,
    },
    {
      title: "Token",
      component: <TokenTab />,
    },
  ];
  return (
    <Flex
      w="39vw"
      align={"center"}
      background={"rgba(0, 0, 0, 0.6)"}
      direction={"column"}
      borderWidth="0.5px"
      borderColor={"white"}
      borderRadius="lg"
      minH="400px"
      px={9}
      pt={9}
      pb={5}
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
        {Tabs.map((tab, i) => {
          return (
            <Box key={i} p={4} onClick={() => setActiveTab(i)}>
              <Text
                textDecor={activeTab == i ? "underline" : ""}
                color="white"
                fontSize={18}
              >
                {tab.title}
              </Text>
            </Box>
          );
        })}
      </HStack>
      <Box bg="#0f0f0f" borderRadius={"full"} padding={3}></Box>
      <Box py={2}>
        {Tabs.map((tab, i) => {
          return <Box key={i}>{activeTab == i && tab.component}</Box>;
        })}
      </Box>
    </Flex>
  );
}

export default DelegateBox;