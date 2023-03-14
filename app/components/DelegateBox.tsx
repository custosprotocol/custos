import { getAllTokens } from "@/solana";
import {
  Flex,
  Text,
  HStack,
  Box,
  Button,
  Input,
  Image,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import CommingSoon from "./CommingSoon";
import TokenTab from "./TokenTab";
import WalletDisplay from "./WalletDisplay";
import WalletTab from "./WalletTab";
import Tab from "./Tab";
import RevokeWallet from "./RevokeWallet";

function DelegateBox() {
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
  const [headerTab, setHeaderTab] = useState(0);

  const delegatetabs = [
    {
      title: "Wallet",
      component: <WalletTab />,
    },
    {
      title: "NFT",
      component: <CommingSoon />,
    },
    {
      title: "Token",
      component: <CommingSoon />,
    },
  ];

  const revokeTabs = [
    {
      title: "Wallet",
      component: <RevokeWallet />,
    },
    {
      title: "NFT",
      component: <CommingSoon />,
    },
    {
      title: "Token",
      component: <CommingSoon />,
    },
  ];

  const HeaderTabs = [
    {
      title: "Delegate",
      component: <Tab tabsList={delegatetabs} />,
    },
    {
      title: "Revoke",
      component: <Tab tabsList={revokeTabs} />,
    },
  ];

  return (
    <Box pos="relative" zIndex={0}>
      <Flex
        w="39vw"
        align={"center"}
        background={"rgba(0, 0, 0, 0.6)"}
        direction={"column"}
        borderWidth="0.5px"
        borderColor={"rgba(255, 255, 255, 0.5)"}
        borderRadius="lg"
        minH="400px"
        px={9}
        pt={9}
        pb={5}
        zIndex={3}
        // backdropFilter="auto"
        // backdropBlur="27px"
        sx={{
          backdropFilter: "blur(27.5px)",
        }}
      >
        <WalletDisplay />
        <HStack w="full" spacing={10} mt={4} align={"center"} justify="center">
          {HeaderTabs.map((header, i) => {
            return (
              <Box key={i} p={2} onClick={() => setHeaderTab(i)}>
                <Text
                  textDecor={headerTab == i ? "underline" : ""}
                  color="white"
                  fontSize={18}
                >
                  {header.title}
                </Text>
              </Box>
            );
          })}
        </HStack>
        <Box py={2}>
          {HeaderTabs.map((header, i) => {
            return <Box key={i}>{headerTab == i && header.component}</Box>;
          })}
        </Box>
      </Flex>
      <Image
        pos="absolute"
        zIndex={-1}
        left={"-20px"}
        top="-20px"
        boxSize="80px"
        src="1.png"
        alt="Purple Gradient Box"
      />
      <Image
        pos="absolute"
        zIndex={-1}
        right={"-40px"}
        top="80px"
        boxSize="100px"
        src="2.png"
        alt="Purple Gradient Box"
      />
      <Image
        pos="absolute"
        zIndex={2}
        left={"-20px"}
        bottom="-20px"
        boxSize="50px"
        src="3.png"
        alt="Purple Gradient Box"
      />
      <Image
        pos="absolute"
        zIndex={2}
        right={"-10px"}
        bottom="-10px"
        boxSize="40px"
        src="4.png"
        alt="Purple Gradient Box"
      />
    </Box>
  );
}

export default DelegateBox;
