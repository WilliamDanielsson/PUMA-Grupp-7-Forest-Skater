import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities'
import Physics from '../physics'
import { useState, useEffect } from 'react'
import Background from './children/Background'

const Game = () => {
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentScore, setCurrentScore] = useState(0)
    useEffect(() => {
        setRunning(true)
    }, [])

    let message = 'pause'

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
                            setRunning(false)
                        }}>
                        </TouchableOpacity>
                    </ImageBackground>
                </GameEngine>   
                    {!running ? 
                        <ImageBackground style={{position: 'absolute', top: 65, left: 190, width: 500, height: 500}}>
                            <Image source={require('../assets/gameOverMenu.png')}/>
                        <TouchableOpacity style={{backgroundColor: '#C79871', width: 150, height: 40, borderWidth: 2, borderColor: '#795548', borderRadius: 5, marginLeft: 80, marginTop: -175}}
                        onPress={() => {
                            setCurrentScore(0)
                            setRunning(true)
                            gameEngine.swap(entities())
                        }}
                        >
                            <Text style={{textAlign: 'center', marginTop: 4, fontWeight: 'bold', color: '#795548', fontSize: 20}}>
                            START GAME
                            </Text>
                        </TouchableOpacity>
                    </ImageBackground>
                    : null} 
        </View>
        </>
       )
}

export default Game
