/* eslint-disable no-lone-blocks */
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {url} from '../../constants';
export const login = 'login';
export const register = 'register';
export const logout = 'logout';
export const updateUserName = 'updateUserName';
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
      // console.log(data);
      // eslint-disable-next-line no-lone-blocks
      {
        data.error
          ? ToastAndroid.showWithGravity(
              data.message,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'Logged In',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (error) {
      // console.warn(error);
      ToastAndroid.showWithGravity(
        'Login failed please try again ',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch({type: login, payload: null});
    ToastAndroid.showWithGravity(
      'Logged Out',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };
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
      // eslint-disable-next-line no-lone-blocks
      {
        data.uid
          ? ToastAndroid.showWithGravity(
              'User registered successfully',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'what is this ',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (error) {
      console.warn(error);
    }
  };
};

export const changeFullName = (nameData, token, userid) => {
  return async dispatch => {
    var config = {
      method: 'put',
      url: `${url}/user/user/${userid}`,
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
      data: nameData,
    };

    try {
      const {data} = await axios(config);
      console.log(nameData, token, userid);
      console.warn(data);
      dispatch({type: updateUserName});
      {
        data._id
          ? ToastAndroid.showWithGravity(
              `Fullname changed to ${data.fullname} `,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'could not change fullname  ',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (error) {
      console.warn(error);
      ToastAndroid.showWithGravity(
        'An error occured!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };
};
