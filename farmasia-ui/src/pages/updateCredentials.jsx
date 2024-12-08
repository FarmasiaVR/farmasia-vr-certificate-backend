import { useState } from 'react'
import axios from 'axios';

const UpdateCredentials = ({ setMessage, setError }) => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ( password.length < 5) {
      alert('Password needs to be atleast 5 letters long')
      return
    }
    if (password !== password2) {
      alert('Passwords do not match!')
      return
    }
    try {
      const response = await axios.put("/api/certificates/create_put", {
        email,
        password
      })
      setMessage('Credentials successfully changed!')
    } catch (error) {
        console.log(error)
        setError(true)
        setMessage('Error updating credentials')
    }
    setPassword('')
    setPassword2('')
    setTimeout(() => {
      setError(false)
      setMessage('')
    }, 4000)
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
        <form onSubmit={handleSubmit}>
        <div>
          <div>
            <h3>Email address to which certificates are sent</h3>
            <input value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <h3>Password for FarmasiaVR certificates</h3>
            <input  type="password" value={password2} onChange={handlePassword2Change} />
          </div>
          <div>
            <h3>Repeat password</h3>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
      </>
    )
}

export default UpdateCredentials