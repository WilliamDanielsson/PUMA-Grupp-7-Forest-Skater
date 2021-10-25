import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, TouchableNativeFeedback} from 'react-native'
import { color } from 'react-native-reanimated'
import { auth } from '../firebase'
import Background from './children/Background'

const HomeScreen = ({ navigation }) => {

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <>
    <Background/>
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => {navigation.navigate("home")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image style={styles.backbtn} source={require('../assets/back.png')}/>
      </TouchableNativeFeedback>
      <Image source={require('../assets/pixil.png')}/>

      <Text style={styles.text1}>Email:</Text>
      <Text style={styles.text2}>{auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Image source={require('../assets/Group152.png')}/>
      </TouchableOpacity>
    </View>
    </>
   )
  
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backbtn:{
    position: 'absolute',
    top: '2%',
    left: '2%',
  },
  text1: {
    position: 'absolute',
    top: '35%',
    left: '45%',
    fontSize: 24,
    color: '#6B4B40',
    textAlign: 'center'
  },
  text2: {
    position: 'absolute',
    top: '45%',
    left: '39%',
    fontSize: 24,
    color: '#6B4B40',
    textAlign: "center"
  },
})