import {login, logout, register, updateUserName} from '../actions/auth';

const initialState = {
  Login: [],
  Register: [],
  ResetPassword: {},
  changePassword: {},
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case login:
      return {
        ...state,
        Login: action.payload,
      };

    case logout:
      return {
        Login: null,
      };
    case register:
      return {
        Register: action.payload,
      };
    case updateUserName:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default AuthReducer;
