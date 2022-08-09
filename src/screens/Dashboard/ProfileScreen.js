/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {NavigationHeader, EditProfile} from '../../components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors from '../../colors/colors';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {logoutUser} from '../../redux/actions/auth';
import {CustomButton} from '../../components';

const {height, width} = Dimensions.get('window');
const ProfileScreen = () => {
  const [changeFname, setFname] = useState('');
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };
  const {userdata} = useSelector(state => state.authReducer.Login);
  const email = userdata?.email;
  return (
    <View style={styles.maincontainer}>
      <NavigationHeader Title="Profile" />
      <View style={styles.profilecontainer}>
        <View
          style={{
            backgroundColor: '#EDEADE',
            height: '40%',
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 90,
          }}>
          <Icon color={colors.primary} name="user" size={100} />
        </View>
        <View style={styles.namecontainer}>
          {/* <Text style={styles.texts}>Full name</Text> */}
          <EditProfile
            labelText="Full Name"
            value={changeFname}
            placeholderText="Full name"
            onChangeText={fname => setFname(fname)}
            editable={false}
          />
        </View>

        <Text style={styles.texts}>{email}</Text>
        {/* <Icon color={colors.primary} name="pencil" size={20} /> */}
      </View>
      <CustomButton labelText="Logout" handleOnPress={logout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  maincontainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  profilecontainer: {
    marginTop: '10%',
    position: 'relative',
    display: 'flex',
    // backgroundColor: 'black',
    width: width,
    alignItems: 'center',
    // flex: 2,
    justifyContent: 'center',
  },
  texts: {
    color: colors.primary,
    fontSize: 16,
    // fontWeight: 'bold',
  },
  namecontainer: {
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
