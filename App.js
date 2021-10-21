import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Mainmenu from './components/Mainmenu'
import Game from './components/Game'
import Customize from './components/Customize'
import Leaderboard from './components/Leaderboard'
import Options from './components/Options'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import { SessionProvider } from './contexts/SessionContext';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <SessionProvider>
      <NavigationContainer>
        <StatusBar style="auto" hidden={true}/>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen options = {{headerShown: false}} name="home" component ={Mainmenu} />
          <Stack.Screen options = {{headerShown: false}} name="game" component ={Game} />
          <Stack.Screen options = {{headerShown: false}} name="customize" component ={Customize} />
          <Stack.Screen options = {{headerShown: false}} name="leaderboard" component ={Leaderboard} />
          <Stack.Screen options = {{headerShown: false}} name="options" component ={Options} />
          <Stack.Screen options = {{headerShown: false}} name="main" component ={HomeScreen} />
          <Stack.Screen options = {{headerShown: false}} name="login" component ={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>
  )
}
