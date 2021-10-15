<<<<<<< HEAD
import React from 'react'
import { View, Text } from 'react-native'
import Background from './children/Background'
=======
import React, {useState} from 'react'
import {ImageBackground ,View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import Background from './children/Background' 
import { imageHats } from './children/ImagesUrl'
import UpdateSkin from './children/UpdateSkin'
>>>>>>> ceee628f1a4e370981d0de9d081e3dab93f80cb1

const Customize = () => {
    const [counter, setCounter] = useState(1)
    const [indexHead, setIndexHead] = useState(1)
    const [indexSweater, setIndexSweater] = useState(1)
    const [indexTrouser, setIndexTrouser] = useState(1)
    
    const skin = [
        {
            hats: [
                {
                    image: require( `../assets/skins/hats/hat1.png`),
                },
                {
                    image: require( `../assets/skins/hats/hat2.png`),
                },
                {
                    image: require( `../assets/skins/hats/hat3.png`),
                },
                {
                    image: require( `../assets/skins/hats/hat4.png`),
                },
                {
                    image: require( `../assets/skins/hats/hat5.png`),
                },
            ]
        },
        {
            heads: [
                {
                    image: require( '../assets/skins/heads/head1.png'),
                },
                {
                    image: require( '../assets/skins/heads/head2.png'),
                },
                {
                    image: require( '../assets/skins/heads/head3.png'),
                },
                {
                    image: require( '../assets/skins/heads/head4.png'),
                },
                {
                    image: require( '../assets/skins/heads/head5.png'),
                },
                {
                    image: require( '../assets/skins/heads/head6.png'),
                },
            ]

        },
        {
            sweaters: [
                {
                    image: require( '../assets/skins/sweaters/cloth1.png'),
                },
                {
                    image: require( '../assets/skins/sweaters/cloth2.png'),
                },
                {
                    image: require( '../assets/skins/sweaters/cloth3.png'),
                },
                {
                    image: require( '../assets/skins/sweaters/cloth4.png'),
                },
                {
                    image: require( '../assets/skins/sweaters/cloth5.png'),
                },
                {
                    image: require( '../assets/skins/sweaters/cloth6.png'),
                },
                {
                    image: require( '../assets/skins/sweaters/cloth7.png'),
                },
            ]
        },
        {
            trousers: [
                {
                    image: require( '../assets/skins/trousers/pants1.png'),
                },
                {
                    image: require( '../assets/skins/trousers/pants2.png'),
                },
                {
                    image: require( '../assets/skins/trousers/pants3.png'),
                },
                {
                    image: require( '../assets/skins/trousers/pants4.png'),
                },
                {
                    image: require( '../assets/skins/trousers/pants5.png'),
                },
            ]
        }
    ]
   
    const dudes = [
        {
            Id: 1,
            image: require(`../assets/skins/dude/dude1.png`),
        },
        {
            Id: 2,
            image: require(`../assets/skins/dude/dude2.png`),
        },
        {
            Id: 3,
            image: require(`../assets/skins/dude/dude3.png`),
        },
        {
            Id: 4,
            image: require(`../assets/skins/dude/dude4.png`),
        },


    ]

    const dude = dudes.find(obj => obj.Id === counter)
    console.log(dude)
    return (
        <>
<<<<<<< HEAD
            {/* 
                Denna komponent är själva customize sidan 
                där alla child customize-components ska in 
            */}
=======
            <Background/>
            <View>
                <ImageBackground style={styles.container}  source={require('../assets/skins/canvas/canvas.png')}>
                    <Image style={styles.dude} source={require('../assets/skins/dude/dude4.png')}/>
                    <TouchableNativeFeedback onPress={()=> setCounter(counter+1)} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image style={styles.rightButton} source={require('../assets/skins/buttons/right.png')}/>
                    </TouchableNativeFeedback>
>>>>>>> ceee628f1a4e370981d0de9d081e3dab93f80cb1

                

<<<<<<< HEAD
=======
                    <TouchableNativeFeedback onPress={()=> setCounter(counter - 1)} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image style={[styles.leftButton, {paddingTop: 10}]} source={require('../assets/skins/buttons/left.png')}/>
                    </TouchableNativeFeedback>
                </ImageBackground>     
            </View>
            
>>>>>>> ceee628f1a4e370981d0de9d081e3dab93f80cb1
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: 350,
        height: 350,
        flexDirection: 'column',
        marginTop: 30,

    },
    dude: {
        alignItems: 'center',
        width: 120,
        height: 230,
        marginTop: 50,

    },
        rightButton: {
        position: 'absolute',
        right: 50,
        marginTop: 40,
    },
    leftButton: {
        position: 'absolute',
        left: 50,
        marginTop: 40,
    },
    hat: {
        position: 'absolute',
        
        width: 95,
        height: 70,
        marginTop: 45,
    }

    })

export default Customize
