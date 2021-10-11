import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import Background from './children/Background'

const Mainmenu = ({ history }) => {

    return (
        <>
            <Background/>
            <View style={styles.container}>
                <Image source={require('../assets/play.png')}/>
                <View style={styles.innerContainer}>
                    <Image source={require('../assets/customize.png')} style={styles.image}/>
                    <Image source={require('../assets/leaderboard.png')} style={styles.image}/>
                    <Image source={require('../assets/cog.png')} style={styles.image}/>
                </View>
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
