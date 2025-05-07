import { Box, Container, Flex } from "@chakra-ui/react";
import TransactionsTable from "../../transaction/components/TransactionsTable";
import { useState } from "react";
import FilterBar from "../../transaction/components/FilterBar";

const DashboardPage = () => {
  const [filterParams, setFilterParams] = useState<{
    search?: string;
    from?: string;
    to?: string;
  }>({});

  return (
    <Flex direction="column">
      <Box flex="1">
        <Container maxW="container.xl" bg="white" p={3}>
          {/* 
          <ChartsSection />
          <PredictionsSection />
          <RemindersSection /> */}
          <FilterBar onFilterChange={setFilterParams} />
          <TransactionsTable filter={filterParams} />
        </Container>
      </Box>
    </Flex>
  );
};

export default DashboardPage;
