import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {changeFullName} from '../redux/actions/auth';
const {height, width} = Dimensions.get('window');

import colors from '../colors/colors';

const EditProfile = ({
  labelText = '',
  placeholderText = '',
  onChangeText,
  value,
  error,
  KeyboardType = '',
  errorMessage,
  secureTextEntry = null,
  onBlur,
  editable = false,
  style,
  ...more
}) => {
  const dispatch = useDispatch();
  const [edit, setEditable] = useState(false);
  const changeName = () => {
    var nameData = JSON.stringify({
      fullname: value,
    });
    dispatch(changeFullName(nameData, token, userid));
    setEditable(!edit);
  };
  const {token, userdata} = useSelector(state => state.authReducer.Login);
  const fullname = userdata?.fullname;
  const userid = userdata?._id;
  //   console.log();
  return (
    <View style={{marginTop: 8, width: width, alignItems: 'center'}}>
      {/* <View style={styles.labelscontainer}>
        <Text style={styles.labelstyle}>{labelText}</Text>
      </View> */}
      <View style={styles.viewcontainer}>
        <TextInput
          style={styles.input}
          placeholder={fullname}
          placeholderTextColor={colors.primary}
          onChangeText={onChangeText}
          value={value}
          onBlur={onBlur}
          editable={edit}
          onEndEditing={changeName}
        />

        <TouchableOpacity onPress={() => setEditable(!edit)}>
          <Icon
            color={colors.primary}
            name="pencil"
            // name={'eye'}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  labelstyle: {
    fontFamily: 'WorkSans-Regular',
    color: colors.primary,
    fontSize: 14,
    marginBottom: 3,
  },
  input: {
    fontFamily: 'WorkSans-Regular',
    fontSize: 18,
    color: '#2971AB',
    width: width - 100,
    // backgroundColor: 'blue',
    // height: height - 20,
  },
  viewcontainer: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#616161',
    fontFamily: 'WorkSans-Regular',
    fontSize: 12,
    color: '#2971AB',
    width: width - 210,
    height: 50,

    justifyContent: 'space-around',

    flexDirection: 'row',
    alignItems: 'center',
  },

  labelscontainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  errormsg: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'WorkSans-Regular',
  },
});
