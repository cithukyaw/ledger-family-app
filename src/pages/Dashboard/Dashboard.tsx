import {FC} from "react";
import {Box, Container} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Header from "../../components/Header/Header.tsx";
import InfoCard from "../../components/Card/InfoCard.tsx";
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import WalletIcon from '@mui/icons-material/Wallet';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalculateIcon from '@mui/icons-material/Calculate';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import BalanceIcon from '@mui/icons-material/Balance';
import MonthNavigator from "../../components/MonthNavigator.tsx";
import {useUserLedger} from "../../queries/queries.hook.ts";
import {getLoginUser} from "../../lib/utils.ts";
import Loading from "../../components/Loading/Loading.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";

const Dashboard: FC = () => {
  const { activeMonth } = useSelector((state: RootState) => state.monthNav);
  const user = getLoginUser();
  const {data: ledger, isPending, isSuccess} = useUserLedger(user.id, activeMonth);

  let prevBalance = 0;
  if (ledger) {
    prevBalance = ledger.current - ledger.income;
  }

  return (
    <Box className="app">
      <Header title="Dashboard" />
      <Container maxWidth="lg">
        <MonthNavigator />
        { isPending && <Loading/>}
        { isSuccess &&
          <>
            <InfoCard
                title="Previous Balance" amount={prevBalance}
                icon={<AccountBalanceWalletIcon/>}
            />
            <InfoCard
                title="Income"
                amount={ledger ? ledger.income : 0}
                icon={<BusinessCenterIcon/>}
                tooltip="Income from the previous month"
            />
            <InfoCard
                title="Current"
                amount={ledger ? ledger.current : 0}
                icon={<AccountBalanceIcon/>}
                tooltip="Previous Balance + Income"
            />
            {
              (ledger && ledger.currency) &&
                <InfoCard
                    title={`Exchange Rate (for 1 ${ledger.currency})`}
                    amount={ledger ? ledger.exchangeRate : 0}
                    icon={<CurrencyExchangeIcon/>}
                    tooltip="Exchange Rate on Income"
                />
            }
            <InfoCard
                title="Parent Support"
                amount={ledger ? ledger.parentSupport : 0}
                icon={<FamilyRestroomIcon/>}
            />
            <InfoCard
                title="Budget"
                amount={ledger ? ledger.budget : 0}
                icon={<CalculateIcon/>}
                tooltip="Monthly budget excluding parent support"
            />
            <InfoCard
                title="Gross Saving"
                amount={ledger ? ledger.grossSaving : 0}
                icon={<SavingsIcon/>}
                tooltip="Income - (Parent Support + Budget)"
            />
            <InfoCard
                title="Expense (Cash)"
                amount={ledger ? ledger.expenseCash : 0}
                icon={<LocalAtmIcon/>}
                tooltip="Monthly expense by cash"
            />
            <InfoCard
                title="Expense (Bank)"
                amount={ledger ? ledger.expenseBank : 0}
                icon={<PaymentIcon/>}
                tooltip="Monthly expense by digital accounts"
            />
            <InfoCard
                title="Total Cost"
                amount={ledger ? ledger.cost : 0}
                icon={<MonetizationOnIcon/>}
                tooltip="Budget + Parent Support + Expense (Bank)"
            />
            <InfoCard
                title="Budget Balance"
                amount={ledger ? ledger.budget - ledger.expenseCash : 0}
                icon={<BalanceIcon/>}
                tooltip="Budget - Expense (Cash)"
            />
            <InfoCard
                title="Net Saving"
                amount={ledger ? ledger.netSaving : 0}
                icon={<WalletIcon/>}
                tooltip="Income - Total Cost"
            />
            <InfoCard
                title="Closing Current"
                amount={ledger ? prevBalance + ledger.netSaving : 0}
                icon={<AccountBalanceWalletIcon/>}
                tooltip="Previous Balance + Net Saving"
            />
          </>
        }
      </Container>
      <Navbar/>
    </Box>
  );
}

export default Dashboard;
