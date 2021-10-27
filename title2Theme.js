 import { Audio } from 'expo-av'


   export async function playThemeSong() {
    const { sound } = await Audio.Sound.createAsync(
      require('./titleTheme.mp3')
      );

      await sound.playAsync();

      return sound
   }

    export async function stopThemeSong(sound) {
         sound.unloadAsync(); 
     }
