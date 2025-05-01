import { Box, Container, Flex } from "@chakra-ui/react";
import Footer from "../../shared/components/Footer";
import ChartsSection from "../components/ChartsSection";
import RemindersSection from "../components/RemindersSection";
import TransactionsTable from "../../transaction/components/TransactionsTable";
import FilterBar from "../../transaction/components/FilterBar";
import PredictionsSection from "../../forecasting/components/PredictionsSection";

const DashboardPage = () => {
  return (
    <Flex direction="column" minH="100vh">
      <Box flex="1">
        <Container maxW="container.xl">
          <FilterBar />
          <ChartsSection />
          <PredictionsSection />
          <RemindersSection />
          <TransactionsTable />
        </Container>
      </Box>

      <Footer />
    </Flex>
  );
};

export default DashboardPage;
