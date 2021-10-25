import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'
import { useSession } from "../contexts/SessionContext";

const Obstacle = props => {
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
            height: heightBody,
        }}
        source={image}
        />
        
    )
}

export default (world, label, image, isObstacle, pos, size) => {
    const initialObstacle = Matter.Bodies.rectangle(
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
    
    Matter.World.add(world, initialObstacle)

    return {
        body: initialObstacle,
        image,
        pos,
        renderer: <Obstacle/>
    }
}
