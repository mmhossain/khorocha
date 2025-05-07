import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import TopMenu from "./TopMenu";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box bg="#042037">
        <Box maxW="90%" mx="auto" py={3}>
          <TopMenu />
        </Box>
      </Box>

      {/* This is where the page-specific content will render */}
      <Box
        width="100%"
        p={0}
        bg="lightgray"
        bgImage="url('/background-pattern.webp')"
      >
        <Box flex="1" maxW="90%" my={4} ml="auto" mr="auto">
          <Outlet />
        </Box>
      </Box>

      <Box w="100%" bg="gray.100" py={4} mt={0}>
        <Box maxW="90%" mx="auto" textAlign="center">
          <Footer />
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
