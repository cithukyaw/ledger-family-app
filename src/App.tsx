import { FC } from 'react'
import { Button } from '@mui/material'
import homeImg from '/home.gif'
import './App.scss'

const App: FC = () => {
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
        <Button fullWidth color="warning" className="btn-rounded"
          variant="contained"
          size="large"
        >Sign In</Button>
        <Button className="btn-outlined-dark btn-rounded"
          fullWidth
          variant="outlined"
          size="large"
        >Create Account</Button>
      </div>
    </div>
  )
}

export default App
