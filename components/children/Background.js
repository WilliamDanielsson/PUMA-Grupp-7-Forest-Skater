import React from 'react'
import { Image, View, StyleSheet, ImageBackground } from 'react-native'

const Background = ({ history }) => {
    return (
        <View style={styles.container}>

          <Image style={{zIndex: -1, top: '9.5%'}} source={require('../../assets/newBackground.png')}/>
          
          <Image style={{zIndex: -2, top: '-80%'}} source={require('../../assets/sky.png')}/>
          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute'
    },
  });
  

export default Background
