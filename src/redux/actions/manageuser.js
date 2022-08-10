/* eslint-disable prettier/prettier */
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {url} from '../../constants';

export const fetchUser = 'fetchUser';
export const removeUser = 'removeUser';
export const showloader = 'showloader';
export const hideloader = 'hideloader';
export const changeRole = 'changeRole';
export const getUserList = () => {
  return async dispatch => {
    var config = {
      method: 'get',
      url: `${url}/admin/users`,
      headers: {},
    };

    try {
      const {data} = await axios(config);
      dispatch({type: fetchUser, payload: data});
      dispatch(hideLoading());
    } catch (err) {
      console.log(err);
      dispatch(hideLoading());
    }
  };
};

export const deleteUser = (userId, authToken) => {
  // console.log(userId);
  // console.log(authToken);
  return async dispatch => {
    var config = {
      method: 'delete',
      url: `${url}/admin/user/${userId}`,
      headers: {
        'auth-token': authToken,
      },
    };

    try {
      const {data} = await axios(config);

      dispatch({type: removeUser});
      dispatch(hideLoading());
      // eslint-disable-next-line no-lone-blocks
      {
        data.success
          ? ToastAndroid.showWithGravity(
              data.success,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              'Bed deletion failed',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
    } catch (err) {
      dispatch(hideLoading());
      ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };
};

export const setLoading = () => dispatch => {
  dispatch({type: showloader});
};

export const hideLoading = () => dispatch => {
  dispatch({type: hideloader});
};

export const makeUserAdmin = (userid, admindata) => {
  var config = {
    method: 'post',
    url: `${url}/admin/makeadmin/${userid}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: admindata,
  };
  return async dispatch => {
    try {
      const {data} = await axios(config);
      // eslint-disable-next-line no-lone-blocks
      {
        data.success
          ? ToastAndroid.showWithGravity(
              data.success,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
            )
          : ToastAndroid.showWithGravity(
              ' Failed to make admin',
              ToastAndroid.LONG,
              ToastAndroid.TOP,
            );
      }
      dispatch({type: changeRole});
    } catch (err) {
      console.log(err);
    }
  };
};
