import React, {FC, useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {Box, Button, Card, CardContent, Container, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import Header from "../../components/Header/Header.tsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {Link} from "react-router-dom";
import {useExpenses} from "../../queries/queries.hook.ts";
import Loading from "../../components/Loading.tsx";
import ServerError from "../../components/ServerError.tsx";
import dayjs from "dayjs";
import ListCard from "../../components/ListCard.tsx";
import {ExpenseType} from "../../types/declarations";
import LoadingBackdrop from "../../components/LoadingBackdrop.tsx";

const Expense: FC = () => {
  const [filterMonth, setFilterMonth] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'))
  const [from, setFrom] = useState(dayjs().startOf('month'));  // First day of current month
  const [to, setTo] = useState(dayjs().endOf('month'));        // Last day of current month
  const [backdropOpen, setBackdropOpen] = useState(false);
  const { data, isPending, isRefetching, isSuccess, isError, refetch } = useExpenses(from, to);

  const getMonths = (count: number = 3): Array<{value: string, label: string}> => {
    const months = [];
    const currentDate = dayjs();

    for (let i = count - 1; i >= 0; i--) {
      months.push({
        value: currentDate.subtract(i, 'month').format('YYYY-MM-01'),
        label: currentDate.subtract(i, 'month').format('MMM YY')
      });
    }

    return months;
  }

  const handleMonthChange = async (_event: React.MouseEvent<HTMLElement>, selectedMonth: string) => {
    setFilterMonth(selectedMonth);
    const firstDayOfMonth = dayjs(selectedMonth);
    const lastDayOfMonth = firstDayOfMonth.endOf('month');
    // Update the state with the new date range
    setFrom(firstDayOfMonth);
    setTo(lastDayOfMonth);
  };

  // Use useEffect to trigger refetch after the state has been updated
  useEffect(() => {
    refetch().then(() => console.log(from.format("YYYY-MM-DD"), to.format("YYYY-MM-DD")));
  }, [from, to, refetch]);

  if (isError) {
    return <ServerError />
  }

  const expenses = isSuccess ? data.data : [];
  const total = isSuccess ? data.meta.total : 0;
  const totalCash = isSuccess ? data.meta.totalCash : 0;
  const totalBank = isSuccess ? data.meta.totalBank : 0;
  const months = getMonths();

  return (
    <Box className="app">
      <Header title="Expenses" />
      <Container maxWidth="lg">
        <Card sx={{ marginTop: "1.5em" }}>
          <CardContent>
            <ToggleButtonGroup
              color="warning"
              value={filterMonth}
              exclusive
              onChange={handleMonthChange}
              aria-label="Platform"
              fullWidth
              sx={{ marginBottom: "1em" }}
            >
              { months.map(mon => <ToggleButton key={mon.value} value={mon.value}>{mon.label}</ToggleButton> )}
            </ToggleButtonGroup>
            <Typography variant="h5" component="div" sx={{ textAlign: "center", fontWeight: "bold" }}>
              Total {total.toLocaleString()}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", textAlign: "center", marginTop: "1em" }}>
              <Box sx={{ margin: "0 2em" }}>
                <Typography variant="h6" component="div">{totalCash.toLocaleString()}</Typography>
                <Box sx={{ display: "flex", justifyContent: "center"  }}>
                  <LocalAtmIcon sx={{ marginRight: ".2em" }} color="warning" /> Cash
                </Box>
              </Box>
              <Box sx={{ margin: "0 2em" }}>
                <Typography variant="h6" component="div">{totalBank.toLocaleString()}</Typography>
                <Box sx={{ display: "flex", justifyContent: "center"  }}>
                  <CreditCardIcon sx={{ marginRight: ".2em" }} color="warning" /> Banking
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ margin: "1.5em 0" }}>
          <Button
            fullWidth
            className="btn-rounded btn-orange"
            size="large"
            variant="contained"
            component={Link}
            to="/expense/add"
            startIcon={<AddCircleOutlineIcon/>}
          >
            Add Expense
          </Button>
        </Box>

        { isPending || isRefetching
          ? <Loading />
          : Object.entries(expenses).length ?
              Object.entries(expenses).map(([key, value]) => (
                <ListCard key={key} title={key} data={value as ExpenseType[]} setBackdropOpen={setBackdropOpen} />
              ))
            : <Box sx={{ textAlign: "center", marginTop: "4em" }}>
                <p>Congrats!</p>
                <p>No expense for {from.format('MMM YYYY')}.</p>
              </Box>
        }
      </Container>
      <Navbar />
      <LoadingBackdrop open={backdropOpen} />
    </Box>
  );
}

export default Expense;
