import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RelayPage = ({route}) => {
  const {id} = route.params; // id를 params에서 받아옵니다.

  return (
    <View style={styles.conainer}>
      <Text>RelayPage</Text>
      <Text>ID: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RelayPage;
