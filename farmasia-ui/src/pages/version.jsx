import axios from 'axios';
import { useState } from 'react'


const ShowCurrent = () => {
    const [hidden, setHidden] = useState(false)
    const [version, setVersion] = useState('')

    const showCredentials = async (e) => {
        e.preventDefault()
        if (hidden) {
            setHidden(false)
            this.value == "Hide current version"
            return
        }
        try {
            const response = await axios.get("/farmasiavr/version")
            const version = response.data
            setVersion(version)
            console.log(version)
            setHidden(true)
            this.value == "Show current version"
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
            <button onClick={showCredentials}>Show current version</button>
        </>
    )
}

export default ShowCurrent;