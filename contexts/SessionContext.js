import React, { useContext, useState } from 'react'

const SessionContext = React.createContext();

export const useSession = () => {
    return useContext(SessionContext)
}

const SessionProvider = ({ children }) => {
    const [volume, setVolume] = useState(0);

    const value = {
        volume,
        setVolume
    }

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}

export {SessionProvider}