import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ScreenNav, BottomTab} from './routes';
import {useSelector} from 'react-redux';
const Main = () => {
  const token = useSelector(state => state.authReducer.Login);

  const userToken = token?.token;
  // const userToken = 1;
  return (
    // <NavigationContainer>
    <>{userToken ? <BottomTab /> : <ScreenNav />}</>
    // </NavigationContainer>
  );
};
export default Main;
