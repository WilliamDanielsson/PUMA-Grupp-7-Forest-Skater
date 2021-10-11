import React from 'react'
import { Image, View, StyleSheet } from 'react-native'

const Background = ({ history }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/background.png')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute'
    },
  });
  

export default Background
