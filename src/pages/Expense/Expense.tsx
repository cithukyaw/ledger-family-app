import {FC, useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {Box, Button, Card, CardContent, Container, Typography} from "@mui/material";
import Header from "../../components/Header/Header.tsx";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {Link} from "react-router-dom";
import {useExpenses} from "../../queries/queries.hook.ts";
import Loading from "../../components/Loading/Loading.tsx";
import ServerError from "../../components/ServerError.tsx";
import dayjs from "dayjs";
import ListCard from "../../components/Card/ListCard.tsx";
import {ExpenseType} from "../../types/declarations";
import LoadingBackdrop from "../../components/Loading/LoadingBackdrop.tsx";
import MonthNavigator from "../../components/MonthNavigator.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";
import config from "../../lib/config.ts";

const Expense: FC = () => {
  const { activeMonth } = useSelector((state: RootState) => state.monthNav);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const { data, isPending, isRefetching, isSuccess, isError, refetch } = useExpenses(activeMonth);

  // Use useEffect to trigger refetch after the state has been updated
  useEffect(() => {
    refetch().then(() => console.log(dayjs(activeMonth).format(config.dateFormat)));
  }, [activeMonth, refetch]);

  if (isError) {
    return <ServerError />
  }

  const expenses = isSuccess ? data.data : [];
  const total = isSuccess ? data.meta.total : 0;
  const totalCash = isSuccess ? data.meta.totalCash : 0;
  const totalBank = isSuccess ? data.meta.totalBank : 0;

  return (
    <Box className="app">
      <Header title="Expenses" />
      <Container maxWidth="lg">
        <Card sx={{ marginTop: "1.5em" }}>
          <CardContent>
            <MonthNavigator />
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
                <p>No expense for {dayjs(activeMonth).format('MMM YYYY')}.</p>
              </Box>
        }
      </Container>
      <Navbar />
      <LoadingBackdrop open={backdropOpen} />
    </Box>
  );
}

export default Expense;
