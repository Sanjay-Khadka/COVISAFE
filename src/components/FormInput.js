import React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Touchable,
} from 'react-native';
import colors from '../colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
const FormInput = ({
  labelText = '',
  placeholderText = '',
  onChangeText,
  value,
  error,
  KeyboardType = '',
  errorMessage,
  secureTextEntry = null,
  onBlur,
  style,
  ...more
}) => {
  return (
    <View style={{marginTop: 8}}>
      <View style={styles.labelscontainer}>
        <Text style={styles.labelstyle}>{labelText}</Text>
        {error ? <Text style={styles.errormsg}>{error}</Text> : null}
      </View>
      <View style={error ? styles.viewcontainer : styles.viewcontainer1}>
        <TextInput
          style={styles.input}
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

export default FormInput;

const styles = StyleSheet.create({
  labelstyle: {
    fontFamily: 'WorkSans-Regular',
    color: colors.primary,
    fontSize: 14,
    marginBottom: 3,
  },
  input: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    color: '#2971AB',
    width: width - 70,
  },
  viewcontainer: {
    padding: 8,
    width: width - 20,
    height: 55,
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
    width: width - 20,
    height: 55,
    backgroundColor: '#EBF9FF',
    borderRadius: 5,
    justifyContent: 'space-between',
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    color: '#2971AB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelscontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  errormsg: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'WorkSans-Regular',
  },
});
