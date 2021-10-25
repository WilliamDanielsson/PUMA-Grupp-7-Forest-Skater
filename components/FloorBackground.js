import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'

const FloorBackground = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const color = props.color;

    const image = props.image;

    return(
        <Image style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}
        source={require('../assets/environment/grass.png')}
        />
    )
}

export default (world, label, image, isObstacle, pos, size) => {
    const initialFloorBackground = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label, 
            isStatic: true,
            isObstacle
    
        }
    )
    
    Matter.World.add(world, initialFloorBackground)

    return {
        body: initialFloorBackground,
        image,
        pos,
        renderer: <FloorBackground/>
    }
}