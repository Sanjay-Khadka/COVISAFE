import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ManageUserReducer from './ManageUserReducer';
import BedsReducer from './BedReducer';
import OxygenReducer from './OxygenReducer';
// import ComponentReducer from './ComponentReducer';
const AllReducers = combineReducers({
  authReducer: AuthReducer,
  manageUserReducer: ManageUserReducer,
  bedsReducer: BedsReducer,
  oxygenReducer: OxygenReducer,
});
export default AllReducers;
