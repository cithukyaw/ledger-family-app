import {FC} from "react";
import {Box} from "@mui/material";
import OtpInput from "react-otp-input";
import Error from "./Error.tsx";
import {Link} from "react-router-dom";
import {FORM_ACTION} from "../lib/constants.ts";
import {PasscodeInputProps} from "../types/declarations";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {setOtp, togglePasscode} from "../state/slices/userSlice.ts";

const PasscodeInput: FC<PasscodeInputProps> = ({ action, setValue, clearErrors, errors, focused }: PasscodeInputProps) => {
  const {visiblePasscode, otp} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  if (typeof focused !== 'boolean') {
    focused = true;
  }

  const label = action === FORM_ACTION.REGISTER
    ? 'Enter a 6-digit passcode'
    : 'Enter your 6-digit passcode';

  const handleClickShowPassword = () => {
    dispatch(togglePasscode((!visiblePasscode)));
  };

  const handleChange = (otp: string) => {
    if (/^\d*$/.test(otp)) {
      dispatch(setOtp(otp));
      setValue("password", otp); // Set passcode value to react-hook-form
      clearErrors('password'); // Clear errors when passcode changes
    }
  };

  return (
    <>
      <Box>
        { action && <Box sx={{py: 2}}>{label}</Box> }
        <OtpInput
          inputType={visiblePasscode ? 'tel' : 'password'}
          value={otp}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus={focused}
          containerStyle="passcode-input"
          renderSeparator={<span>&nbsp;</span>}
          renderInput={(props) => (
            <input
              {...props}
              pattern="[0-9]*"
              inputMode="numeric"
            />
          )}
        />
        <Error field={errors.password}/>
      </Box>
      <Box sx={{my: 2, textAlign: 'center'}}>
        <Link to='#' onClick={handleClickShowPassword}>{visiblePasscode ? 'Hide' : 'Show'} Passcode</Link>
      </Box>
    </>
  );
}

export default PasscodeInput;
