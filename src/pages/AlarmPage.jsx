import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AlarmPage = () => {
  return (
    <View style={styles.container}>
      <Text>AlarmPage</Text>
    </View>
  );
};

export default AlarmPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
