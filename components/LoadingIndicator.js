import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingWrapper}>
      <ActivityIndicator color="grey" size={50} />
    </View>
  );
};
const styles = StyleSheet.create({
  loadingWrapper: {
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
export default LoadingIndicator;
