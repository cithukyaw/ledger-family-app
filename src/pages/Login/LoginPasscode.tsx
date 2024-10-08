import {FC} from "react";

import LoginIcon from "@mui/icons-material/Login";
import {FORM_ACTION} from "../../lib/constants.ts";
import FormPasscode from "../../components/Forms/FormPasscode.tsx";
import Logo from "../../components/Logo.tsx";

const LoginPasscode: FC = () => {
  return (
    <>
      <Logo />
      <h1>Sign In</h1>
      <LoginIcon fontSize="large" color="warning" />
      <FormPasscode action={FORM_ACTION.LOGIN} />
    </>
  );
}

export default LoginPasscode;
