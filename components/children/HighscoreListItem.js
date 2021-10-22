import React from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'

const HighscoreListItem = ({ rating, name, highscore }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/leaderboardListItem.png')} style={styles.image}/>
            <Text>{rating}</Text>
            <Text>{name}</Text>
            <Text>{highscore}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
      position: 'absolute'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    }
});

export default HighscoreListItem
