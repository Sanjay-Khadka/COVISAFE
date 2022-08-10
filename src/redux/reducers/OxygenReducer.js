import {
  fetchOxygen,
  addOxygen,
  removeOxygen,
  makeOxygenRequest,
  fetchOxygenRequest,
  authorizedOxygenRequest,
  removeOxygenReq,
  fetchUserOxygenReq,
  getUserApprovedOxygen,
} from '../actions/manageoxygen';
const oxygenInitial = {
  Oxygens: [],
  oxygenAddStatus: {},
  oxygenDeleteStatus: {},
  OxygenRequestList: [],
  oxygenRequestStatus: {},
  approvedOxygen: {},
  oxygenreqDelete: {},
  UserOxygenRequest: [],
  ApprovedUserOxygenReq: [],
};
const OxygenReducer = (state = oxygenInitial, action) => {
  switch (action.type) {
    case fetchOxygen: {
      return {
        ...state,
        Oxygens: action.payload,
      };
    }
    case addOxygen: {
      return {
        ...state,
        oxygenAddStatus: action.payload,
      };
    }
    case removeOxygen: {
      return {
        ...state,
        oxygenDeleteStatus: action.payload,
      };
    }
    case fetchOxygenRequest: {
      return {
        ...state,
        OxygenRequestList: action.payload,
      };
    }

    case makeOxygenRequest: {
      return {
        ...state,
        oxygenRequestStatus: action.payload,
      };
    }
    case authorizedOxygenRequest: {
      return {
        ...state,
        approvedOxygen: action.payload,
      };
    }

    case removeOxygenReq: {
      return {
        ...state,
        oxygenreqDelete: action.payload,
      };
    }
    case fetchUserOxygenReq: {
      return {
        ...state,
        UserOxygenRequest: action.payload,
      };
    }
    case getUserApprovedOxygen: {
      return {
        ...state,
        ApprovedUserOxygenReq: action.payload,
      };
    }
    default:
      return state;
  }
};

export default OxygenReducer;
