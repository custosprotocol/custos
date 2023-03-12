import React from "react";
import {
  Box,
  Text,
  Heading,
  Flex,
  VStack,
  Center,
  Image,
} from "@chakra-ui/react";

function Section() {
  return (
    <VStack pos="relative" dir="column" w="100vw" py={"30vh"}>
      <Box pt={10} display="flex" alignItems="center">
        <Text mr={1} fontWeight={"bold"} fontSize="4xl" color="#8A8787">
          Built By us,{" "}
        </Text>
        <Text fontWeight={"bold"} fontSize="4xl" color="white">
          Designed for you
        </Text>
      </Box>
      <Box>
        <Center w="33vw">
          <Text align={"center"} fontSize={"lg"} color="white">
            We make integration a breeze by providing you with all the tools you
            need — from pre-made UI components to open-source javascript
            tooling. Take a look at the below code examples to get started.
          </Text>
        </Center>
      </Box>
      <Image
        pos="absolute"
        top="0"
        left="90px"
        boxSize="50px"
        src="s1.png"
        alt="Linear Gradient Ball"
      />
      <Image
        pos="absolute"
        bottom="100px"
        right="350px"
        boxSize={"80px"}
        src="s2.png"
        alt="Linear Gradient Ball"
      />
    </VStack>
  );
}

export default Section;
