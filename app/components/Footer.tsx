import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      fontWeight={300}
      textAlign="center"
      p={2.5}
      color="white"
      fontSize={"md"}
      bg="black"
      letterSpacing={"0.1em"}
    >
      built with 💛 for 🐻 and 🌎
    </Box>
  );
}

export default Footer;
