import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import MainTabScreen from './MainTabScreen';
import {response_hot} from '../../assets/DummyData_home';
import Logo from '../../assets/logo_temp.png';

const MainPage = () => {
  const [index, setIndex] = useState(0);
  const [hotData, setHotData] = useState([]);
  const [addiData, setAddiData] = useState([]);

  useEffect(() => {
    setHotData(response_hot.data.relays);
    // addiData 연결 추가
  }, []);
  const tabData = [
    {
      key: 'popular',
      title: '인기',
      data: hotData,
    },
    {
      key: 'addi',
      title: '애디',
      data: addiData,
    },
  ];

  const renderScene = ({route}) => {
    const selectedTab = tabData.find(tab => tab.key === route.key);

    if (!selectedTab || selectedTab.data.length === 0) {
      return null;
    }

    return <MainTabScreen tabKey={selectedTab.key} data={selectedTab.data} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <TabView
        navigationState={{index, routes: tabData}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            activeColor={'#222222'}
            inactiveColor={'#BABABA'}
            style={styles.tabBar}
            renderLabel={({route, focused}) => (
              <Text style={[styles.label, focused && styles.labelFocused]}>
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 26,
    resizeMode: 'contain',
  },
  tabBar: {
    backgroundColor: 'transparent',
    height: 48,
    justifyContent: 'center',
    width: '30%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  indicator: {
    backgroundColor: '#7FA3FF',
    height: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333',
  },
  labelFocused: {
    fontWeight: '800',
  },
});

export default MainPage;
