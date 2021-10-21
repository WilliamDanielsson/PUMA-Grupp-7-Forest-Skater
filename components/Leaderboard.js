import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Background from './children/Background'
import HighscoreListItem from './children/HighscoreListItem'
import { getUsers, auth, getUser } from '../firebase'

const Leaderboard = () => {
    const [userList, setUserList] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        handleLoad()
        handleUser()
      });

    const handleLoad = async () => {
        const list = await getUsers()
        if (!list == userList) {
            setUserList(list)
        }
    }

    const handleUser = () => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const temp = await getUser(user.uid)
                if (!temp == currentUser) {
                    setCurrentUser(temp)
                }
            }
            else {
                console.log("Error: User not logged in")
            }
        })
       
    }

    return (
        <>
            <Background/>
            <ScrollView>
                {
                    userList
                    .sort((a, b) => a.highscore < b.highscore ? 1 : -1)
                    .map((item, i) => {
                        return (
                            <View key={i}>
                                <HighscoreListItem rating={i+1} name={item.name} highscore={item.highscore}/>
                            </View>
                        )
                    }) 
                }
            </ScrollView>
            <View>
                {/* HÄR ÄR DEN INLOGGADE ANVÄNDARENS NAMN OCH HIGHSCORE */}
                {/* SYNS I NEDRE VÄNSTRA HÖRNET FÖR TILLFÄLLET */}
                <Text>{currentUser.name}{currentUser.highscore}</Text>
            </View>
        </>
    )
}

export default Leaderboard
