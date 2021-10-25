import React from 'react'
import { Image, Text, StyleSheet, View } from 'react-native'

const HighscoreListItem = ({ rating, name, highscore }) => {
    return (
        <View style={styles.paddingContainer}>
        <View style={styles.container}>
            <Image source={require('../../assets/leaderboardListItem.png')} style={styles.image}/>
            <View style={styles.innerContainer}>
                <Text style={styles.rating} >{rating}.</Text>
                <Text style={styles.name} >{name}</Text>
                <Text style={styles.score} >{highscore}</Text>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    paddingContainer: {
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        height: 25,
        width: 200,
    },
    image: {
        position: 'absolute',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rating: {
        color: '#795548',
        fontSize: 12,
    },
    name: {
        color: '#795548',
        fontSize: 12,

    },
    score: {
        color: '#795548',
        fontSize: 12,
    },
});

export default HighscoreListItem
