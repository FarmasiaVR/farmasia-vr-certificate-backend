import axios from 'axios';
import { useState } from 'react'


const ShowCurrent = () => {
    const [hidden, setHidden] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verb, setVerb] = useState("Show")

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
            setVerb("Show")
            return
        }
        try {
            const response = await axios.get("/farmasiavr/api/certificates/")
            const currentEmail = response.data.email
            const currentPassword = response.data.password
            handleEmailChange(currentEmail)
            handlePasswordChange(currentPassword)
            console.log(currentEmail)
            setHidden(true)
            setVerb("Hide")
        } catch {
            console.error("Error fetching current credentials")
            return
        }
    }

    return (
        <>
            {hidden &&
                <div>
                    <h4>Current email address for receiving reports: {email}</h4>
                    <h4>Current course key: {password}</h4>
                </div>}
            <button onClick={showCredentials}>{verb} current credentials</button>
        </>
    )
}

export default ShowCurrent;