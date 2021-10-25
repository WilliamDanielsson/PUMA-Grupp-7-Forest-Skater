import Matter from 'matter-js'
import React from 'react'
import { View, Image } from 'react-native'

const Floor = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const color = props.color;

    const image = props.image;

    return(
        <View style={{
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            //backgroundColor: 'black'
        }}
        //source={require('../assets/environment/grass.png')}
        />
    )
}

export default (world, label, isObstacle, pos, size) => {
    const initialFloor = Matter.Bodies.rectangle(
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
    
    Matter.World.add(world, initialFloor)

    return {
        body: initialFloor,
        pos,
        renderer: <Floor/>
    }
}
