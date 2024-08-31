import {FC, useContext, useEffect, useState} from "react";
import {FormActionProps, FormUserValues, JSONValue, User, UserContextType, UserWithTokens} from "../types/declarations";
import {Box, Button} from "@mui/material";
import OtpInput from "react-otp-input";
import Error from "./Error.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {FORM_ACTION} from "../lib/constants.ts";
import {UserContext} from "../contexts/userContext.tsx";
import {useLazyQuery} from "../lib/hooks.ts";
import {apiErrorHandling} from "../lib/api.ts";
import mQuery from "../queries/mutations.ts";
import {getItemDecrypted, storeItemEncrypted} from "../lib/utils.ts";

const FormPasscode: FC<FormActionProps> = ({ action }: FormActionProps) => {
  let {email} = useContext<UserContextType>(UserContext);
  const navigate = useNavigate();
  const [visiblePasscode, setVisiblePasscode] = useState(false);
  const [otp, setOtp] = useState('');
  const {
    formState: {errors},
    setError,
    clearErrors,
    setValue,
    handleSubmit
  } = useForm<FormUserValues>();

  if (!email) {
    const user = getItemDecrypted('user') as User;
    if (user) {
       email = user.email
    }
  }
  setValue('email', email);  // Set email value to react-hook-form

  useEffect(() => {
    if (!email) {
      navigate(`/${action}`);
    }
  }, []);

  const label = action === FORM_ACTION.REGISTER
    ? 'Enter a 6-digit passcode'
    : 'Enter your 6-digit passcode';

  const handleClickShowPassword = () => {
    setVisiblePasscode(!visiblePasscode);
  };

  const handleChange = (otp: string) => {
    if (/^\d*$/.test(otp)) {
      setOtp(otp);
      setValue("password", otp); // Set passcode value to react-hook-form
      clearErrors('password'); // Clear errors when passcode changes
    }
  };

  const query = useLazyQuery(
    async (formData: FormUserValues) => {
      let result: UserWithTokens;
      if (action == FORM_ACTION.REGISTER) {
        result = await mQuery.register(formData) as UserWithTokens;
      } else {
        result = await mQuery.login(formData) as UserWithTokens;
      }

      storeItemEncrypted('user', result.user as JSONValue)
    },
    {
      onSuccess: () => navigate(`/dashboard`),
      onError: err => apiErrorHandling(err, setError)
    }
  );

  const submitForm = async () => {
    const data: FormUserValues = {
      email,
      password: otp,
    }
    query.mutate(data);
  };

  return (
    <>
      <Box component="form" autoComplete="off">
        <h4>{email} <Link to={`/${action}`}>[Change]</Link></h4>
        <Error field={errors.email}/>
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
          <Button
            onClick={handleSubmit(submitForm)}
            disabled={otp.length < 6 || query.isPending}
            className="btn-orange"
            variant="contained"
            size="large"
            fullWidth
          >
            {action === FORM_ACTION.REGISTER ? 'Register' : 'Sign In'}
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