import axios from 'axios';
import {url} from '../../constants';
export const addBed = 'addBed';
export const getbeds = 'getbeds';

export const createBed = (bedData, authToken) => {
  return async dispatch => {
    var config = {
      method: 'post',
      url: `${url}/bed/createBed`,
      headers: {
        'auth-token': authToken,
      },
      data: bedData,
    };
    try {
      const {data} = await axios(config);
      console.warn(data);
      dispatch({type: addBed, payload: data});
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
