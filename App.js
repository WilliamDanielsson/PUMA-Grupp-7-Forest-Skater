import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native'
import Mainmenu from './components/Mainmenu'

export default function App() {
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden={true}/>
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={Mainmenu}/>
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
