import {FC} from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import {LoadingBackdropProps} from "../../types/declarations";

const LoadingBackdrop: FC<LoadingBackdropProps> = ({ open }: LoadingBackdropProps) => {
  return (
    <Backdrop open={open} sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default LoadingBackdrop;
