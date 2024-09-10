import {FC} from "react";
import {ChildrenProps, User} from "../types/declarations";
import {Navigate} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {getLoginUser, storeItemEncrypted} from "../lib/utils.ts";
import Loading from "./Loading.tsx";
import {useUserDetails} from "../queries/queries.hook.ts";
import config from "../lib/config.ts";

const ProtectedRoute: FC<ChildrenProps> = ({ children } : ChildrenProps) => {
  const user = getLoginUser(); // Check user info from localStorage
  let {id: userId} = user ? user as User : {id: 0};

  // Request the server to get user details by id
  const { data, error, isPending, isError, isSuccess } = useUserDetails(userId);

  if (isPending) {
    return <Loading fullScreen={true} />
  }

  if (isError && axios.isAxiosError(error))  {
    const response = error.response as AxiosResponse;
    if (typeof response === 'undefined') {
      // When server connection failed (response is undefined)
      // TODO: when response === 'undefined, render connection failure component
    }
  }

  if (isSuccess) {
    // when user details request is successful, update user info in localStorage
    userId = data.id;
    storeItemEncrypted(config.userStoreKey, data);
  }

  if (!userId) { // if user is not previously logged in, go the home screen
    return <Navigate to="/"/>
  }

  // if user is authorized, go to the children component
  return children;
};

export default ProtectedRoute;
