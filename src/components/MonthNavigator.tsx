import {FC, useEffect, useState} from "react";
import {Box, Button, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import config from "../lib/config.ts";
import {MonthNavigatorProps} from "../types/declarations";

const MonthNavigator: FC<MonthNavigatorProps> = ({ setSelectedMonth }: MonthNavigatorProps) => {
  const [activeMonth, setActiveMonth] = useState(dayjs().startOf('month').format(config.dateFormat));
  const [nextDisabled, setNextDisabled] = useState(true);

  useEffect(() => {
    setSelectedMonth(activeMonth);
  }, [])

  const goPrev = () => {
    const prevMonth = dayjs(activeMonth).subtract(1, 'month');

    setActiveMonth(prevMonth.format(config.dateFormat));
    setSelectedMonth(prevMonth.format(config.dateFormat));
    setNextDisabled(false);
  };

  const goNext = () => {
    const nextMonth = dayjs(activeMonth).add(1, 'month');

    setActiveMonth(nextMonth.format(config.dateFormat));
    setSelectedMonth(nextMonth.format(config.dateFormat));

    if (dayjs().startOf('month').isSame(nextMonth)) {
      setNextDisabled(true);
    }
  };

  return (
    <Box className="subtitle" sx={{ display: "flex", justifyContent: "space-between" }}>
      <IconButton aria-label="previous" className="btn-icon" onClick={goPrev}>
        <ArrowBackIcon />
      </IconButton>
      <Button variant="outlined" className="btn-rounded btn-outlined-orange">{ dayjs(activeMonth).format('MMM YYYY') }</Button>
      <IconButton aria-label="next" className="btn-icon" disabled={nextDisabled} onClick={goNext}>
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}

export default MonthNavigator;
