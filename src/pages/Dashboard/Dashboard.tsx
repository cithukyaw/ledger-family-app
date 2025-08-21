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

  let opening = 0
  let budgetBalance = 0
  if (ledger) {
    opening = ledger.current + ledger.income
    budgetBalance = ledger.budget - ledger.expenseCash
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
              title="အဖွင့်ငွေစာရင်း (ဝင်ငွေမပါ)"
              amount={ledger ? ledger.current : 0}
              icon={<AccountBalanceIcon/>}
              tooltip="ရေတွက်စာရင်းရှိငွေ (ငွေသား + ဘဏ်)"
            />
            <InfoCard
              title="ဝင်ငွေ"
              amount={ledger ? ledger.income : 0}
              icon={<BusinessCenterIcon/>}
              tooltip="ပြီးခဲ့သည့်လမှဝင်ငွေ"
            />
            <InfoCard
                title="အဖွင့်ငွေစာရင်း (ဝင်ငွေအပါ)"
                amount={opening}
                icon={<AccountBalanceIcon/>}
            />
            <InfoCard
                title="မိဘထောက်ပံ့ငွေ"
                amount={ledger ? ledger.parentSupport : 0}
                icon={<FamilyRestroomIcon/>}
            />
            <InfoCard
                title="လျာထားအသုံးစရိတ် (ဘတ်ဂျက်)"
                amount={ledger ? ledger.budget : 0}
                icon={<CalculateIcon/>}
                tooltip="ယခုလသုံးစွဲရန်လျာထားငွေ (မိဘထောက်ပံ့ငွေမပါ)"
            />
            <InfoCard
                title="အကြမ်းဖျဥ်းစုငွေ"
                amount={ledger ? ledger.grossSaving : 0}
                icon={<SavingsIcon/>}
                tooltip="ဝင်ငွေ - (မိဘထောက်ပံ့ငွေ + ဘတ်ဂျက်)"
            />
            <InfoCard
                title="အသုံးစရိတ် (ငွေသား)"
                amount={ledger ? ledger.expenseCash : 0}
                icon={<LocalAtmIcon/>}
                tooltip="ယခုလငွေသားအသုံးစရိတ်"
            />
            <InfoCard
                title="အသုံးစရိတ် (ဘဏ်)"
                amount={ledger ? ledger.expenseBank : 0}
                icon={<PaymentIcon/>}
                tooltip="ယခုလဘဏ်အကောင့်များမှအသုံးစရိတ်"
            />
            <InfoCard
                title="စုစုပေါင်းကုန်ကျစရိတ်"
                amount={ledger ? ledger.cost : 0}
                icon={<MonetizationOnIcon/>}
                tooltip="ဘတ်ဂျက် + မိဘထောက်ပံ့ငွေ + အသုံးစရိတ် (ဘဏ်)"
            />
            <InfoCard
                title="ဘတ်ဂျက်ကျန်ငွေ"
                amount={budgetBalance}
                icon={<BalanceIcon/>}
                tooltip="ဘတ်ဂျက် - အသုံးစရိတ် (ငွေသား)"
            />
            <InfoCard
                title="အသားတင်စုငွေ"
                amount={ledger ? ledger.netSaving : 0}
                icon={<WalletIcon/>}
                tooltip="ဝင်ငွေ - စုစုပေါင်းကုန်ကျစရိတ်"
            />
            <InfoCard
              title="စာရင်းကျန်ငွေ"
              amount={ledger ? ledger.balance : 0}
              icon={<WalletIcon/>}
              tooltip="အဖွင့်ငွေစာရင်း (ဝင်ငွေအပါ) - စုစုပေါင်းကုန်ကျစရိတ်"
            />
            <InfoCard
              title="အပိုဝင်ငွေ"
              amount={ledger ? ledger.passiveIncome : 0}
              icon={<AccountBalanceWalletIcon/>}
            />
            <InfoCard
                title="အပိတ်ငွေစာရင်း"
                amount={ledger ? ledger.nextOpening : 0}
                icon={<AccountBalanceWalletIcon/>}
                tooltip="ပြီးခဲ့သည့်လလက်ကျန် + အသားတင်စုငွေ"
            />
          </>
        }
      </Container>
      <Navbar/>
    </Box>
  );
}

export default Dashboard;
