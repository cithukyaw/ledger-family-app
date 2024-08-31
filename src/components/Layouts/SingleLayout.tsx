import {FC} from "react";

import {Outlet} from "react-router-dom";
import {Container} from "@mui/material";

const SingleLayout: FC = () => {
  return (
    <Container maxWidth="md" sx={{
      padding: "1.45rem 0",
      textAlign: "center"
    }}>
      <Outlet />
    </Container>
  )
}

export default SingleLayout;
