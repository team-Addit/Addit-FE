import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TagList = ({tags}) => {
  const [visibleTags, setVisibleTags] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [tagWidths, setTagWidths] = useState({}); // 태그별 너비 저장
  const SPACING = 20; // 여유 공간 설정

  const onLayout = event => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const processTags = () => {
    setVisibleTags([]);
    let tagsToRender = [];
    let totalLength = 0;

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const tagWidth = tagWidths[tag] || 0;

      // 합산 길이가 컨테이너 너비 + 여유 공간을 초과하면 중단
      if (totalLength + tagWidth > containerWidth + SPACING) {
        tagsToRender.push({text: tag, ellipsizeMode: 'tail', isLast: true});
        break;
      }

      totalLength += tagWidth;

      // 합산 길이가 컨테이너 너비를 초과하면 마지막 태그로 처리
      if (totalLength > containerWidth) {
        tagsToRender.push({text: tag, ellipsizeMode: 'tail', isLast: true});
        break;
      }

      tagsToRender.push({text: tag, ellipsizeMode: '', isLast: false});
    }

    setVisibleTags(tagsToRender);
  };

  useEffect(() => {
    // 태그 너비가 모두 측정된 후 처리
    if (containerWidth > 0 && Object.keys(tagWidths).length === tags.length) {
      processTags();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerWidth, tags, tagWidths]);

  const onTagLayout = (tag, event) => {
    const {width} = event.nativeEvent.layout;

    setTagWidths(prev => {
      // 기존 값과 동일하면 다시 렌더링하지 않음
      if (prev[tag] === width + 8) {
        return prev;
      }
      return {...prev, [tag]: width + 8}; // 태그 너비 + 여백
    });
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {tags.map((tag, index) => (
        <Text
          key={`hidden-${index}`}
          style={[styles.tag, {opacity: 0, position: 'absolute'}]} // 초기 렌더링 감추기
          onLayout={event => onTagLayout(tag, event)}>
          #{tag}
        </Text>
      ))}
      {visibleTags.map((tag, index) => (
        <Text
          key={`visible-${index}`}
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
