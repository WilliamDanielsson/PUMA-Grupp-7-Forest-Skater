import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { GameEngine } from 'react-native-game-engine'
import entities from '../entities'
import Physics from './Physics'
import { useState, useEffect } from 'react'
import Background from './children/Background'
import { Audio } from 'expo-av'

let message = 'null'
let playing = false
let jumpMessage = false
let sonic = 'sonic'
let dreamscape = 'dreamscape'
let jumpSound = 'jumpSound'
let deathSound = 'deathSound'


const Game = ({ navigation }) => {
  let messageGameOverHasBeenSent = false;
  const [soundEffect, setSoundEffect] = React.useState()
  const [themeSong, setThemeSong] = React.useState()
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentScore, setCurrentScore] = useState(0)
    useEffect(() => {
        setRunning(true)
    }, [])

    
     async function playSoundEffect(songName) {
        
         if(songName == 'dreamscape'){
            // console.log('Loading Sound');
             const { sound } = await Audio.Sound.createAsync(
             require('../Dreamscape.mp3')
             );
             setSoundEffect(sound);
    
            // console.log('Playing Sound');
             await sound.playAsync();
         }

         if(songName == 'jumpSound'){
            // console.log('Loading Sound');
             const { sound } = await Audio.Sound.createAsync(
             require('../jumpSound2.mp3')
             );
             setSoundEffect(sound);
    
           //  console.log('Playing Sound');
             await sound.playAsync();
         }

         if(songName == 'deathSound'){
            // console.log('Loading Sound');
             const { sound } = await Audio.Sound.createAsync(
             require('../deathSound.mp3')
             );
             setSoundEffect(sound);
    
           //  console.log('Playing Sound');
             await sound.playAsync();
         }
     }

         React.useEffect(() => {
             return soundEffect
               ? () => {
                  // console.log('Unloading Sound');
                   soundEffect.unloadAsync(); }
               : soundEffect;
           }, [soundEffect]);


          async function playThemeSong() {
            playing = true
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync(
               require('../gottaGoFast.mp3')
            );
            setThemeSong(sound);
        
            console.log('Playing Sound');
            await sound.playAsync(); }
        
           React.useEffect(() => {
             return themeSong
               ? () => {
                   playing = false
                   console.log('Unloading Sound');
                   themeSong.unloadAsync(); }
               : undefined;
           }, [themeSong]);
    
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
                        if(!messageGameOverHasBeenSent){
                            messageGameOverHasBeenSent = true;
                            console.log("Game_Over")
                            themeSong.pauseAsync();
                            playSoundEffect(deathSound)
                            // return themeSong
                            // ? () => {
                            //    // playing = false
                            //     console.log('Unloading Sound');
                            //     themeSong.unloadAsync(); }
                            // : undefined;
                        }
                        break;
                    case 'new_score':
                        setCurrentScore(currentScore + 1)
                        break;
                    case 'Jumped':
                        jumpMessage = true
                        playSoundEffect(jumpSound)
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
                        themeSong.pauseAsync();
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
