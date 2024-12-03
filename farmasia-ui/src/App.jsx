import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
const [loggedIn, setLoggedIn] = useState(false)
const [password, setPassword] = useState('')
const [password2, setPassword2] = useState('')
const [email, setEmail] = useState("email@example.com")

const handleSubmit = async (e) => {
  e.preventDefault()
  if (password !== password2) {
      alert('Passwords do not match!')
      return
  }
  try {
      const response = axios.put("/api/certificates/create_put", {
        email,
        password
      })
  } catch (error) {
      console.log(error)
  }
  setPassword('')
  setPassword2('')
}

const handlePasswordChange = (event) => {
  if (event.target.value.length < 20) {
      setPassword(event.target.value)
  } else {
      alert('Password must be less than 20 characters')
  }
}

const handlePassword2Change = (event) => {
  if (event.target.value.length < 20) {
      setPassword2(event.target.value)
  } else {
      alert('Password must be less than 20 characters')
  }
}

const handleEmailChange = (event) => {
  setEmail(event.target.value)
}

  return (
    <>
      <h1>Farmasia VR backend</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <p>Email address</p>
            <input value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <p>Password</p>
            <input  type="password" value={password2} onChange={handlePassword2Change} />
          </div>
          <div>
            <p>Repeat password</p>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default App
