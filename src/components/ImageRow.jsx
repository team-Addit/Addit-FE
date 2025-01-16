import React from 'react';
import {Image, FlatList, StyleSheet, Dimensions} from 'react-native';

const ImageRow = ({images}) => {
  const numColumns = 5; // 한 행에 5개의 이미지

  const imageWidth =
    (Dimensions.get('window').width - 24 - 16 * 2) / numColumns; // gap 6px, layoutPadding 16px
  const imageHeight = imageWidth * (16 / 9); // 9:16 비율로 높이 계산

  const renderItem = ({item}) => (
    <Image
      source={{uri: item}}
      style={[styles.image, {width: imageWidth, height: imageHeight}]}
    />
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns} // 열 수 설정
      columnWrapperStyle={styles.row} // 각 행에 스타일 적용
      contentContainerStyle={styles.container}
      scrollEnabled={false} // 스크롤 비활성화
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  image: {
    borderRadius: 8,
  },
});

export default ImageRow;
