import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities'
import Physics from '../physics'
import { useState, useEffect } from 'react'
import Background from './children/Background'

let message = 'null'

const Game = ({ navigation }) => {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentScore, setCurrentScore] = useState(0)
    useEffect(() => {
        setRunning(true)
    }, [])
    
    return (
        <>
        <Background/>
        <View style={{flex: 1}}>

            <ImageBackground style={{position: 'absolute', right: 10, width: 100, height: 50, top: -15}} source={require('../assets/currentScore.png')}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#795548', marginTop: 20}}>{currentScore}</Text>
            </ImageBackground>

            <GameEngine
                ref={(ref) => {setGameEngine(ref) }}
                systems={[Physics]}
                entities={entities()}
                running={running}
                onEvent={(e) =>{
                    switch(e.type){
                    case 'game_over':
                        message = 'GameOver'
                        setRunning(false)
                        gameEngine.stop()
                        break;
                    case 'new_score':
                        setCurrentScore(currentScore + 1)
                        break;
                    }
                }}
                style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            >
                <ImageBackground style={{position: 'absolute', top: 15, left: 15, width: 50, height: 100}}>
                    <Image source={require('../assets/pauseButton.png')}/>
                    <TouchableOpacity style={{width: 40, height: 40, marginTop: -40}}
                        onPress={() => {
                        message = 'Pause'
                        setRunning(false)

                    }}>
                    </TouchableOpacity>

                    {message == 'Pause' ?
                        <TouchableOpacity style={{width: 40, height: 40, marginTop: -40}}
                            onPress={() => {
                            setRunning(true)
                            message = 'null'
                        }}
                        >

                        </TouchableOpacity>
                    : null}
                </ImageBackground>
            </GameEngine> 

            {message == 'GameOver' ?
                <ImageBackground style={{position: 'absolute', top: 65, left: 190, width: 500, height: 500}}>

                    <Image source={require('../assets/popUpMenuTemplate.png')}/>

                    <Text style={{position: 'absolute', left: 75, top: 30, fontSize: 40, color: '#795548'}}> Score: {currentScore} </Text>

                    <TouchableOpacity style={{width: 161, height: 51, marginLeft: 75, marginTop: -225}}
                    onPress={() => {
                        navigation.navigate("leaderboard")
                        message = 'null'
                    }}
                    >
                        <Image source={require('../assets/leaderboardButton.png')}/> 
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 161, height: 51, marginLeft: 75, marginTop: 5}}
                    onPress={() => {
                        navigation.navigate("home")
                        message = 'null'
                    }}
                    >
                        <Image source={require('../assets/quitButton.png')}/> 
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 173, height: 55, marginLeft: 70, marginTop: 5}}
                    onPress={() => {
                        setCurrentScore(0)
                        setRunning(true)
                        gameEngine.swap(entities())
                        message = 'null'
                    }}
                    >
                        <Image source={require('../assets/playAgainButton.png')}/> 
                    </TouchableOpacity>

                </ImageBackground>
            : null } 

            {message == 'Pause' ?
                <ImageBackground style={{position: 'absolute', top: 65, left: 190, width: 500, height: 500}}>

                    <Image source={require('../assets/pauseMenu.png')}/>

                    <TouchableOpacity style={{width: 161, height: 51, marginLeft: 75, marginTop: -225}}
                        onPress={() => {
                            navigation.navigate("options")
                            message = 'null'
                        }}
                        >
                        
                        <Image source={require('../assets/optionsButton.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 161, height: 51, marginLeft: 75, marginTop: 5}}
                        onPress={() => {
                            navigation.navigate("home")
                            message = 'null'
                        }}
                        >
                    
                        <Image source={require('../assets/quitButton.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 173, height: 55, marginLeft: 70, marginTop: 5}}
                        onPress={() => {
                            setRunning(true)
                            message = 'null'
                        }}
                        >
                          
                        <Image source={require('../assets/continueButton.png')}/>
                    </TouchableOpacity>

                </ImageBackground>
            : null }         

        </View>
        </>
       )
}

export default Game
