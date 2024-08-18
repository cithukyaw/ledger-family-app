import {FC, useState} from "react";
import {FormActionProps} from "../types/declarations";
import {Box, Button} from "@mui/material";
import OtpInput from "react-otp-input";
import Error from "./Error.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {FORM_ACTION} from "../lib/constants.ts";

type FormValues = {
  password: string
}

const FormPasscode: FC<FormActionProps> = ({ action }: FormActionProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [visiblePasscode, setVisiblePasscode] = useState(false);
  const [otp, setOtp] = useState('');
  const {
    formState: {errors},
    handleSubmit
  } = useForm<FormValues>();

  const label = action === FORM_ACTION.REGISTER
    ? 'Enter a 6-digit passcode'
    : 'Enter your 6-digit passcode';

  const handleClickShowPassword = () => {
    setVisiblePasscode(!visiblePasscode);
  };

  const handleChange = (otp: string) => {
    if (/^\d*$/.test(otp)) {
      setOtp(otp);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    console.log(otp);
    setLoading(false);

    navigate('/dashboard');
  };

  return (
    <>
      <h4>dummy@example.com</h4>
      <Box component="form" autoComplete="off">
        <div>
          <Box sx={{py: 2}}>{label}</Box>
          <OtpInput
            inputType={visiblePasscode ? 'tel' : 'password'}
            value={otp}
            onChange={handleChange}
            numInputs={6}
            shouldAutoFocus={true}
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
        </div>
        <Box sx={{my: 2}}>
          <Link to='#' onClick={handleClickShowPassword}>{visiblePasscode ? 'Hide' : 'Show'} Passcode</Link>
        </Box>
        <div>
          <Button className="btn-orange" onClick={handleSubmit(onSubmit)} disabled={otp.length < 6 || loading}
                  variant="contained" size="large" fullWidth>
            { action === FORM_ACTION.REGISTER ? 'Register' : 'Sign In'}
          </Button>
        </div>
      </Box>
      <Box sx={{my: 2}}>
        <Link to={`/${action}`}>Back</Link>
      </Box>
    </>
  );
}

export default FormPasscode;
