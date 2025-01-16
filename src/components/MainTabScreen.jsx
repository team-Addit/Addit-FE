import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Carousel from '../components/Carousel';
import Collaborators from './Collaborators';
import ImageGrid from './ImageGrid';

const MainTabScreen = ({tabKey, data}) => {
  const [focusedRelayId, setFocusedRelayId] = useState(null);

  //첫 렌더링 시 focuseRelayId 설정
  useEffect(() => {
    if (data.length > 0 && !focusedRelayId) {
      setFocusedRelayId(data[0]?.relayId);
    }
  }, [data, focusedRelayId]);

  // focusedRelayId에 맞는 데이터 찾기
  const currentRelay = focusedRelayId
    ? data.find(relay => relay.relayId === focusedRelayId)
    : null;

  if (!currentRelay) {
    return <Text>Loading</Text>; // 추후 로딩 처리 필요
  }
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {tabKey === 'popular' ? (
            <>
              <Text style={styles.highlight}>{`#${currentRelay.tag}`}</Text>
              {' 태그와 관련된 \n 릴레이에 참여해보세요'}
            </>
          ) : (
            <>
              <Text
                style={styles.highlight}>{`@${currentRelay.username}님`}</Text>
              {'이 참여한 \n릴레이에 동참해보세요'}
            </>
          )}
        </Text>

        <Carousel
          data={data} // 데이터 전체를 전달
          onFocusChange={id => setFocusedRelayId(id)} // 포커스 변경 시 relayId 업데이트
        />

        <View style={styles.bgBlue}>
          <Text style={styles.title}>{currentRelay.relayTitle}</Text>
          <Collaborators
            count={currentRelay.memberCount}
            images={currentRelay.memberImages}
          />
          {/* <ImageGrid images={currentRelay.map(tickle => tickle.thumbnail)} /> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default MainTabScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
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
