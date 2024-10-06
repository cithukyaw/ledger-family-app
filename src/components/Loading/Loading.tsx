import {FC} from "react";
import {Box, CircularProgress, SxProps} from "@mui/material";
import {LoadingProps} from "../../types/declarations";

const Loading: FC<LoadingProps> = ({ fullScreen = false }: LoadingProps) => {
  const style: SxProps = fullScreen
    ? { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }
    : { display: 'flex', justifyContent: 'center' }

  return (
    <Box sx={style}>
      <CircularProgress />
    </Box>
  )
}

export default Loading;
