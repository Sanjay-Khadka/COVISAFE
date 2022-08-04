import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const BubbleText = ({
  label = '',
  bubbleValue = '',
  style,
  backgroundColor,
  ...more
}) => {
  return (
    <View style={[{...style}, styles.bubblecontainer]}>
      <View
        style={[{...style}, styles.bubble, {backgroundColor: backgroundColor}]}>
        <Text style={styles.bubbleStyle}>{bubbleValue}</Text>
      </View>
      <Text style={styles.bubbleLabel}>{label}</Text>
    </View>
  );
};

export default BubbleText;

const styles = StyleSheet.create({
  bubblecontainer: {
    margin: 10,
    justifyContent: 'space-between',
    display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
    // padding: 5,
  },
  bubble: {
    backgroundColor: '#fb8500',
    height: 50,
    width: 50,
    padding: 10,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 2,
    borderRadius: 55,
  },
  bubbleStyle: {
    color: 'white',
  },
  bubbleLabel: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
