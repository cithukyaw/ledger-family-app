import {FC, useState} from "react";
import {Box, Button, Container, FormControl, TextField} from "@mui/material";
import Header from "../components/Header/Header.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import Error from "../components/Error.tsx";
import {useForm} from "react-hook-form";
import {FormLedgerValues} from "../types/declarations";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoadingBackdrop from "../components/LoadingBackdrop.tsx";
import {getLoginUser} from "../lib/utils.ts";
import MonthNavigator from "../components/MonthNavigator.tsx";
import {useLazyQuery} from "../lib/hooks.ts";
import mQuery from "../queries/mutations.ts";
import {toast} from "react-toastify";
import config from "../lib/config.ts";
import {apiErrorHandling} from "../lib/api.ts";
import {useUserLedger} from "../queries/queries.hook.ts";
import dayjs from "dayjs";
import Loading from "../components/Loading.tsx";
import {useQueryClient} from "@tanstack/react-query";
import {queries} from "../queries/queries.ts";

const Ledger: FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs().startOf('month').format(config.dateFormat));
  const queryClient = useQueryClient();
  const user = getLoginUser();
  const {
    register,
    handleSubmit,
    formState: {errors},
    clearErrors,
    setError
  } = useForm<FormLedgerValues>();

  const {data: ledger, isPending} = useUserLedger(user.id, selectedMonth);

  const mutateQuery = useLazyQuery(
    async (formData: FormLedgerValues) => {
      await mQuery.saveLedger(formData); // post to server
    },
    {
      onSuccess: async () => { // when form submit is succeeded
        toast.success('Ledger saved!', config.toastOptions);
        await queryClient.invalidateQueries({
          queryKey: queries.users.ledgers(user.id, selectedMonth).queryKey
        });
      },
      onError: err => { // when validation errors occur
        apiErrorHandling(err, setError)
      }
    }
  );

  const handleSubmitBtnClick = () => {
    clearErrors(); // Clear validation errors before submit trigger
    handleSubmit(submitForm)();
  };

  const submitForm = async (data: FormLedgerValues) => {
    if (ledger) {
      data.id = ledger.id;
    }
    data.userId         = user.id;
    data.date           = selectedMonth;
    data.current        = Number(data.current);
    data.income         = Number(data.income);
    data.parentSupport  = Number(data.parentSupport);
    data.budget         = Number(data.budget);

    mutateQuery.reset();
    mutateQuery.mutate(data);
  };

  if (isPending) {
    return <Loading fullScreen={true} />
  }

  if (mutateQuery.isError) {
    mutateQuery.reset();
    toast.error('Cannot save ledger!', config.toastOptions);
  }

  return (
    <Box className="app">
      <Header title="Ledger" />
      <Container maxWidth="lg">
        <MonthNavigator setSelectedMonth={setSelectedMonth} />
        <Box component="form">

          <FormControl fullWidth>
            <Box component="label">Current <span>*</span></Box>
            <TextField
              label="Enter your current value"
              {...register('current', {required: 'Enter current value.'})}
              inputProps={{
                type: "number",
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              variant="outlined"
              required fullWidth
              defaultValue={ledger ? ledger.current : ''}
            />
            <Error field={errors.current}/>
          </FormControl>

          <FormControl fullWidth>
            <Box component="label">Income <span>*</span></Box>
            <TextField
              label="Enter your income amount"
              {...register('income', {required: 'Enter income amount.'})}
              inputProps={{
                type: "number",
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              variant="outlined"
              required fullWidth
              defaultValue={ledger ? ledger.income : ''}
            />
            <Error field={errors.income}/>
          </FormControl>

          <FormControl fullWidth>
            <Box component="label">Parent Support <span>*</span></Box>
            <TextField
              label="Enter your parent support amount"
              {...register('parentSupport', {required: 'Enter parent support amount.'})}
              inputProps={{
                type: "number",
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              variant="outlined"
              required fullWidth
              defaultValue={ledger ? ledger.parentSupport : ''}
            />
            <Error field={errors.parentSupport}/>
          </FormControl>

          <FormControl fullWidth>
            <Box component="label">Budget <span>*</span></Box>
            <TextField
              label="Enter your budget amount"
              {...register('budget', {required: 'Enter budget amount.'})}
              inputProps={{
                type: "number",
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              variant="outlined"
              required fullWidth
              defaultValue={ledger ? ledger.budget : ''}
            />
            <Error field={errors.budget}/>
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
              Save
            </Button>
          </FormControl>
        </Box>
      </Container>
      <Navbar/>
      <LoadingBackdrop open={mutateQuery.isPending} />
    </Box>
  );
}

export default Ledger;
