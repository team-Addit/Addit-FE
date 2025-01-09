import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const SplashPage = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Sign');
    }, 3000); // 3초
  });

  return (
    <View style={styles.container}>
      <Text>splash다!!</Text>
    </View>
  );
};

export default SplashPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
