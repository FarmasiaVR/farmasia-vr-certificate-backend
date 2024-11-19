import { useState } from 'react'
import Login from './pages/login'
import './App.css'

function App() {
const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <h1>Farmasia VR</h1>
      {!loggedIn && (
        <>
          <Login />
        </>
      )}
      {loggedIn && (
        
      )}
    </>
  )
}

export default App
