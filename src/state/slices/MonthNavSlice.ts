import dayjs from "dayjs";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MonthNavState} from "../../types/declarations";
import config from "../../lib/config.ts";

const initialState: MonthNavState = {
  activeMonth: dayjs().format(config.dateFormat),
  nextDisabled: true,
};

const monthNavSlice = createSlice({
  name: 'monthNav',
  initialState,
  reducers: {
    setActiveMonth: (state, action: PayloadAction<string>) => {
      state.activeMonth = action.payload;
    },
    setNextDisabled: (state, action: PayloadAction<boolean>) => {
      state.nextDisabled = action.payload;
    }
  }
});

export const {
  setActiveMonth,
  setNextDisabled
} = monthNavSlice.actions;

export default monthNavSlice.reducer;
