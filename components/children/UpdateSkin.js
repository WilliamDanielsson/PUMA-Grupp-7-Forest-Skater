import React from 'react'
import { Touchable } from 'react-native'
import ChangeSkin from './ChangeSkin'
import Background from './children/Background'

export default function UpdateSkin() {
    const [indexHat, setIndexHat] = useState(1)
    const [indexHead, setIndexHead] = useState(1)
    const [indexSweater, setIndexSweater] = useState(1)
    const [indexTrouser, setIndexTrouser] = useState(1)

    return (
        <>
            <Background/>
            <View style={styles.container} source={require('../assets/skins/canvas/canvas.png')}></View>
            <View>
                <Image style={styles.dude} source={require('../assets/skins/dude/main1.png')}/>
                <View>
                    <TouchableNativeFeedback onPress={()=> setIndexHat(indexHat + 1)} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image style={[styles.rightButton, {paddingTop: 10}]} source={require('../assets/skins/buttons/right.png')}/>
                    </TouchableNativeFeedback>
                        <View>
                            <ChangeSkin indexHat = {indexHat}/>
                        </View>
                    <TouchableNativeFeedback onPress={()=> setIndexHat(indexHat - 1)} background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <Image style={[styles.leftButton, {paddingTop: 10}]} source={require('../assets/skins/buttons/left.png')}/>
                    </TouchableNativeFeedback>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItem: 'center',
        marginTop: 20,

      },
      dude: {
        justifyContent: 'center',
        alignItem: 'center',
        marginTop: 10,
      },
      rightButton: {
        alignItem: 'right',
        justifyContent: 10,
    },
    leftButton: {
        alignItems: 'left',
        justifyContent: 10,
    
    },

})