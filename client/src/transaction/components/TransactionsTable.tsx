import { Table, Box, Spinner, Text } from "@chakra-ui/react";
import { useTransactions, useCategories } from "../hooks/useTransactions";

const TransactionsTable = () => {
  const { data: transactions, isLoading: loadingTxns } = useTransactions();
  const { data: categories, isLoading: loadingCats } = useCategories();

  const categoryMap = new Map(categories?.map((c) => [c.id, c.name]));

  if (loadingTxns || loadingCats) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={2}>Loading transactions...</Text>
      </Box>
    );
  }

  return (
    <Table.Root striped size="md">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Title</Table.ColumnHeader>
          <Table.ColumnHeader>Type</Table.ColumnHeader>
          <Table.ColumnHeader>Amount</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader>Date</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {transactions?.map((txn) => (
          <Table.Row key={txn.id}>
            <Table.Cell>{txn.title}</Table.Cell>
            <Table.Cell>{txn.type}</Table.Cell>
            <Table.Cell>${txn.amount.toFixed(2)}</Table.Cell>
            <Table.Cell>
              {categoryMap.get(txn.categoryId) || "Unknown"}
            </Table.Cell>
            <Table.Cell>{txn.date}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TransactionsTable;
