import axios from 'axios';
import { useState, useEffect } from 'react'


const Version = () => {
    const [version, setVersion] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const response  = await axios.get("/version")
                const data = response.data;
                setVersion(data)
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        })
    }, []);
    return (
        <>
            {
                <div>
                    <h4>Version: {version}</h4>
                </div>
            }
        </>
    )
}

export default Version;