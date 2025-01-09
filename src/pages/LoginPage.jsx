import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
function LoginPage() {
  return (
    <View style={styles.container}>
      <Text>LoginPage</Text>
    </View>
  );
}

export default LoginPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
