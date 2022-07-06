import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import NavigationHeader from '../../components/NavigationHeader';
import CustomButton from '../../components/Button';
import React from 'react';
import {getUserList} from '../../redux/actions/manageuser';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {url} from '../../constants';
const UsersPanel = () => {
  const dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      const users = 'https://covidhealth.pagekite.me/admin/users';
      const response = await fetch(users);
      //   const responseJson = response.json();
      console.warn(response);
    } catch (err) {
      console.warn('what the fuck is this error');
      //   console.warn(err);
    }
  };

  return (
    <View style={styles.maincontainer}>
      <NavigationHeader Title="Users Panel" />

      <CustomButton labelText="fetch users " handleOnPress={fetchUsers} />
    </View>
  );
};

export default UsersPanel;

const styles = StyleSheet.create({
  maincontainer: {
    display: 'flex',
    flex: 1,
  },
});
