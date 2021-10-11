import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

export default function ChangeSkin({indexHat = 1, indexHead, indexSweater, indexTrouser}) {
    let index = 1;
    const ChangeHat = (indexHat) => {
        return "../assets/skins/hats/hat"+{indexHat}+".png";
    } 

    const ChangeHead = (indexHead) => {
        return "../assets/skins/hats/head"+{indexHead}+".png";
    }

    const ChangeSweater = (indexSweater) => {
        return "../assets/skins/hats/cloth"+{indexSweater}+".png";
    }
    const ChangeTrouser = (indexTrouser) => {
        return "../assets/skins/hats/pants"+{indexTrouser}+".png";
    }

    return (
        
        <>
            <View>   
                <Image 
                    source={require( '../assets/skins/hats/hat'+indexHat+'.png')} 
                    style={styles.hat}
                ></Image>
            </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    hat: {
      width: 66,
      height: 58,
    },
  });