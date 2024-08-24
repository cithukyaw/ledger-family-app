import { FC } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import RegisterEmail from "./pages/Register/RegisterEmail.tsx";
import LoginEmail from "./pages/Login/LoginEmail.tsx";
import Layout from "./components/Layout.tsx";
import RegisterPasscode from "./pages/Register/RegisterPasscode.tsx";
import LoginPasscode from "./pages/Login/LoginPasscode.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import {UserProvider} from "./contexts/userContext.tsx";
import './App.scss';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/register" element={<RegisterEmail />}></Route>
              <Route path="/register/complete" element={<RegisterPasscode />}></Route>
              <Route path="/login" element={<LoginEmail />}></Route>
              <Route path="/login/complete" element={<LoginPasscode />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default App
