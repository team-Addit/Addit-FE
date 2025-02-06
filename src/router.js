import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTab from './components/BottomTab';
import RelayPage from './pages/RelayPage';
// import SplashPage from './pages/SplashPage';
const renderBottomTabBar = props => <BottomTab {...props} />;

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      //   initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Splash" component={SplashPage} /> */}
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="RelayPage" component={RelayPage} />
    </Stack.Navigator>
  );
};

export default Router;
