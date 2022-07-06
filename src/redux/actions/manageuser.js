import axios from 'axios';
import {url} from '../../constants';

export const getUsers = 'getUsers';

export const getUserList = () => {
  return async dispatch => {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    let reqOptions = {
      url: `${url}/admin/users`,
      method: 'GET',
      headers: headersList,
    };

    try {
      const data = await axios.request(reqOptions);
      console.warn(data);
    } catch (err) {
      console.warn(err);
    }
  };
};
