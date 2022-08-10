import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {url} from '../../constants';

export const fetchUser = 'fetchUser';
export const removeUser = 'removeUser';
export const showloader = 'showloader';
export const hideloader = 'hideloader';
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
