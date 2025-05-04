import {
  Table,
  Box,
  Spinner,
  Text,
  HStack,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
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
    <Table variant="striped" size="md">
      <Thead>
        <Tr>
          <Th cursor="pointer" onClick={() => handleSort("title")}>
            <HStack spacing={1}>
              <Text>Title</Text>
              {renderSortIcon("title")}
            </HStack>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("type")}>
            <HStack spacing={1}>
              <Text>Type</Text>
              {renderSortIcon("type")}
            </HStack>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("amount")}>
            <HStack spacing={1} justify="flex-end">
              <Text>Amount</Text>
              {renderSortIcon("amount")}
            </HStack>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("category")}>
            <HStack spacing={1}>
              <Text>Category</Text>
              {renderSortIcon("category")}
            </HStack>
          </Th>
          <Th cursor="pointer" onClick={() => handleSort("date")}>
            <HStack spacing={1}>
              <Text>Date</Text>
              {renderSortIcon("date")}
            </HStack>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortedTransactions.map((txn) => (
          <Tr key={txn.id}>
            <Td>{txn.title}</Td>
            <Td>{txn.type}</Td>
            <Td textAlign="right">${txn.amount.toFixed(2)}</Td>
            <Td>{categoryMap.get(txn.categoryId) || "Unknown"}</Td>
            <Td>{txn.date}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TransactionsTable;
