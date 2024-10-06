import {FC, useEffect} from "react";
import {Box, Button, Container, FormControl, TextField} from "@mui/material";
import Header from "../components/Header/Header.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import Error from "../components/Error.tsx";
import {useForm} from "react-hook-form";
import {FormAccountValues, JSONValue} from "../types/declarations";
import {getLoginUser, removeItem, storeItemEncrypted} from "../lib/utils.ts";
import SaveIcon from '@mui/icons-material/Save';
import {useNavigate} from "react-router-dom";
import PasscodeInput from "../components/PasscodeInput.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../state/store.ts";
import {setOtp} from "../state/slices/userSlice.ts";
import {useLazyQuery} from "../lib/hooks.ts";
import mQuery from "../queries/mutations.ts";
import config from "../lib/config.ts";
import {apiErrorHandling} from "../lib/api.ts";
import LoadingBackdrop from "../components/Loading/LoadingBackdrop.tsx";
import {toast} from "react-toastify";
import {useQueryClient} from "@tanstack/react-query";
import {queries} from "../queries/queries.ts";

const Account: FC = () => {
  const { otp } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = getLoginUser();
  const queryClient = useQueryClient();
  const {
    register,
    formState: {errors},
    clearErrors,
    handleSubmit,
    setValue,
    setError,
  } = useForm<FormAccountValues>();

  const querySave = useLazyQuery(
    async (formData: FormAccountValues) => {
      const result = await mQuery.updateAccount(user.id, formData);
      // update user info stored in localStorage
      storeItemEncrypted(config.userStoreKey, result as JSONValue);
      // clear user details query cache
      await queryClient.invalidateQueries({
        queryKey: queries.users.detail(user.id).queryKey
      });
    },
    {
      onSuccess: () => {
        dispatch(setOtp('')); // clear passcode value
        toast.success('Account information updated!', config.toastOptions);
      },
      onError: err => apiErrorHandling(err, setError)
    }
  );

  const queryLogout = useLazyQuery(
    async (id: number) => {
      await mQuery.logout(id);
    },
    {
      onSuccess: () => {
        removeItem(config.userStoreKey);
        navigate('/');
      },
      onError: err => apiErrorHandling(err, setError)
    }
  )

  const handleSubmitBtnClick = () => {
    clearErrors(); // Clear validation errors before submit trigger
    handleSubmit(submitForm)();
  };

  const submitForm = (data: FormAccountValues) => {
    if (otp.length > 0 && otp.length < 6) {
      setError('password', {type: 'custom', message: 'Enter 6 digits for passcode.'});
    } else {
      querySave.reset();
      querySave.mutate(data);
    }
  }

  const logout = () => {
    queryLogout.mutate(user.id);
  };

  useEffect(() => {
    dispatch(setOtp(''));
  }, [dispatch]);

  return (
    <Box className="app">
      <Header title="My Account" />
      <Container maxWidth="lg">
        <Box component="form">
          <FormControl fullWidth>
            <Box component="label">Full Name <span>*</span></Box>
            <TextField
              label="Enter your full name"
              {...register('name', {required: 'Enter full name'})}
              variant="outlined"
              defaultValue={user.name ? user.name : ''}
              required fullWidth focused
            />
            <Error field={errors.name}/>
          </FormControl>

          <FormControl fullWidth>
            <Box component="label">Login Email <span>*</span></Box>
            <TextField
              label="Login Email"
              {...register("email", {
                required: 'Enter email address',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              defaultValue={user.email}
              variant="outlined"
              autoComplete="off"
              required fullWidth
            />
            <Error field={errors.email} />
          </FormControl>

          <FormControl fullWidth>
            <Box component="label">Passcode (enter only if you want to change)</Box>
            <PasscodeInput
              setValue={setValue}
              clearErrors={clearErrors}
              errors={errors}
              focused={false}
            />
          </FormControl>

          <FormControl fullWidth>
            <Button
              startIcon={<SaveIcon/>}
              className="btn-orange"
              onClick={handleSubmitBtnClick}
              variant="contained"
              size="large"
              fullWidth
            >
              Save
            </Button>
          </FormControl>

          <Box sx={{ mt: 3, mb: 1, textAlign: 'center'}} component="p">
            <a href="#" onClick={logout}>Logout</a>
          </Box>
        </Box>
      </Container>
      <Navbar/>
      <LoadingBackdrop open={querySave.isPending || queryLogout.isPending} />
    </Box>
  );
}

export default Account;
