import React from 'react'
import { View, Image, Text, TouchableNativeFeedback } from 'react-native'
import Background from './children/Background'


const Options = ({navigation}) => {
    return (
        <>
        <Background/>
        <View>
                <TouchableNativeFeedback onPress={() => {navigation.navigate("login")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/play.png')}/>
                </TouchableNativeFeedback> 
        </View>
        </>
    )
}

export default Options