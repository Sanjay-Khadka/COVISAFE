import {
  fetchUser,
  removeUser,
  showloader,
  hideloader,
} from '../actions/manageuser';
const initialState = {
  Users: [],
  Loading: {loading: false},
};
const ManageUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case removeUser:
      return {
        ...state,
      };
    case showloader: {
      return {
        ...state,

        Loading: {loading: true},
      };
    }
    case hideloader: {
      return {
        ...state,
        Loading: {loading: false},
      };
    }
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
