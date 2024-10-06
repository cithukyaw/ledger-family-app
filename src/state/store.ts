import {configureStore} from "@reduxjs/toolkit";
import monthNavSlice from "./slices/MonthNavSlice.ts";
import userSlice from "./slices/userSlice.ts";

export const store = configureStore({
  reducer: {
    monthNav: monthNavSlice,
    user: userSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
