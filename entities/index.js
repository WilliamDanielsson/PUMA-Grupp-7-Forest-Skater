import Matter from "matter-js"
import Floor from "../components/Floor";
import Player from "../components/Player";

import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import { getBackgroundPos, getFloorPos, getPipeSizePosPair } from "../utils/random";
import Background from "../components/Background";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world

    //world.gravity.y = 0.7;
    world.gravity.y = 1.5;

    const pipeSizePosA = getPipeSizePosPair()
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9)

    const floorA = getFloorPos()
    const floorB = getFloorPos(windowWidth)

    const backgroundA = getBackgroundPos()
    const backgroundB = getBackgroundPos(windowWidth * 8.02)
    return {
        physics: {engine, world},

        Background1: Background(world, 'Background1', '../assets/background.png', backgroundA.background.pos, backgroundA.background.size),

        Background2: Background(world, 'Background1', '../assets/background.png',  backgroundB.background.pos, backgroundB.background.size),

        Player: Player(world, '../assets/skins/dude/main1.png', {x: 80 , y: windowHeight - 120}, {height: 90, width: 40}),

        //Floor: Floor(world, '../assets/environment/grass.png', {x: windowWidth / 2 , y: windowHeight - 25}, {height: 50, width: windowWidth}),

        Floor1: Floor(world, 'Floor1', '../assets/environment/grass.png', floorA.floor.pos, floorA.floor.size),

        Floor2: Floor(world, 'Floor2', '../assets/environment/grass.png', floorB.floor.pos, floorB.floor.size),

        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),

        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),
    }
}