import Matter from 'matter-js'
import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType'
import { useSession } from "../contexts/SessionContext";

const Player = props => {
    
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const color = props.color;
    const image = props.image;
    
    const {value, value2} = useSession()
    const [valueImg, setValueImg] = value2;
    const skin = valueImg.path;
    return(
        <>
        
        <Image style={{
           // backgroundColor: color,
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody
        }}
        source={skin}
        />
        </>
    )
}

export default (world, image, pos, size) => {
    const initialPlayer = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {label: 'Player'}
    )
    
    Matter.World.add(world, initialPlayer)

    return {
        body: initialPlayer,
        //color,
        image,
        pos,
        renderer: <Player/>
    }
}
