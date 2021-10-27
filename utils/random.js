import {Dimensions, ListViewBase} from 'react-native'
import {getImage} from '../components/children/ImagesUrl'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

//const interval = 0.9

let firstPositionList = [1,2]
let secondPositionList = [3,4]


export const resetLists = () => {
    firstPositionList = [1,2]
    secondPositionList = [3,4]
}

function getPositionFromList (index) {
    let position = windowWidth + windowWidth * (index * 0.6)
    return position
//0.7
}

export let getRandomIndexFromFirstList = (min = 1, max = 2) => {
    let position = Math.floor(Math.random() * (max - min + 1) + min)
      while(firstPositionList.find(element => element == position) == undefined){
          position = Math.floor(Math.random() * (max - min + 1) + min)
     }

    firstPositionList[firstPositionList.indexOf(position)] = null
    return position
}

export let getRandomIndexFromSecondList = (min = 3, max = 4) => {
    let position = Math.floor(Math.random() * (max - min + 1) + min)
    while(secondPositionList.find(element => element == position) == undefined){
        position = Math.floor(Math.random() * (max - min + 1) + min)
    }
    secondPositionList[secondPositionList.indexOf(position)] = null
    return position
}

export const getObstaclePos = (addToPosX = 0) => {

    const obstacle = { pos: { x: windowWidth + addToPosX, y: windowHeight - 105}, size: {height: 110, width: 75} }
    return {obstacle}
}

export const getTreeStatsFirstWave = (addToPosX = 0) => {
    
    const treeImage = getImage(5)

    let xPos = getPositionFromList(getRandomIndexFromFirstList())

    const obstacle = { image: treeImage, pos: { x: xPos, y: windowHeight - 105}, size: {height: 110, width: 75} }
    return {obstacle}
}

export const getBushStatsFirstWave = (addToPosX = 0) => {

    const bushImage = getImage(6)

    let xPos = getPositionFromList(getRandomIndexFromFirstList())

    const obstacle = { image: bushImage, pos: { x: xPos, y: windowHeight - 75}, size: {height: 50, width: 72} }
    return {obstacle}
}

export const getLowBirdsStatsFirstWave = (addToPosX = 0) => {

    const birdsImage = getImage(7)

    let xPos = getPositionFromList(getRandomIndexFromFirstList())

    const obstacle = { image: birdsImage, pos: { x: xPos, y: windowHeight - 155}, size: {height: 115, width: 110} }
    return {obstacle}
}

export const getHighBirdsStatsFirstWave = (addToPosX = 0) => {

    const birdsImage = getImage(7)

    let xPos = getPositionFromList(getRandomIndexFromFirstList())

    const obstacle = { image: birdsImage, pos: { x: xPos, y: windowHeight - 215}, size: {height: 115, width: 110} }
    return {obstacle}
}

export const getTreeStatsSecondWave = (addToPosX = 0) => {

    const treeImage = getImage(5)

    let xPos = getPositionFromList(getRandomIndexFromSecondList())

    const obstacle = { image: treeImage, pos: { x: xPos, y: windowHeight - 105}, size: {height: 110, width: 75} }
    return {obstacle}
}

export const getBushStatsSecondWave = (addToPosX = 0) => {

    const bushImage = getImage(6)

    let xPos = getPositionFromList(getRandomIndexFromSecondList())

    const obstacle = { image: bushImage, pos: { x: xPos, y: windowHeight - 75}, size: {height: 50, width: 72} }
    return {obstacle}
}

export const getLowBirdsStatsSecondWave = (addToPosX = 0) => {

    const birdsImage = getImage(7)

    let xPos = getPositionFromList(getRandomIndexFromSecondList())

    const obstacle = { image: birdsImage, pos: { x: xPos, y: windowHeight - 155}, size: {height: 115, width: 110} }
    return {obstacle}
}

export const getHighBirdsStatsSecondWave = (addToPosX = 0) => {

    const birdsImage = getImage(7)

    let xPos = getPositionFromList(getRandomIndexFromSecondList())

    const obstacle = { image: birdsImage, pos: { x: xPos, y: windowHeight - 215}, size: {height: 115, width: 110} }
    return {obstacle}
}

export const getFloorBackgroundPos = (addToPosX = 0) => {
    
    const floorBackground = { pos: { x: (windowWidth / 2 ) + addToPosX, y: windowHeight - 25 }, size: {height: 50, width: windowWidth} }

    return { floorBackground }
}

export const getBackgroundPos = (addToPosX = 0) => {
    
    const background = { pos: { x: (windowWidth / 2 ) + addToPosX, y: (windowHeight / 2) + 38 }, size: {height: windowHeight, width: windowWidth * 8.02} }

    return { background }
}

export const getFloorPos= (addToPosX = 0) => {
    
    const floor = { pos: { x: (windowWidth / 2 ) + addToPosX, y: windowHeight - 25 }, size: {height: 50, width: windowWidth} }

    return { floor }
}