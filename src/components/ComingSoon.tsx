import {FC} from "react";
import {Box} from "@mui/material";

const ComingSoon: FC = () => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems:  "center",
      height: "calc(100vh - (65.431px + 62.375px))"
    }}>
      <h1>Coming Soon!</h1>
    </Box>
  )
}

export default ComingSoon
