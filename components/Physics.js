import Matter from "matter-js";
import React from 'react';
import { useState, useEffect } from 'react'
import { getBackgroundPos, getFloorPos, getPipeSizePosPair } from "../utils/random";
import { Audio } from 'expo-av'
import {Dimensions} from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
let ticks = 0
let chunk = 15

yeet = 0
yoo = 10

let haveJumped = false
let isOnFloor = true

const Physics = (entities, {touches, time, dispatch}) => {

    let engine = entities.physics.engine

        entities.Background1.body.collisionFilter = -2
        entities.Background2.body.collisionFilter = -2
        

        // Matter.Events.on(engine, 'collisionActive', (event) => {
    
        //     const objectA = event.pairs[0].bodyA.label
        //     const objectB = event.pairs[0].bodyB.label
        //     if((objectA == 'Player' && objectB == 'Floor1' || objectA == 'Floor1' && objectB == 'Player') || 
        //     (objectA == 'Player' && objectB == 'Floor2' || objectA == 'Floor2' && objectB == 'Player')
        //     ){
        //         touches.filter(t => t.type === 'press')
        //         .forEach(t => {
        //           Matter.Body.setVelocity(entities.Player.body, { x: 0, y: -25 })
            
        //         //dispatch({type: 'Jumped'})
        //         // Matter.Body.setAngle(entities.Player.body, -90)
        //         //count++
        //        // console.log("jumped")
                
        //         }) 
        //         haveJumped = false
        //     }
        // }) 

        if(isOnFloor){
            touches.filter(t => t.type === 'press')
                .forEach(t => {
                  Matter.Body.setVelocity(entities.Player.body, { x: 0, y: -25 })
                  haveJumped = false
                 }) 
        }

        Matter.Events.on(engine, 'collisionStart', (event) => {
            const objectA = event.pairs[0].bodyA.label
            const objectB = event.pairs[0].bodyB.label
            if((objectA == 'Player' && objectB == 'Floor1' || objectA == 'Floor1' && objectB == 'Player') || 
            (objectA == 'Player' && objectB == 'Floor2' || objectA == 'Floor2' && objectB == 'Player')
            ){
            isOnFloor = true
            }
        })

        Matter.Events.on(engine, 'collisionEnd', (event) => {
            isOnFloor = false
            const objectA = event.pairs[0].bodyA.label
            const objectB = event.pairs[0].bodyB.label
            if((objectA == 'Player' && objectB == 'Floor1' || objectA == 'Floor1' && objectB == 'Player') || 
            (objectA == 'Player' && objectB == 'Floor2' || objectA == 'Floor2' && objectB == 'Player')
            ){
                if(!haveJumped){
                    haveJumped = true
                    dispatch({type: 'Jumped'})
                }
            }
        }) 
    
        
    
    Matter.Engine.update(engine, 32)

    ticks++
    if(ticks == chunk){
        dispatch({type: 'new_score'}) 
        chunk = 15 + ticks
    }
   
    for (let index = 1; index <= 2; index++) {

        if(entities[`ObstacleBottom${index}`].body.bounds.max.x <= 50){
            entities[`ObstacleBottom${index}`].score = true
            dispatch({type: 'new_score'})
        }

        if(entities[`Background${index}`].body.bounds.max.x <= 0){
            const backgroundPos = getBackgroundPos(windowWidth * 8.02);
            
            Matter.Body.setPosition(entities[`Background${index}`].body, backgroundPos.background.pos) 
        }

            Matter.Body.translate(entities[`Background${index}`].body, {x: -50, y: 0})
        
        if(entities[`ObstacleBottom${index}`].body.bounds.max.x <= 0){
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
            
            Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos) 
        }

        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {x: -10, y: 0}) 

        if(entities[`Floor${index}`].body.bounds.max.x <= 0){
            const floorPos = getFloorPos(windowWidth);
            
            Matter.Body.setPosition(entities[`Floor${index}`].body, floorPos.floor.pos) 
        }

        Matter.Body.translate(entities[`Floor${index}`].body, {x: -10, y: 0})
    }
    
    Matter.Events.on(engine, 'collisionStart', (event) => {
        const objectA = event.pairs[0].bodyA.label
        const objectB = event.pairs[0].bodyB.label

        if(objectA == 'Player' && objectB == 'ObstacleBottom1' || objectA == 'ObstacleBottom1' && objectB == 'Player' || objectA == 'Player' && objectB == 'ObstacleBottom2' || objectA == 'ObstacleBottom2' && objectB == 'Player'){
                dispatch({type: 'game_over'})  
        }
    })

    return (entities);
}
export default Physics