import axios from 'axios';
import { useState } from 'react'


const ShowCurrent = () => {
    const [hidden, setHidden] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (currentEmail) => {
        setEmail(currentEmail)
      }
    
    const handlePasswordChange = (currentPassword) => {
        setPassword(currentPassword)
    }

    const showCredentials = async (e) => {
        e.preventDefault()
        if (hidden) {
            setHidden(false)
            return
        }
        try {
            const response = await axios.get("/api/certificates/")
            const currentEmail = response.data.email
            const currentPassword = response.data.password
            handleEmailChange(currentEmail)
            handlePasswordChange(currentPassword)
            console.log(currentEmail)
            setHidden(true)
        } catch {
            console.error("Error fetching current credentials")
            return 
        }
    }

    return (
        <>
          {hidden &&
          <div>
            <h4>Current email address: {email}</h4>
            <h4>Current password: {password}</h4>
          </div>}
          <button onClick={showCredentials}>Show current credentials</button>
        </>
    )
}

export default ShowCurrent;