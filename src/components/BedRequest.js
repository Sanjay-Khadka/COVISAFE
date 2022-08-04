import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const BedRequest = () => {
  return (
    <View style={styles.maincontainer}>
      <Text>BedRequest</Text>
    </View>
  );
};

export default BedRequest;

const styles = StyleSheet.create({
  maincontainer: {
    display: 'flex',
    flex: 1,
  },
});
