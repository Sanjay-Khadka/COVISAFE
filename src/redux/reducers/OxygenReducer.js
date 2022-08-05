import {
  fetchOxygen,
  addOxygen,
  removeOxygen,
  makeOxygenRequest,
  fetchOxygenRequest,
  authorizedOxygenRequest,
  removeOxygenReq,
} from '../actions/manageoxygen';
const oxygenInitial = {
  Oxygens: [],
  oxygenAddStatus: {},
  oxygenDeleteStatus: {},
  OxygenRequestList: [],
  oxygenRequestStatus: {},
  approvedOxygen: {},
  oxygenreqDelete: {},
};
const OxygenReducer = (state = oxygenInitial, action) => {
  switch (action.type) {
    case fetchOxygen:
      return {
        ...state,
        Oxygens: action.payload,
      };
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

    default:
      return state;
  }
};

export default OxygenReducer;
