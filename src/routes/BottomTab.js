import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View, Image} from 'react-native';
import {HomeScreen, ProfileScreen} from '../screens';
const Tab = createBottomTabNavigator();

const BottomTab = () => {
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
        // options={{
        //   headerLeft: () => {
        //     <Image source={require('../assets/Virus.png')} />;
        //   },
        // }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;

const styles = StyleSheet.create({});
