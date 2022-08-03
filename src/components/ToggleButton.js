import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {Dimensions} from 'react-native';

import colors from '../colors/colors';

const {height, width} = Dimensions.get('window');

const ToggleButton = (
  {
    labelText = '',
    iconname = '',
    handleOnPress = null,
    style,
    textColor = null,
    ...more
  },
  {todo},
) => {
  // const color = true

  return (
    <TouchableOpacity
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        marginVertical: 5,
        position: 'relative',
        // backgroundColor: 'white',
        width: width / 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      {...more}>
      <Text style={textColor ? styles.activetextcolor : styles.inactivetext}>
        {labelText}
      </Text>
    </TouchableOpacity>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  activetextcolor: {
    textAlign: 'center',
    letterSpacing: 2,
    fontSize: 16,
    color: 'white',
    fontFamily: 'WorkSans-Regular',
    fontWeight: '400',

    borderBottomColor: 'white',
    borderBottomWidth: 3,
  },
  inactivetext: {
    letterSpacing: 2,
    textAlign: 'center',
    fontSize: 14,
    color: '#457b9d',
    fontFamily: 'WorkSans-Regular',
    fontWeight: '400',
    marginLeft: 10,
  },
});
