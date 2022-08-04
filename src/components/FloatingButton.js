import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import colors from '../colors/colors';

const FloatingButton = ({
  buttonLabel = '',
  handleOnPress = null,
  style,
  ...more
}) => {
  return (
    <View style={[{...style}, styles.buttoncontainer]}>
      <TouchableOpacity onPress={handleOnPress}>
        <Text style={styles.button}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  buttoncontainer: {
    position: 'relative',
    padding: 10,
    height: 50,
    width: 100,
    // backgroundColor: colors.primary,
    borderRadius: 50,
  },

  button: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFF',
    fontWeight: 'bold',
  },
});
