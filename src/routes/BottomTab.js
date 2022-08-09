import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  HomeScreen,
  ProfileScreen,
  UsersPanel,
  CreateBed,
  CreateOxygen,
  Dashboard,
  Requests,
  ApprovedRequests,
  OxygenScreen,
  BedScreen,
  UserRequests,
} from '../screens';
import {useSelector} from 'react-redux';
const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const {userdata} = useSelector(state => state.authReducer.Login);
  const isAdmin = userdata?.isAdmin;
  console.log(isAdmin);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
      }}>
      {isAdmin ? (
        <>
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon color={color} name="dashboard" size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Users"
            component={UsersPanel}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon color={color} name="users" size={size} />
              ),
            }}
          />

          <Tab.Screen
            name="Requests"
            component={Requests}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon color={color} name="list" size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Oxygen"
            component={CreateOxygen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon color={color} name="circle-thin" size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Bed"
            component={CreateBed}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon color={color} name="bed" size={size} />
              ),
            }}
          />
        </>
      ) : (
        <>
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
            name="Beds"
            component={BedScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon color={color} name="bed" size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Oxygens"
            component={OxygenScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon color={color} name="circle-thin" size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Request"
            component={UserRequests}
            options={{
              tabBarIcon: ({color, size}) => (
                <Icon color={color} name="list" size={size} />
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
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
