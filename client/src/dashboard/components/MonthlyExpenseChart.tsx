import { Box, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import {
  useTransactions,
  useCategories,
} from "../../transaction/hooks/useTransactions";
import { getCurrentMonthLabel } from "../../shared/utils/dateUtils";

const COLORS = [
  "#3182ce",
  "#63b3ed",
  "#90cdf4",
  "#bee3f8",
  "#2b6cb0",
  "#2c5282",
  "#4299e1",
];

const MonthlyExpenseChart = () => {
  const { data: transactions } = useTransactions();
  const { data: categories } = useCategories();
  const currentMonth = new Date().getMonth();

  const data = useMemo(() => {
    if (!transactions || !categories) return [];

    const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

    const monthly = transactions.filter(
      (t) =>
        new Date(t.date).getMonth() === currentMonth && t.type === "expense"
    );

    const grouped = monthly.reduce((acc, txn) => {
      const name = categoryMap.get(txn.categoryId) || "Other";
      acc[name] = (acc[name] || 0) + txn.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [transactions, categories]);

  if (!data.length)
    return (
      <Box textAlign="center" mt={4}>
        No expense data for this month
      </Box>
    );

  return (
    <Box>
      <Heading
        size="sm"
        mb={2}
        pb={1}
        borderBottom="1px dashed"
        borderColor="gray.300"
      >
        {getCurrentMonthLabel()} - Expense
      </Heading>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie dataKey="value" data={data} outerRadius={55} label>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend height={5} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MonthlyExpenseChart;
