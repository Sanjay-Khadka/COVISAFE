import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {
  HomeScreen,
  ProfileScreen,
  UsersPanel,
  createBed,
  createOxygen,
  dashboard,
  requests,
  approvedRequests,
} from '../screens';
import {useSelector} from 'react-redux';
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const {userdata} = useSelector(state => state.authReducer.Login);
  console.log(userdata.isAdmin);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#227c9d',
        },
        headerTintColor: '#FFFD',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon color={color} name="home" size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon color={color} name="user" size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
