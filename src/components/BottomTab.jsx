import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// 모든 SVG 파일을 직접 import
import HomeIcon from '../assets/bottomTab/home_on.svg';
import HomeIconOff from '../assets/bottomTab/home_off.svg';
import SearchIcon from '../assets/bottomTab/search_on.svg';
import SearchIconOff from '../assets/bottomTab/search_off.svg';
import UploadIcon from '../assets/bottomTab/upload.svg';
import NotiIcon from '../assets/bottomTab/notify_on.svg';
import NotiIconOff from '../assets/bottomTab/notifiy_off.svg';
import MyPageIcon from '../assets/bottomTab/mypage_on.svg';
import MyPageIconOff from '../assets/bottomTab/mypage_off.svg';

function BottomTab({state, descriptors, navigation}) {
  const icons = {
    Home: {
      focused: HomeIcon,
      default: HomeIconOff,
    },
    Search: {
      focused: SearchIcon,
      default: SearchIconOff,
    },
    Upload: {
      default: UploadIcon,
    },
    Noti: {
      focused: NotiIcon,
      default: NotiIconOff,
    },
    MY: {
      focused: MyPageIcon,
      default: MyPageIconOff,
    },
  };

  const labels = {
    Home: '홈',
    Search: '검색',
    Upload: '',
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

        const isUpload = route.name === 'Upload';

        // 동적 아이콘 렌더링
        let IconComponent = icons[route.name].default; // 기본 아이콘
        if (isFocused && icons[route.name].focused) {
          IconComponent = icons[route.name].focused; // focused 상태일 때 아이콘
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tab, isUpload && styles.uploadTab]}>
            <View style={[isUpload && styles.uploadButton]}>
              {/* 선택된 IconComponent 렌더링 */}
              <IconComponent width={24} height={24} />
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
  uploadTab: {
    zIndex: 1,
    marginTop: -20,
  },
  uploadButton: {
    width: 40,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#7FA3FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default BottomTab;
