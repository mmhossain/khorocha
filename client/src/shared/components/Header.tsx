import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box bg="teal.500" color="white" px={6} py={8}>
      <Flex align="center">
        <Link to="/">
          <Heading size="xl">
            Khorocha{" "}
            <Text as="span" fontSize="md">
              (খরচা)
            </Text>
          </Heading>
        </Link>

        <Spacer />

        {/* Right side: Banner image placeholder */}
        <Box>
          {/* You can place an Image component here later */}
          {/* <Image src="/banner.png" alt="Banner" boxSize="40px" /> */}
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
