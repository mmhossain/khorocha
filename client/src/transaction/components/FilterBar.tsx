import {
  Box,
  Input,
  HStack,
  VStack,
  Text,
  Select,
  InputGroup,
  FormControl,
  FormLabel,
  InputRightAddon,
} from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";

type FilterType = "text" | "date";

interface FilterBarProps {
  onFilterChange: (params: {
    search?: string;
    from?: string;
    to?: string;
  }) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filterMode, setFilterMode] = useState<FilterType>("text");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (filterMode === "text") {
      onFilterChange({ search });
    } else {
      onFilterChange({ from: fromDate, to: toDate });
    }
  }, [search, fromDate, toDate, filterMode]);

  const filterByItems = [
    { label: "Text", value: "text" },
    { label: "Date Range", value: "date" },
  ];

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <VStack align="start" spacing={4}>
        <HStack align="flex-end" spacing={6} width="100%">
          {/* Filter Type Dropdown with label */}
          <Box>
            <FormControl>
              <FormLabel mb={1}>Filter Type</FormLabel>
              <Select
                width="200"
                variant="outline"
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value as FilterType)}
              >
                {filterByItems.map((filterType) => (
                  <option key={filterType.value}>{filterType.label}</option>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Conditional Filter Inputs */}
          {filterMode === "text" ? (
            <Box width="100%">
              <Text mb={1}>Search</Text>
              <InputGroup>
                <Input
                  placeholder="Enter title, type, amount or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputRightAddon>
                  <CiSearch />
                </InputRightAddon>
              </InputGroup>
            </Box>
          ) : (
            <HStack spacing={4}>
              <Box>
                <Text mb={1}>From</Text>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Box>
              <Box>
                <Text mb={1}>To</Text>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Box>
            </HStack>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default FilterBar;
