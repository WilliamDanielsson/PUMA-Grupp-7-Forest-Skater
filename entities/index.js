import Matter from "matter-js"
import Floor from "../components/Floor";
import Player from "../components/Player";

import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import { getPipeSizePosPair } from "../utils/random";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world

    world.gravity.y = 0.7;

    const pipeSizePosA = getPipeSizePosPair()
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9)
    return {
        physics: {engine, world},

        Player: Player(world, '..main1.png', {x: 80 , y: windowHeight - 120}, {height: 90, width: 40}),

        Floor: Floor(world, {x: windowWidth / 2 , y: windowHeight - 25}, {height: 50, width: windowWidth}),

        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),

        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),
    }
}