import { FC } from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { PiePlot } from "@mui/x-charts/PieChart";
import { ChartsTooltip, ChartsLegend } from "@mui/x-charts";
import {ExpenseCategoryPieChartProps} from "../../types/declarations";
import { Box } from "@mui/material";

const ExpenseCategoryPieChart: FC<ExpenseCategoryPieChartProps> = ({ data }: ExpenseCategoryPieChartProps) => {
  return (
    <>
      <Box component="h3" sx={{ textAlign: 'center', mt: 3, mb: 1 }}>အမျိုးအစားအလိုက်အသုံးစရိတ်</Box>
      <div style={{ width: "100%", height: "350px" }}>
        <ResponsiveChartContainer
          series={[
            {
              type: "pie",
              data: data,
              innerRadius: 0,
              outerRadius: 120,
              cx: "50%",
              cy: "40%",
            },
          ]}
          margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
        >
          <PiePlot />
          <ChartsTooltip trigger="item" />
          <ChartsLegend
            direction="row"
            position={{ vertical: 'bottom', horizontal: 'middle' }}
            slotProps={{
              legend: {
                padding: 20,
              },
            }}
          />
        </ResponsiveChartContainer>
      </div>
    </>
  );
};

export default ExpenseCategoryPieChart;
