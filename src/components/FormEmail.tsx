import {FC} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import Error from "./Error.tsx";
import {FORM_ACTION} from "../lib/constants.ts";
import {FormActionProps} from "../types/declarations";

type FormValues = {
  email: string
}

const FormEmail: FC<FormActionProps> = ({ action }: FormActionProps) => {
  const navigate = useNavigate();
  const loading = false; // useSelector(state => state.user.loading);
  const {
    register,
    // setError,
    formState: {errors},
    handleSubmit
  } = useForm<FormValues>();

  const label = action === FORM_ACTION.REGISTER
    ? 'Enter an email address'
    : 'Enter your login email address';

  const onSubmit = async () => {
    navigate(`/${action}/complete`);
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
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
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
