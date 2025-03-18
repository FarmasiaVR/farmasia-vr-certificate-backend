import { useState } from 'react'
import './App.css'
import Notification from './pages/notification';
import UpdateCredentials from './pages/updateCredentials';
import hyLogo from './assets/hy_logo.gif';
import ShowCurrent from './pages/showCurrent';

function App() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  return (
    <>
      <header className="header">
        <div className="content" style={{ backgroundImage: `url(${hyLogo})` }}></div>
      </header>
      <div className="farmasia">
        <Notification message={message} error={error} />
        <h1>FarmasiaVR</h1>
        <UpdateCredentials setMessage={setMessage} setError={setError} />
        <ShowCurrent />
      </div>
    </>
  )
}

export default App
