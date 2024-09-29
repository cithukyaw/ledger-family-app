import {FC} from "react";
import {Box, Button, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {MonthNavigatorProps} from "../types/declarations";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {setActiveMonth, setNextDisabled} from "../state/slices/MonthNavSlice.ts";
import config from "../lib/config.ts";

const MonthNavigator: FC<MonthNavigatorProps> = () => {
  const {activeMonth, nextDisabled} = useSelector((state: RootState) => state.monthNav);
  const dispatch = useDispatch<AppDispatch>();

  const goPrev = () => {
    const prevMonth = dayjs(activeMonth).subtract(1, 'month').startOf('month');

    dispatch(setActiveMonth(prevMonth.format(config.dateFormat)));
    dispatch(setNextDisabled(false));
  };

  const goNext = () => {
    const nextMonth = dayjs(activeMonth).add(1, 'month').startOf('month');

    dispatch(setActiveMonth(nextMonth.format(config.dateFormat)));
    if (dayjs().startOf('month').isSame(nextMonth)) {
      dispatch(setNextDisabled(true));
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
