import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import colors from '../colors/colors';
import Icon from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get('window');
const PasswordInput = ({
  labelText = '',
  placeholderText = '',
  onChangeText = null,
  value = null,
  onBlur,
  error,
  handleOnPress = null,
  secureTextEntry,
  ...more
}) => {
  const [visible, setVisible] = useState(true);
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
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={visible}
          onBlur={onBlur}
        />

        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Icon
            color={error ? 'red' : '#2971AB'}
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            // name={'eye'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;

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
    // height: height - 20,
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
