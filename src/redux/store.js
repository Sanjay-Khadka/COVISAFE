import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import thunk from 'redux-thunk';
// import {persistStore, persistReducer} from 'redux-persist';
import {createStore, applyMiddleware} from 'redux';

import AllReducers from './reducers/CombinedReducer';
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, AllReducers);

export const Store = createStore(
  persistedReducer,
  applyMiddleware(...middleware),
);
export const persistor = persistStore(Store);
