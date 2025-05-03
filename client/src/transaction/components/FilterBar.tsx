import {
  Box,
  Input,
  HStack,
  VStack,
  Text,
  Select,
  createListCollection,
  Portal,
  InputGroup,
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

  const filterByItems = createListCollection({
    items: [
      { label: "Text", value: "text" },
      { label: "Date Range", value: "date" },
    ],
  });

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
      <VStack align="start" spaceX={4}>
        <HStack align="flex-end" spaceX={6} width="100%">
          {/* Filter Type Dropdown with label */}
          <Box>
            <Text mb={1}>Filter Type</Text>
            <Select.Root
              width={200}
              variant="outline"
              collection={filterByItems}
              value={[filterMode]}
              onValueChange={(e) => setFilterMode(e.value[0] as FilterType)}
            >
              <Select.HiddenSelect />
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select Filter Type" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {filterByItems.items.map((filterType) => (
                      <Select.Item item={filterType} key={filterType.value}>
                        {filterType.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </Box>

          {/* Conditional Filter Inputs */}
          {filterMode === "text" ? (
            <Box width="100%">
              <Text mb={1}>Search</Text>
              <InputGroup endElement={<CiSearch />}>
                <Input
                  placeholder="Enter title, type, amount or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </Box>
          ) : (
            <HStack spaceX={4}>
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
