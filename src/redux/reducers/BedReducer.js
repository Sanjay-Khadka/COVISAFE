import {getbeds, addBed} from '../actions/manageBed';
const bedInitial = {
  Beds: [],
  bedAddStatus: {},
};
const BedsReducer = (state = bedInitial, action) => {
  switch (action.type) {
    case getbeds:
      return {
        ...state,
        Beds: action.payload,
      };
    case addBed: {
      return {
        ...state,

        bedAddStatus: action.payload,
      };
    }

    default:
      return state;
  }
};

export default BedsReducer;
