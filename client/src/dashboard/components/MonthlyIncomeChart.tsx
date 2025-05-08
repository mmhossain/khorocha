import { Box, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { useTransactions } from "../../transaction/hooks/useTransactions";
import { getCurrentMonthLabel } from "../../shared/utils/dateUtils";

const COLORS = ["#48BB78", "#38A169", "#276749"];

const MonthlyIncomeChart = () => {
  const { data: transactions } = useTransactions();
  const currentMonth = new Date().getMonth();

  const data = useMemo(() => {
    if (!transactions) return [];

    const monthly = transactions.filter(
      (t) => new Date(t.date).getMonth() === currentMonth && t.type === "income"
    );

    const grouped = monthly.reduce((acc, txn) => {
      acc[txn.title] = (acc[txn.title] || 0) + txn.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  if (!data.length)
    return (
      <Box textAlign="center" mt={4}>
        No income data for this month
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
        {getCurrentMonthLabel()} - Income
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

export default MonthlyIncomeChart;
