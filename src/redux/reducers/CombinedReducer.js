import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ManageUserReducer from './ManageUserReducer';
import BedsReducer from './BedReducer';
// import ComponentReducer from './ComponentReducer';
const AllReducers = combineReducers({
  authReducer: AuthReducer,
  manageUserReducer: ManageUserReducer,
  bedsReducer: BedsReducer,
});
export default AllReducers;
