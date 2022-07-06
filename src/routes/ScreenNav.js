import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {LoginScreen, SignupScreen, HomeScreen} from '../screens';

const ScreenNav = () => {
  const {Navigator, Screen} = createStackNavigator();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="login" component={LoginScreen} />
      <Screen name="signUp" component={SignupScreen} />
      <Screen name="HomeScreen" component={HomeScreen} />
    </Navigator>
  );
};
export default ScreenNav;
