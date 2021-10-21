
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, TouchableNativeFeedback } from 'react-native'
import { auth } from '../firebase'
import Background from './children/Background'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("main")
      }
    })
    return unsubscribe
  }, [])


  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <>
    <Background/>
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      
      <TouchableNativeFeedback onPress={() => {navigation.navigate("home")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image style={styles.backbtn} source={require('../assets/back.png')}/>
      </TouchableNativeFeedback>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          multiline={false}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
        <Image source={require('../assets/Group150.png')}/>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
        <Image source={require('../assets/Group151.png')}/>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backbtn:{
    position: 'absolute',
    top: '2%',
    left: '2%',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#C79871',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#795548',
    borderWidth: 2,
    marginTop: 5,
  },
  buttonContainer: {
    width: 450,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    width: '100%',
    padding: 0,
    alignItems: 'center',
  },
  buttonOutline: {
    marginTop: 5,
  },
})