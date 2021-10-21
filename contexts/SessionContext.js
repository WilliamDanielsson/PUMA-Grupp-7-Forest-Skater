import React, { useContext, useState } from 'react'

const SessionContext = React.createContext();

export const useSession = () => {
    return useContext(SessionContext)
}

const SessionProvider = ({ children }) => {
    const [volume, setVolume] = useState(0);
    const [skin, setSkin] = useState({path: require(`../assets/skins/dude/dude2.png`)})

    return (
        <SessionContext.Provider value={{value: [volume, setVolume], value2: [skin, setSkin]}}>
            {children}
        </SessionContext.Provider>
    )
}

export {SessionProvider}