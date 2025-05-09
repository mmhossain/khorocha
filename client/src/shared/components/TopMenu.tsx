import { HStack, Box, Spacer, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import AddEditTransactionDialog from "../../transaction/components/AddEditTransactionDialog";

const TopMenu = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#2B6CB0" : "white",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
  });

  return (
    <Box>
      <Flex align="center">
        <HStack spacing={6}>
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
        <AddEditTransactionDialog />
      </Flex>
    </Box>
  );
};

export default TopMenu;
