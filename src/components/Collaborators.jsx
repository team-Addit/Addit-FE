import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const Collaborators = ({images, count}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {images.slice(0, 3).map((image, index) => (
          <EllipseIcon key={index} imageUrl={image} />
        ))}
      </View>
      <Text style={styles.text}>
        <Text style={styles.textBold}>+{count}</Text>
        <Text>명이 함께합니다</Text>
      </Text>
    </View>
  );
};

const EllipseIcon = ({imageUrl}) => {
  return (
    <Image
      style={styles.ellipseIcon}
      resizeMode="cover"
      source={{uri: imageUrl}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 6,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ellipseIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: -12, // 이미지를 겹치게 만들기 위해 음수 값 사용
    borderColor: '#fff',
    borderWidth: 1.2,
  },
  textBold: {
    fontWeight: '600',
  },
  text: {
    fontSize: 10,
    color: '#707070',
    textAlign: 'center',
    width: 107,
    height: 13,
  },
});

export default Collaborators;
