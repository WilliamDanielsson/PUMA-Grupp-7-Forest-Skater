import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, ImageBackground, TouchableNativeFeedback} from 'react-native'
import Background from './children/Background'
import HighscoreListItem from './children/HighscoreListItem'
import { getUsers, auth, getUser } from '../firebase'

const Leaderboard = ({navigation}) => {
    const [userList, setUserList] = useState([])
    const [currentUser, setCurrentUser] = useState({
        name: '',
        highscore: 0,
    });
    
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
                if (temp.name != currentUser.name) {
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
            <TouchableNativeFeedback onPress={() => {navigation.navigate("home")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image style={[styles.returnButton]} source={require('../assets/skins/buttons/x.png')}/>
            </TouchableNativeFeedback>            
            <View style={styles.container}>
                <ImageBackground style={styles.leaderboard} resizeMode="cover" source={require('../assets/Group161.png')}>
                    <ScrollView style={styles.scroll}>
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
                </ImageBackground>
                <ImageBackground style={styles.leaderboardpersonal} resizeMode="cover" source={require('../assets/Leaderboardplayer.png')}>
                        <View style={styles.leaderboardpersonaltext}>
                            <Text style={styles.leaderboardpersonaltext1} >{currentUser.name}</Text>
                            <Text style={styles.leaderboardpersonaltext2} >{currentUser.highscore}</Text>
                        </View>
                </ImageBackground>
            </View>
        </>
    )
}

export default Leaderboard

const styles = StyleSheet.create({
    returnButton: {
        position: 'absolute',
        top: '11%',
        left: '17.4%',
        zIndex: 10
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    leaderboard: {
        width: 460,
        height: 340,
        border: '0'
    },
    scroll: {
        position: 'absolute',
        top: '25%',
        left: '30%',
    },
    leaderboardpersonal: {
        width: 240,
        height: 50,
        border: '0',
        position: 'absolute',
        top: '72.4%',
        left: '34%',

    },
    leaderboardpersonaltext: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'relative',
        top: '-4%',
        color: '#795548'

    },
    leaderboardpersonaltext1: {
        color: '#795548'

    },
    leaderboardpersonaltext2: {
        color: '#795548'

    },
    
  })
