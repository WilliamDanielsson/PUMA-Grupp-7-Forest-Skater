import Matter from 'matter-js'
import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType'
import { useSession } from "../contexts/SessionContext";
import { getDogeImage} from './children/ImageDodge'

const DodgingPlayer = props => {
    
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody / 2
    const yBody = props.body.position.y - heightBody / 2

    const {value, value2} = useSession()
    const [valueImgD, setValueImgD] = value;

    const skinDodge = valueImgD.path;

    const color = props.color;
    const image = props.image;
    
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
        source={skinDodge}
        />
        </>
    )
}

export default (world, label, image, isObstacle, pos, size) => {
    const initialDodgingPlayer = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {label,
         isObstacle
        }
    )
    
    Matter.World.add(world, initialDodgingPlayer)

    return {
        body: initialDodgingPlayer,
        //color,
        image,
        pos,
        renderer: <DodgingPlayer/>
    }
}