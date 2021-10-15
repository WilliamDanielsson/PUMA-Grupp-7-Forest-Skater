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

    world.gravity.y = 0.8;

    const pipeSizePosA = getPipeSizePosPair()
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9)
    return {
        physics: {engine, world},

        Player: Player(world, 'green', {x: 50 , y: 50}, {height: 40, width: 40}),

        Floor: Floor(world, 'green', {x: windowWidth / 2 , y: windowHeight}, {height: 50, width: windowWidth}),

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'black', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'black', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),

        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'black', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'black', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),
    }
}