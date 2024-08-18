import {FC} from "react";
import {Box} from "@mui/material";
import {ErrorProps} from "../types/declarations";

const Error: FC<ErrorProps> = ({ field } : ErrorProps) => {
  return field && <Box className="form-error">{field?.message}</Box>;
};

export default Error;
