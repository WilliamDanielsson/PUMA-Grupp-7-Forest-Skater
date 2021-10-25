import Matter from "matter-js";
import React from 'react';
import { useState, useEffect } from 'react'
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

let haveJumped = false
let isOnFloor = true

let haveSwitched = false

let ticksWhileDodging = 0

let obstacleSpeed = -15

let dodgingLength = 30

const Physics = (entities, {touches, time, dispatch}) => {

    let engine = entities.physics.engine

        entities.Background1.body.collisionFilter = -1
        entities.Background2.body.collisionFilter = -2

        entities.FloorBackground1.body.collisionFilter = -3
        entities.FloorBackground2.body.collisionFilter = -4

        if(isOnFloor && !haveSwitched){
            touches.filter(t => t.type === 'press')
            .forEach(t => {
                Matter.Body.setVelocity(entities.Player.body, { x: 0, y: -25 })
                haveJumped = false
            }) 

            touches.filter(t => t.type === 'move')
            .forEach(t => {
                Matter.Body.setPosition(entities[`DodgingPlayer`].body, {x: 80 , y: windowHeight - 70})
                Matter.Body.setPosition(entities[`Player`].body, {x: 80 , y: windowHeight - 475})
                haveSwitched = true
                dispatch({type: 'Slided'}) 
            })
        }

        if(haveSwitched){
            ticksWhileDodging++

            if(ticksWhileDodging >= 10){ 
                let haveSlided = false
                touches.filter(t => t.type === 'press')
                .forEach(t => {
                    Matter.Body.setPosition(entities[`DodgingPlayer`].body, {x: 80 , y: windowHeight - 475})
                    Matter.Body.setPosition(entities[`Player`].body, {x: 80 , y: windowHeight - 110})
                    Matter.Body.setVelocity(entities.Player.body, { x: 0, y: -25 })
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

        Matter.Events.on(engine, 'collisionEnd', (event) => {
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
      
   // console.log(time)
    Matter.Engine.update(engine, 16.666)

    //  ticks++
    //  if(ticks == chunk){
    //      dispatch({type: 'new_score'}) 
    //      chunk = 15 + ticks
    //  }
   
    for (let index = 1; index <= 2; index++) {

        if(entities[`Background${index}`].body.bounds.max.x <= 0){
            const backgroundPos = getBackgroundPos(windowWidth * 8.02);
            
            Matter.Body.setPosition(entities[`Background${index}`].body, backgroundPos.background.pos) 
        }
//-0.5
            Matter.Body.translate(entities[`Background${index}`].body, {x: -0.5, y: 0})

        if(entities[`FloorBackground${index}`].body.bounds.max.x <= 0){
            const floorBackgroundPos = getFloorBackgroundPos(windowWidth * 0.95);
            
            Matter.Body.setPosition(entities[`FloorBackground${index}`].body, floorBackgroundPos.floorBackground.pos) 
        }
//-10
        Matter.Body.translate(entities[`FloorBackground${index}`].body, {x: obstacleSpeed, y: 0})
    }


    let firstWaveBiggest = 0
    let secondWaveBiggest = 0
    for (let index = 1; index <= 10; index++) {
         if(entities[`Obstacle${index}`].body.bounds.max.x <= 50 && entities[`Obstacle${index}`].body.bounds.max.x > 45){
             entities[`Obstacle${index}`].score = true
             //dispatch({type: 'new_score'})
         }

         if(entities[`Obstacle${index}`].body.bounds.max.x >= firstWaveBiggest && index < 6){
             firstWaveBiggest = entities[`Obstacle${index}`].body.bounds.max.x
         }

         if(entities[`Obstacle${index}`].body.bounds.max.x >= secondWaveBiggest && index > 5){
            secondWaveBiggest = entities[`Obstacle${index}`].body.bounds.max.x
        }

        Matter.Body.translate(entities[`Obstacle${index}`].body, {x: obstacleSpeed, y: 0}) 
    }

    //console.log(firstWaveBiggest)
    //console.log(secondWaveBiggest)

    if(firstWaveBiggest <= 0){
        for (let index = 1; index <= 5; index++) {
           Matter.Body.setPosition(entities[`Obstacle${index}`].body, {x: windowWidth * (getRandomIndexFromSecondList() * 0.7 ), y: entities[`Obstacle${index}`].body.position.y})
        }

        resetLists()
    }

    if(secondWaveBiggest <= 0){
        for (let index = 6; index <= 10; index++) {
           Matter.Body.setPosition(entities[`Obstacle${index}`].body, {x: windowWidth * (getRandomIndexFromSecondList() * 0.7), y: entities[`Obstacle${index}`].body.position.y})
        }

        resetLists()
    }

    return (entities);
}
export default Physics