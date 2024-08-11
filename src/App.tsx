import homeImg from '/home.gif'
import './App.scss'

function App() {
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
        <button>Sign In</button>
        <button>Create Account</button>
      </div>
    </div>
  )
}

export default App
