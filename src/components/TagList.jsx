import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TagList = ({tags}) => {
  const [visibleTags, setVisibleTags] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);

  // 부모 컴포넌트 크기 측전
  const onLayout = event => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const calculateTagWidth = text => {
    const charWidth = 6; // 가정
    return text.length * charWidth + 20; // 여백 추가
  };

  const processTags = () => {
    let tagsToRender = [];
    let totalLength = 10;

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const tagWidth = calculateTagWidth(tag);
      totalLength += tagWidth;
      //합산길이 > 총길이 : ...처리하고 더 추가 X
      if (totalLength > containerWidth) {
        tagsToRender.push({text: tag, ellipsizeMode: 'tail', isLast: true});
        break;
      }
      //합산길이 < 총길이 : 렌더링하고 다음거 받아오기
      else {
        //합산길이 > 총길이-60 : ...처리하고 더 추가
        if (totalLength > containerWidth - 40) {
          tagsToRender.push({text: tag, ellipsizeMode: 'tail', isLast: false});
          break;
        }
        tagsToRender.push({text: tag, ellipsizeMode: '', isLast: false});
      }
    }

    setVisibleTags(tagsToRender);
  };

  useEffect(() => {
    if (containerWidth > 0) {
      processTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth, tags]);

  return (
    <View style={styles.container} onLayout={onLayout}>
      {visibleTags.map((tag, index) => (
        <Text
          key={index}
          numberOfLines={1}
          ellipsizeMode={tag.ellipsizeMode}
          style={[
            styles.tag,
            tag.isLast ? styles.flexBox : {}, // 마지막 태그에 flex 적용
          ]}>
          #{tag.text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row', // 태그들을 한 줄로 배치
  },
  flexBox: {
    flex: 1, // 마지막 태그가 남은 공간을 채우도록
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    paddingHorizontal: 4,
    paddingVertical: 4,
    color: '#fff',
    fontSize: 8,
    marginRight: 2,
  },
});

export default TagList;
