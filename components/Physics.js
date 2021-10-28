import Matter, { World } from "matter-js";
import React from 'react';
import { useState, useEffect , InteractionManager} from 'react'
import { getBackgroundPos, getFloorPos, getObstaclePos, getFloorBackgroundPos} from "../utils/random";
import { Audio } from 'expo-av'
import {Dimensions} from 'react-native'
import Obstacle from "../components/Obstacle";
import entities from '../entities'
import { getRandomIndexFromFirstList, getRandomIndexFromSecondList, resetLists }from "../utils/random";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
let ticks = 0
let chunk = 15
let score = 0
let difficultLimit = 5

let haveJumped = false
let isOnFloor = true
let collisionEnd = false

let haveSwitched = false

let ticksWhileDodging = 0

let obstacleSpeed = -12

let backGroundSpeed = obstacleSpeed / 30

let playerJumpSpeed = obstacleSpeed / 0.5

let dodgingLength = 30

let gravity = obstacleSpeed / -7

let move = 0

let swipingLimit = 20

let initializedGravity = false

let interval = undefined
//{touches, time, dispatch}

export const resetValues = () => {
    obstacleSpeed = -12
    backGroundSpeed = obstacleSpeed / 3
    playerJumpSpeed = obstacleSpeed / 0.45
    dodgingLength = 30
    gravity = obstacleSpeed / -7
    score = 0
    ticks = 0
    chunk = 15
    difficultLimit = 5
    swipingLimit = 20
    move = 0
    ticksWhileDodging = 0
}
const Physics = (entities, {touches, time, dispatch}) => {
        let engine = entities.physics.engine
       
        engine.world.gravity.y = gravity

        entities.Background1.body.collisionFilter = -1
        entities.Background2.body.collisionFilter = -2

        entities.FloorBackground1.body.collisionFilter = -3
        entities.FloorBackground2.body.collisionFilter = -4

        // InteractionManager.setInterval( yoo(), 1000)
        // function yoo () {
        //     console.log("hi")
        // }

        if(isOnFloor && !haveSwitched){
            touches.filter(t => t.type)
            .forEach(t => {
                if(t.type === 'press'){
                    Matter.Body.setVelocity(entities.Player.body, { x: 0, y: playerJumpSpeed })
                    collisionEnd = true
                    //-25
                    haveJumped = false 
                }

                if(t.type === 'move'){
                    move++ 
                }
            }) 
        }

        
        if(move < 8 && ticks > swipingLimit){
            swipingLimit = swipingLimit + 100
            move = 0
        }

        if(move >= 8){
            Matter.Body.setPosition(entities[`DodgingPlayer`].body, {x: 80 , y: windowHeight - 60})
            Matter.Body.setPosition(entities[`Player`].body, {x: 80 , y: windowHeight - 475})
            haveSwitched = true
            dispatch({type: 'Slided'}) 
            move = 0
        }

        if(haveSwitched){
            ticksWhileDodging++

            if(ticksWhileDodging >= 10){ 
                let haveSlided = false
                touches.filter(t => t.type === 'press')
                .forEach(t => {
                    Matter.Body.setPosition(entities[`DodgingPlayer`].body, {x: 80 , y: windowHeight - 475})
                    Matter.Body.setPosition(entities[`Player`].body, {x: 80 , y: windowHeight - 110})
                    Matter.Body.setVelocity(entities.Player.body, { x: 0, y: playerJumpSpeed })
                    collisionEnd = true
                    haveSwitched = false 
                    ticksWhileDodging = 0
                    haveJumped = false
                    if(!haveSlided){
                        dispatch({type: 'Jumped'})
                        haveSlided = true
                    }
                })
            }
    
            if(ticksWhileDodging >= dodgingLength){ 
                Matter.Body.setPosition(entities[`DodgingPlayer`].body, {x: 80 , y: windowHeight - 475})
                Matter.Body.setPosition(entities[`Player`].body, {x: 80 , y: windowHeight - 110})
                haveSwitched = false 
                ticksWhileDodging = 0
                dodgingLength = 30
            }
        }
    
        Matter.Events.on(engine, 'collisionStart', (event) => {
            const objectA = event.pairs[0].bodyA.label
            const objectB = event.pairs[0].bodyB.label
            const isObstacleObjectA = event.pairs[0].bodyA.isObstacle
            const isObstacleObjectB = event.pairs[0].bodyB.isObstacle

            if((objectA == 'Player' && objectB == 'Floor' || objectA == 'Floor' && objectB == 'Player') ||
            (objectA == 'DodgingPlayer' && objectB == 'Floor' || objectA == 'Floor' && objectB == 'DodgingPlayer')){
            isOnFloor = true
            }

            if((objectA == 'Player' && isObstacleObjectB || objectB == 'Player' && isObstacleObjectA) ||
            (objectA == 'DodgingPlayer' && isObstacleObjectB || objectB == 'DodgingPlayer' && isObstacleObjectA)){
              dispatch({type: 'game_over'}) 
            }
        })

        if(entities['Player'].body.bounds.max.y > 1000 || entities['DodgingPlayer'].body.bounds.max.y > 1000){
            dispatch({type: 'game_over'}) 
        }

        if(collisionEnd){
            Matter.Events.on(engine, 'collisionEnd', (event) => {
                collisionEnd = false
                isOnFloor = false
                const objectA = event.pairs[0].bodyA.label
                const objectB = event.pairs[0].bodyB.label
                if((objectA == 'Player' && objectB == 'Floor' || objectA == 'Floor' && objectB == 'Player') ||
                (objectA == 'DodgingPlayer' && objectB == 'Floor' || objectA == 'Floor' && objectB == 'DodgingPlayer')){
                    if(!haveJumped){
                        haveJumped = true
                        
                        dispatch({type: 'Jumped'})
                    }
                }
            }) 
        }

    Matter.Engine.update(engine, 32.333)

      ticks++
      if(ticks == chunk){
          dispatch({type: 'new_score'}) 
          chunk = 15 + ticks
          score++
      }

      if(score > difficultLimit){

        obstacleSpeed = obstacleSpeed - 1.5

        gravity = obstacleSpeed / -7

        playerJumpSpeed = obstacleSpeed / 0.5

        difficultLimit = difficultLimit + score
      }
   
    for (let index = 1; index <= 2; index++) {

        if(entities[`Background${index}`].body.bounds.max.x <= 0){
            const backgroundPos = getBackgroundPos(windowWidth * 8.02);
            
            Matter.Body.setPosition(entities[`Background${index}`].body, backgroundPos.background.pos) 
        }
//-0.5
            Matter.Body.translate(entities[`Background${index}`].body, {x: backGroundSpeed, y: 0})

        if(entities[`FloorBackground${index}`].body.bounds.max.x <= 0){
            const floorBackgroundPos = getFloorBackgroundPos(windowWidth * 0.95);
            
            Matter.Body.setPosition(entities[`FloorBackground${index}`].body, floorBackgroundPos.floorBackground.pos) 
        }
//-10
        Matter.Body.translate(entities[`FloorBackground${index}`].body, {x: obstacleSpeed, y: 0})
    }


    let firstWaveBiggest = 0
    let secondWaveBiggest = 0
    for (let index = 1; index <= 4; index++) {
         if(entities[`Obstacle${index}`].body.bounds.max.x <= 50 && entities[`Obstacle${index}`].body.bounds.max.x > 45){
             entities[`Obstacle${index}`].score = true
             //dispatch({type: 'new_score'})
         }

         if(entities[`Obstacle${index}`].body.bounds.max.x >= firstWaveBiggest && index < 3){
             firstWaveBiggest = entities[`Obstacle${index}`].body.bounds.max.x
         }

         if(entities[`Obstacle${index}`].body.bounds.max.x >= secondWaveBiggest && index > 2){
            secondWaveBiggest = entities[`Obstacle${index}`].body.bounds.max.x
        }

        Matter.Body.translate(entities[`Obstacle${index}`].body, {x: obstacleSpeed, y: 0}) 
    }

    //console.log(firstWaveBiggest)
    //console.log(secondWaveBiggest)

    if(firstWaveBiggest <= 0){
        for (let index = 1; index <= 2; index++) {
           Matter.Body.setPosition(entities[`Obstacle${index}`].body, {x: windowWidth * (getRandomIndexFromSecondList() * 0.6 ), y: entities[`Obstacle${index}`].body.position.y})
        }

        resetLists()
    }

    if(secondWaveBiggest <= 0){
        for (let index = 3; index <= 4; index++) {
           Matter.Body.setPosition(entities[`Obstacle${index}`].body, {x: windowWidth * (getRandomIndexFromSecondList() * 0.6), y: entities[`Obstacle${index}`].body.position.y})
        }

        resetLists()
    }

    return (entities);
}
export default Physics