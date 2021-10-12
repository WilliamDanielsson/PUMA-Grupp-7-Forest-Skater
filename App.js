import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native'
import Mainmenu from './components/Mainmenu'
import Game from './components/Game'
import Customize from './components/Customize'
import Leaderboard from './components/Leaderboard'
import Options from './components/Options'

export default function App() {
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={true}/>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Mainmenu}/>
          <Route exact path="/game" component={Game}/>
          <Route exact path="/customize" component={Customize}/>
          <Route exact path="/leaderboard" component={Leaderboard}/>
          <Route exact path="/options" component={Options}/>
        </Switch>
      </NativeRouter>
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
