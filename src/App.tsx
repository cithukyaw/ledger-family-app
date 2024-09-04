import { FC } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import RegisterEmail from "./pages/Register/RegisterEmail.tsx";
import LoginEmail from "./pages/Login/LoginEmail.tsx";
import RegisterPasscode from "./pages/Register/RegisterPasscode.tsx";
import LoginPasscode from "./pages/Login/LoginPasscode.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import {UserProvider} from "./contexts/userContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Expense from "./pages/Expense/Expense.tsx";
import SingleLayout from "./components/Layouts/SingleLayout.tsx";
import BaseLayout from "./components/Layouts/BaseLayout.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import CreateExpense from "./pages/Expense/CreateExpense.tsx";
import './App.scss';

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<BaseLayout />}>
              <Route element={<SingleLayout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/register" element={<RegisterEmail />}></Route>
                <Route path="/register/complete" element={<RegisterPasscode />}></Route>
                <Route path="/login" element={<LoginEmail />}></Route>
                <Route path="/login/complete" element={<LoginPasscode />}></Route>
              </Route>
              <Route
                path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }>
              </Route>
              <Route
                path="/expense" element={
                <ProtectedRoute>
                  <Expense />
                </ProtectedRoute>
              }>
              </Route>
              <Route
                path="/expense/add" element={
                <ProtectedRoute>
                  <CreateExpense />
                </ProtectedRoute>
              }>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      <ReactQueryDevtools position="top" />
    </QueryClientProvider>
  )
}

export default App
