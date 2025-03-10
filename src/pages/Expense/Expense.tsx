import React, {FC, useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Drawer,
  IconButton, styled,
  ToggleButton,
  ToggleButtonGroup, toggleButtonGroupClasses,
  Typography
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BarChartIcon from '@mui/icons-material/BarChart';
import {Link} from "react-router-dom";
import {useCategories, useExpenses} from "../../queries/queries.hook.ts";
import Loading from "../../components/Loading/Loading.tsx";
import ServerError from "../../components/ServerError.tsx";
import dayjs from "dayjs";
import ListCard from "../../components/Card/ListCard.tsx";
import {CategoryType, ExpenseChartData, ExpenseType} from "../../types/declarations";
import LoadingBackdrop from "../../components/Loading/LoadingBackdrop.tsx";
import MonthNavigator from "../../components/MonthNavigator.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../state/store.ts";
import config from "../../lib/config.ts";
import HeaderLogo from "../../components/Header/HeaderLogo.tsx";
import ExpenseChartView from "./ExpenseChartView.tsx";
import {PAY_TYPE_GROUP} from "../../lib/constants.ts";

const Expense: FC = () => {
  const { activeMonth } = useSelector((state: RootState) => state.monthNav);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedPayType, setSelectedPayType] = useState<string>('');
  const [viewMode, setViewMode] = useState<string>('list');
  const { data: categories, isSuccess: isCategorySuccess } = useCategories();
  const { data, isPending, isRefetching, isSuccess, isError, refetch } = useExpenses(activeMonth, selectedCategories, selectedPayType);

  // Use useEffect to trigger refetch after the state has been updated
  useEffect(() => {
    refetch().then(() => console.log(dayjs(activeMonth).format(config.dateFormat)));
  }, [activeMonth, refetch]);

  const applyFilters = () => {
    refetch().then(() => console.log(selectedCategories));
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCategorySelection = (
    _event: React.MouseEvent<HTMLElement>,
    categories: number[]
  ) => {
    setSelectedCategories(categories);
  };

  const handlePayTypeSelection = (
    _event: React.MouseEvent<HTMLElement>,
    type: string
  ) => {
    setSelectedPayType(type);
  }

  const handleViewMode = (
    _event: React.MouseEvent<HTMLElement>,
    newViewMode: string,
  ) => {
    setViewMode(newViewMode);
  }

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      margin: theme.spacing(0.5),
      borderRadius: theme.shape.borderRadius
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]: {
      marginLeft: 0,
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    },
  }));

  const getSelectedCategoryList = (): string => {
    const names: string[] = [];

    selectedCategories.map(id => {
      const category = categories.find((cat: CategoryType) => cat.id === id);
      names.push(category.name);
    });

    return names.length > 0 ? names.join(', ') : '';
  }

  if (isError) {
    return <ServerError />
  }

  const expenses = isSuccess ? data.data : [];
  const expenseExist = isSuccess ? Object.entries(expenses).length > 0 : false;
  const total = isSuccess ? data.meta.total : 0;
  const totalCash = isSuccess ? data.meta.totalCash : 0;
  const totalBank = isSuccess ? data.meta.totalBank : 0;

  // Prepare data for chart
  const chartData: ExpenseChartData[] = [];
  if (expenseExist) {
    Object.entries(expenses).forEach(([key, value]) => {
      const totalByDay = value.reduce((total, row) => total + row.amount, 0);
      chartData.push({
        day: key,
        amount: totalByDay,
      });
    });
    chartData.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()); // sort by day
  }

  return (
    <Box className="app">
      <Box className="header" sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".6em 1em"
      }}>
        <Box>
          <HeaderLogo />
          <Box component="span">Expenses</Box>
        </Box>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      { isCategorySuccess &&
        <Drawer open={drawerOpen} anchor="top" onClose={handleDrawerOpen}>
          <Container>
            <Box sx={{ py: "1.5em" }}>
              <Box component="h3" sx={{ mt: 0, mb: 1, textAlign: 'center'}}>Category Filter</Box>
              <Box>
                <StyledToggleButtonGroup
                    size="small"
                    value={selectedCategories}
                    onChange={handleCategorySelection}
                    aria-label="Category Filter"
                    sx={{display: "flex", justifyContent: "center", flexWrap: "wrap", py: ".3em"}}
                >
                  { categories.map((cat: CategoryType) =>
                    <ToggleButton key={cat.id} value={cat.id} aria-label={cat.name}>{cat.name}</ToggleButton>
                  )}
                </StyledToggleButtonGroup>
              </Box>
              <Box sx={{ py: "1.5em", textAlign: "center" }}>
                  <Box component="h3" sx={{ mt: 0, mb: 2, textAlign: 'center'}}>Payment Type Filter</Box>
                  <ToggleButtonGroup
                      size="small"
                      value={selectedPayType}
                      exclusive
                      onChange={handlePayTypeSelection}
                      aria-label="Payment Type Filter"
                  >
                      <ToggleButton value={PAY_TYPE_GROUP.CASH} aria-label={PAY_TYPE_GROUP.CASH}>
                          <LocalAtmIcon sx={{marginRight: ".2em"}} color="warning"/> Cash
                      </ToggleButton>
                      <ToggleButton value={PAY_TYPE_GROUP.BANK} aria-label={PAY_TYPE_GROUP.BANK}>
                          <CreditCardIcon sx={{marginRight: ".2em"}} color="warning"/> Bank
                      </ToggleButton>
                  </ToggleButtonGroup>
              </Box>
              <Button
                className="btn-orange"
                variant="contained"
                fullWidth
                onClick={applyFilters}
              >
                Apply Filter
              </Button>
              <Box sx={{ textAlign: 'center', mb: 0}} component="p">
                <a href="#" onClick={handleDrawerOpen}>Close</a>
              </Box>
            </Box>
          </Container>
        </Drawer>
      }

      <Container maxWidth="lg">
        <Card sx={{mt: "1.5em"}}>
          <CardContent>
            <MonthNavigator/>
            <Typography variant="h5" component="div" sx={{textAlign: "center", fontWeight: "bold"}}>
              Total {total.toLocaleString()}
            </Typography>
            { selectedCategories.length > 0 &&
              <Box sx={{textAlign: "center", mt: 1}}>{ `(${getSelectedCategoryList()})` }</Box>
            }
            <Box sx={{display: "flex", justifyContent: "center", textAlign: "center", marginTop: "1em"}}>
              <Box sx={{margin: "0 2em"}}>
                <Typography variant="h6" component="div">{totalCash.toLocaleString()}</Typography>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  <LocalAtmIcon sx={{marginRight: ".2em"}} color="warning"/> Cash
                </Box>
              </Box>
              <Box sx={{margin: "0 2em"}}>
                <Typography variant="h6" component="div">{totalBank.toLocaleString()}</Typography>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                  <CreditCardIcon sx={{marginRight: ".2em"}} color="warning"/> Banking
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{margin: "1.5em 0"}}>
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

        { expenseExist &&
          <Box sx={{textAlign: "right"}}>
            <ToggleButtonGroup
              size="small"
              value={viewMode}
              exclusive
              onChange={handleViewMode}
              aria-label="view mode"
            >
              <ToggleButton value="list" aria-label="list">
                <FormatListBulletedIcon />
              </ToggleButton>
              <ToggleButton value="chart" aria-label="chart">
                <BarChartIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        }

        {isPending || isRefetching
          ? <Loading/>
          : (
            expenseExist ?
              (viewMode === 'chart' ?
                  <ExpenseChartView data={chartData} month={activeMonth} /> :
                  Object.entries(expenses).map(([key, value]) => (
                    <ListCard key={key} title={key} data={value as ExpenseType[]} setBackdropOpen={setBackdropOpen}/>
                  ))
              ) :
              <Box sx={{textAlign: "center", marginTop: "4em"}}>
                <p>Congrats!</p>
                <p>No expense for {dayjs(activeMonth).format('MMM YYYY')}.</p>
              </Box>
            )
        }
      </Container>
      <Navbar/>
      <LoadingBackdrop open={backdropOpen}/>
    </Box>
  );
}

export default Expense;
