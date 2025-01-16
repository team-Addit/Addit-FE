import React from 'react';
import {
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const ImageRow = ({data, onImageSelect}) => {
  const numColumns = 5;

  const imageWidth =
    (Dimensions.get('window').width - 24 - 16 * 2) / numColumns; // gap 6px, layoutPadding 16px
  const imageHeight = imageWidth * (16 / 9);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onImageSelect(item.tickleId)}>
      <Image
        source={{uri: item.thumbnail}}
        style={[styles.image, {width: imageWidth, height: imageHeight}]}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.tickleId} // tickleId가 key
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
      scrollEnabled={false} // 스크롤 비활
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  image: {
    borderRadius: 8,
  },
});

export default ImageRow;
