import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const CasesContainer = ({
  value = '',
  style,
  textColor = '',
  backgroundColor = '',
  labelText = '',
  //   imagepath = {url: 'Corona.png'},
  ...more
}) => {
  return (
    <View style={[styles.totalcase, {backgroundColor: backgroundColor}]}>
      <Text style={[styles.defaultText, {color: textColor}]}>{labelText}</Text>
      <Text style={[styles.defaultValue, {color: textColor}]}>{value}</Text>
    </View>
  );
};

export default CasesContainer;

const styles = StyleSheet.create({
  totalcase: {
    justifyContent: 'center',
    backgroundColor: '#1e6091',
    height: 80,
    width: 165,
    margin: 5,
    elevation: 10,
    borderRadius: 10,
    padding: 7,
  },
  icons: {
    margin: 2,
    height: 30,
    width: 30,
    // backgroundColor: 'black'
  },
  defaultValue: {
    paddingLeft: 5,
    // marginRight: 5,
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  defaultText: {
    paddingLeft: 5,
    fontSize: 15,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
});
