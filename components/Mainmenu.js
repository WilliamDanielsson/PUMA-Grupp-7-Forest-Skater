import React from 'react'
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native'
import Background from './children/Background'
import { Audio } from 'expo-av'
import { playThemeSong, stopThemeSong} from "../title2Theme"
import { useState, useEffect } from 'react'

let havePlayed = false
let sound
const Mainmenu = ({ navigation }) => { 
    const [themeSong, setThemeSong] = React.useState()

    async function playThemeSong() {
        const { sound } = await Audio.Sound.createAsync(
           require('../titleTheme.mp3')
        );
        setThemeSong(sound);

        await sound.playAsync(); }
    
        React.useEffect(() => {
          return themeSong
            ? () => {
                themeSong.unloadAsync(); 
                playThemeSong()
            }
            : undefined;
        }, [themeSong]);

    useEffect(() => {
        playThemeSong()
    }, [])
    return (
        <>
            <Background/>
            <View style={styles.container}>
                <Image style={{position: 'absolute', top: '-17.5%'}} source={require('../assets/ForestSkater.png')}/>
                <TouchableNativeFeedback onPress={() => {navigation.navigate("game"), themeSong.unloadAsync()}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/play.png')}/>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => {navigation.navigate("login")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/profile.png')} style={styles.profile}/>
                </TouchableNativeFeedback> 
                <View style={styles.innerContainer}>
                    <TouchableNativeFeedback onPress={() => {navigation.navigate("customize")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image source={require('../assets/customize.png')} style={styles.image}/>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback onPress={() => {navigation.navigate("leaderboard")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/leaderboard.png')} style={styles.image}/>
                    </TouchableNativeFeedback> 

                    <TouchableNativeFeedback onPress={() => {navigation.navigate("options")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image source={require('../assets/cog.png')} style={styles.image}/>
                    </TouchableNativeFeedback> 
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '10%',
    },
    innerContainer: {
      flexDirection: "row",
      marginTop: 40,
    },
    image: {
        marginLeft: 24,
        marginRight: 24,
    },
    profile: {
        position: 'absolute',
        top: '-12.5%',
        left: '88%',
    }
  });

export default Mainmenu