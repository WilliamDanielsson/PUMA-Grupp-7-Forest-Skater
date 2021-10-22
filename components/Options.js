import React from 'react'
import { View, Image, Text, TouchableNativeFeedback, StyleSheet, ImageBackground } from 'react-native'
import Background from './children/Background'


const Options = ({navigation}) => {
    return (
        <>
        <Background/>
        <View>
                <ImageBackground style={styles.container} source={require('../assets/options.png')}>
                <TouchableNativeFeedback onPress={() => {navigation.navigate("home")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image style={styles.returnButton}  source={require('../assets/skins/buttons/x.png')}/>
                </TouchableNativeFeedback> 
               </ImageBackground>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',      
        width: 330,
        height: 330,
        right: 170,
        marginTop: 30,

    },
    returnButton: {
        position: 'absolute',
        marginTop: 10,
        left: 10,
    }
})

export default Options