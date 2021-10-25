import React, { useContext, useState } from 'react'
import { ScreenStack } from 'react-native-screens';

const SessionContext = React.createContext();

export const useSession = () => {
    return useContext(SessionContext)
}

const SessionProvider = ({ children }) => {
    const [skinDodge, setSkinDodge] = useState({path: require(`../assets/skins/dude/DodgingDude2.png`)});
    const [skin, setSkin] = useState({path: require(`../assets/skins/dude/dude2.png`)})
    return (
        <SessionContext.Provider value={{value: [skinDodge, setSkinDodge], value2: [skin, setSkin]}}>
            {children}
        </SessionContext.Provider>
    )
}

export {SessionProvider}