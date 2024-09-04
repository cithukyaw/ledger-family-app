import {FC} from "react";

import LoginIcon from "@mui/icons-material/Login";
import {FORM_ACTION} from "../../lib/constants.ts";
import FormPasscode from "../../components/Forms/FormPasscode.tsx";

const LoginPasscode: FC = () => {
  return (
    <>
      <LoginIcon fontSize="large" color="warning" />
      <h1>Sign In</h1>

      <FormPasscode action={FORM_ACTION.LOGIN} />
    </>
  );
}

export default LoginPasscode;
