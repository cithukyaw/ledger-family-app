import {FC} from "react";
import {ChildrenProps} from "../types/declarations";
import {Navigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {queries} from "../queries/queries.ts";
import axios, {AxiosResponse} from "axios";

const ProtectedRoute: FC<ChildrenProps> = ({ children } : ChildrenProps) => {
  const userId: number = localStorage.getItem('user') as unknown as number;

  const { data, error, isError, isSuccess } = useQuery({
    ...queries.users.detail(userId),
    retry: false
  }); // get user by id

  if (isSuccess) {
    console.log(data);
  }
  // const { setEmail } = useContext<UserContextType>(UserContext);
  // if (data && data.email) {
  //   setEmail(data.email);
  // }

  if (isError && axios.isAxiosError(error))  {
    const response = error.response as AxiosResponse;
    if (typeof response !== 'undefined' && response.status === 401) {
      return userId ? <Navigate to="/login/complete"/> : <Navigate to="/"/>
    }
  }

  if (!userId) {
    return <Navigate to="/"/>
  }

  // if user is authorized, go to the children component
  return children;
};

export default ProtectedRoute;
