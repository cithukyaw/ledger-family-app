import {FC} from "react";
import {HeaderProps} from "../../types/declarations";
import "./Header.scss";

const Header: FC<HeaderProps> = ({ title }: HeaderProps) => {
  return (
    <div className="header">
      <span>{title}</span>
    </div>
  );
}

export default Header;
