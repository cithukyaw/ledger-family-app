import {FC, useState} from "react";
import {Box, Container} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Header from "../../components/Header/Header.tsx";
import InfoCard from "../../components/InfoCard.tsx";
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalculateIcon from '@mui/icons-material/Calculate';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MonthNavigator from "../../components/MonthNavigator.tsx";

const Dashboard: FC = () => {
  const [, setSelectedMonth] = useState('');

  return (
    <Box className="app">
      <Header title="Dashboard" />
      <Container maxWidth="lg">
        <MonthNavigator setSelectedMonth={setSelectedMonth} />
        <InfoCard title="Current" amount={9999999} icon={<AccountBalanceIcon/>} />
        <InfoCard title="Income" amount={9999999} icon={<BusinessCenterIcon/>} />
        <InfoCard title="Parent Support" amount={300000} icon={<FamilyRestroomIcon/>} />
        <InfoCard title="Budget" amount={999999} icon={<CalculateIcon/>} />
        <InfoCard title="Gross Saving" amount={999999} icon={<SavingsIcon/>} />
        <InfoCard title="Expense (Cash)" amount={999999} icon={<LocalAtmIcon/>} />
        <InfoCard title="Expense (Bank)" amount={999999} icon={<PaymentIcon/>} />
        <InfoCard title="Total Cost" amount={999999} icon={<MonetizationOnIcon/>} />
        <InfoCard title="Net Saving" amount={99999} icon={<WalletIcon/>} />
        <InfoCard title="Balance" amount={999999} icon={<AccountBalanceWalletIcon/>} />
      </Container>
      <Navbar/>
    </Box>
  );
}

export default Dashboard;
