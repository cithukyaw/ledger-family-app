import {FC} from "react";
import {Box, Container, Tooltip} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Header from "../../components/Header/Header.tsx";
import InfoCard from "../../components/Card/InfoCard.tsx";
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
import {green, grey, red} from "@mui/material/colors";
import dayjs from "dayjs";
import config from "../../lib/config.ts";

const Dashboard: FC = () => {
  const { activeMonth } = useSelector((state: RootState) => state.monthNav);
  const prevMonth = dayjs(activeMonth).subtract(1, 'month').startOf('month').format(config.dateFormat);
  const user = getLoginUser();
  const {data: ledger, isPending, isSuccess} = useUserLedger(user.id, activeMonth);
  const {data: prevLedger} = useUserLedger(user.id, prevMonth);

  let opening = 0
  let budgetBalance = 0
  let totalCost = 0;
  let current = 0;
  let diff = 0;
  if (ledger) {
    opening = ledger.current + ledger.income
    budgetBalance = ledger.budget - ledger.expenseCash
    current = ledger.current
    totalCost = ledger.parentSupport + ledger.expenseCash + ledger.expenseBank
    if (prevLedger) {
      // the difference between this month current and the previous month balance
      // incomePenny is already included in current, so subtract it from current
      diff = current - prevLedger.nextOpening - ledger.incomePenny;
    }
  }

  return (
    <Box className="app">
      <Header title="Dashboard" />
      <Container maxWidth="lg">
        <MonthNavigator />
        { isPending && <Loading/>}
        { isSuccess &&
          <>
            { prevLedger &&
              <Box sx={{ textAlign: 'center'}}>
                <Box sx={{ fontSize: '0.8rem' }}>ပြီးခဲ့သည့်လအပိတ်ငွေစာရင်း</Box>
                <Box>
                  { `${prevLedger.nextOpening.toLocaleString()} ${config.currencyUnit}` }
                  <Tooltip title="ledger.current - prevLedger.nextOpening - ledger.incomePenny" enterTouchDelay={0} leaveTouchDelay={3000} arrow>
                    <Box component="span" sx={{ px: '0.3rem', color: diff >= 0 ? 'green' : 'red' }}>
                      ({diff > 0 ? '+' : ''}{diff.toLocaleString()})
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            }

            <InfoCard
              title="အဖွင့်ငွေစာရင်း (ဝင်ငွေမပါ)"
              amount={current}
              icon={<AccountBalanceIcon/>}
              tooltip="ရေတွက်စာရင်းရှိ ငွေသားနှင့်ဘဏ်စုစုပေါင်း (current)"
            />
            <InfoCard
              title="ဝင်ငွေ"
              amount={ledger ? ledger.income : 0}
              icon={<BusinessCenterIcon/>}
              tooltip="ပြီးခဲ့သည့်လမှဝင်ငွေ (income)"
            />
            <InfoCard
                title="အဖွင့်ငွေစာရင်း (ဝင်ငွေအပါ)"
                amount={opening}
                icon={<AccountBalanceIcon/>}
                tooltip="အဖွင့်ငွေစာရင်း (current) + ဝင်ငွေ (income)"
            />
            <InfoCard
                title="မိဘထောက်ပံ့ငွေ"
                amount={ledger ? ledger.parentSupport : 0}
                icon={<FamilyRestroomIcon/>}
                tooltip="parentSupport"
            />
            <InfoCard
                title="လျာထားအသုံးစရိတ် (ဘတ်ဂျက်)"
                amount={ledger ? ledger.budget : 0}
                icon={<CalculateIcon/>}
                tooltip="ယခုလသုံးစွဲရန်လျာထားငွေ (မိဘထောက်ပံ့ငွေမပါ)"
            />
            {/*<InfoCard*/}
            {/*    title="အကြမ်းဖျဥ်းစုငွေ"*/}
            {/*    amount={ledger ? ledger.grossSaving : 0}*/}
            {/*    icon={<SavingsIcon/>}*/}
            {/*    tooltip="ဝင်ငွေ - (မိဘထောက်ပံ့ငွေ + ဘတ်ဂျက်)"*/}
            {/*/>*/}
            <InfoCard
                title="အသုံးစရိတ် (ငွေသား)"
                amount={ledger ? ledger.expenseCash : 0}
                icon={<LocalAtmIcon/>}
                tooltip="ယခုလငွေသားအသုံးစရိတ် (expenseCash)"
            />
            <InfoCard
                title="အသုံးစရိတ် (ဘဏ်)"
                amount={ledger ? ledger.expenseBank : 0}
                icon={<PaymentIcon/>}
                tooltip="ယခုလဘဏ်မှအသုံးစရိတ် (expenseBank)"
            />
            <InfoCard
                title="စုစုပေါင်းကုန်ကျစရိတ်"
                amount={totalCost}
                icon={<MonetizationOnIcon/>}
                color={red[800]}
                tooltip="cost: မိဘထောက်ပံ့ငွေ + အသုံးစရိတ်ငွေသား + ဘဏ်အသုံးစရိတ်"
            />
            <InfoCard
                title="ဘတ်ဂျက်ကျန်ငွေ"
                amount={budgetBalance}
                icon={<CalculateIcon/>}
                color={grey[900]}
                tooltip="ဘတ်ဂျက် (budget) - အသုံးစရိတ်ငွေသား (expenseCash)"
            />
            <InfoCard
                title="အသားတင်စုငွေ"
                amount={ledger ? ledger.netSaving : 0}
                icon={<WalletIcon/>}
                color={green[500]}
                tooltip="netSaving: ဝင်ငွေ - စုစုပေါင်းကုန်ကျစရိတ်"
            />
            <InfoCard
              title="စာရင်းကျန်ငွေ"
              amount={ledger ? ledger.balance : 0}
              icon={<BalanceIcon/>}
              tooltip="balance: အဖွင့်ငွေစာရင်း (ဝင်ငွေအပါ) - စုစုပေါင်းကုန်ကျစရိတ်"
            />
            <InfoCard
              title="အပိုဝင်ငွေ"
              amount={ledger ? ledger.passiveIncome : 0}
              icon={<AccountBalanceWalletIcon/>}
              tooltip="passiveIncome"
              navigateTo="/passive-income"
            />
            <InfoCard
              title="စုငွေစုစုပေါင်း"
              amount={ledger ? ledger.totalSaving : 0}
              icon={<WalletIcon/>}
              color={green[700]}
              tooltip="totalSaving: အသားတင်စုငွေ (netSaving) + အပိုဝင်ငွေ (passiveIncome)"
            />
            <InfoCard
              title="အပိတ်ငွေစာရင်း"
              amount={ledger ? ledger.nextOpening : 0}
              icon={<AccountBalanceIcon/>}
              tooltip="စာရင်းကျန်ငွေ (balance) + အပိုဝင်ငွေ (passiveIncome)"
            />
          </>
        }
      </Container>
      <Navbar/>
    </Box>
  );
}

export default Dashboard;
