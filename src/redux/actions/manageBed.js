import axios from 'axios';
import {url} from '../../constants';
export const removeBed = 'removeBed';
export const addBed = 'addBed';
export const getbeds = 'getbeds';
export const fetchBedRequest = 'fetchBedRequest';
export const authorizedBedRequest = 'authorizedBed';
export const makeBedRequest = 'makeBedRequest';

export const createBed = (bedData, authToken) => {
  return async dispatch => {
    console.log(bedData);
    var config = {
      method: 'post',
      url: `${url}/bed/createBed`,
      headers: {
        'auth-token': authToken,
        'Content-Type': 'application/json',
      },
      data: bedData,
    };
    try {
      const {data} = await axios(config);
      console.warn(data);
      dispatch({type: addBed, payload: data});
      // dispatch(hideloading());
    } catch (error) {
      console.warn(error);
    }
  };
};

export const getAllBed = () => {
  return async dispatch => {
    var config = {
      method: 'get',
      url: `${url}/bed/getAllBed`,
      headers: {},
    };

    try {
      const {data} = await axios(config);
      dispatch({type: getbeds, payload: data});
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteBed = bed_id => {
  console.log(bed_id);
  return async dispatch => {
    var config = {
      method: 'delete',
      url: `${url}/bed/${bed_id}`,
      headers: {},
    };
    try {
      const {data} = await axios(config);
      dispatch({type: removeBed, payload: data});
      console.log(data?.success);
    } catch (err) {
      console.log(err);
    }
  };
};

export const getBedRequestList = () => {
  var config = {
    method: 'get',
    url: `${url}/getallBedrequests`,
    headers: {},
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      // console.log(data);
      dispatch({type: fetchBedRequest, payload: data});
    } catch (err) {
      console.log(err);
    }
  };
};

export const createBedRequest = (bedId, userId, requestUrgency) => {
  var config = {
    method: 'post',
    url: `${url}/createBed/${bedId}/${userId}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: requestUrgency,
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      dispatch({type: makeBedRequest, payload: data});
    } catch (err) {
      console.log(err);
    }
  };
};

export const acceptBedRequest = BedRequestId => {
  console.log(BedRequestId);
  var config = {
    method: 'put',
    url: `${url}/apbed/${BedRequestId}`,
    headers: {},
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      console.log(data);
      dispatch({type: authorizedBedRequest, payload: data});
    } catch (err) {
      console.log(err);
    }
  };
};
