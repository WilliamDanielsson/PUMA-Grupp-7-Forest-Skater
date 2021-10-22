import React, {useState, useContext} from 'react'
import { Text, View, Image, StyleSheet} from 'react-native'
import { useSession } from '../../contexts/SessionContext'

export default function UpdateSkin({ imgPath }) {

    
    return ( 

       <>
            <Image style={styles.dude} source={imgPath}/>
       </>
    )

}

const styles = StyleSheet.create({
    dude: {
        position: 'absolute',
        width: 100,
        height: 230,
        right: 120,
        marginTop: 50,

    },
       
    })

