import {FC, useEffect, useState} from "react";
import {Box, Button, Container, FormControl, MenuItem, Select, TextField} from "@mui/material";
import Header from "../../components/Header/Header.tsx";
import Navbar from "../../components/Navbar/Navbar.tsx";
import {usePassiveIncomeDetails, usePaymentTypes} from "../../queries/queries.hook.ts";
import {useForm} from "react-hook-form";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs, {Dayjs} from 'dayjs';
import Error from "../../components/Error.tsx";
import {FormPassiveIncomeValues} from "../../types/declarations";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Loading from "../../components/Loading/Loading.tsx";
import ServerError from "../../components/ServerError.tsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useLazyQuery} from "../../lib/hooks.ts";
import {apiErrorHandling} from "../../lib/api.ts";
import mQuery from "../../queries/mutations.ts";
import {getLoginUser} from "../../lib/utils.ts";
import {toast} from "react-toastify";
import config from "../../lib/config.ts";
import LoadingBackdrop from "../../components/Loading/LoadingBackdrop.tsx";

const PassiveIncomeForm: FC = () => {
  const { id } = useParams<{ id: string }>();
  const passiveIncomeId = id ? Number(id) : undefined;
  const dateFormat = 'DD/MM/YYYY';

  const { data: types, isPending: isPendingTypes, isError: isErrorTypes } = usePaymentTypes();
  const { data: passiveIncome, isPending: isPendingPassiveIncome, isError: isErrorPassiveIncome } = usePassiveIncomeDetails(passiveIncomeId);

  const navigate = useNavigate();
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const {
    register,
    setError,
    setValue,
    clearErrors,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<FormPassiveIncomeValues>();

  const today = dayjs();
  const user = getLoginUser();
  const defaultPayType = 'cash';

  useEffect(() => {
    const incomeDate = passiveIncome ? dayjs(passiveIncome.date).format(dateFormat) : dayjs().format(dateFormat);

    setValue('date', incomeDate);
    setValue('title', passiveIncome ? passiveIncome.title : '');
    setValue('amount', passiveIncome ? passiveIncome.amount : '');
    setValue('type', passiveIncome ? passiveIncome.type : defaultPayType);

    if (passiveIncome) {
      setDate(dayjs(passiveIncome.date));
    }

  }, [passiveIncome, setDate, setValue]);

  const query = useLazyQuery(
    async (formData: FormPassiveIncomeValues) => {
      // post to server
      if (formData.id) {
        const { id } = formData;
        delete formData.id;
        await mQuery.updatePassiveIncome(id, formData);
        navigate('/passive-income');
      } else {
        await mQuery.createPassiveIncome(formData);
      }
    },
    {
      onSuccess: () => { // when form submit is succeeded
        if (passiveIncomeId) {
          toast.success('Passive income updated!', config.toastOptions);
        } else {
          reset(); // form reset
          toast.success('Passive income added!', config.toastOptions);
        }
      },
      onError: err => { // when validation errors occur
        apiErrorHandling(err, setError)
      }
    }
  );

  const submitForm = async (data: FormPassiveIncomeValues) => {
    const { date, amount } = data;
    const incomeDate: string[] = date.split('/');

    data.date = `${incomeDate[2]}-${incomeDate[1]}-${incomeDate[0]}`;
    data.amount = Number(amount);
    data.userId = user.id;

    if (passiveIncomeId) {
      data.id = passiveIncomeId;
    }

    query.reset();
    query.mutate(data)
  };

  const handleSubmitBtnClick = () => {
    clearErrors(); // Clear validation errors before submit trigger
    handleSubmit(submitForm)();
  };

  const isLoading = isPendingTypes || (passiveIncomeId ? isPendingPassiveIncome : false);
  const isError = isErrorTypes || (passiveIncomeId ? isErrorPassiveIncome : false);

  if (isLoading) {
    return <Loading fullScreen={true} />
  }

  if (query.isError) {
    query.reset();
    toast.error('Cannot save passive income!', config.toastOptions);
  }

  return (
    <Box className="app">
      <Header title="Add Passive Income" />
      <Container maxWidth="lg">
        { isError ?
          <ServerError /> :
          <Box component="form">
            <FormControl fullWidth>
              <Box component="label" className="my">နေ့စွဲ <span>*</span></Box>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...register("date", {required: "နေ့စွဲတစ်ခုကိုရွေးပါ။"})}
                  value={date} // Bind the DatePicker to the date state
                  label="Passive Income Date"
                  format="DD/MM/YYYY"
                  onChange={value => {
                    setDate(value);
                    setValue("date", dayjs(value).format('DD/MM/YYYY')); // Update form value
                  }}
                  slotProps={{
                    textField: {
                      ...register('date', {required: 'နေ့စွဲတစ်ခုကိုရွေးပါ။'}),
                      fullWidth: true,
                    },
                  }}
                  maxDate={today}
                />
              </LocalizationProvider>
              <Error field={errors.date}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label" className="my">အကြောင်းအရာ <span>*</span></Box>
              <TextField
                label="Enter a title about your passive income"
                {...register('title', {required: 'အကြောင်းအရာကိုထည့်ပါ။'})}
                required fullWidth
              ></TextField>
              <Error field={errors.title}/>
            </FormControl>

            <FormControl fullWidth>
              <Box component="label" className="my">ငွေပမာဏ <span>*</span></Box>
              <TextField
                label="Enter your passive income amount"
                {...register('amount', {required: 'ဝင်ငွေပမာဏကိုထည့်ပါ။'})}
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
              <Box component="label" className="my">ငွေပေးချေမှုပုံစံ <span>*</span></Box>
              <Select
                {...register('type', {required: 'ငွေပေးချေမှုပုံစံတစ်ခုကိုရွေးပါ။'})}
                defaultValue={defaultPayType}
                fullWidth
              >
                {Object.entries(types).map(([key, name]) => <MenuItem key={key} value={key}>{name as string}</MenuItem>)}
              </Select>
              <Error field={errors.type}/>
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
                <span className="my">အပိုဝင်ငွေထည့်မည်</span>
              </Button>
            </FormControl>
            <Box sx={{ mt: 3, mb: 1, textAlign: 'center'}} component="p">
              <Link to={`/passive-income`} className="my">နောက်သို့</Link>
            </Box>
          </Box>
        }
      </Container>
      <Navbar/>
      <LoadingBackdrop open={query.isPending} />
    </Box>
  );
}

export default PassiveIncomeForm;
