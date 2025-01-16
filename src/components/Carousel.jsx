import React, {useRef} from 'react';
import {
  View,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = width * 0.4;
const ITEM_SPACING = (width - ITEM_WIDTH) / 2;

const Carousel = ({data, onFocusChange}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const focusIndex = useRef(0);
  const onScrollEnd = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_WIDTH);
    if (index !== focusIndex.current) {
      focusIndex.current = index;
      onFocusChange(data[index]?.relayId); // 부모에게 포커스된 relayId 전달
    }
  };

  const renderItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    // 첫 번째 tickle의 이미지만 표시
    const firstTickle = item.tickles[0];

    return (
      <View style={{width: ITEM_WIDTH}}>
        <Animated.View style={[styles.imageContainer, {transform: [{scale}]}]}>
          <Image source={{uri: firstTickle.thumbnail}} style={styles.image} />
          <View style={styles.overlay}>
            <Image
              source={{uri: firstTickle.profileImage}}
              style={styles.profileImage}
            />
            <Text style={styles.nickname}>{firstTickle.nickname}</Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={item => item.relayId.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
      snapToInterval={ITEM_WIDTH}
      decelerationRate="fast"
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: true,
      })}
      onMomentumScrollEnd={onScrollEnd} // 스크롤 종료 시점에 포커스 변경
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: ITEM_WIDTH * 0.9,
    height: ITEM_WIDTH * 1.6,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'white',
  },
  nickname: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
});

export default Carousel;
