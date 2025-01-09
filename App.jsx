/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
function App() {
  return (
    <View style={{flex: 1}}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </GestureHandlerRootView>
    </View>
  );
}

export default App;
