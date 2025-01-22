import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './components/BottomTab';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default Router;
