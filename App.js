import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native'
import Mainmenu from './components/Mainmenu'
import Game from './components/Game'
import Customize from './components/Customize'
import Leaderboard from './components/Leaderboard'
import Options from './components/Options'
import { SessionProvider } from "./contexts/SessionContext"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={true}/>
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
