import {FC} from "react";
import logoImg from "/logo.png";

const HeaderLogo: FC = () => {
  return <img src={logoImg} alt="LedgerFamily" className="img-fluid logo"/>
}

export default HeaderLogo;
