import React from 'react'
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native'
import Background from './children/Background'

const Mainmenu = ({ navigation }) => {

    return (
        <>
            <Background/>
            <View style={styles.container}>
                
                <TouchableNativeFeedback onPress={() => {navigation.navigate("game")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
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
      marginTop: 20,
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
        top: '0%',
        left: '88%',
    }
  });

export default Mainmenu