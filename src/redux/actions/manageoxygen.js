import axios from 'axios';
import {url} from '../../constants';
export const addOxygen = 'addOxygen';
// export const deleteOxygen = 'deleteOxygen';
export const fetchOxygen = 'fetchOxygen';
export const removeOxygen = 'removeOxygen';
export const fetchOxygenRequest = 'fetchOxygenRequest';
export const makeOxygenRequest = 'makeOxygenRequest';
export const authorizedOxygenRequest = 'authorizedOxygenRequest';
export const createOxygen = oxygenData => {
  return async dispatch => {
    var config = {
      method: 'post',
      url: `${url}/oxygen/addOxygen`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: oxygenData,
    };
    try {
      const {data} = await axios(config);
      dispatch({type: addOxygen, payload: data});
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOxygen = () => {
  var config = {
    method: 'get',
    url: `${url}/oxygen/fetchOxygen`,
    headers: {},
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      dispatch({type: fetchOxygen, payload: data});
      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteOxygen = oxygen_id => {
  return async dispatch => {
    var config = {
      method: 'delete',
      url: `${url}/oxygen/deleteOxygen/${oxygen_id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const {data} = await axios(config);
      dispatch({type: addOxygen, payload: data});
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOxygenRequestList = () => {
  var config = {
    method: 'get',
    url: `${url}/getalloxygenrequests`,
    headers: {},
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      // console.log(data);
      dispatch({type: fetchOxygenRequest, payload: data});
    } catch (err) {
      console.log(err);
    }
  };
};

export const createOxygenRequest = (oxygenId, userId, requestUrgency) => {
  var config = {
    method: 'post',
    url: `${url}/createoxygen/${oxygenId}/${userId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestUrgency,
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      dispatch({type: makeOxygenRequest, payload: data});
    } catch (err) {
      console.log(err);
    }
  };
};

export const acceptOxygenRequest = oxygenrequestId => {
  console.log(oxygenrequestId);
  var config = {
    method: 'put',
    url: `${url}/apOxygen/${oxygenrequestId}`,
    headers: {},
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      console.log(data);
      dispatch({type: authorizedOxygenRequest, payload: data});
    } catch (err) {
      console.log(err);
    }
  };
};
