import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";

const dummyReminders = [
  { title: "Credit Card Bill", dueDate: "2025-05-05" },
  { title: "Netflix Subscription", dueDate: "2025-05-10" },
  { title: "Car Insurance", dueDate: "2025-05-15" },
];

const RemindersSection = () => {
  return (
    <Box>
      <Heading
        size="sm"
        mb={2}
        pb={1}
        borderBottom="1px dashed"
        borderColor="gray.300"
      >
        Upcoming Charges
      </Heading>
      <List spacing={2}>
        {dummyReminders.map((item, idx) => (
          <ListItem key={idx}>
            <Text fontWeight="bold">{item.title}</Text>
            <Text fontSize="sm" color="gray.500">
              Due: {item.dueDate}
            </Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RemindersSection;
