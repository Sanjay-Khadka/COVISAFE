import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ManageUserReducer from './ManageUserReducer';
// import ComponentReducer from './ComponentReducer';
const AllReducers = combineReducers({
  authReducer: AuthReducer,
  manageUserReducer: ManageUserReducer,
});
export default AllReducers;
