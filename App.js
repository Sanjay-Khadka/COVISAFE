import React from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {Store as store} from './src/redux/store';
import Main from './src/Main';
import UsersPanel from './src/screens/adminPanel/UsersPanel';
import ToggleButton from './src/components/ToggleButton';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
        {/* <UsersPanel /> */}
        {/* <ToggleButton /> */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
