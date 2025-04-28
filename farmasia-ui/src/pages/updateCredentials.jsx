import { useState } from 'react'
import axios from 'axios';

const UpdateCredentials = ({ setMessage, setError }) => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [email, setEmail] = useState("")

  const validatePassword = () => {
    if (password.length < 5 && password !== '') {
      alert('Course key needs to be at least 5 characters in length')
      return false
    }
    if (/\s/.test(password)) {
      alert('Password cannot contain spaces')
      return false
    }
    if (password !== password2) {
      alert('Course keys do not match!')
      return false
    }
    return true
  }

  const validateEmail = () => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert('Please provide a valid email address')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (email === '' && password === '') {
      setMessage('Please provide either an email or a course key to be updated')
      return
    }

    if (!validateEmail() || !validatePassword()) {
      return
    }

    try {
      await axios.put("/farmasiavr/api/certificates/create_put", {
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
    setEmail('')
    setTimeout(() => {
      setError(false)
      setMessage('')
    }, 4000)
  }

  const handlePasswordChange = (event) => {
    if (event.target.value.length < 20) {
      setPassword(event.target.value)
    } else {
      alert('Course key must be less than 20 characters')
    }
  }

  const handlePassword2Change = (event) => {
    if (event.target.value.length < 20) {
      setPassword2(event.target.value)
    } else {
      alert('Course key must be less than 20 characters')
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
            <h3>Email address to which reports are sent</h3>
            <input value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <h3>Course key for FarmasiaVR students</h3>
            <input type="password" value={password2} onChange={handlePassword2Change} />
          </div>
          <div>
            <h3>Repeat course key</h3>
            <input type="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default UpdateCredentials