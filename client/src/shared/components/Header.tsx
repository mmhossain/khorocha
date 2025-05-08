import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box bg="teal.500" color="white" height="100px">
      <Flex align="center">
        <Link to="/">
          <Flex align="center" gap={3} lineHeight="1">
            <Image
              src="/khorocha.png"
              alt="Khorocha Logo"
              height="100px"
              width="auto"
              objectFit="contain"
              mr={3}
            />
          </Flex>
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
