import {getbeds, addBed, removeBed} from '../actions/manageBed';
const bedInitial = {
  Beds: [],
  bedAddStatus: {},
  bedDeleteStatus: {},
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
    case removeBed: {
      return {
        ...state,
        bedDeleteStatus: action.payload,
      };
    }
    default:
      return state;
  }
};

export default BedsReducer;
