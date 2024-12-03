import { useState } from 'react'
import './App.css'
import Notification from './pages/notification';
import UpdateCredentials from './pages/updateCredentials';

function App() {
const [message, setMessage] = useState('')
const [error, setError] = useState(false)

  return (
    <>
      <Notification message={message} error={error} />
      <h1>FarmasiaVR</h1>
      <UpdateCredentials setMessage={setMessage} setError={setError} />
    </>
  )
}

export default App
