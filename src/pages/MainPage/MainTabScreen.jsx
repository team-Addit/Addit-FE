import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Carousel from '../../components/mainPage/Carousel';
import Collaborators from '../../components/Collaborators';
import ImageRowGrid from '../../components/mainPage/ImageRowGrid';

const MainTabScreen = ({tabKey, data}) => {
  const [focusedRelayId, setFocusedRelayId] = useState(null);
  const [selectedTickleId, setSelectedTickleId] = useState(null);

  // ImageRow에서 이미지 선택 시 tickleId 업데이트
  const handleImageSelect = tickleId => {
    setSelectedTickleId(tickleId);
  };

  //첫 렌더링 시 focuseRelayId = 0(기본)
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
          data={data}
          onFocusChange={id => setFocusedRelayId(id)} //relay id
          selectedTickleId={selectedTickleId} // tickle id
        />

        <View style={styles.bgBlue}>
          <Collaborators
            count={currentRelay.memberCount}
            images={currentRelay.memberImages}
          />
          <Text style={styles.title}>{currentRelay.relayTitle}</Text>
          <ImageRowGrid
            data={currentRelay?.tickles}
            onImageSelect={handleImageSelect}
          />
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
    margin: 8,
  },
  highlight: {
    color: '#4574ec',
    fontWeight: 'bold',
  },
});
