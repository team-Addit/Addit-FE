import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Carousel from '../components/Carousel';
import Collaborators from './Collaborators';
import ImageGrid from './ImageGrid';

const MainTabScreen = ({tabKey, data}) => {
  const currentData = data && Array.isArray(data) ? data[0] : data;
  console.log(currentData);
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {tabKey === 'popular' ? (
            <>
              <Text style={styles.highlight}>{`#${currentData.tag}`}</Text>
              {' 태그와 관련된 \n 릴레이에 참여해보세요'}
            </>
          ) : (
            <>
              <Text
                style={styles.highlight}>{`@${currentData.username}님`}</Text>
              {'이 참여한 \n릴레이에 동참해보세요'}
            </>
          )}
        </Text>
        <Carousel data={currentData.tickles} />
        <View style={styles.bgBlue}>
          <Text style={styles.title}>{currentData.title}</Text>
          <Collaborators
            count={currentData.memberCount}
            images={currentData.memberImages}
          />
          <ImageGrid images={currentData.ticklesImages} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MainTabScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1, // 화면 전체를 사용하기 위해 flex 설정
  },
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  bgBlue: {
    width: '100%',
    padding: 16,
    backgroundColor: '#E8EFFF',
  },
  title: {
    fontSize: 16,
    letterSpacing: -0.1,
    fontWeight: '700',
    textAlign: 'center',
  },
  highlight: {
    color: '#4574ec',
    fontWeight: 'bold',
  },
});
