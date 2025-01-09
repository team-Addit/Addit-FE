import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const SearchPage = () => {
  return (
    <View style={styles.container}>
      <Text>SearchPage</Text>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
