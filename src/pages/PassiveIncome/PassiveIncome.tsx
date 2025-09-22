import {FC, useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography
} from "@mui/material";
import {usePassiveIncomes} from "../../queries/queries.hook.ts";
import Loading from "../../components/Loading/Loading.tsx";
import ServerError from "../../components/ServerError.tsx";
import dayjs from "dayjs";
import ListCard from "../../components/Card/ListCard.tsx";
import {ExpenseBarChartData, ExpenseType} from "../../types/declarations";
import LoadingBackdrop from "../../components/Loading/LoadingBackdrop.tsx";
import MonthNavigator from "../../components/MonthNavigator.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";
import config from "../../lib/config.ts";
import HeaderLogo from "../../components/Header/HeaderLogo.tsx";
import ExpenseChartView from "../Expense/ExpenseChartView.tsx";
import AddPassiveIncomeButton from "../../components/AddPassiveIncomeButton.tsx";
import Header from "../../components/Header/Header.tsx";

const PassiveIncome: FC = () => {
  const { activeMonth } = useSelector((state: RootState) => state.monthNav);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const { data, isPending, isRefetching, isSuccess, isError, refetch } = usePassiveIncomes(activeMonth);

  // Use useEffect to trigger refetch after the state has been updated
  useEffect(() => {
    refetch().then(() => console.log(dayjs(activeMonth).format(config.dateFormat)));
  }, [activeMonth, refetch]);

  if (isError) {
    return <ServerError />
  }

  const passiveIncomes = isSuccess ? data.data : [];
  const passiveIncomeExist = isSuccess ? Object.entries(passiveIncomes).length > 0 : false;
  const total = isSuccess ? data.meta.total : 0;
  const barChartData: ExpenseBarChartData[] = [];

  if (passiveIncomeExist) {
    // Prepare bar chart data for passive incomes by day
    Object.entries(passiveIncomes).forEach(([key, value]) => {
      const totalByDay = value.reduce((total, row) => total + row.amount, 0);
      barChartData.push({
        day: key,
        amount: totalByDay,
      });
    });
    barChartData.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()); // asc sort by day
  }

  return (
    <Box className="app">
      <Header title="Passive Income" />

      <Container maxWidth="lg">
        <Card sx={{mt: "1.5em"}}>
          <CardContent>
            <MonthNavigator/>
            <Typography variant="h5" component="div" sx={{textAlign: "center", fontWeight: "bold"}}>
              <span className="my">စုစုပေါင်း</span> {total.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>

        <Box sx={{margin: "1.5em 0"}}>
          <AddPassiveIncomeButton/>
        </Box>

        {isPending || isRefetching
          ? <Loading/>
          : (
            passiveIncomeExist ? (
              <>
                <ExpenseChartView data={barChartData} month={activeMonth} title="ရက်အလိုက်အပိုဝင်ငွေ" />
                {Object.entries(passiveIncomes).map(([key, value]) => (
                  <ListCard key={key} title={key} data={value as ExpenseType[]} setBackdropOpen={setBackdropOpen} type="passive-income"/>
                ))}
                {/* Add Passive Income button after the chart or list */}
                <Box sx={{marginTop: "1.5em"}}>
                  <AddPassiveIncomeButton/>
                </Box>
              </>
            ) : (
              <Box sx={{textAlign: "center", marginTop: "4em"}}>
                <p>No passive income for {dayjs(activeMonth).format('MMM YYYY')}.</p>
              </Box>
            )
          )
        }
      </Container>
      <Navbar/>
      <LoadingBackdrop open={backdropOpen}/>
    </Box>
  );
}

export default PassiveIncome;
