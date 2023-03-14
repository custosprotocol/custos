import React, { useState } from "react";
import { HStack, Box, Text } from "@chakra-ui/react";

type tab = {
  title: string;
  component: React.ReactNode;
};

interface ITab {
  tabsList: tab[];
}

function Tab({ tabsList }: ITab) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <HStack w="full" align={"center"} justify="center" spacing={16}>
        {tabsList.map((tab, i) => {
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
      <Box py={2} zIndex={0}>
        {tabsList.map((tab, i) => {
          return <Box key={i}>{activeTab == i && tab.component}</Box>;
        })}
      </Box>
    </>
  );
}

export default Tab;
