import { Box, Container, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import TransactionsTable from "../../transaction/components/TransactionsTable";
import { useState } from "react";
import FilterBar from "../../transaction/components/FilterBar";
import RemindersSection from "./RemindersSection";
import MonthlyIncomeChart from "./MonthlyIncomeChart";
import PredictionsChart from "./PredictionsChart";
import MonthlyExpenseChart from "./MonthlyExpenseChart";

const DashboardPage = () => {
  const [filterParams, setFilterParams] = useState<{
    search?: string;
    from?: string;
    to?: string;
  }>({});

  return (
    <Container maxW="container.xl" bg="white" p={3}>
      {/* ✅ Charts on Top for Small Screens */}
      <Box display={{ base: "block", lg: "none" }} mb={6}>
        <Wrap spacing={4} justify="space-between">
          <WrapItem w="100%">
            <MonthlyIncomeChart />
          </WrapItem>
          <WrapItem w="100%">
            <MonthlyExpenseChart />
          </WrapItem>
          <WrapItem w="100%">
            <PredictionsChart />
          </WrapItem>
          <WrapItem w="100%">
            <RemindersSection />
          </WrapItem>
        </Wrap>
      </Box>

      {/* ✅ 3-column layout for Large Screens */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="start"
        gap={4}
        display={{ base: "none", lg: "flex" }}
      >
        {/* Left Column */}
        <Box w="24%">
          <Box mb={7}>
            <MonthlyIncomeChart />
          </Box>
          <Box>
            <MonthlyExpenseChart />
          </Box>
        </Box>

        {/* Middle Column */}
        <Box w="56%">
          <FilterBar onFilterChange={setFilterParams} />
          <TransactionsTable filter={filterParams} />
        </Box>

        {/* Right Column */}
        <Box w="20%">
          <Box mb={7}>
            <PredictionsChart />
          </Box>
          <Box>
            <RemindersSection />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default DashboardPage;
