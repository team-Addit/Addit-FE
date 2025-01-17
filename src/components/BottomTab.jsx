import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

function BottomTab({state, descriptors, navigation}) {
  const icons = {
    Home: require('../assets/home.png'),
    Search: require('../assets/search.png'),
    Upload: require('../assets/plus.png'),
    Noti: require('../assets/noti.png'),
    MY: require('../assets/my.png'),
  };

  const labels = {
    Home: '홈',
    Search: '검색',
    Upload: '', // 업로드는 아이콘만 표시
    Noti: '알림',
    MY: '마이페이지',
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = labels[route.name];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // 가운데 버튼에만 둥근 배경 적용
        const isUpload = route.name === 'Upload';

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tab, isUpload && styles.uploadTab]}>
            <View style={[isUpload && styles.uploadButton]}>
              <Image
                source={icons[route.name]}
                style={[
                  styles.icon,
                  {tintColor: isFocused ? '#4574EC' : '#222'},
                ]}
              />
            </View>
            {!isUpload && (
              <Text
                style={{
                  color: isFocused ? '#4574EC' : '#222',
                  marginTop: 4,
                  fontSize: 8,
                }}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingHorizontal: '6%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  uploadTab: {
    zIndex: 1, // 가운데 버튼을 앞으로
    marginTop: -20, // 위로 띄움
  },
  uploadButton: {
    width: 40,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#7FA3FF', // 둥근 배경 색상
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // 안드로이드 그림자
  },
});

export default BottomTab;
