import axios from 'axios';

import {url} from '../../constants';

export const fetchUser = 'fetchUser';
export const removeUser = 'removeUser';
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
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (userId, authToken) => {
  // console.log(userId);
  console.log(authToken);
  return async dispatch => {
    var config = {
      method: 'delete',
      url: `${url}/admin/user/${userId}`,
      headers: {
        'auth-token': authToken,
      },
    };

    try {
      const message = await axios(config);
      dispatch({type: removeUser});
      console.log(message);
    } catch (err) {
      console.log('errorafasfsd', err);
    }
  };
};
