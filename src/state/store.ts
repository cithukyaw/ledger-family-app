import {configureStore} from "@reduxjs/toolkit";
import monthNavSlice from "./slices/MonthNavSlice.ts";

export const store = configureStore({
  reducer: {
    monthNav: monthNavSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
