import { HStack, Button } from "@chakra-ui/react";

const TopMenu = () => {
  return (
    <HStack p={4} bg="gray.50" borderBottom="1px solid" borderColor="gray.200">
      <Button variant="ghost">Dashboard</Button>
      <Button variant="ghost">Reports</Button>
      <Button variant="ghost">Settings</Button>
    </HStack>
  );
};

export default TopMenu;
