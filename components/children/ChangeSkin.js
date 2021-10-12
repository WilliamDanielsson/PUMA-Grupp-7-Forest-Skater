import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

export default function ChangeSkin({indexHat, indexHead, indexSweater, indexTrouser}) {
    
    let index = 1, index1 = 1, index2 = 1, index3 = 1;
    
    if (indexHat >  index) {
        index = indexHat;
    }
    if (indexHead >  index1) {
        index1 = indexHead;
    }
    if (indexSweater >  index2) {
        index2 = indexSweater;
    }
    if (indexTrouser >  index3) {
        index3 = indexTrouser;
    }



    return (    
        <>
            <View>   
                <Image 
                    source={require( '../assets/skins/hats/hat'+index+'.png')} 
                    style={styles.hat}
                ></Image>
            </View>
            <View>   
                <Image 
                    source={require( '../assets/skins/heads/head'+index1+'.png')} 
                    styles={styles.head}
                ></Image>
            </View>
             <View>   
                <Image 
                    source={require( '../assets/skins/sweaters/cloth'+index2+'.png')} 
                    styles={styles.sweater}
                ></Image>
            </View>
            <View>   
                <Image 
                    source={require( '../assets/skins/trousers/pants'+index3+'.png')} 
                    styles={styles.trouser}
                ></Image>
            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    hat: {
        alignItem: 'center',
        paddingTop: 10,
        justifyContent: 10,
    },
    head: {
        alignItems: 'center',
        paddingTop: 15,
        justifyContent: 10,
    
    },
    sweater: {
        alignItems: 'center',
        paddingTop: 20,
        justifyContent: 10,

    },
    trouser: {
        alignItems: 'center',
        paddingTop: 30,
        justifyContent: 10,

    }
  });