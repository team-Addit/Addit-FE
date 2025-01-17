import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import MainPage from './pages/mainPage/MainPage';
import SearchPage from './pages/SearchPage';
import UploadPage from './pages/UploadPage';
import AlarmPage from './pages/AlarmPage';
import Mypage from './pages/MyPage';
import BottomTab from './components/BottomTab';
// import SplashPage from './pages/SplashPage';
const renderBottomTabBar = props => <BottomTab {...props} />;

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBar={renderBottomTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={MainPage} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Upload" component={UploadPage} />
      <Tab.Screen name="Alarm" component={AlarmPage} />
      <Tab.Screen name="MyPage" component={Mypage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      //   initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Splash" component={SplashPage} /> */}
      <Stack.Screen name="MainTab" component={MainTab} />
    </Stack.Navigator>
  );
};

export default Router;
