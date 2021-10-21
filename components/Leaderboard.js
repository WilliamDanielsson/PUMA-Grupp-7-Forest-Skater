import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

import { getUsers } from '../firebase'

const Leaderboard = () => {
    useEffect(() => {
        meme()
      });

    const meme = async () => {
      const epic = await getUsers()
      console.log(epic.data())
    }


    return (
        <View>
            
            {/* 
                Denna komponent är själva leaderboard sidan 
                där alla leaderboard-child components ska in 
            */}

            <Text>Leaderboard</Text>

        </View>
    )
}

export default Leaderboard
