import React, { useContext, useState } from 'react'

const SessionContext = React.createContext();

export const useSession = () => {
    return useContext(SessionContext)
}

const SessionProvider = ({ children }) => {
    const [volume, setVolume] = useState(0);
    const [skin, setSkin] = useState('../assets/skins/dude/dude4.png')
    const [gameOver, setGameOver] = useState(false)

    const value = {
        volume,
        setVolume,
        skin,
        setSkin,
        gameOver,
        setGameOver
    }

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}

export {SessionProvider}