import {fetchUser, removeUser} from '../actions/manageuser';
const initialState = {
  Users: [],
};
const ManageUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case removeUser:
      return {
        ...state,
      };

    case fetchUser:
      return {
        ...state,
        Users: action.payload,
      };
    default:
      return state;
  }
};

export default ManageUserReducer;
