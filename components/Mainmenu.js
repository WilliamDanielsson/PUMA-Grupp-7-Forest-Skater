import React from 'react'
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native'
import Background from './children/Background'

const Mainmenu = ({ navigation }) => {

    return (
        <>
            <Background/>
            <View style={styles.container}>
                
<<<<<<< HEAD
                <TouchableNativeFeedback onPress={() => { navigation.navigate("game1") }} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/play.png')}/>
                </TouchableNativeFeedback> 
                
                {/*
                <View style={styles.innerContainer}>
                    <TouchableNativeFeedback onPress={() => {history.push("/customize")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image source={require('../assets/customize.png')} style={styles.image}/>
                    </TouchableNativeFeedback>
=======
                <TouchableNativeFeedback onPress={() => {navigation.navigate("game")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/play.png')}/>
                </TouchableNativeFeedback> 
            
                <TouchableNativeFeedback onPress={() => {navigation.navigate("customize")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/customize.png')} style={styles.image}/>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => {navigation.navigate("leaderboard")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                <Image source={require('../assets/leaderboard.png')} style={styles.image}/>
                </TouchableNativeFeedback> 
>>>>>>> ceee628f1a4e370981d0de9d081e3dab93f80cb1

                <TouchableNativeFeedback onPress={() => {navigation.navigate("options")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/cog.png')} style={styles.image}/>
                </TouchableNativeFeedback> 

<<<<<<< HEAD
                    <TouchableNativeFeedback onPress={() => {history.push("/options")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image source={require('../assets/cog.png')} style={styles.image}/>
                    </TouchableNativeFeedback> 
                </View>
                */}
                
=======
>>>>>>> ceee628f1a4e370981d0de9d081e3dab93f80cb1
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
    }
  });

export default Mainmenu
