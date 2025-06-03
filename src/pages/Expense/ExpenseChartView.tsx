import {FC} from 'react';
import {ResponsiveChartContainer} from '@mui/x-charts/ResponsiveChartContainer';
import {BarPlot} from '@mui/x-charts/BarChart';
import {ChartsTooltip, ChartsXAxis, ChartsYAxis} from "@mui/x-charts";
import {kFormatter} from "../../lib/utils.ts";
import {ExpenseChartViewProps} from "../../types/declarations";
import dayjs from "dayjs";
import { Box } from '@mui/material';

const ExpenseChartView: FC<ExpenseChartViewProps> = ({ data, month }: ExpenseChartViewProps) => {
  return (
    <>
      <Box component="h3" sx={{ textAlign: 'center', mt: 1, mb: 0 }}>ရက်အလိုက်အသုံးစရိတ်</Box>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveChartContainer
          series={[
            {
              type: 'bar',
              data: data.map(d => d.amount),
              label: 'Amount',
            },
          ]}
          xAxis={[
            {
              data: data.map(d => d.day),
              scaleType: 'band',
              id: 'x-axis-id',
              valueFormatter: (value: number | null) => value !== null ? dayjs(value).format('DD') : ''
            },
          ]}
          yAxis={[
            {
              valueFormatter: (value: number | null) => value !== null ? kFormatter(value) : ''
            }
          ]}
          colors={[
            'rgb(238, 109, 6)'
          ]}
        >
          <BarPlot />
          <ChartsXAxis label={dayjs(month).format('MMM YYYY')} position="bottom" axisId="x-axis-id" />
          <ChartsYAxis position="left" />
          <ChartsTooltip />
        </ResponsiveChartContainer>
      </div>
    </>
  );
};

export default ExpenseChartView;
