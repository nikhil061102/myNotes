import { Box, Container, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const Homepage = () => {
  return (
    <Flex height="100vh" align="center" justify="center">
    <Container maxW="xl" centerContent>
      <Box bg="white" w="100%" borderRadius="lg" borderWidth="1px">
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Login</Tab>
          <Tab>Signup</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><Login/></TabPanel>
          <TabPanel><Signup/></TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Container>
    </Flex>
  );
};

export default Homepage;
