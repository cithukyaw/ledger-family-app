import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
  visiblePasscode: false,
  otp: '',
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    togglePasscode: (state, action: PayloadAction<boolean>) => {
      state.visiblePasscode = action.payload;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    }
  }
});

export const {
  togglePasscode,
  setOtp
} = userSlice.actions;

export default userSlice.reducer;
