import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const MainPage = () => {
  return (
    <View style={styles.container}>
      <Text>MainPage</Text>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
