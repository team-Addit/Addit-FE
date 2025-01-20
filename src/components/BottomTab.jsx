import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Pages
import MainPage from '../pages/mainPage/MainPage';
import SearchPage from '../pages/SearchPage';
import UploadPage from '../pages/UploadPage';
import AlarmPage from '../pages/AlarmPage';
import Mypage from '../pages/MyPage';

// SVG Icons
import HomeOn from '../assets/bottomTab/home_on.svg';
import HomeOff from '../assets/bottomTab/home_off.svg';
import SearchOn from '../assets/bottomTab/search_on.svg';
import SearchOff from '../assets/bottomTab/search_off.svg';
import Upload from '../assets/bottomTab/upload.svg';
import NotiOn from '../assets/bottomTab/notify_on.svg';
import NotiOff from '../assets/bottomTab/notify_off.svg';
import MyPageOn from '../assets/bottomTab/mypage_on.svg';
import MyPageOff from '../assets/bottomTab/mypage_off.svg';

const Tab = createBottomTabNavigator();

// Tab 아이콘을 컴포넌트로 분리하여 관리
const TabIcon = ({routeName, focused}) => {
  const iconProps = {width: 28, height: 28};

  const icons = {
    Home: focused ? <HomeOn {...iconProps} /> : <HomeOff {...iconProps} />,
    Search: focused ? (
      <SearchOn {...iconProps} />
    ) : (
      <SearchOff {...iconProps} />
    ),
    Upload: <Upload width={40} height={40} />,
    Noti: focused ? <NotiOn {...iconProps} /> : <NotiOff {...iconProps} />,
    MY: focused ? <MyPageOn {...iconProps} /> : <MyPageOff {...iconProps} />,
  };

  return icons[routeName] || null;
};

const BottomTab = () => {
  const screenOptions = ({route}) => ({
    tabBarStyle: styles.tabBar,
    tabBarActiveTintColor: '#4574EC',
    tabBarInactiveTintColor: '#b0b0b0',
    headerShown: false,
    tabBarIcon: ({focused}) => (
      <TabIcon routeName={route.name} focused={focused} />
    ),
    tabBarLabel: route.name === 'Upload' ? () => null : undefined, // Upload 페이지는 레이블을 표시하지 않음
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={MainPage} />
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Upload" component={UploadPage} />
      <Tab.Screen name="Noti" component={AlarmPage} />
      <Tab.Screen name="MY" component={Mypage} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    flexDirection: 'row',
    height: 70,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
