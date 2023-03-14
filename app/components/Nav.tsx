import React from "react";
import { Flex, Image, Box, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Wallet from "./Wallet";

function Nav() {
  return (
    <Flex bg="black" w="100%" align={"center"} justify="space-around" p={2}>
      <Box>
        <Image src="/logo.png" alt="Custos" h="36px" />
      </Box>
      <Text color="white">
        <Link href='https://docs.custosprotocol.com/' isExternal>Documentation <ExternalLinkIcon mx='2px' /> </Link>
      </Text>
      <Wallet />
    </Flex>
  );
}

export default Nav;
