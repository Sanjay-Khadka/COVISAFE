import React from 'react';
import {View, Text, Image} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {Store as store} from './src/redux/store';
import Main from './src/Main';
import {Requests} from './src/screens';

import CasesContainer from './src/components/CasesContainer';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Main />
        {/* <Requests /> */}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
