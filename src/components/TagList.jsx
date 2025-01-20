import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TagComponent = ({tags}) => {
  const [visibleTags, setVisibleTags] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0); // containerWidth 상태 추가

  // containerWidth를 부모 컴포넌트에서 받아오기 위한 onLayout 이벤트 핸들러
  const onLayout = event => {
    const {width} = event.nativeEvent.layout;
    setContainerWidth(width); // 부모 뷰의 너비를 받아와서 상태로 설정
  };

  const calculateTagWidth = text => {
    // 대략적인 텍스트 길이 계산 함수
    const charWidth = 4; // 문자의 대략적인 너비 (글자 크기와 폰트에 따라 달라질 수 있음)
    return text.length * charWidth;
  };

  const processTags = () => {
    let totalWidth = 0;
    let tagsToRender = [];
    let totalLength = 0; // 전체 길이 계산

    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      const tagWidth = calculateTagWidth(tag);
      totalLength += tagWidth; // 합산 길이에 태그 길이 추가

      // 태그가 containerWidth를 초과하면 'tail'로 설정하고 종료
      if (totalWidth + tagWidth > containerWidth) {
        tagsToRender.push({text: tag, ellipsizeMode: 'tail'});
        break; // 이후 태그는 렌더링하지 않음
      }

      totalWidth += tagWidth;

      // containerWidth - 50을 넘지 않으면 기본 ellipsizeMode
      if (totalWidth <= containerWidth - 50) {
        tagsToRender.push({text: tag, ellipsizeMode: 'clip'});
      } else {
        tagsToRender.push({text: tag, ellipsizeMode: 'tail'});
        break; // containerWidth-50을 넘으면 더 이상 태그 추가하지 않음
      }
    }

    // 전체 길이와 합산 길이 콘솔 출력
    console.log('전체 길이:', totalLength);
    console.log('합산 길이:', totalWidth);

    setVisibleTags(tagsToRender); // 렌더링할 태그들을 한 번에 설정
  };

  // 컴포넌트가 렌더링될 때 태그를 처리
  useEffect(() => {
    if (containerWidth > 0) {
      // containerWidth가 정의되었을 때만 processTags 실행
      processTags();
    }
  }, [tags, containerWidth]); // tags나 containerWidth가 변경될 때마다 processTags 실행

  return (
    <View style={styles.container} onLayout={onLayout}>
      {visibleTags.map((tag, index) => (
        <Text
          key={index}
          numberOfLines={1} // 태그를 한 줄로 표시
          ellipsizeMode={tag.ellipsizeMode}
          style={styles.tag}>
          {tag.text}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 태그들을 한 줄로 배치
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginRight: 2,
    color: '#fff',
    fontSize: 8,
  },
});

export default TagComponent;
