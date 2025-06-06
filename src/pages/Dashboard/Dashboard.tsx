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
                title="ပြီးခဲ့သည့်လလက်ကျန်" amount={prevBalance}
                icon={<AccountBalanceWalletIcon/>}
            />
            <InfoCard
                title="ဝင်ငွေ"
                amount={ledger ? ledger.income : 0}
                icon={<BusinessCenterIcon/>}
                tooltip="ပြီးခဲ့သည့်လမှဝင်ငွေ"
            />
            <InfoCard
                title="အဖွင့်ငွေစာရင်း"
                amount={ledger ? ledger.current : 0}
                icon={<AccountBalanceIcon/>}
                tooltip="ပြီးခဲ့သည့်လလက်ကျန် + ဝင်ငွေ"
            />
            {
              (ledger && ledger.currency) &&
                <InfoCard
                    title={`ငွေလဲနှုန်း (for 1 ${ledger.currency})`}
                    amount={ledger ? ledger.exchangeRate : 0}
                    icon={<CurrencyExchangeIcon/>}
                    tooltip="Exchange Rate on Income"
                />
            }
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
                amount={ledger ? ledger.budget - ledger.expenseCash : 0}
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
                title="အပိတ်ငွေစာရင်း"
                amount={ledger ? prevBalance + ledger.netSaving : 0}
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
