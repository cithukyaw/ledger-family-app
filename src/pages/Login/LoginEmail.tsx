import {FC} from "react";
import LoginIcon from "@mui/icons-material/Login";
import {FORM_ACTION} from "../../lib/constants.ts";
import FormEmail from "../../components/Forms/FormEmail.tsx";
import Logo from "../../components/Logo.tsx";

const LoginEmail: FC = () => {
  return (
    <>
      <Logo />
      <h1>Sign In</h1>
      <LoginIcon fontSize="large" color="warning" />
      <FormEmail action={FORM_ACTION.LOGIN} />
    </>
  );
}

export default LoginEmail;
