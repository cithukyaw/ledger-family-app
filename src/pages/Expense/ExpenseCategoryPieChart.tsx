import { FC } from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { PiePlot } from "@mui/x-charts/PieChart";
import { ChartsTooltip, ChartsLegend } from "@mui/x-charts";
import {ExpenseCategoryPieChartProps} from "../../types/declarations";
import { Box } from "@mui/material";

const generateColors = (count: number): string[] => {
  const baseColors = [
    '#fd4949', // red
    '#13c6b9', // teal
    '#2a59fb', // blue
    '#eeb600', // yellow
    '#9B59B6', // purple
    '#E67E22', // orange
    '#00883b', // green
  ];

  // If we need more colors than in our base palette, generate them
  if (count > baseColors.length) {
    const additionalColors = Array.from({ length: count - baseColors.length }, (_, i) => {
      const hue = (i * 137.5) % 360; // Golden angle approximation
      return `hsl(${hue}, 70%, 60%)`;
    });
    return [...baseColors, ...additionalColors];
  }
  // shuffle base colors
  const shuffledBaseColors = [...baseColors].sort(() => 0.5 - Math.random());

  return shuffledBaseColors.slice(0, count);
};

const ExpenseCategoryPieChart: FC<ExpenseCategoryPieChartProps> = ({ data }: ExpenseCategoryPieChartProps) => {
  // Transform data: take first 6 items and combine rest into 'other'
  const tmpData = [...data];
  const transformedData = tmpData.slice(0, 6);
  const rest = tmpData.slice(6);

  const otherValue = rest.reduce((sum, item) => sum + item.value, 0);
  if (otherValue > 0) {
    transformedData.push({
      label: 'Other',
      value: otherValue
    });
  }

  const colors = generateColors(transformedData.length);

  return (
    <>
      <Box component="h3" sx={{ textAlign: 'center', mt: 3, mb: 1 }}>အမျိုးအစားအလိုက်အသုံးစရိတ်</Box>
      <div style={{ width: "100%", height: "400px" }}>
        <ResponsiveChartContainer
          series={[
            {
              type: "pie",
              data: transformedData,
              innerRadius: 0,
              outerRadius: 120,
              cx: "50%",
              cy: "40%",
            },
          ]}
          margin={{ top: 20, right: 20, bottom: 70, left: 20 }}
          colors={colors}
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
