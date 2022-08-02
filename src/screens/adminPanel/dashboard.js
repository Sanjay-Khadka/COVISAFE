import {View, Text, StyleSheet} from 'react-native';
import {CustomButton, NavigationHeader} from '../../components';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../redux/actions/auth';
import React from 'react';
const Dashboard = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <View style={styles.dashboardcontainer}>
      <NavigationHeader Title="Dashboard" />
      <Text style={{color: 'black'}}>dashboard</Text>
      <CustomButton labelText="Logout" handleOnPress={logout} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  dashboardcontainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
