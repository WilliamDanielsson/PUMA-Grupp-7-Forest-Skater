import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";

import {Dimensions} from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
let ticks = 0
let chunk = 15

const Physics = (entities, {touches, time, dispatch}) => {
    let engine = entities.physics.engine

        Matter.Events.on(engine, 'collisionActive', (event) => {
            const objectA = event.pairs[0].bodyA.label
            const objectB = event.pairs[0].bodyB.label
            if(objectA == 'Player' && objectB == 'Floor' || objectA == 'Floor' && objectB == 'Player'){
                touches.filter(t => t.type === 'press')
                .forEach(t => {
                  Matter.Body.setVelocity(entities.Player.body, {
                      x: 0,
                      y: -18
               // Matter.Body.rotate(entities.Player.body, 1.57)
               // entities.Player.body.position.y = windowHeight - 95;
                })
            }) 
            }
        })
       

    Matter.Engine.update(engine, time.delta)

    ticks++
    if(ticks == chunk){
        dispatch({type: 'new_score'}) 
        chunk = 15 + ticks
    }
   
    for (let index = 1; index <= 2; index++) {

        if(entities[`ObstacleBottom${index}`].body.bounds.max.x <= 50){
            entities[`ObstacleBottom${index}`].score = true
            dispatch({type: 'new_score'})
            time++;
        }
        
        if(entities[`ObstacleBottom${index}`].body.bounds.max.x <= 0){
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
            
            Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body, pipeSizePos.pipeBottom.pos) 
        }

        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {x: -5, y: 0}) 
    }


    // Matter.Events.on(engine, 'collisionStart', (event) => {
    //     dispatch({type: 'game_over'})
    // })

    Matter.Events.on(engine, 'collisionStart', (event) => {
        const objectA = event.pairs[0].bodyA.label
        const objectB = event.pairs[0].bodyB.label

        if(objectA == 'Player' && objectB == 'ObstacleBottom1' || objectA == 'ObstacleBottom1' && objectB == 'Player' || objectA == 'Player' && objectB == 'ObstacleBottom2' || objectA == 'ObstacleBottom2' && objectB == 'Player'){
            dispatch({type: 'game_over'})
        }
        //console.log(A, B);
    })

    return entities;
}
export default Physics