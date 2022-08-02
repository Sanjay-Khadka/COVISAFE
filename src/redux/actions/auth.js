import axios from 'axios';

import {url} from '../../constants';
export const login = 'login';
export const register = 'register';
export const logout = 'logout';
export const loginUser = logindata => {
  return async dispatch => {
    var config = {
      method: 'post',
      url: `${url}/user/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: logindata,
    };

    try {
      const {data} = await axios(config);
      // console.warn(data);
      dispatch({type: login, payload: data});
    } catch (error) {
      console.warn(error);
    }
  };
};

export const logoutUser = () => {
  return {type: login, payload: null};
};

export const registerUser = registerData => {
  return async dispatch => {
    var config = {
      method: 'post',
      url: `${url}/user/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: registerData,
    };

    try {
      const {data} = await axios(config);
      console.warn(data);
      dispatch({type: register, payload: data});
    } catch (error) {
      console.warn(error);
    }
  };
};
