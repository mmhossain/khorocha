import { HStack, Box, Spacer, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import AddTransactionButton from "../../transaction/components/AddTransactionButton";

const TopMenu = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#2B6CB0" : "#4A5568",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
  });

  return (
    <Box
      bg="gray.50"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={4}
      py={2}
    >
      <Flex align="center">
        <HStack spaceX={6}>
          <NavLink to="/" style={linkStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/reports" style={linkStyle}>
            Reports
          </NavLink>
          <NavLink to="/settings" style={linkStyle}>
            Settings
          </NavLink>
        </HStack>
        <Spacer />
        <AddTransactionButton />
      </Flex>
    </Box>
  );
};

export default TopMenu;
