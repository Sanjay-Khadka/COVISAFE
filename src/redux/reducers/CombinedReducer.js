import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
// import ComponentReducer from './ComponentReducer';
const AllReducers = combineReducers({
  authReducer: AuthReducer,
  // mainscreen: ComponentReducer,
});
export default AllReducers;
