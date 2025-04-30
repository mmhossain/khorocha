import { Box, Container } from "@chakra-ui/react";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";
import TopMenu from "../../shared/components/TopMenu";
import Banner from "../components/Banner";
import AddTransactionButton from "../../transaction/components/AddTransactionButton";
import ChartsSection from "../components/ChartsSection";
import RemindersSection from "../components/RemindersSection";
import TransactionsTable from "../../transaction/components/TransactionsTable";
import FilterBar from "../../transaction/components/FilterBar";
import PredictionsSection from "../../forecasting/components/PredictionsSection";

const DashboardPage = () => {
  return (
    <Box>
      <Header />
      <Banner />
      <TopMenu />
      <Box textAlign="right" p={4}>
        <AddTransactionButton />
      </Box>
      <Container maxW="container.xl">
        <FilterBar />
        <ChartsSection />
        <PredictionsSection />
        <RemindersSection />
        <TransactionsTable />
      </Container>
      <Footer />
    </Box>
  );
};

export default DashboardPage;
