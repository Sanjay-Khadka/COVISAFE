import {
  getbeds,
  addBed,
  removeBed,
  fetchBedRequest,
  fetchUserBedReq,
  getUserApprovedBed,
} from '../actions/manageBed';
const bedInitial = {
  Beds: [],
  bedAddStatus: {},
  bedDeleteStatus: {},
  BedRequestList: [],
  makeBedRequestStatus: {},
  authorizeBedStatus: {},
  UserBedRequest: [],
  ApprovedUserBedReq: [],
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
    case fetchUserBedReq: {
      return {
        ...state,
        UserBedRequest: action.payload,
      };
    }
    case getUserApprovedBed: {
      return {
        ...state,
        ApprovedUserBedReq: action.payload,
      };
    }
    default:
      return state;
  }
};

export default BedsReducer;
