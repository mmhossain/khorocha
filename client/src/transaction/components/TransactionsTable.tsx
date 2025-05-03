import { Table, Box, Spinner, Text, HStack } from "@chakra-ui/react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { useTransactions, useCategories } from "../hooks/useTransactions";
import { useMemo, useState } from "react";

type SortKey = "date" | "amount" | "title" | "type" | "category";
type SortDirection = "asc" | "desc";

interface TransactionsTableProps {
  filter: {
    search?: string;
    from?: string;
    to?: string;
  };
}

const TransactionsTable = ({ filter }: TransactionsTableProps) => {
  const { data: transactions, isLoading: loadingTxns } = useTransactions();
  const { data: categories, isLoading: loadingCats } = useCategories();

  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const categoryMap = useMemo(() => {
    return new Map(categories?.map((c) => [c.id, c.name]));
  }, [categories]);

  const handleSort = (key: SortKey) => {
    if (key === sortBy) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (key: SortKey) => {
    if (key !== sortBy) return null;
    return sortDirection === "asc" ? <FaSortUp /> : <FaSortDown />;
  };

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];

    return transactions.filter((txn) => {
      const search = filter.search?.toLowerCase() || "";
      const categoryName = categoryMap.get(txn.categoryId)?.toLowerCase() || "";
      const title = txn.title.toLowerCase();
      const type = txn.type.toLowerCase();
      const amountStr = txn.amount.toString();

      const matchesSearch =
        !search ||
        title.includes(search) ||
        type.includes(search) ||
        categoryName.includes(search) ||
        amountStr.includes(search);

      const txnDate = new Date(txn.date);
      const fromDate = filter.from ? new Date(filter.from) : null;
      const toDate = filter.to ? new Date(filter.to) : null;

      const matchesDate =
        (!fromDate || txnDate >= fromDate) && (!toDate || txnDate <= toDate);

      return matchesSearch && matchesDate;
    });
  }, [transactions, filter, categoryMap]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let aValue: string | number = "";
      let bValue: string | number = "";

      if (sortBy === "category") {
        aValue = categoryMap.get(a.categoryId) || "";
        bValue = categoryMap.get(b.categoryId) || "";
      } else {
        aValue = a[sortBy];
        bValue = b[sortBy];
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredTransactions, sortBy, sortDirection, categoryMap]);

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
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => handleSort("title")}
          >
            <HStack spaceX={1}>
              <Text>Title</Text>
              {renderSortIcon("title")}
            </HStack>
          </Table.ColumnHeader>
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => handleSort("type")}
          >
            <HStack spaceX={1}>
              <Text>Type</Text>
              {renderSortIcon("type")}
            </HStack>
          </Table.ColumnHeader>
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => handleSort("amount")}
          >
            <HStack spaceX={1} justify="flex-end">
              <Text>Amount</Text>
              {renderSortIcon("amount")}
            </HStack>
          </Table.ColumnHeader>
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => handleSort("category")}
          >
            <HStack spaceX={1}>
              <Text>Category</Text>
              {renderSortIcon("category")}
            </HStack>
          </Table.ColumnHeader>
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => handleSort("date")}
          >
            <HStack spaceX={1}>
              <Text>Date</Text>
              {renderSortIcon("date")}
            </HStack>
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedTransactions.map((txn) => (
          <Table.Row key={txn.id}>
            <Table.Cell>{txn.title}</Table.Cell>
            <Table.Cell>{txn.type}</Table.Cell>
            <Table.Cell textAlign="right">${txn.amount.toFixed(2)}</Table.Cell>
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
