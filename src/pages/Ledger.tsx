import {FC, useEffect} from "react";
import {Box, Button, Container, FormControl, MenuItem, Select, TextField} from "@mui/material";
import Header from "../components/Header/Header.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import Error from "../components/Error.tsx";
import {useForm} from "react-hook-form";
import {FormLedgerValues} from "../types/declarations";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoadingBackdrop from "../components/Loading/LoadingBackdrop.tsx";
import {getLoginUser} from "../lib/utils.ts";
import MonthNavigator from "../components/MonthNavigator.tsx";
import {useLazyQuery} from "../lib/hooks.ts";
import mQuery from "../queries/mutations.ts";
import {toast} from "react-toastify";
import config from "../lib/config.ts";
import {apiErrorHandling} from "../lib/api.ts";
import {useUserLedger} from "../queries/queries.hook.ts";
import Loading from "../components/Loading/Loading.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {CURRENCIES} from "../lib/constants.ts";

const Ledger: FC = () => {
  const { activeMonth } = useSelector((state: RootState) => state.monthNav);
  const user = getLoginUser();
  const {
    register,
    handleSubmit,
    formState: {errors},
    clearErrors,
    setError,
    setValue,
    watch
  } = useForm<FormLedgerValues>();

  const {data: ledger, isPending, isSuccess} = useUserLedger(user.id, activeMonth);

  const mutateQuery = useLazyQuery(
    async (formData: FormLedgerValues) => {
      await mQuery.saveLedger(formData); // post to server
    },
    {
      onSuccess: async () => { // when form submit is succeeded
        toast.success('Ledger saved!', config.toastOptions);
      },
      onError: err => { // when validation errors occur
        apiErrorHandling(err, setError)
      }
    }
  );

  useEffect(() => {
    setValue('current', ledger ? ledger.current : '');
    setValue('income', ledger ? ledger.income : '');
    setValue('parentSupport', ledger ? ledger.parentSupport : '');
    setValue('budget', ledger ? ledger.budget : '');
    setValue('exchangeRate', ledger ? ledger.exchangeRate : '');
    setValue('currency', ledger ? (ledger.currency || CURRENCIES.YEN) : CURRENCIES.YEN)
  }, [ledger, setValue]);

  const handleSubmitBtnClick = () => {
    clearErrors(); // Clear validation errors before submit trigger
    handleSubmit(submitForm)();
  };

  const submitForm = async (data: FormLedgerValues) => {
    if (ledger) {
      data.id = ledger.id;
    }
    data.userId         = user.id;
    data.date           = activeMonth;
    data.current        = Number(data.current);
    data.income         = Number(data.income);
    data.parentSupport  = Number(data.parentSupport);
    data.budget         = Number(data.budget);
    if (data.exchangeRate) {
      data.exchangeRate = Number(data.exchangeRate);
    }

    mutateQuery.reset();
    mutateQuery.mutate(data);
  };

  if (mutateQuery.isError) {
    mutateQuery.reset();
    toast.error('Cannot save ledger!', config.toastOptions);
  }

  return (
    <Box className="app">
      <Header title="Ledger" />
      <Container maxWidth="lg">
        <MonthNavigator />
        { isPending && <Loading/>}
        { isSuccess &&
          <Box component="form">
            <FormControl fullWidth>
              <Box component="label" className="my">အဖွင့်ငွေစာရင်း <span>*</span></Box>
              <TextField
                label="Enter your opening current amount"
                {...register('current', {required: 'အဖွင့်ငွေစာရင်းပမာဏကိုထည့်ပါ။'})}
                inputProps={{
                  type: "number",
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                variant="outlined"
                required fullWidth
              />
              <Error field={errors.current}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label" className="my">ဝင်ငွေ <span>*</span></Box>
              <TextField
                label="Enter your income amount"
                {...register('income', {required: 'ဝင်ငွေပမာဏကိုထည့်ပါ။'})}
                inputProps={{
                  type: "number",
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                variant="outlined"
                required fullWidth
              />
              <Error field={errors.income}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label" className="my">မိဘထောက်ပံ့ငွေ <span>*</span></Box>
              <TextField
                label="Enter your parent support amount"
                {...register('parentSupport', {required: 'မိဘထောက်ပံ့ငွေပမာဏကိုထည့်ပါ။'})}
                inputProps={{
                  type: "number",
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                variant="outlined"
                required fullWidth
              />
              <Error field={errors.parentSupport}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label" className="my">လျာထားအသုံးစရိတ် <span>*</span></Box>
              <TextField
                label="Enter your budget amount"
                {...register('budget', {required: 'လျာထားအသုံးစရိတ်ကိုထည့်ပါ။'})}
                inputProps={{
                  type: "number",
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                variant="outlined"
                required fullWidth
              />
              <Error field={errors.budget}/>
            </FormControl>

            <FormControl fullWidth>
                <Box component="label" className="my">ငွေလဲနှုန်း</Box>
                <TextField
                    label="Enter the last exchange rate"
                    {...register('exchangeRate')}
                    inputProps={{
                      type: "number",
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    }}
                    variant="outlined"
                    fullWidth
                />
                <Error field={errors.exchangeRate}/>
            </FormControl>

            <FormControl fullWidth>
                <Box component="label" className="my">ငွေကြေး</Box>
                <Select
                  {...register('currency')}
                  value={watch('currency') || CURRENCIES.YEN}
                  onChange={(e) => setValue('currency', e.target.value)}
                  fullWidth
                >
                  {Object.entries(CURRENCIES).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                <Error field={errors.currency}/>
            </FormControl>

            <FormControl fullWidth>
              <Button
                startIcon={<AddCircleOutlineIcon/>}
                className="btn-orange"
                onClick={handleSubmitBtnClick}
                variant="contained"
                size="large"
                fullWidth
              >
                <span className="my">သိမ်းမည်</span>
              </Button>
            </FormControl>
          </Box>
        }
      </Container>
      <Navbar/>
      <LoadingBackdrop open={mutateQuery.isPending} />
    </Box>
  );
}

export default Ledger;
