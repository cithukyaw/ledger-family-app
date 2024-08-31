import {FC} from "react";
import LoginIcon from "@mui/icons-material/Login";
import {FORM_ACTION} from "../../lib/constants.ts";
import FormEmail from "../../components/FormEmail.tsx";

const LoginEmail: FC = () => {
  return (
    <>
      <LoginIcon fontSize="large" color="warning" />
      <h1>Sign In</h1>

      <FormEmail action={FORM_ACTION.LOGIN} />
    </>
  );
}

export default LoginEmail;
