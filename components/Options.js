import React from 'react'
import { View, Image, Text, TouchableNativeFeedback, StyleSheet, ImageBackground } from 'react-native'
import Background from './children/Background'


const Options = ({navigation}) => {
    return (
        <>
        <Background/>
        <View style={styles.container}>
                <ImageBackground style={styles.options} resizeMode="cover" source={require('../assets/options1.png')}>
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
        flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

    },
    options: {
        width: 330,
        height: 330,
    },
    returnButton: {
        position: 'absolute',
        marginTop: 10,
        left: 10,
    }
})

export default Options