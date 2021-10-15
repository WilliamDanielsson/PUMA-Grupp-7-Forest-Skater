import React from 'react'
import { View, Image, Text, TouchableNativeFeedback } from 'react-native'

const Options = ({navigation}) => {
    return (
        <View>
                <TouchableNativeFeedback onPress={() => {navigation.navigate("login")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/play.png')}/>
                </TouchableNativeFeedback> 
        </View>
    )
}

export default Options