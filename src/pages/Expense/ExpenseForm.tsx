import {FC, useEffect, useState} from "react";
import {Box, Button, Container, FormControl, MenuItem, Select, TextField} from "@mui/material";
import Header from "../../components/Header/Header.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {useCategories, useExpenseDetails, usePaymentTypes} from "../../queries/queries.hook.ts";
import {useForm} from "react-hook-form";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs, {Dayjs} from 'dayjs';
import Error from "../../components/Error.tsx";
import {CategoryType, FormExpenseValues} from "../../types/declarations";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Loading from "../../components/Loading/Loading.tsx";
import ServerError from "../../components/ServerError.tsx";
import {Link, useParams} from "react-router-dom";
import {useLazyQuery} from "../../lib/hooks.ts";
import {apiErrorHandling} from "../../lib/api.ts";
import mQuery from "../../queries/mutations.ts";
import {getLoginUser} from "../../lib/utils.ts";
import {toast} from "react-toastify";
import config from "../../lib/config.ts";
import LoadingBackdrop from "../../components/Loading/LoadingBackdrop.tsx";

const ExpenseForm: FC = () => {
  const { id } = useParams<{ id: string }>();
  const expenseId = id ? Number(id) : undefined;
  const dateFormat = 'DD/MM/YYYY';

  const { data: categories, isPending: isPendingCategories, isError: isErrorCategories } = useCategories();
  const { data: types, isPending: isPendingTypes, isError: isErrorTypes } = usePaymentTypes();
  const { data: expense, isPending: isPendingExpense, isError: isErrorExpense } = useExpenseDetails(expenseId);

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [category, setCategory] = useState<string>('');
  const {
    register,
    setError,
    setValue,
    clearErrors,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<FormExpenseValues>();

  const today = dayjs();
  const user = getLoginUser();
  const defaultPayType = 'cash';

  useEffect(() => {
    const expDate = expense ? dayjs(expense.date).format(dateFormat) : dayjs().format(dateFormat);
    const category = expense ? expense.categoryId : '';

    setValue('date', expDate);
    setValue('title', expense ? expense.title : '');
    setValue('amount', expense ? expense.amount : '');
    setValue('category', category);
    setValue('type', expense ? expense.type : defaultPayType);
    setValue('remarks', expense && expense.remarks ? expense.remarks : '');

    setCategory(category);
    if (expense) {
      setDate(dayjs(expense.date));
    }

  }, [expense, setDate, setCategory, setValue]);

  const query = useLazyQuery(
    async (formData: FormExpenseValues) => {
      // post to server
      if (formData.id) {
        const { id } = formData;
        delete formData.id;
        await mQuery.updateExpense(id, formData);
      } else {
        await mQuery.createExpense(formData);
      }
    },
    {
      onSuccess: () => { // when form submit is succeeded
        if (expenseId) {
          toast.success('Expense updated!', config.toastOptions);
        } else {
          reset(); // form reset
          setCategory(''); // This resets the local state
          toast.success('Expense added!', config.toastOptions);
        }
      },
      onError: err => { // when validation errors occur
        apiErrorHandling(err, setError)
      }
    }
  );

  const submitForm = async (data: FormExpenseValues) => {
    const { date, amount } = data;
    const expDate: string[] = date.split('/');

    data.date = `${expDate[2]}-${expDate[1]}-${expDate[0]}`;
    data.amount = Number(amount);
    data.userId = user.id;

    if (expenseId) {
      data.id = expenseId;
    }

    query.reset();
    query.mutate(data)
  };

  const handleSubmitBtnClick = () => {
    clearErrors(); // Clear validation errors before submit trigger
    handleSubmit(submitForm)();
  };

  const isLoading = isPendingCategories || isPendingTypes || (expenseId ? isPendingExpense : false);
  const isError = isErrorCategories || isErrorTypes || (expenseId ? isErrorExpense : false);

  if (isLoading) {
    return <Loading fullScreen={true} />
  }

  if (query.isError) {
    query.reset();
    toast.error('Cannot save expense!', config.toastOptions);
  }

  return (
    <Box className="app">
      <Header title="Add Expense" />
      <Container maxWidth="lg">
        { isError ?
          <ServerError /> :
          <Box component="form">
            <FormControl fullWidth>
              <Box component="label">Date <span>*</span></Box>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...register("date", {required: "Select a date."})}
                  value={date} // Bind the DatePicker to the date state
                  label="Expense Date"
                  format="DD/MM/YYYY"
                  onChange={value => {
                    setDate(value);
                    setValue("date", dayjs(value).format('DD/MM/YYYY')); // Update form value
                  }}
                  slotProps={{
                    textField: {
                      ...register('date', {required: 'Select a date.'}),
                      fullWidth: true,
                    },
                  }}
                  maxDate={today}
                />
              </LocalizationProvider>
              <Error field={errors.date}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label">Title <span>*</span></Box>
              <TextField
                label="Enter a title about your expense"
                {...register('title', {required: 'Enter a title.'})}
                required fullWidth
              ></TextField>
              <Error field={errors.title}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label">Amount <span>*</span></Box>
              <TextField
                label="Enter your expense amount"
                {...register('amount', {required: 'Enter expense amount.'})}
                inputProps={{
                  type: "number",
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                variant="outlined"
                required fullWidth
              />
              <Error field={errors.amount}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label">Category <span>*</span></Box>
              <TextField
                {...register('category', {required: 'Select a category.'})}
                select // tell TextField to render select
                label="Select expense category"
                onChange={e => setCategory(e.target.value)}
                value={category}
                fullWidth
              >
                {categories && categories.map((cat: CategoryType) => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
              </TextField>
              <Error field={errors.category}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label">Payment Type <span>*</span></Box>
              <Select
                {...register('type', {required: 'Select a payment type.'})}
                defaultValue={defaultPayType}
                fullWidth
              >
                {Object.entries(types).map(([key, name]) => <MenuItem key={key} value={key}>{name as string}</MenuItem>)}
              </Select>
              <Error field={errors.type}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label">Remarks</Box>
              <TextField
                label="Additional information about your expense"
                {...register('remarks')}
                multiline
                fullWidth
                rows={2}
              />
              <Error field={errors.remarks}/>
            </FormControl>

            <FormControl fullWidth>
              <Button
                startIcon={<AddCircleOutlineIcon/>}
                className="btn-orange"
                onClick={handleSubmitBtnClick}
                variant="contained"
                size="large"
                disabled={query.isPending}
                fullWidth
              >
                Save Expense
              </Button>
            </FormControl>
            <Box sx={{ mt: 3, mb: 1, textAlign: 'center'}} component="p">
              <Link to={`/expense`}>Cancel</Link>
            </Box>
          </Box>
        }
      </Container>
      <Navbar/>
      <LoadingBackdrop open={query.isPending} />
    </Box>
  );
}

export default ExpenseForm;
