import {FC} from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from '@mui/icons-material/Dashboard';
import WalletIcon from '@mui/icons-material/Wallet';
import HomeIcon from "@mui/icons-material/Home";
import {NavLink, NavLinkRenderProps} from "react-router-dom";
import "./Navbar.scss";

const Navbar: FC = () => {
  const menuActive = (navData: NavLinkRenderProps) => navData.isActive ? "active" : "";

  return (
    <nav>
      <NavLink to="/dashboard" className={menuActive}>
        <HomeIcon />
        <div>Home</div>
      </NavLink>
      <NavLink to="/ledger" className={menuActive}>
        <WalletIcon />
        <div>Ledger</div>
      </NavLink>
      <NavLink to="/expense" className={menuActive}>
        <DashboardIcon />
        <div>Expense</div>
      </NavLink>
      <NavLink to="/account" className={menuActive}>
        <AccountCircleIcon />
        <div>Account</div>
      </NavLink>
    </nav>
  )
}

export default Navbar;
