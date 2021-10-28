import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities'
import {restart} from '../entities/index'
import Physics from './Physics'
import {resetValues} from './Physics'
import { useState, useEffect } from 'react'
import Background from './children/Background'
import { Audio } from 'expo-av'
import { updateHighScore, auth } from '../firebase';

let message = 'null'
let playing = false
let jumpMessage = false
let newHighScore = undefined
let sonic = 'sonic'
let dreamscape = 'dreamscape'
let jumpSound = 'jumpSound'
let deathSound = 'deathSound'
let highScoreSound = 'highScoreSound'
let slidingSound = 'slidingSound'


const Game = ({ navigation }) => {
  let messageGameOverHasBeenSent = false;
  const [soundEffect, setSoundEffect] = React.useState()
  const [themeSong, setThemeSong] = React.useState()
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentScore, setCurrentScore] = useState(0)

    useEffect(() => {
        setRunning(true)
        resetValues()
        message = 'null'
        playing = false
        setSoundEffect()
        setThemeSong()
    }, [])

     async function playSoundEffect(songName) {
        
         if(songName == 'dreamscape'){
             const { sound } = await Audio.Sound.createAsync(
             require('../Dreamscape.mp3')
             );
             setSoundEffect(sound);

             await sound.playAsync();
         }

         if(songName == 'jumpSound'){
             const { sound } = await Audio.Sound.createAsync(
             require('../jumpSound.mp3')
             );
             setSoundEffect(sound);

             await sound.playAsync();
         }

         if(songName == 'deathSound'){
             const { sound } = await Audio.Sound.createAsync(
             require('../deathSound.mp3')
             );
             setSoundEffect(sound);
    
             await sound.playAsync();
         }

         if(songName == 'highScoreSound'){
             const { sound } = await Audio.Sound.createAsync(
             require('../highScoreSound.mp3')
             );
             setSoundEffect(sound);
    
             await sound.playAsync();
         }

         if(songName == 'slidingSound'){
             const { sound } = await Audio.Sound.createAsync(
             require('../slidingSound.mp3')
             );
             setSoundEffect(sound);
    
             await sound.playAsync();
         }
     }

          React.useEffect(() => {
              return soundEffect
                ? () => {
                   soundEffect.unloadAsync(); }
                : undefined;
            }, [soundEffect]);


          async function playThemeSong() {
            playing = true
            const { sound } = await Audio.Sound.createAsync(
               require('../themeSong.mp3')
            );
            setThemeSong(sound);
    
            await sound.playAsync(); }
        
            React.useEffect(() => {
              return themeSong
                ? () => {
                    playing = false
                    themeSong.unloadAsync(); }
                : undefined;
            }, [themeSong]);

    return (
        <>
        <Background/>
        <View style={{flex: 1}}>

            <ImageBackground style={{position: 'absolute', right: '3%', width: 100, height: 50, top: '-3.6%'}} source={require('../assets/currentScore.png')}>
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#795548', marginTop: '20%'}}>{currentScore}</Text>
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
                        resetValues()
                        setRunning(false)
                        gameEngine.stop()
                        if(!messageGameOverHasBeenSent){
                            auth.onAuthStateChanged( async (user) => {
                                if (user) {      
                                    await updateHighScore(user.uid, currentScore)      
                                 }
                            })
                            messageGameOverHasBeenSent = true;
                            console.log("Game_Over")
                            themeSong.pauseAsync();
                            playSoundEffect(deathSound)
                        }
                        break;
                    case 'new_score':
                        setCurrentScore(currentScore + 1)
                        break;
                    case 'Jumped':
                        jumpMessage = true
                        playSoundEffect(jumpSound)
                        break;
                    case 'Slided':
                        playSoundEffect(slidingSound)
                        break;

                    }

                }}
                style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            >
                <ImageBackground style={{position: 'absolute', top: '4%', left: '3%', width: 50, height: 100}}>
                    <Image source={require('../assets/pauseButton.png')}/>
                    <TouchableOpacity style={{width: 40, height: 40, marginTop: '-80%'}}
                        onPress={() => {
                        message = 'Pause'
                        themeSong.pauseAsync();
                        setRunning(false)

                    }}>
                    </TouchableOpacity>

                    {message == 'Pause' ?
                        <TouchableOpacity style={{width: 40, height: 40, marginTop: '-80%'}}
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
                <ImageBackground style={{position: 'absolute', top: '15%', left: '27%', width: 500, height: 500}}>

                    <Image source={require('../assets/popUpMenuTemplate.png')}/>

                    <Text style={{position: 'absolute', left: '14.5%', top: '6.5%', fontSize: 40, color: '#795548'}}> Score: {currentScore} </Text>

                    <TouchableOpacity style={{width: 161, height: 51, marginLeft: '15%', marginTop: '-43.5%'}}
                    onPress={() => {
                        navigation.navigate("leaderboard")
                        message = 'null'
                    }}
                    >
                        <Image source={require('../assets/leaderboardButton.png')}/> 
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 161, height: 51, marginLeft: '15%', marginTop: '0.75%'}}
                    onPress={() => {
                        navigation.navigate("home")
                        message = 'null'
                    }}
                    >
                        <Image source={require('../assets/quitButton.png')}/> 
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 173, height: 55, marginLeft: '13.7%', marginTop: '0.75%'}}
                    onPress={() => {
                        //playing = false
                        themeSong.replayAsync();
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
                <ImageBackground style={{position: 'absolute', top: '15%', left: '27%', width: 500, height: 500}}>

                    <Image source={require('../assets/pauseMenu.png')}/>

                    <TouchableOpacity style={{width: 161, height: 51, marginLeft: '15%', marginTop: '-43.5%'}}
                        onPress={() => {
                            navigation.navigate("options")
                            message = 'null'
                        }}
                        >
                        
                        <Image source={require('../assets/optionsButton.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 161, height: 51, marginLeft: '15%', marginTop: '0.75%'}}
                        onPress={() => {
                            navigation.navigate("home")
                            message = 'null'
                            resetValues()
                        }}
                        >
                    
                        <Image source={require('../assets/quitButton.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 173, height: 55, marginLeft: '13.7%', marginTop: '0.75%'}}
                        onPress={() => {
                            themeSong.playAsync();
                            setRunning(true)
                            message = 'null'
                        }}
                        >
                          
                        <Image source={require('../assets/continueButton.png')}/>
                    </TouchableOpacity>

                </ImageBackground>
            : null }

            {running && !playing ? 
               playThemeSong()
            : null }          

        </View>
        </>
       )
}

export default Game
