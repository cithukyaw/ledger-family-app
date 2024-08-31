import {FC} from "react";

import {Outlet} from "react-router-dom";

const BaseLayout: FC = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default BaseLayout;
