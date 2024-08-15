import { FC } from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Registration from "./pages/Register/Registration.tsx";
import Login from "./pages/Login/Login.tsx";
import './App.scss'
import Layout from "./components/Layout.tsx";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
