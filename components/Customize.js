import React, {useState, useEffect, useContext} from 'react'
import {ImageBackground , View, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import Background from './children/Background' 
import UpdateSkin from './children/UpdateSkin'
import {getImage} from './children/ImagesUrl'
import { useSession } from '../contexts/SessionContext'


const Customize = ( {navigation} ) => {
    //Update image on counter number 
    const [counter, setCounter] = useState(1)
    //Set default object.
    const [imagePath, setImagePath] = useState({path: getImage(2)})
    //Call context function
    const {value, value2} = useSession()
    //Access data from the context
    const [skin, setSkin] = value2;
    
    useEffect(() => {
        setImagePath({
            path: getImage(counter)
        });
        setSkin ({
            path: getImage(counter)
        })
    }, [counter])

    const changeUrl = () => {
        if (counter >= 4) {
            setCounter(1);
        }
        else if (counter <=  1) {
            setCounter(2);
        }
        else {
            setCounter(counter + 1);
        }
    } 

    return (
        <>
            <Background/>
            <View>
                <ImageBackground style={styles.container}  source={require('../assets/skins/canvas/canvas.png')}>
                    <Image style={styles.dude} source={imagePath.path}/>
                    <TouchableNativeFeedback onPress={()=> changeUrl()} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image style={styles.rightButton} source={require('../assets/skins/buttons/right.png')}/>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={()=> changeUrl()} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image style={[styles.leftButton, {paddingTop: 10}]} source={require('../assets/skins/buttons/left.png')}/>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => {navigation.navigate("home")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image style={[styles.returnButton]} source={require('../assets/skins/buttons/x.png')}/>
                </TouchableNativeFeedback>
                </ImageBackground>  
                <TouchableNativeFeedback onPress={() => {navigation.navigate("game")}} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                    <Image style={[styles.gameButton, {paddingTop: 10}]} source={require('../assets/skins/buttons/play2.png')}/>
                </TouchableNativeFeedback>

            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',      
        width: 330,
        height: 330,
        right: '25%',
        marginTop: 10,

    },
    dude: {
        position: 'absolute',
        width: 100,
        height: 230,
        right: 110,
        marginTop: 40,

    },
    rightButton: {
        position: 'absolute',
        right: 40,
        marginTop: 130,
    },
    leftButton: {
        position: 'absolute',
        left: 50,
        marginTop: 130,
    },
    gameButton: {
        position: 'absolute',
        width: 300,
        height: 50,
        marginTop: 340,
        right: '26%',
    },
    returnButton: {
        position: 'absolute',
        marginTop: 10,
        left: 10,
    }

    })

export default Customize

