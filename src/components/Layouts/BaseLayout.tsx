import {FC} from "react";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BaseLayout: FC = () => {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  )
}

export default BaseLayout;
