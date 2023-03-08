import React from "react";
import { Flex, Image, Box, Text, HStack, Link } from "@chakra-ui/react";
import Wallet from "./Wallet";

function Nav() {
  return (
    <Flex bg="black" w="100%" align={"center"} justify="space-around" p={2}>
      <Box>
        <Image src="/logo.png" alt="Custos" h="20px" />
      </Box>

      <Text color={"white"}>
        <Link>Integrate</Link>
      </Text>
      <Text color="white">
        <Link>Documentation</Link>
      </Text>
      <Wallet />
    </Flex>
  );
}

export default Nav;
