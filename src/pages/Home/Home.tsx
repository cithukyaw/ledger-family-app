import { FC } from 'react'
import {Button} from '@mui/material'
import homeImg from '/home.gif'
import {Link} from "react-router-dom";
import './Home.scss'

const Home: FC = () => {
  return (
    <div className="app">
      <div>
        <div>
          <img src={homeImg} className="logo" alt="" />
        </div>
        <h1>Ledger Family</h1>
        <p>Track expenses and manage budget effectively</p>
      </div>
      <div className="buttons">
        <Button fullWidth className="btn-rounded btn-orange" variant="contained" size="large"
                component={Link} to="/login">Sign In</Button>
        <Button fullWidth className="btn-outlined-dark btn-rounded" variant="outlined" size="large"
                component={Link} to="/register">Create Account</Button>
      </div>
    </div>
  )
}

export default Home;
