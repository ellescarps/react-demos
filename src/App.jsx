import { useState, useEffect } from 'react'
import './App.css'
import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Save token to localStorage when it updates
useEffect(() => {
  if (token) {
    localStorage.setItem("token", token);
  }
}, [token]);

  return (
    <>
      <SignUpForm setToken={setToken}/>
      {/* { token && <p style={{color: "white"}}>Signup succcesssful! Token received</p> } */}

      {token && <Authenticate token={token} clearToken={()=> setToken(null)} />}
      
    </>
  )
}

export default App
