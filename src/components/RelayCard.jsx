import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TagList from './TagList';

const RelayCard = ({id, title, imageUrl, count, tags}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('RelayPage', {id});
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <ImageBackground
        source={{uri: imageUrl}}
        style={styles.backgroundImage}
        imageStyle={styles.image}>
        <TagList tags={tags} style={styles.tagList} />

        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.minText}>{count}개의 컨텐츠</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.minText}>감정</Text>
            <Text style={styles.minText}>4K</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RelayCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 3 / 4,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 4, // 카드간 간격
    marginHorizontal: 4,
  },
  backgroundImage: {
    flex: 1,
    padding: 14, // 박스 패딩
    justifyContent: 'space-between',
  },
  image: {
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 6,
    marginBottom: 4,
  },
  minText: {
    color: 'white',
    fontSize: 10,
    textShadowColor: '#000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  tagList: {
    marginBottom: 10, // TagList와의 간격을 추가하여 화면 배치 조정
  },
});
