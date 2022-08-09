import React from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';

import colors from '../colors/colors';

const {height, width} = Dimensions.get('window');

const MiniFormInput = ({
  error,
  labelText = '',
  placeholderText = '',
  onChangeText = null,
  value = '',
  onBlur = '',
  style,
  ...more
}) => {
  return (
    <View>
      <View style={[{...style}, styles.labelscontainer]}>
        <Text style={styles.labelstyle}>{labelText}</Text>
        {error ? <Text style={styles.errormsg}>{error}</Text> : null}
      </View>
      <View style={error ? styles.viewcontainer : styles.viewcontainer1}>
        <TextInput
          style={[{...style}, styles.input]}
          placeholder={placeholderText}
          placeholderTextColor={colors.primary}
          // placeholderTextColor="#2971AB"
          onChangeText={onChangeText}
          value={value}
          onBlur={onBlur}
          {...more}
        />
      </View>
    </View>
  );
};

export default MiniFormInput;

const styles = StyleSheet.create({
  labelscontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  labelstyle: {
    fontFamily: 'WorkSans-Regular',
    color: colors.primary,
    fontSize: 14,
    marginBottom: 3,
  },
  viewcontainer: {
    padding: 8,
    height: 47,
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#EBF9FF',
    borderRadius: 5,
    justifyContent: 'space-between',
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    color: '#2971AB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewcontainer1: {
    padding: 8,
    height: 47,
    backgroundColor: '#EBF9FF',
    borderRadius: 5,
    justifyContent: 'space-between',
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    color: '#2971AB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    color: '#2971AB',
    width: width - 70,
  },
  errormsg: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'WorkSans-Regular',
  },
});
