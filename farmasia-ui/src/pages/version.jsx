import axios from 'axios';
import { useState } from 'react'


const ShowCurrent = () => {
    const [hidden, setHidden] = useState(false)
    const [version, setVersion] = useState('')
    const [verb, setVerb] = useState("Show")

    const showCredentials = async (e) => {
        e.preventDefault()
        if (hidden) {
            setHidden(false)
            setVerb("Show")
            return
        }
        try {
            const response = await axios.get("/farmasiavr/version")
            const version = response.data
            setVersion(version)
            console.log(version)
            setHidden(true)
            setVerb("Hide")
        } catch {
            console.error("Error fetching current version")
            return
        }
    }

    return (
        <>
            {hidden &&
                <div>
                    <h4>Current version: {version}</h4>
                </div>}
            <button onClick={showCredentials}>{verb} current version</button>
        </>
    )
}

export default ShowCurrent;