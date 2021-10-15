import React from 'react'
import { useEffect } from 'react'
import VolumeControl, {
    VolumeControlEvents
  } from "react-native-volume-control";
import Slider from '@react-native-community/slider'
import { useSession } from '../../contexts/SessionContext'
import { Text } from 'react-native'

const VolumeSlider = () => {
    const { volume, setVolume } = useSession()

    useEffect(() => {
        setVolume({
            volume: VolumeControl.getVolume()
        });

        this.volEvent = VolumeControlEvents.addListener(
            "VolumeChanged",
            this.volumeEvent
          );

        return () => {
            this.volEvent.remove();
        }
    });

    // Updates Slider UI when hardware buttons change volume
    volumeEvent = event => {
        this.setState({ volume: event.volume });
    };

    return (
        <>
            <Slider
                value={volume}
                // Updates device volume
                onValueChange={() => {VolumeControl.change(value)}}
                // Other props
            />
            <Text>
                This is the current volume: {volume}
            </Text>
        </>
    )
}

export default VolumeSlider
