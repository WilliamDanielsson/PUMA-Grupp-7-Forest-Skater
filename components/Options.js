import React from 'react'
<<<<<<< HEAD
import { View, Text } from 'react-native'
import Background from './children/Background'

=======
import { View, Image, Text, TouchableNativeFeedback } from 'react-native'
>>>>>>> ceee628f1a4e370981d0de9d081e3dab93f80cb1

const Options = ({navigation}) => {
    return (
<<<<<<< HEAD
        <>
            <Background/>
            <View>
                
            </View>
        </>
=======
        <View>
                <TouchableNativeFeedback onPress={() => {navigation.navigate("login")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image source={require('../assets/play.png')}/>
                </TouchableNativeFeedback> 
        </View>
>>>>>>> ceee628f1a4e370981d0de9d081e3dab93f80cb1
    )
}

export default Options