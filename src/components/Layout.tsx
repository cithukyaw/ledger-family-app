import {FC} from "react";
import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";

const Layout: FC = () => {
  return (
    <Container maxWidth="md">
      <Outlet />
    </Container>
  )
}

export default Layout;
