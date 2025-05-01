import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import TopMenu from "./TopMenu";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <TopMenu />

      {/* This is where the page-specific content will render */}
      <Box flex="1" p={4}>
        <Outlet />
      </Box>

      <Footer />
    </Flex>
  );
};

export default Layout;
