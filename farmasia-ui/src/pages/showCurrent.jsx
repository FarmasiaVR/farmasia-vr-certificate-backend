import axios from 'axios';
import { useState } from 'react'


const ShowCurrent = () => {
    const [hidden, setHidden] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const showCredentials = async (e) => {
        e.preventDefault()
        if (hidden) {
            setHidden(false)
            return
        }
        const response = await axios.get("/api/certificates/")
        const {email , password} = response
        setEmail(email)
        setPassword(password)
        setHidden(true)
    }

    return (
        <>
          {hidden &&
          <div>
            <h4>{email}</h4>
            <h4>{password}</h4>
          </div>}
          <button onClick={showCredentials}>Show current credentials</button>
        </>
    )
}

export default ShowCurrent;