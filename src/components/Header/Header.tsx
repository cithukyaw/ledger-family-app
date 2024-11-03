import {FC} from "react";
import {HeaderProps} from "../../types/declarations";
import "./Header.scss";
import HeaderLogo from "./HeaderLogo.tsx";

const Header: FC<HeaderProps> = ({ title }: HeaderProps) => {
  return (
    <div className="header">
      <HeaderLogo />
      <span>{title}</span>
    </div>
  );
}

export default Header;
