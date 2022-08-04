import {
  getbeds,
  addBed,
  removeBed,
  fetchBedRequest,
  authorizedBedRequest,
  makeBedRequest,
} from '../actions/manageBed';
const bedInitial = {
  Beds: [],
  bedAddStatus: {},
  bedDeleteStatus: {},
  BedRequestList: [],
  makeBedRequestStatus: {},
  authorizeBedStatus: {},
};
// console.log(bedInitial.BedRequestList);
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
    case fetchBedRequest: {
      return {
        ...state,
        BedRequestList: action.payload,
      };
    }
    default:
      return state;
  }
};

export default BedsReducer;
