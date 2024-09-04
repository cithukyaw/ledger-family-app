import {FC, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import Error from "../Error.tsx";
import {FORM_ACTION} from "../../lib/constants.ts";
import {FormActionProps, FormEmailValues, UserContextType} from "../../types/declarations";
import {UserContext} from "../../contexts/userContext.tsx";
import {useLazyQuery} from "../../lib/hooks.ts";
import mQuery from "../../queries/mutations.ts";
import {apiErrorHandling} from "../../lib/api.ts";

const FormEmail: FC<FormActionProps> = ({ action }: FormActionProps) => {
  const {email, setEmail} = useContext<UserContextType>(UserContext);
  const [emailInput, setEmailInput] = useState<string>(email); // Pre-fill if already provided
  const navigate = useNavigate();
  const {
    register,
    setError,
    clearErrors,
    formState: {errors},
    handleSubmit
  } = useForm<FormEmailValues>();

  const label = action === FORM_ACTION.REGISTER
    ? 'Enter an email address'
    : 'Enter your login email address';

  const query = useLazyQuery(
    async (formData: FormEmailValues) => {
      if (action === FORM_ACTION.REGISTER) {
        return mQuery.checkAvailability(formData);
      } else {
        return mQuery.prerequisiteLogin(formData);
      }
    }, {
      onSuccess: () => navigate(`/${action}/complete`),
      onError: err => apiErrorHandling(err, setError)
    }
  );

  const submitForm = async (data: FormEmailValues) => {
    setEmail(data.email); // update context value
    const formData = { email: data.email };
    query.mutate(formData); // call mutate with the correct form data
  };

  return (
    <>
      <Box component="form" autoComplete="off">
        <div>
          <Box sx={{ py: 2 }}>{label}</Box>
          <TextField
            {...register("email", {
              required: label,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            type="email"
            value={emailInput}
            onChange={e => {
              setEmailInput(e.target.value)
              clearErrors('email'); // Clear errors when email value changes;
            }}
            error={!!errors.email}
            id="outlined-email"
            label="Login Email"
            variant="outlined"
            autoComplete="off"
            required fullWidth
          />
          <Error field={errors.email} />
        </div>
        <div>
          <Button
            className="btn-orange"
            onClick={handleSubmit(submitForm)}
            disabled={query.isPending}
            variant="contained"
            size="large"
            fullWidth
          >
            Next
          </Button>
        </div>
      </Box>
      <Box sx={{ my: 2 }}>
        { action === FORM_ACTION.REGISTER
          ? <Link to="/login">Already have an account? Sign in here</Link>
          : <Link to="/register">If you don't have an account, <br />please sign up here</Link>
        }
      </Box>
    </>
  );
};

export default FormEmail;
