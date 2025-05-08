import { Box, Heading } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const samplePredictions = [
  { label: "Next Month", expense: 1200 },
  { label: "Next 3 Months", expense: 3500 },
  { label: "Next 6 Months", expense: 7200 },
  { label: "Next Year", expense: 15000 },
];

const PredictionsChart = () => {
  return (
    <Box>
      <Heading
        size="sm"
        mb={2}
        pb={1}
        borderBottom="1px dashed"
        borderColor="gray.300"
      >
        Predicted Expenses
      </Heading>
      <ResponsiveContainer width="100%" height={175}>
        <BarChart data={samplePredictions}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="expense" fill="#805AD5" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PredictionsChart;
