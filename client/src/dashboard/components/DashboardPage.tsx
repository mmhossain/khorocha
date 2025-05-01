import { Box, Container, Flex } from "@chakra-ui/react";
import TransactionsTable from "../../transaction/components/TransactionsTable";

const DashboardPage = () => {
  return (
    <Flex direction="column">
      <Box flex="1">
        <Container maxW="container.xl">
          {/* <FilterBar />
          <ChartsSection />
          <PredictionsSection />
          <RemindersSection /> */}
          <TransactionsTable />
        </Container>
      </Box>
    </Flex>
  );
};

export default DashboardPage;
