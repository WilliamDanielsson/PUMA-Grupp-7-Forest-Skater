import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Mainmenu from './components/Mainmenu'
import Game from './components/Game'
import Customize from './components/Customize'
import Leaderboard from './components/Leaderboard'
import Options from './components/Options'
<<<<<<< HEAD
import { SessionProvider } from "./contexts/SessionContext"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
=======
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';

const Stack = createNativeStackNavigator();
>>>>>>> ceee628f1a4e370981d0de9d081e3dab93f80cb1

export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
    <NavigationContainer>
      <StatusBar style="auto" hidden={true}/>
<<<<<<< HEAD
      {/*<SessionProvider>
        <NativeRouter>
          <Switch>
            <Route exact path="/" component={Mainmenu}/>
            <Route exact path="/game" component={Game}/>
            <Route exact path="/customize" component={Customize}/>
            <Route exact path="/leaderboard" component={Leaderboard}/>
            <Route exact path="/options" component={Options}/>
          </Switch>
        </NativeRouter>
      </SessionProvider>*/}
      <NavigationContainer>{
        <Stack.Navigator>
          <Stack.Screen name="main1" component={Mainmenu} />
          <Stack.Screen name="gam1" component={Game} />
      </Stack.Navigator>
      }</NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
=======
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
  )
}
>>>>>>> ceee628f1a4e370981d0de9d081e3dab93f80cb1
