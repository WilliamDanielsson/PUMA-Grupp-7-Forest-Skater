import Matter from "matter-js"
import Floor from "../components/Floor";
import Player from "../components/Player";
import DodgingPlayer from "../components/DodgingPlayer";

import { Dimensions } from "react-native";
import Obstacle from "../components/Obstacle";
import { getBackgroundPos, getLowBirdsStatsFirstWave, getHighBirdsStatsFirstWave, getBushStatsFirstWave, getTreeStatsFirstWave, getFloorBackgroundPos, getFloorPos, getObstaclePos, resetLists, getLowBirdsStatsSecondWave, getHighBirdsStatsSecondWave, getBushStatsSecondWave, getTreeStatsSecondWave} from "../utils/random";
import Background from "../components/Background";
import FloorBackground from "../components/FloorBackground";
import {getImage} from '../components/children/ImagesUrl'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
let backgroundA = undefined
let backgroundB = undefined
let Tree1 = undefined
let Tree2 = undefined
let Tree3 = undefined
let Bush1 = undefined
let Bush2 = undefined
let Bush3 = undefined
let Birds1 = undefined
let Birds2 = undefined
let Birds3 = undefined
let Birds4 = undefined
let floor = undefined
let floorBackgroundA = undefined
let floorBackgroundB  = undefined

let lessLaggyTree = undefined
let lessLaggyBush = undefined
let lessLaggyLowBird = undefined
let lessLaggyHighBird = undefined

let dodgingPlayerImage = undefined

let haveRunnedOnce = true
export default restart => {
   
    let engine = Matter.Engine.create({enableSleeping: false})

    let world = engine.world

    world.gravity.y = 6;
    
    if(haveRunnedOnce){
        //haveRunnedOnce = false
        console.log("yeet")
        backgroundA = getBackgroundPos()
        backgroundB = getBackgroundPos(windowWidth * 8.02)
    
        // Tree1 = getTreeStatsFirstWave()
        // Tree2 = getTreeStatsSecondWave()
        // Tree3 = getTreeStatsFirstWave()
        // Bush1 = getBushStatsSecondWave()
        // Bush2 = getBushStatsSecondWave()
        // Bush3 = getBushStatsFirstWave()
        // Birds1 = getLowBirdsStatsFirstWave()
        // Birds2 = getHighBirdsStatsFirstWave()
        // Birds3 = getLowBirdsStatsSecondWave()
        // Birds4 = getHighBirdsStatsSecondWave()

        lessLaggyTree = getTreeStatsFirstWave()
        lessLaggyBush = getBushStatsSecondWave()
        lessLaggyLowBird = getLowBirdsStatsFirstWave()
        lessLaggyHighBird = getHighBirdsStatsSecondWave()
    
        floor = getFloorPos()
    
        floorBackgroundA = getFloorBackgroundPos()
        floorBackgroundB = getFloorBackgroundPos(windowWidth * 0.99)
    
        dodgingPlayerImage = getImage(8)
    
        resetLists() 
    }
        
    return {
        physics: {engine, world},

        Background1: Background(world, 'Background1', '../assets/background.png', false, backgroundA.background.pos, backgroundA.background.size),

        Background2: Background(world, 'Background1', '../assets/background.png',  false, backgroundB.background.pos, backgroundB.background.size),

        Player: Player(world, '../assets/skins/dude/main1.png', false, {x: 80 , y: windowHeight - 120}, {height: 90, width: 40}),

        DodgingPlayer: DodgingPlayer(world, 'DodgingPlayer', dodgingPlayerImage, false, {x: 80 , y: windowHeight - 475}, {height: 40, width: 90}),

        Floor: Floor(world, 'Floor', false, floor.floor.pos, floor.floor.size),

        Ceiling: Floor(world, 'Ceiling,', false, {x: windowWidth / 2  , y: windowHeight - 450}, {height: 50, width: windowWidth}),

        FloorBackground1: FloorBackground(world, 'FloorBackground1', '../assets/environment/grass.png', false, floorBackgroundA.floorBackground.pos, floorBackgroundA.floorBackground.size),

        FloorBackground2: FloorBackground(world, 'FloorBackground2', '../assets/environment/grass.png', false, floorBackgroundB.floorBackground.pos, floorBackgroundB.floorBackground.size),

        // Obstacle1: Obstacle(world, 'Obstacle1' , Tree1.obstacle.image, true, Tree1.obstacle.pos, Tree1.obstacle.size),

        // Obstacle6: Obstacle(world, 'Obstacle6', Tree2.obstacle.image, true, Tree2.obstacle.pos, Tree2.obstacle.size),

        // Obstacle2: Obstacle(world, 'Obstacle2', Tree3.obstacle.image, true, Tree3.obstacle.pos, Tree3.obstacle.size),

        // Obstacle8: Obstacle(world, 'Obstacle5', Bush1.obstacle.image, true, Bush1.obstacle.pos, Bush1.obstacle.size),

        // Obstacle9: Obstacle(world, 'Obstacle8' , Bush2.obstacle.image, true, Bush2.obstacle.pos, Bush2.obstacle.size),

        // Obstacle3: Obstacle(world, 'Obstacle3' , Bush3.obstacle.image, true, Bush3.obstacle.pos, Bush3.obstacle.size),

        // Obstacle4: Obstacle(world, 'Obstacle8', Birds1.obstacle.image, true, Birds1.obstacle.pos, Birds1.obstacle.size),

        // Obstacle5: Obstacle(world, 'Obstacle9', Birds2.obstacle.image, true, Birds2.obstacle.pos, Birds2.obstacle.size),

        // Obstacle10: Obstacle(world, 'Obstacle10', Birds3.obstacle.image, true, Birds3.obstacle.pos, Birds3.obstacle.size),

        // Obstacle7: Obstacle(world, 'Obstacle7', Birds4.obstacle.image, true, Birds4.obstacle.pos, Birds4.obstacle.size),

        Obstacle1: Obstacle(world, 'Obstacle1' , lessLaggyTree.obstacle.image, true, lessLaggyTree.obstacle.pos, lessLaggyTree.obstacle.size),

        Obstacle3: Obstacle(world, 'Obstacle3' , lessLaggyBush.obstacle.image, true, lessLaggyBush.obstacle.pos, lessLaggyBush.obstacle.size),

        Obstacle2: Obstacle(world, 'Obstacle2' , lessLaggyLowBird.obstacle.image, true, lessLaggyLowBird.obstacle.pos, lessLaggyLowBird.obstacle.size),

        Obstacle4: Obstacle(world, 'Obstacle4' , lessLaggyHighBird.obstacle.image, true, lessLaggyHighBird.obstacle.pos, lessLaggyHighBird.obstacle.size),
        
    }
}